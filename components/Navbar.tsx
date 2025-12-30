import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full h-24 bg-white/[0.03] backdrop-blur-2xl border-b border-white/5 px-8 md:px-16 flex items-center justify-between shadow-2xl">
      <button 
        onClick={() => setView('home')}
        className="text-white flex flex-col items-start group transition-transform hover:scale-105"
      >
        <span className="text-3xl font-light pinyon group-hover:text-[#C9A66B] transition-colors leading-none">Baha</span>
        <span className="text-[8px] font-black uppercase tracking-[0.8em] text-[#C9A66B] -mt-1 pl-1">Cuir</span>
      </button>
      
      <div className="flex items-center space-x-12 md:space-x-20">
        <nav className="hidden md:flex items-center space-x-16">
          <button 
            onClick={() => setView('shop')}
            className={`text-[9px] font-black uppercase tracking-[0.5em] transition-all hover:text-[#C9A66B] ${
              currentView === 'shop' ? 'text-[#C9A66B]' : 'text-white/50'
            }`}
          >
            Collection
          </button>
          <button 
            onClick={() => setView('advisor')}
            className={`text-[9px] font-black uppercase tracking-[0.5em] transition-all hover:text-[#C9A66B] ${
              currentView === 'advisor' ? 'text-[#C9A66B]' : 'text-white/50'
            }`}
          >
            Conseils
          </button>
        </nav>
        
        <button 
          onClick={() => setView('checkout')}
          className="text-white relative p-2 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-[#C9A66B] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C9A66B] text-black text-[8px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-lg">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;