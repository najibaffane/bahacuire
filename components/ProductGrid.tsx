import React, { useState } from 'react';
import { Product, Category } from '../types';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
  categories: Category[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ onAddToCart, onBuyNow, onSelectProduct, products, categories }) => {
  const [filter, setFilter] = useState<string>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="pt-48 pb-48 max-w-[1400px] mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="mb-32 text-center reveal">
        <h2 className="text-7xl md:text-[10rem] pinyon text-white opacity-5 mb-8 select-none">Collection</h2>
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 text-[10px] font-black uppercase tracking-[0.5em]">
          <button 
            onClick={() => setFilter('all')}
            className={`transition-all hover:text-[#C9A66B] relative pb-2 ${filter === 'all' ? 'text-[#C9A66B]' : 'text-white/40'}`}
          >
            Tous les ouvrages
            {filter === 'all' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A66B] animate-in slide-in-from-left duration-500" />}
          </button>
          
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setFilter(cat.slug)}
              className={`transition-all hover:text-[#C9A66B] relative pb-2 ${filter === cat.slug ? 'text-[#C9A66B]' : 'text-white/40'}`}
            >
              {cat.name}
              {filter === cat.slug && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A66B] animate-in slide-in-from-left duration-500" />}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
        {filteredProducts.map((product, idx) => (
          <div 
            key={product.id} 
            style={{ animationDelay: `${idx * 100}ms` }}
            className="group relative bg-white/[0.01] border border-white/5 p-6 rounded-[2.5rem] transition-all duration-700 hover:bg-white/[0.03] hover:border-white/10 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
          >
            <div 
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-black/40 mb-8 cursor-pointer shadow-2xl"
              onClick={() => onSelectProduct(product)}
            >
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="bg-white/90 backdrop-blur-md px-10 py-4 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-black shadow-2xl">
                  Explorer l'ouvrage
                </span>
              </div>
            </div>
            
            <div className="px-4">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[9px] text-[#C9A66B] font-black uppercase tracking-[0.5em] mb-3">
                    {categories.find(c => c.slug === product.category)?.name || 'Artisanat'}
                  </p>
                  <h3 className="text-3xl serif font-light text-white group-hover:text-[#C9A66B] transition-colors">{product.name}</h3>
                </div>
                <p className="text-xl serif italic text-white/80">{product.price.toLocaleString()} DA</p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="flex-1 py-5 rounded-2xl border border-white/10 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/5 transition-all"
                >
                  {addedId === product.id ? '✓ Sélectionné' : 'Au Panier'}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onBuyNow(product); }}
                  className="flex-1 py-5 rounded-2xl bg-[#C9A66B] text-black text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl"
                >
                  Commander
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;