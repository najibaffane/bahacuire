
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
    <div className="pt-48 pb-48 max-w-[1400px] mx-auto px-6 page-fade">
      <div className="mb-32 text-center reveal">
        <h2 className="text-7xl md:text-[10rem] pinyon text-white opacity-20 mb-8 select-none">Collection</h2>
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 text-[10px] font-black uppercase tracking-[0.5em]">
          <button 
            onClick={() => setFilter('all')}
            className={`transition-all hover:text-[#C9A66B] relative pb-2 ${filter === 'all' ? 'text-[#C9A66B]' : 'text-white/40'}`}
          >
            Archive
            {filter === 'all' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A66B]" />}
          </button>
          
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setFilter(cat.slug)}
              className={`transition-all hover:text-[#C9A66B] relative pb-2 ${filter === cat.slug ? 'text-[#C9A66B]' : 'text-white/40'}`}
            >
              {cat.name}
              {filter === cat.slug && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A66B]" />}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="group glass-card overflow-hidden p-8 transition-all duration-1000 hover:-translate-y-4"
          >
            <div 
              className="relative aspect-[4/5] overflow-hidden bg-black/40 mb-10 cursor-pointer shadow-lg"
              onClick={() => onSelectProduct(product)}
            >
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] grayscale-[30%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="bg-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.4em] text-black shadow-2xl">Détails de l'ouvrage</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end border-b border-white/5 pb-8">
              <div className="space-y-4">
                <h3 className="text-3xl serif font-light text-white tracking-wide">{product.name}</h3>
                <p className="text-[10px] text-[#C9A66B] font-bold uppercase tracking-[0.5em]">
                  {categories.find(c => c.slug === product.category)?.name || product.category}
                </p>
              </div>
              <div className="text-right flex flex-col items-end">
                 <p className="text-2xl serif italic text-white/90 mb-6">{product.price.toLocaleString()} DA</p>
                 <div className="flex gap-6 items-center">
                    <button 
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors flex items-center gap-2"
                    >
                      {addedId === product.id ? '✓ Ajouté' : 'Panier'}
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onBuyNow(product); }}
                      className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A66B] hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-sm"
                    >
                      Commander
                    </button>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
