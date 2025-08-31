'use client';

import React, { useEffect, useState } from 'react';
import { FaPlay, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import tmdb from '../axios';
import { playTv } from '../utils';
import { useDetailsStore } from '@/Context/useDetails';

const Details = () => {
  const [item, setItem] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [seasonOpen, setSeasonOpen] = useState(false);

  const isOpen = useDetailsStore((s) => s.isOpen);
  const openId = useDetailsStore((s) => s.openId);
  const type = useDetailsStore((s) => s.type); // "movie" or "tv"
  const setClose = useDetailsStore((s) => s.setClose);

  useEffect(() => {
    if (!isOpen || !openId) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await tmdb.get(`/${type}/${openId}`);
        setItem(res.data);

        const videoRes = await tmdb.get(`/${type}/${openId}/videos`);
        const trailerData = videoRes.data.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        setTrailer(trailerData);

        if (type === 'tv') {
          const seasonsWithEpisodes = await Promise.all(
            res.data.seasons.map(async (season) => {
              const seasonRes = await tmdb.get(`/tv/${openId}/season/${season.season_number}`);
              return { ...season, episodes: seasonRes.data.episodes };
            })
          );
          setItem((prev) => ({ ...prev, seasons: seasonsWithEpisodes }));
          setSelectedSeason(seasonsWithEpisodes[0]); // default to first season
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [isOpen, openId, type]);

  if (!isOpen) return null;

  return (
 <div className="fixed inset-0 z-50 bg-[#00000066] bg-opacity-80 flex items-center justify-center p-4 overflow-auto noScrollBar">
  <div className="relative max-w-6xl w-full bg-gray-950 rounded-lg shadow-lg max-h-[90dvh] noScrollBar">
    <button
      className="absolute md:-top-8 top-3 right-3 md:-right-8 text-white text-2xl cursor-pointer z-20"
      onClick={setClose}
    >
      ✖
    </button>

    {loading ? (
      <div className="text-white p-8 text-center text-xl">Loading...</div>
    ) : (
      <div className="flex flex-col md:flex-row noScrollBar">
        {/* Trailer */}
        {trailer && (
          <div className="w-full md:w-2/3 aspect-video h-[50vh] md:h-auto noScrollBar">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=1`}
              title={trailer.name}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="rounded"
            ></iframe>
          </div>
        )}

        {/* Info panel */}
        <div className="w-full md:w-1/3 p-6 text-white overflow-y-auto max-h-[70vh] space-y-4 noScrollBar">
          <h2 className="text-3xl font-bold">{item?.title || item?.name}</h2>
          <p className="text-gray-300">{item?.overview}</p>

          {type === 'movie' && (
            <button className="flex items-center gap-2 bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-200 transition mt-4">
              <FaPlay /> Play
            </button>
          )}

          {type === 'tv' && item?.seasons && (
            <div className="mt-4 noScrollBar">
              <h3 className="text-xl font-bold mb-2">Seasons</h3>

              <div className="bg-gray-900 rounded noScrollBar">
                {item.seasons.map((season,idx) => (
                  <div key={season.id}>
                    <button
                      onClick={() =>
                        setSelectedSeason(
                          selectedSeason?.id === season.id ? null : season
                        )
                      }
                      className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-700 transition"
                    >
                      <span>{season.name}</span>
                      {selectedSeason?.id === season.id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    {selectedSeason?.id === season.id && (
                      <div className="max-h-64 overflow-y-auto border-t border-gray-700 noScrollBar">
                        {season.episodes.map((ep) => (
                          <div
                            key={ep.id}
                            className="flex justify-between items-center px-4 py-2 hover:bg-gray-700 transition"
                          >
                            <span>
                              {ep.episode_number}. {ep.name}
                            </span>
                            <button onClick={()=>{
                              playTv(openId ,season.season_number,ep.episode_number)
                            }} className="flex items-center gap-1 bg-white text-black px-3 py-1 rounded text-sm hover:bg-gray-200 transition">
                              <FaPlay /> Play
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default Details;
