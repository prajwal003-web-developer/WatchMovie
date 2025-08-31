'use client';
import React from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { playTv, playVideo } from '../utils';
import { useDetailsStore } from '@/Context/useDetails';

const NetflixCard = ({ id, name, image, description, data }) => {
  const setOpen = useDetailsStore((s) => s.setOpen);

  const displayName = name || 'Unknown';
  const displayDescription = description || 'No description available';

  return (
    <div className="relative w-32 md:w-60 min-w-32 md:min-w-60 group rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105">
      
      {/* Poster Image */}
      <img
        src={image}
        alt={displayName}
        onClick={() => setOpen(id, data)}
        className="w-full h-40 md:h-60 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
      />

      {/* Hover Info Panel */}
      <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-gray-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col gap-2 rounded-b-lg">
        
        {/* Title */}
        <h3 className="text-white font-bold text-sm md:text-lg line-clamp-2">{displayName}</h3>

        {/* Description */}
        <p className="text-gray-300 text-xs md:text-sm line-clamp-3">{displayDescription}</p>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => {
              if (data === 'movie') playVideo(id);
              else playTv(id, 1, 1);
            }}
            className="flex items-center gap-1 bg-white text-black px-2 md:px-3 justify-center py-1 rounded font-semibold hover:bg-gray-200 transition"
          >
            <FaPlay /> <span className='text-xs md:text-sm'>Play</span>
          </button>

          <button
            onClick={() => setOpen(id, data)}
            className="flex items-center justify-center gap-1 bg-gray-700 text-white px-2 md:px-3 py-1 rounded font-semibold hover:bg-gray-600 transition"
          >
            <FaInfoCircle /> <span className='hidden md:block'> Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetflixCard;
