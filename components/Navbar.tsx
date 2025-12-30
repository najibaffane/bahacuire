
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/20 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <button 
          onClick={() => setView('home')}
          className="text-white flex flex-col items-center group"
        >
          <span className="text-2xl font-light serif italic tracking-tighter group-hover:text-[#C9A66B] transition-colors leading-none">Baha</span>
          <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-[#C9A66B] -mt-1">Cuir</span>
        </button>
        
        <div className="flex items-center space-x-12">
          <button 
            onClick={() => setView('shop')}
            className={`text-[9px] font-bold uppercase tracking-[0.4em] transition-all hover:text-[#C9A66B] ${
              currentView === 'shop' ? 'text-[#C9A66B]' : 'text-white/70'
            }`}
          >
            Collections
          </button>
          <button 
            onClick={() => setView('advisor')}
            className={`text-[9px] font-bold uppercase tracking-[0.4em] transition-all hover:text-[#C9A66B] ${
              currentView === 'advisor' ? 'text-[#C9A66B]' : 'text-white/70'
            }`}
          >
            Conseils
          </button>
          
          <button 
            onClick={() => setView('checkout')}
            className="text-white relative p-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:text-[#C9A66B] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C9A66B] text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
