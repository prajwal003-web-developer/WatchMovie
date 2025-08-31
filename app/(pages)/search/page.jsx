'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import tmdb from '@/app/axios';
import NetflixCard from '@/app/Components/NetflixCard';


const SearchPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';

    const [activeTab, setActiveTab] = useState('movie'); // "movie" or "tv"
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await tmdb.get(`/search/${activeTab}`, {
                    params: { query }
                });
                setResults(res.data.results);

                console.log(res.data.results)
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query, activeTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="p-4 pt-20 pb-52">
            {/* Tabs */}
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => handleTabChange('movie')}
                    className={`px-4 py-2 font-semibold rounded ${activeTab === 'movie' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300'
                        }`}
                >
                    Movies
                </button>
                <button
                    onClick={() => handleTabChange('tv')}
                    className={`px-4 py-2 font-semibold rounded ${activeTab === 'tv' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300'
                        }`}
                >
                    TV Shows
                </button>
            </div>

            {/* Search Results */}
            {loading ? (
                <p className="text-white text-lg">Loading...</p>
            ) : results.length === 0 ? (
                <p className="text-gray-300">No results found for "{query}"</p>
            ) : (
                <div className="flex  gap-4 flex-wrap justify-center pb-4">
                    {results.map((item) => (
                        <NetflixCard
                            key={item.id}
                            id={item.id}
                            name={item.title || item.name}
                            image={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                            data={activeTab}
                            description={item.overview}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
