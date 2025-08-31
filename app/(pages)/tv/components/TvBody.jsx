'use client';
import React, { useEffect, useState } from 'react';

import VerticalData from '@/app/Components/VerticalData';
import tmdb from '@/app/axios';

const tvCategories = [
    { title: 'Trending Now', endpoint: '/trending/tv/week' },
    { title: 'Top Rated', endpoint: '/tv/top_rated' },
    { title: 'Action & Adventure', endpoint: '/discover/tv?with_genres=10759' },
    { title: 'Comedy', endpoint: '/discover/tv?with_genres=35' },
    { title: 'Drama', endpoint: '/discover/tv?with_genres=18' },
];

const TVBody = () => {
    const [tvShows, setTvShows] = useState({});


    useEffect(() => {
        tvCategories.forEach(async (cat) => {
            try {
                const res = await tmdb.get(cat.endpoint);
                setTvShows((prev) => ({ ...prev, [cat.title]: res.data.results }));
            } catch (err) {
                console.error(err);
            }
        });
    }, []);

    return (
        <div className="p-4 md:p-7 overflow-y-scroll overflow-x-visible noScrollBar">
            {tvCategories.map((cat) => (
                <VerticalData
                    key={cat.endpoint}
                    title={cat.title}
                    items={tvShows[cat.title]}
                    data="tv"
                />
            ))}
        </div>
    );
};

export default TVBody;
