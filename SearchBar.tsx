import React, { useState } from 'react';
import { Search, Sparkles, Shuffle, X, History, Compass } from 'lucide-react';
import { PRESET_ANIMALS } from '../data/presetAnimals';

interface SearchBarProps {
  onSearch: (animalName: string) => void;
  isLoading: boolean;
  recentSearches: string[];
  onClearHistory: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading,
  recentSearches,
  onClearHistory,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleSelectTag = (animalName: string) => {
    setQuery(animalName);
    onSearch(animalName);
  };

  const handleRandomAnimal = () => {
    const randomIndex = Math.floor(Math.random() * PRESET_ANIMALS.length);
    const randomAnimal = PRESET_ANIMALS[randomIndex];
    setQuery(randomAnimal.name);
    onSearch(randomAnimal.name);
  };

  return (
    <div id="search-container" className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl shadow-emerald-950/10 border border-emerald-100 p-4 sm:p-5">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div className="absolute left-4 text-emerald-600 pointer-events-none">
            <Search className="w-5 h-5" />
          </div>

          <input
            id="animal-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any animal (e.g., Lion, Red Panda, Blue Whale, Eagle)..."
            className="w-full pl-12 pr-28 py-3.5 bg-emerald-50/50 hover:bg-emerald-50 focus:bg-white text-emerald-950 placeholder-emerald-700/50 rounded-xl border border-emerald-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 text-base font-medium outline-none transition-all"
            disabled={isLoading}
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-24 text-emerald-600 hover:text-emerald-800 p-1 rounded-md transition-colors cursor-pointer"
              title="Clear text"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            id="search-submit-btn"
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-lg font-semibold text-sm transition-all shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="hidden sm:inline">Searching...</span>
              </>
            ) : (
              <>
                <span>Search</span>
                <Sparkles className="w-4 h-4 text-emerald-300" />
              </>
            )}
          </button>
        </form>

        {/* Quick Discovery Tags & Randomizer */}
        <div className="mt-4 pt-3 border-t border-emerald-100/80 flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800/80 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              Popular Species:
            </span>
            <button
              id="random-animal-btn"
              type="button"
              onClick={handleRandomAnimal}
              disabled={isLoading}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-200/80 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Shuffle className="w-3 h-3 text-emerald-600" />
              Surprise Me!
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {PRESET_ANIMALS.map((animal) => (
              <button
                key={animal.id}
                type="button"
                onClick={() => handleSelectTag(animal.name)}
                disabled={isLoading}
                className="px-3 py-1 bg-emerald-50/80 hover:bg-emerald-100/90 text-emerald-900 text-xs font-semibold rounded-full border border-emerald-200/60 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>{animal.emoji}</span>
                <span>{animal.name}</span>
              </button>
            ))}
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mt-2 pt-2 border-t border-emerald-50 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-emerald-700 font-semibold flex items-center gap-1 shrink-0">
                  <History className="w-3 h-3 text-emerald-600" />
                  Recent:
                </span>
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectTag(term)}
                    className="px-2.5 py-0.5 bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 rounded-md shrink-0 transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
              <button
                onClick={onClearHistory}
                className="text-stone-400 hover:text-rose-600 shrink-0 text-[11px] underline cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
