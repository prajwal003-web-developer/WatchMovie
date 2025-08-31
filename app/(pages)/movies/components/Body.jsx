'use client';
import React, { useEffect, useState } from 'react';
import tmdb from '@/app/axios';

import VerticalData from '@/app/Components/VerticalData';

const categories = [
    { title: 'Trending Now', endpoint: '/trending/movie/week' },
    { title: 'Top Rated', endpoint: '/movie/top_rated' },
    { title: 'Action', endpoint: '/discover/movie?with_genres=28' },
    { title: 'Comedy', endpoint: '/discover/movie?with_genres=35' },
    { title: 'Horror', endpoint: '/discover/movie?with_genres=27' },
];

const Body = () => {
    const [movies, setMovies] = useState({});
    

    useEffect(() => {
        categories.forEach(async (cat) => {
            try {
                const res = await tmdb.get(cat.endpoint);
                setMovies((prev) => ({ ...prev, [cat.title]: res.data.results }));
            } catch (err) {
                console.error(err);
            }
        });
    }, []);

    return (
        <div className="p-4 md:p-7 overflow-x-visible noScrollBar overflow-y-scroll ">
            {categories.map((cat) => (
               <VerticalData data={'movie'} items={movies[cat.title]} title={cat.title} key={cat.endpoint}/>
            ))}
        </div>
    );
};

export default Body;


//  <div key={cat.title}>
//                     <h2 className="text-white text-xl font-bold mb-2">{cat.title}</h2>
                    

                    
//                     <div className="flex gap-1 py-2">
//                         {movies[cat.title]?.map((movie) => (
//                             <NetflixCard
//                                 key={movie.id}
//                                 id={movie.id}
//                                 name={movie.title}
//                                 image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                                 description={movie.overview}
//                                 data={'movie'}
//                             />
//                         ))}
//                     </div>
//                 </div>