
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBuyNow, onBack }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <div className="min-h-screen pt-32 pb-40 px-6 page-fade bg-[#FDFBF7] text-black">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-16 flex items-center gap-6 text-gray-400 hover:text-black transition-all group"
        >
          <div className="w-8 h-[1px] bg-gray-200 group-hover:w-16 group-hover:bg-[#C9A66B] transition-all" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Retour aux Collections</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          <div className="reveal space-y-6">
            <div className="relative group overflow-hidden shadow-2xl aspect-[4/5]">
              <img 
                src={product.images[activeImg]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-[2s]"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImg(idx)}
                    className={`w-20 h-24 border ${activeImg === idx ? 'border-[#C9A66B] opacity-100' : 'border-gray-200 opacity-50'} transition-all`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="reveal delay-300">
            <span className="text-[#8B5E3C] text-[10px] font-black uppercase tracking-[0.6em] mb-6 block">Artisanat d'Exception</span>
            <h2 className="text-6xl md:text-8xl serif mb-12 leading-none">{product.name}</h2>
            
            <p className="text-gray-500 font-light text-xl italic mb-16 leading-relaxed border-l-4 border-[#C9A66B] pl-10">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-12 mb-20 bg-gray-50 p-8">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4">Fabrication</h4>
                <p className="text-lg font-medium serif">{product.realizationTime}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4">Attente</h4>
                <p className="text-lg font-medium serif">{product.waitingTime}</p>
              </div>
            </div>

            <div className="flex flex-col gap-8 pt-12 border-t border-gray-100">
               <div className="flex justify-between items-center">
                  <span className="text-5xl serif italic">{product.price.toLocaleString()} DA</span>
                  {isAdded && (
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest animate-bounce">
                      Ajouté au panier !
                    </span>
                  )}
               </div>
               
               <div className="flex flex-col md:flex-row gap-4 w-full">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 border border-black text-black px-10 py-6 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-black hover:text-white transition-all"
                  >
                    Ajouter au panier
                  </button>
                  <button 
                    onClick={() => onBuyNow(product)}
                    className="flex-1 bg-[#8B5E3C] text-white px-10 py-6 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-black transition-all shadow-2xl"
                  >
                    Acheter maintenant
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
