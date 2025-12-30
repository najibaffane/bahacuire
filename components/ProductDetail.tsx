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
    <div className="min-h-screen pt-32 pb-40 px-6 animate-in fade-in duration-700 text-white">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-16 flex items-center gap-6 text-white/30 hover:text-[#C9A66B] transition-all group"
        >
          <div className="w-8 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-[#C9A66B] transition-all" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Retour à la Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-start">
          <div className="space-y-8 animate-in slide-in-from-left-8 duration-1000">
            <div className="relative overflow-hidden rounded-[3rem] shadow-2xl aspect-[4/5] bg-white/[0.02] border border-white/5">
              <img 
                src={product.images[activeImg]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImg(idx)}
                    className={`w-24 h-28 rounded-2xl overflow-hidden border-2 transition-all ${activeImg === idx ? 'border-[#C9A66B] scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="animate-in slide-in-from-right-8 duration-1000 delay-200">
            <span className="text-[#C9A66B] text-[10px] font-black uppercase tracking-[0.6em] mb-6 block">Pièce Maîtresse</span>
            <h2 className="text-6xl md:text-8xl serif mb-12 leading-tight">{product.name}</h2>
            
            <p className="text-white/50 font-light text-xl italic mb-16 leading-relaxed border-l border-[#C9A66B]/30 pl-8">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-8 mb-16">
              <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-3">Réalisation</h4>
                <p className="text-lg serif text-[#C9A66B]">{product.realizationTime}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-3">Expédition</h4>
                <p className="text-lg serif text-[#C9A66B]">{product.waitingTime}</p>
              </div>
            </div>

            <div className="flex flex-col gap-10 pt-10 border-t border-white/5">
               <div className="flex justify-between items-baseline">
                  <span className="text-5xl serif italic font-light">{product.price.toLocaleString()} DA</span>
                  {isAdded && (
                    <span className="text-[10px] font-bold text-[#C9A66B] uppercase tracking-widest animate-pulse">
                      Sélectionné
                    </span>
                  )}
               </div>
               
               <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl text-white py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all"
                  >
                    Ajouter au panier
                  </button>
                  <button 
                    onClick={() => onBuyNow(product)}
                    className="flex-1 bg-[#C9A66B] rounded-2xl text-black py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl"
                  >
                    Finaliser la commande
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