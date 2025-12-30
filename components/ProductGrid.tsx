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
    <div className="pt-48 pb-48 max-w-[1400px] mx-auto px-6 animate-fade-in">
      <div className="mb-32 text-center reveal active">
        <h2 className="text-8xl md:text-[12rem] pinyon text-white opacity-5 mb-8 select-none">L'Ouvrage</h2>
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 text-[10px] font-black uppercase tracking-[0.6em]">
          <button 
            onClick={() => setFilter('all')}
            className={`transition-all hover:text-[#C9A66B] relative pb-3 ${filter === 'all' ? 'text-[#C9A66B]' : 'text-white/30'}`}
          >
            Tous les modèles
            {filter === 'all' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A66B] animate-fade-in" />}
          </button>
          
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setFilter(cat.slug)}
              className={`transition-all hover:text-[#C9A66B] relative pb-3 ${filter === cat.slug ? 'text-[#C9A66B]' : 'text-white/30'}`}
            >
              {cat.name}
              {filter === cat.slug && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A66B] animate-fade-in" />}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 md:gap-28">
        {filteredProducts.map((product, idx) => (
          <div 
            key={product.id} 
            className="group relative bg-white/[0.01] border border-white/5 p-8 rounded-[3rem] transition-all duration-1000 hover:bg-white/[0.03] hover:border-white/10 animate-slide-up opacity-0 fill-mode-forwards"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div 
              className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] bg-black/40 mb-10 cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              onClick={() => onSelectProduct(product)}
            >
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s] ease-out"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                <span className="bg-white/95 backdrop-blur-md px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-black shadow-2xl">
                  Découvrir
                </span>
              </div>
            </div>
            
            <div className="px-2">
              <div className="flex justify-between items-baseline mb-10">
                <div className="max-w-[70%]">
                  <p className="text-[10px] text-[#C9A66B] font-black uppercase tracking-[0.6em] mb-4">
                    {categories.find(c => c.slug === product.category)?.name || 'Édition Limitée'}
                  </p>
                  <h3 className="text-4xl serif italic font-light text-white group-hover:text-[#C9A66B] transition-colors leading-tight">{product.name}</h3>
                </div>
                <p className="text-2xl serif italic text-white/70">{product.price.toLocaleString()} DA</p>
              </div>

              <div className="flex gap-6">
                <button 
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="flex-1 py-6 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-white hover:bg-white/5 transition-all"
                >
                  {addedId === product.id ? '✓ Enregistré' : 'Panier'}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onBuyNow(product); }}
                  className="flex-1 py-6 rounded-2xl bg-[#C9A66B] text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl"
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