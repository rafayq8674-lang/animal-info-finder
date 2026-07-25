import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { AnimalCard } from './components/AnimalCard';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { AnimalInfo } from './types/animal';
import { PRESET_ANIMALS } from './data/presetAnimals';
import { fetchAnimalInfoFromGemini } from './services/geminiService';
import { Leaf, AlertCircle, Compass, Sparkles } from 'lucide-react';

export default function App() {
  const [currentAnimal, setCurrentAnimal] = useState<AnimalInfo | null>(() => {
    return PRESET_ANIMALS[1]; // Default to Red Panda
  });
  const [isLoading, setIsLoading] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState<string | undefined>(
    'Loaded verified entry from nature library. Try typing any animal in the search bar above!'
  );
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);

  // Persistence in localStorage
  const [favorites, setFavorites] = useState<AnimalInfo[]>(() => {
    try {
      const saved = localStorage.getItem('animal_finder_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('animal_finder_recents');
      return saved ? JSON.parse(saved) : ['Red Panda', 'African Elephant', 'Bottlenose Dolphin'];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('animal_finder_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Could not save favorites', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('animal_finder_recents', JSON.stringify(recentSearches));
    } catch (e) {
      console.warn('Could not save recents', e);
    }
  }, [recentSearches]);

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;

    setIsLoading(true);
    setNoticeMessage(undefined);

    // Save to recents
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== term.toLowerCase());
      return [term, ...filtered].slice(0, 6);
    });

    const result = await fetchAnimalInfoFromGemini(term);
    setCurrentAnimal(result.data);
    setIsAiGenerated(result.isAiGenerated);
    setNoticeMessage(result.message);
    setIsLoading(false);
  };

  const handleToggleFavorite = (animal: AnimalInfo) => {
    setFavorites((prev) => {
      const exists = prev.some((a) => a.name.toLowerCase() === animal.name.toLowerCase());
      if (exists) {
        return prev.filter((a) => a.name.toLowerCase() !== animal.name.toLowerCase());
      } else {
        return [animal, ...prev];
      }
    });
  };

  const isCurrentFavorite = currentAnimal
    ? favorites.some((a) => a.name.toLowerCase() === currentAnimal.name.toLowerCase())
    : false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-stone-50 to-emerald-100/30 font-sans text-emerald-950 flex flex-col antialiased">
      <Header
        favoritesCount={favorites.length}
        onOpenFavorites={() => setFavoritesDrawerOpen(true)}
      />

      <main className="flex-1 pb-16">
        <SearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
          recentSearches={recentSearches}
          onClearHistory={() => setRecentSearches([])}
        />

        {isLoading ? (
          <div className="max-w-4xl mx-auto px-4 my-16 text-center">
            <div className="bg-white rounded-3xl p-12 shadow-lg border border-emerald-100 max-w-lg mx-auto flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 relative">
                <Leaf className="w-8 h-8 animate-bounce" />
                <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-extrabold text-emerald-950">Exploring Nature's Archives...</h3>
              <p className="text-sm text-emerald-700 mt-1 max-w-xs">
                Gathering habitat, diet, lifespan, and interesting facts with Gemini AI.
              </p>
            </div>
          </div>
        ) : currentAnimal ? (
          <AnimalCard
            animal={currentAnimal}
            isFavorite={isCurrentFavorite}
            onToggleFavorite={handleToggleFavorite}
            noticeMessage={noticeMessage}
            isAiGenerated={isAiGenerated}
          />
        ) : (
          <div className="max-w-xl mx-auto px-4 my-16 text-center">
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-emerald-100">
              <Compass className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-emerald-950">Search Any Animal</h3>
              <p className="text-sm text-emerald-700/80 mt-1">
                Type an animal name above or choose one from the popular species tags to begin.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-300/80 py-8 px-4 border-t border-emerald-900 text-xs text-center mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              🌿
            </div>
            <span className="font-semibold text-emerald-200">Animal Info Finder</span>
          </div>
          <p className="text-emerald-400/80 flex items-center justify-center gap-1">
            <span>Powered by</span>
            <span className="font-bold text-emerald-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" /> Gemini AI
            </span>
          </p>
          <p className="text-emerald-400/60">
            Natural Wildlife Encyclopedia
          </p>
        </div>
      </footer>

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={favoritesDrawerOpen}
        onClose={() => setFavoritesDrawerOpen(false)}
        favorites={favorites}
        onSelectFavorite={(animal) => {
          setCurrentAnimal(animal);
          setNoticeMessage('Loaded from your saved species.');
        }}
        onRemoveFavorite={(name) => {
          setFavorites((prev) => prev.filter((a) => a.name.toLowerCase() !== name.toLowerCase()));
        }}
        onClearAll={() => setFavorites([])}
      />
    </div>
  );
}
