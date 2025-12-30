
import React from 'react';
import { SHOWCASE_STEPS } from '../constants';

const AnimatedShowcase: React.FC = () => {
  return (
    <section className="py-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-32 text-center">
          <span className="text-white/40 uppercase tracking-[0.6em] text-[10px] font-black mb-6 block">Le Geste Pur</span>
          <h2 className="text-6xl md:text-9xl serif text-white/20 select-none">Savoir-Faire</h2>
        </div>

        <div className="space-y-40">
          {SHOWCASE_STEPS.map((step, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-20`}>
              <div className="md:w-1/2 reveal">
                <div className="relative group">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full aspect-video md:aspect-[4/5] object-cover shadow-2xl transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute -inset-4 border border-white/10 -z-1 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000" />
                </div>
              </div>
              <div className="md:w-1/2 reveal delay-300">
                <div className="glass-panel p-12 md:p-16">
                  <span className="text-[#8B5E3C] serif italic text-4xl mb-6 block opacity-50">0{idx + 1}</span>
                  <h3 className="text-4xl md:text-5xl serif mb-8">{step.title}</h3>
                  <p className="text-gray-500 font-light text-lg leading-loose">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedShowcase;
