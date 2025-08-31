'use client';
import React, { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import tmdb from '../axios';
import { useDetailsStore } from '@/Context/useDetails';

const HeroSection = ({ data }) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!data) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await tmdb.get(`/${data}/popular?page=1`);
                const movies = res.data.results;
                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                setItem(randomMovie);
                console.log(res)
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [data]);

    const HandlePlay = async () => {
        const res = await fetch(`/api/${item.id}?q=${data=='movie'?'movie':'tv_1-1'}`)
        const datas = await res.json();


        window.open(datas?.iframeUrl , '_blank')
    }

    const setOpen = useDetailsStore(s=>s.setOpen)

    const ShowDetails = ()=>{
        setOpen(item.id,data)
    }

    return (
        <div className="relative w-full h-[50vh] md:h-[80vh] bg-gray-900">
            {loading ? (
                <div className="w-full h-full flex items-center justify-center text-white text-xl">

                </div>
            ) : (
                <>
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path || item.poster_path})`,
                        }}
                    ></div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

                    {/* Content */}
                    <div className="relative z-10 mx-auto px-4 md:px-8 h-full flex flex-col justify-end pb-10 md:pb-20 text-white">
                        <h1 className="text-2xl md:text-5xl font-bold mb-4">
                            {item.title || item.name}
                        </h1>
                        <p className="hidden md:block text-sm md:text-lg mb-6 max-w-2xl">
                            {item.overview}
                        </p>
                        <div className="flex gap-4">
                            <button onClick={HandlePlay} className="flex items-center gap-2 bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-200 transition">
                                <FaPlay /> Play
                            </button>
                            <button onClick={ShowDetails} className="bg-gray-700 bg-opacity-70 px-6 py-2 font-semibold rounded hover:bg-gray-600 transition">
                                Details
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default HeroSection;
