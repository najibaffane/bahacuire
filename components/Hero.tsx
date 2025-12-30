import React from 'react';
import { BRAND_MOTTO } from '../constants';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between py-24 md:py-32">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#C9A66B]/5 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-white/5 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl my-auto">
        
        {/* Partie Haut - Espacement ajustable */}
        <div className="mb-20 md:mb-28 animate-slide-up delay-200 opacity-0 fill-mode-forwards">
          <span className="text-[#C9A66B] text-[9px] md:text-[10px] font-black uppercase tracking-[1.2em] md:tracking-[1.5em] opacity-90">
            Artisanat d'Excellence — Jijel
          </span>
          <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B]/50 to-transparent mx-auto mt-5" />
        </div>

        {/* Titre Central - Équilibré pour mobile */}
        <div className="mb-16 md:mb-20 animate-zoom-in delay-500 opacity-0 fill-mode-forwards">
           <div className="relative">
              <h1 className="text-white text-7xl md:text-[12rem] pinyon leading-[0.6] md:leading-[0.5] drop-shadow-2xl select-none">
                Baha
              </h1>
              <span className="text-[#C9A66B] text-lg md:text-7xl font-light uppercase tracking-[0.8em] md:tracking-[1.1em] block mt-6 md:mt-10 drop-shadow-lg select-none pl-[0.8em] md:pl-[1.1em]">
                Cuir
              </span>
           </div>
        </div>

        {/* Partie Bas - Devise */}
        <div className="space-y-10 md:space-y-12 animate-slide-up delay-700 opacity-0 fill-mode-forwards">
          <div className="flex flex-col items-center">
            <p className="text-white/30 text-[8px] md:text-[9px] uppercase tracking-[0.6em] md:tracking-[0.8em] font-bold mb-6">
              Maison Fondée en 2020
            </p>
            <div className="max-w-2xl px-4">
              <p className="text-white/80 text-lg md:text-3xl font-light serif italic leading-relaxed tracking-wide">
                "{BRAND_MOTTO}"
              </p>
            </div>
          </div>

          <button 
            onClick={onExplore}
            className="group relative px-16 md:px-24 py-6 md:py-8 overflow-hidden rounded-full border border-[#C9A66B]/30 text-white uppercase tracking-[0.4em] md:tracking-[0.5em] text-[9px] md:text-[10px] font-black transition-all duration-700 hover:border-[#C9A66B] shadow-2xl"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">Explorer la Collection</span>
            <div className="absolute inset-0 bg-[#C9A66B] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </button>
        </div>
      </div>

      {/* Signature Fait Main */}
      <div className="relative z-10 flex flex-col items-center space-y-4 md:space-y-5 opacity-40 mt-12 md:mt-0 pb-8 md:pb-0">
        <div className="flex items-center gap-6 md:gap-8">
          <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C9A66B]/50" />
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.8em] md:tracking-[1em] text-[#C9A66B] font-black pl-[0.8em] md:pl-[1em]">Fait Main</span>
          <div className="w-12 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C9A66B]/50" />
        </div>
        <div className="w-[1px] h-16 md:h-20 bg-gradient-to-b from-[#C9A66B]/60 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;