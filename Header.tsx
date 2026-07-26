import React from 'react';
import { Leaf, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({ favoritesCount, onOpenFavorites }) => {
  return (
    <header id="header-container" className="bg-emerald-900 text-emerald-50 pt-8 pb-12 px-4 sm:px-6 shadow-md relative overflow-hidden border-b border-emerald-800/80">
      {/* Background nature gradient & leaf motif decorative rings */}
      <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-emerald-800/40 blur-2xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-teal-800/30 blur-2xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-emerald-950 shadow-lg shadow-emerald-950/20 shrink-0">
            <Leaf className="w-7 h-7 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 id="app-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Animal Info Finder
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-800/90 text-emerald-200 border border-emerald-700">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Gemini AI
              </span>
            </div>
            <p className="text-emerald-200/90 text-sm mt-0.5">
              Discover habitats, diets, lifespans, and fascinating facts about any animal.
            </p>
          </div>
        </div>

        {favoritesCount > 0 && (
          <button
            id="open-favorites-btn"
            onClick={onOpenFavorites}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-800/80 hover:bg-emerald-700/90 text-emerald-100 rounded-xl text-sm font-semibold transition-all border border-emerald-700/80 shadow-sm shrink-0 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-300" />
            <span>Saved Species</span>
            <span className="bg-emerald-500 text-emerald-950 text-xs font-bold px-2 py-0.5 rounded-full">
              {favoritesCount}
            </span>
          </button>
        )}
      </div>
    </header>
  );
};
