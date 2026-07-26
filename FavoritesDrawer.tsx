import React from 'react';
import { X, Trash2, ArrowRight, Bookmark } from 'lucide-react';
import { AnimalInfo } from '../types/animal';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: AnimalInfo[];
  onSelectFavorite: (animal: AnimalInfo) => void;
  onRemoveFavorite: (name: string) => void;
  onClearAll: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onSelectFavorite,
  onRemoveFavorite,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-emerald-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-emerald-100">
        <div className="p-5 bg-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-300 fill-amber-300" />
            <h2 className="text-lg font-bold">Saved Species ({favorites.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-emerald-800 rounded-lg text-emerald-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {favorites.length === 0 ? (
            <div className="text-center py-12 px-4 text-emerald-800/60">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="font-semibold text-emerald-900 text-sm">No saved species yet</p>
              <p className="text-xs mt-1 text-emerald-700/70">
                Click the "Save" bookmark button on any animal card to store it here for quick access.
              </p>
            </div>
          ) : (
            favorites.map((item) => (
              <div
                key={item.name}
                className="p-3.5 bg-emerald-50/60 hover:bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between gap-3 group transition-all"
              >
                <button
                  onClick={() => {
                    onSelectFavorite(item);
                    onClose();
                  }}
                  className="flex-1 text-left flex flex-col cursor-pointer"
                >
                  <span className="font-bold text-emerald-950 text-base group-hover:text-emerald-700 transition-colors">
                    {item.name}
                  </span>
                  {item.scientificName && (
                    <span className="text-xs text-emerald-700/80 italic font-serif">
                      {item.scientificName}
                    </span>
                  )}
                  <span className="text-[11px] text-emerald-800/60 mt-1 line-clamp-1">
                    {item.habitat}
                  </span>
                </button>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onSelectFavorite(item);
                      onClose();
                    }}
                    className="p-2 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                    title="View card"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFavorite(item.name)}
                    className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {favorites.length > 0 && (
          <div className="p-4 border-t border-emerald-100 bg-emerald-50/50 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold underline cursor-pointer"
            >
              Clear All Saved
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
