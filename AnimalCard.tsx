import React, { useState } from 'react';
import {
  Trees,
  Utensils,
  Clock,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Share2,
  Check,
  Volume2,
  VolumeX,
  ShieldCheck,
  Info,
  Leaf
} from 'lucide-react';
import { AnimalInfo } from '../types/animal';

interface AnimalCardProps {
  animal: AnimalInfo;
  isFavorite: boolean;
  onToggleFavorite: (animal: AnimalInfo) => void;
  noticeMessage?: string;
  isAiGenerated?: boolean;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({
  animal,
  isFavorite,
  onToggleFavorite,
  noticeMessage,
  isAiGenerated,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = () => {
    const text = `
🐾 ${animal.name} (${animal.scientificName || 'Wildlife Species'})
------------------------------------------
🏷️ Category: ${animal.category || 'Animal'}
🌿 Habitat: ${animal.habitat}
🌾 Diet: ${animal.diet}
⏳ Lifespan: ${animal.lifespan}
🛡️ Status: ${animal.conservationStatus || 'Protected'}

✨ Interesting Facts:
${animal.facts.map((f, i) => `${i + 1}. ${f}`).join('\n')}

Discovered via Animal Info Finder
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const speakText = `${animal.name}. ${animal.funTagline || ''}. Habitat: ${animal.habitat}. Diet: ${animal.diet}. Lifespan: ${animal.lifespan}. Facts: ${animal.facts.join('. ')}`;
      const utterance = new SpeechSynthesisUtterance(speakText);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Select accent color for status badge
  const getStatusBadgeColor = (status?: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('endangered') || s.includes('critical')) {
      return 'bg-amber-100 text-amber-900 border-amber-300';
    }
    if (s.includes('vulnerable')) {
      return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    }
    return 'bg-teal-50 text-teal-800 border-teal-200';
  };

  return (
    <div id="animal-detail-card" className="max-w-4xl mx-auto px-4 sm:px-6 my-8">
      {noticeMessage && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs sm:text-sm flex items-start gap-2 shadow-sm">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{noticeMessage}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl shadow-emerald-950/10 border border-emerald-100 overflow-hidden transition-all">
        {/* Top Banner Card Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 rounded-full bg-emerald-500/10 pointer-events-none blur-xl" />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {animal.category && (
                  <span className="px-3 py-1 bg-emerald-800/90 text-emerald-200 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-700">
                    {animal.category}
                  </span>
                )}
                {animal.conservationStatus && (
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeColor(animal.conservationStatus)}`}>
                    🛡️ {animal.conservationStatus}
                  </span>
                )}
                {isAiGenerated && (
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs font-medium rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" /> Live AI
                  </span>
                )}
              </div>

              <h2 id="animal-name-title" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {animal.name}
              </h2>

              {animal.scientificName && (
                <p className="text-emerald-200/90 text-base font-serif italic mt-0.5">
                  {animal.scientificName}
                </p>
              )}

              {animal.funTagline && (
                <p className="mt-3 text-emerald-100/95 text-sm sm:text-base font-medium flex items-center gap-2 bg-emerald-950/40 px-3.5 py-2 rounded-xl border border-emerald-700/50 max-w-xl">
                  <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>"{animal.funTagline}"</span>
                </p>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
              <button
                id="toggle-speech-btn"
                onClick={handleToggleSpeech}
                className={`p-2.5 rounded-xl border text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSpeaking
                    ? 'bg-emerald-500 text-emerald-950 border-emerald-400 animate-pulse'
                    : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border-emerald-700/80'
                }`}
                title={isSpeaking ? 'Stop speech' : 'Listen to details'}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden md:inline">{isSpeaking ? 'Listening' : 'Listen'}</span>
              </button>

              <button
                id="copy-animal-info-btn"
                onClick={handleCopy}
                className="p-2.5 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 rounded-xl border border-emerald-700/80 text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Copy animal details"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
                <span className="hidden md:inline">{copied ? 'Copied!' : 'Share'}</span>
              </button>

              <button
                id="toggle-favorite-btn"
                onClick={() => onToggleFavorite(animal)}
                className={`p-2.5 rounded-xl border text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isFavorite
                    ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-md'
                    : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border-emerald-700/80'
                }`}
                title={isFavorite ? 'Remove from saved' : 'Save species'}
              >
                {isFavorite ? (
                  <BookmarkCheck className="w-4 h-4 fill-amber-950 text-amber-950" />
                ) : (
                  <Bookmark className="w-4 h-4 text-emerald-200" />
                )}
                <span className="hidden md:inline">{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Core Attributes Grid */}
        <div className="p-6 sm:p-8 space-y-8">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-800/80 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Core Species Characteristics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Habitat Card */}
              <div id="habitat-card" className="bg-emerald-50/60 hover:bg-emerald-50 rounded-2xl p-5 border border-emerald-100 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <Trees className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800/90 mb-1">
                  Habitat & Environment
                </h4>
                <p className="text-emerald-950 font-medium text-sm sm:text-base leading-relaxed">
                  {animal.habitat}
                </p>
              </div>

              {/* Diet Card */}
              <div id="diet-card" className="bg-emerald-50/60 hover:bg-emerald-50 rounded-2xl p-5 border border-emerald-100 transition-all">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                  <Utensils className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800/90 mb-1">
                  Diet & Feeding
                </h4>
                <p className="text-emerald-950 font-medium text-sm sm:text-base leading-relaxed">
                  {animal.diet}
                </p>
              </div>

              {/* Lifespan Card */}
              <div id="lifespan-card" className="bg-emerald-50/60 hover:bg-emerald-50 rounded-2xl p-5 border border-emerald-100 transition-all">
                <div className="w-10 h-10 rounded-xl bg-lime-100 text-lime-900 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-lime-900/90 mb-1">
                  Average Lifespan
                </h4>
                <p className="text-emerald-950 font-medium text-sm sm:text-base leading-relaxed">
                  {animal.lifespan}
                </p>
              </div>
            </div>
          </div>

          {/* Interesting Facts Section */}
          <div id="interesting-facts-section" className="bg-gradient-to-br from-emerald-900/5 via-teal-900/5 to-emerald-800/10 rounded-2xl p-6 border border-emerald-200/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Interesting Facts ({animal.facts.length})</span>
              </h3>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-100 px-2.5 py-1 rounded-full">
                Wildlife Insights
              </span>
            </div>

            <div className="space-y-3.5">
              {animal.facts.map((fact, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 border border-emerald-100/90 shadow-sm flex items-start gap-3.5 hover:border-emerald-300 transition-all"
                >
                  <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    0{index + 1}
                  </span>
                  <p className="text-emerald-950 text-sm sm:text-base leading-relaxed font-normal">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
