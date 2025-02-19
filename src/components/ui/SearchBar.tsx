'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
  debounceMs?: number;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = 'Search services...', 
  suggestions = [],
  debounceMs = 300 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  // Handle debounce
  useEffect(() => {
    debounceTimeout.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query, debounceMs]);

  // Handle search
  useEffect(() => {
    onSearch(debouncedQuery);
    if (debouncedQuery) {
      const updated = [debouncedQuery, ...recentSearches.filter(s => s !== debouncedQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  }, [debouncedQuery, onSearch, recentSearches]);   

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setQuery(value);
    setDebouncedQuery(value); // Immediately trigger search for selections
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setDebouncedQuery('');
    onSearch('');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isOpen && (query || recentSearches.length > 0) && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {query && suggestions.length > 0 && (
            <div className="mb-2">
              <p className="px-4 py-1 text-xs text-gray-500 uppercase">Suggestions</p>
              {suggestions
                .filter(s => s.toLowerCase().includes(query.toLowerCase()))
                .map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(suggestion)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  >
                    {suggestion}
                  </button>
                ))}
            </div>
          )}

          {recentSearches.length > 0 && (
            <div>
              <p className="px-4 py-1 text-xs text-gray-500 uppercase">Recent Searches</p>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(search)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  <ClockIcon className="w-4 h-4 text-gray-400" />
                  {search}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
