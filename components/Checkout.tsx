import React, { useState } from 'react';
import { CartItem, Order } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onComplete: (orderData: Omit<Order, 'id' | 'status' | 'date'>) => void;
  onBackToShop: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onRemove, onComplete, onBackToShop }) => {
  const [step, setStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      items: cart,
      total,
      notes: formData.notes
    });
    setStep('success');
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="pt-60 pb-20 max-w-7xl mx-auto px-6 text-center animate-in fade-in duration-1000">
        <h2 className="text-6xl serif mb-8">L'Atelier est prêt.</h2>
        <p className="text-white/40 mb-12 italic text-lg font-light">Votre sélection est actuellement vide. Laissez-vous inspirer par nos créations.</p>
        <button 
          onClick={onBackToShop} 
          className="text-[#C9A66B] uppercase tracking-[0.5em] text-[10px] font-black border-b border-[#C9A66B]/30 pb-2 hover:border-[#C9A66B] transition-all"
        >
          Explorer la Collection
        </button>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="pt-60 pb-20 max-w-xl mx-auto px-6 text-center animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-[#C9A66B]/10 text-[#C9A66B] rounded-full flex items-center justify-center mx-auto mb-10 border border-[#C9A66B]/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-6xl serif mb-8 text-white">Merci pour votre confiance</h2>
        <p className="text-white/50 mb-12 leading-relaxed italic text-lg font-light">
          Votre commande a été transmise à l'artisan. Nous vous contacterons par téléphone sous 24h pour valider les derniers détails de votre pièce.
        </p>
        <button 
          onClick={onBackToShop}
          className="bg-white text-black px-16 py-6 rounded-2xl uppercase tracking-[0.4em] text-[10px] font-black hover:bg-[#C9A66B] transition-all shadow-2xl"
        >
          Retour au site
        </button>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-40 max-w-7xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 md:gap-32">
        <div className="space-y-12">
          <h2 className="text-5xl serif mb-16">Votre Sélection</h2>
          <div className="space-y-10">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-8 pb-10 border-b border-white/5 items-center animate-in fade-in duration-500">
                <img src={item.images[0]} alt={item.name} className="w-24 h-32 object-cover rounded-[1.5rem] shadow-xl" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="serif text-2xl text-white font-light">{item.name}</h3>
                    <button onClick={() => onRemove(item.id)} className="text-white/20 hover:text-red-400 transition-colors p-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-white/20 text-[9px] uppercase tracking-widest font-black italic">Haut de gamme x{item.quantity}</p>
                    <p className="serif text-2xl italic text-[#C9A66B]">{item.price.toLocaleString()} DA</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-10 flex justify-between items-center border-t-2 border-[#C9A66B]/10">
            <span className="text-2xl serif text-white/40 uppercase tracking-widest">Estimation Totale</span>
            <span className="text-5xl serif italic text-white">{total.toLocaleString()} DA</span>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] flex items-center gap-6">
             <div className="w-12 h-12 bg-[#C9A66B]/10 rounded-full flex items-center justify-center text-[#C9A66B]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7"/></svg>
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Livraison Gratuite & Paiement à la réception</p>
          </div>
        </div>

        <div className="bg-white/[0.03] p-12 md:p-16 rounded-[3rem] border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.4)] animate-in slide-in-from-right-8 duration-1000 delay-300">
          <form onSubmit={handleSubmit} className="space-y-12">
            <h3 className="text-4xl serif mb-10 text-[#C9A66B] italic">Carnet de Commande</h3>
            <div className="space-y-10">
              <div className="group">
                <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-3 transition-colors group-focus-within:text-[#C9A66B]">Nom complet</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#C9A66B] transition-all text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group">
                  <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-3 transition-colors group-focus-within:text-[#C9A66B]">Numéro de téléphone</label>
                  <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#C9A66B] transition-all text-white" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="group">
                  <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-3 transition-colors group-focus-within:text-[#C9A66B]">Email</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#C9A66B] transition-all text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="group">
                <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-3 transition-colors group-focus-within:text-[#C9A66B]">Adresse de livraison détaillée</label>
                <textarea required rows={3} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-[#C9A66B] transition-all text-white resize-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
            </div>
            <div className="pt-10">
              <button type="submit" className="w-full bg-[#C9A66B] text-black py-7 rounded-2xl uppercase tracking-[0.5em] text-[11px] font-black hover:bg-white transition-all shadow-2xl">
                Confirmer mon Ouvrage
              </button>
              <p className="text-center mt-8 text-[8px] text-white/30 uppercase tracking-[0.4em] font-black">L'artisan vous contactera sous peu.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;