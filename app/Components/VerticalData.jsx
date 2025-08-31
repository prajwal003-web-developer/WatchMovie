'use client'
import React, { useRef } from 'react'
import NetflixCard from './NetflixCard'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const VerticalData = ({ title, items, data }) => {

    const scrollRef = useRef()
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 500
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="p-2 md:p-7">
            {/* Title + Buttons */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-white text-xl font-bold">{title}</h2>
                <div className="hidden md:flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full hover:bg-gray-700 transition"
                    >
                        <FaChevronLeft className="text-white" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="flex items-center justify-center w-8 h-8 bg-gray-800 rounded-full hover:bg-gray-700 transition"
                    >
                        <FaChevronRight className="text-white" />
                    </button>
                </div>
            </div>

            {/* Scrollable cards row */}
            <div
                ref={scrollRef}
                className='overflow-y-auto max-h-[90vh] flex flex-row gap-4 p-1 md:p-4 noScrollBar'
            >
                {items?.map((movie) => (
                    <NetflixCard
                        key={movie.id}
                        id={movie.id}
                        name={movie.title  || movie?.name || movie?.original_name || "Unknown"}
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        description={movie.overview}
                        data={data}
                    />
                ))}
            </div>
        </div>
    )
}

export default VerticalData
