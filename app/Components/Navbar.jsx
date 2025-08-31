'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaFilm, FaTv, FaSearch, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="text-red-600 font-bold text-xl cursor-pointer"
            onClick={() => router.push('/')}
          >
            NETFLIX
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-white font-medium">
            <div
              className="flex items-center gap-1 hover:text-red-600 cursor-pointer"
              onClick={() => router.push('/movies')}
            >
              <FaFilm /> Movies
            </div>
            <div
              className="flex items-center gap-1 hover:text-red-600 cursor-pointer"
              onClick={() => router.push('/tv')}
            >
              <FaTv /> TV Shows
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-gray-800 text-white rounded-full px-3 py-1 w-40 focus:outline-none focus:w-64 transition-all duration-300"
              />
              <button type="submit">
                <FaSearch className="absolute right-2 top-1.5 text-gray-400 cursor-pointer" />
              </button>
            </form>
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center gap-4 text-white">
            {/* Search toggle */}
            <div
              className="cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FaSearch />
            </div>

            {/* Hamburger toggle */}
            <div
              className="cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FaTimes /> : 
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black text-white px-4 pt-2 pb-4 space-y-2">
          <div
            className="flex items-center gap-1 hover:text-red-600 cursor-pointer"
            onClick={() => { router.push('/movies'); setMobileOpen(false); }}
          >
            <FaFilm /> Movies
          </div>
          <div
            className="flex items-center gap-1 hover:text-red-600 cursor-pointer"
            onClick={() => { router.push('/tv'); setMobileOpen(false); }}
          >
            <FaTv /> TV Shows
          </div>
        </div>
      )}

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden bg-black px-4 py-2">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-gray-800 text-white rounded-full px-3 py-1 w-full focus:outline-none"
            />
            <button type="submit">
              <FaSearch className="absolute right-3 top-2 text-gray-400 cursor-pointer" />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
