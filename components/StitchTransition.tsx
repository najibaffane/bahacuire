
import React, { useEffect, useState } from 'react';

const StitchTransition: React.FC = () => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // On déclenche l'ouverture après que la couture soit terminée
    const timer = setTimeout(() => setIsExiting(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[300] pointer-events-none flex overflow-hidden">
      {/* Rideaux de cuir */}
      <div className={`absolute inset-y-0 left-0 w-1/2 bg-[#050404] border-r border-[#C9A66B]/10 panel-left ${isExiting ? 'exit' : ''}`}>
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/leather.png')" }}></div>
      </div>
      <div className={`absolute inset-y-0 right-0 w-1/2 bg-[#050404] border-l border-[#C9A66B]/10 panel-right ${isExiting ? 'exit' : ''}`}>
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/leather.png')" }}></div>
      </div>

      {/* Monogramme Central */}
      <div className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col items-center">
            <span className="pinyon text-6xl text-[#C9A66B]/40">BC</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-[#C9A66B]/40 to-transparent mt-4"></div>
        </div>
      </div>

      {/* Couture Verticale de Verrouillage */}
      <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 z-20 flex items-center justify-center transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <svg className="h-full w-full overflow-visible" viewBox="0 0 10 100" preserveAspectRatio="none">
          <path 
            d="M 5,0 L 5,100" 
            fill="none" 
            stroke="#C9A66B" 
            strokeWidth="0.1" 
            strokeDasharray="1.5, 0.8"
            className="stitch-line-vertical"
          />
          <path 
            d="M 5,0 L 5,100" 
            fill="none" 
            stroke="#C9A66B" 
            strokeWidth="0.3" 
            strokeDasharray="1.5, 0.8"
            className="stitch-line-vertical opacity-20 blur-[1px]"
          />
        </svg>
      </div>
    </div>
  );
};

export default StitchTransition;
