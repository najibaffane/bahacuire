
import React from 'react';
import { BRAND_MOTTO } from '../constants';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        <div className="mb-8 reveal">
           <div className="relative">
              <h1 className="text-white text-8xl md:text-[14rem] pinyon leading-none drop-shadow-2xl">
                Baha
              </h1>
              <span className="text-[#C9A66B] text-2xl md:text-5xl font-light uppercase tracking-[0.8em] block -mt-4 drop-shadow-lg">
                Cuir
              </span>
           </div>
        </div>

        <div className="overflow-hidden mb-12 reveal delay-500">
          <p className="text-white/60 text-[10px] uppercase tracking-[0.8em] font-bold">
            Depuis 2020
          </p>
        </div>

        <div className="max-w-xl mb-16 reveal delay-700">
          <p className="text-white/90 text-lg md:text-2xl font-light italic leading-relaxed">
            "{BRAND_MOTTO}"
          </p>
        </div>

        <button 
          onClick={onExplore}
          className="group relative px-16 py-6 border border-[#C9A66B]/40 text-white uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-[#C9A66B] hover:text-black transition-all duration-700"
        >
          Découvrir la Collection
        </button>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-30">
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#C9A66B] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
