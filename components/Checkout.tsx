
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
      <div className="pt-40 pb-20 max-w-7xl mx-auto px-6 text-center page-fade">
        <h2 className="text-4xl serif mb-8">Votre panier est vide</h2>
        <p className="text-gray-500 mb-12 italic">Le cuir attend votre histoire...</p>
        <button onClick={onBackToShop} className="text-[#C9A66B] uppercase tracking-[0.4em] text-[10px] font-bold">Retour aux collections</button>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="pt-48 pb-20 max-w-xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-24 h-24 bg-[#C9A66B]/10 text-[#C9A66B] rounded-full flex items-center justify-center mx-auto mb-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-5xl serif mb-8 text-gray-900">Commande reçue</h2>
        <p className="text-gray-600 mb-12 leading-relaxed italic text-lg">
          Merci pour votre confiance. En tant qu'atelier artisanal, nous préparons chaque pièce avec soin. 
          Nous vous contacterons par téléphone pour confirmer la livraison. 
          <br/><span className="font-bold text-black mt-4 block">Paiement à la livraison.</span>
        </p>
        <button 
          onClick={onBackToShop}
          className="bg-black text-white px-16 py-6 uppercase tracking-[0.4em] text-[10px] font-black hover:bg-[#8B5E3C] transition-all shadow-xl"
        >
          Retour à la boutique
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40 max-w-7xl mx-auto px-6 page-fade">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-5xl serif mb-16">Récapitulatif de l'ouvrage</h2>
          <div className="space-y-10 mb-12">
            {cart.map((item) => (
              <div key={item.id} className="flex space-x-8 pb-10 border-b border-gray-100 items-center">
                <img src={item.images[0]} alt={item.name} className="w-24 h-32 object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="serif text-2xl font-medium">{item.name}</h3>
                    <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest">Quantité: {item.quantity}</p>
                    <p className="serif text-xl italic">{item.price.toLocaleString()} DA</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center py-8 border-t-2 border-black">
            <span className="text-3xl serif uppercase tracking-widest">Total</span>
            <span className="text-4xl serif italic text-[#8B5E3C]">{total.toLocaleString()} DA</span>
          </div>
          <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-[0.3em] italic">Livraison gratuite partout en Algérie</p>
        </div>

        <div className="bg-white p-12 md:p-20 shadow-2xl border border-gray-50">
          <form onSubmit={handleSubmit} className="space-y-8">
            <h3 className="text-3xl serif mb-10">Détails de Livraison</h3>
            <div className="space-y-6">
              <div className="group">
                <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2 transition-colors group-focus-within:text-[#8B5E3C]">Nom complet</label>
                <input required type="text" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#8B5E3C] transition-colors bg-transparent" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2 transition-colors group-focus-within:text-[#8B5E3C]">Numéro de téléphone</label>
                  <input required type="tel" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#8B5E3C] transition-colors bg-transparent" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="group">
                  <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2 transition-colors group-focus-within:text-[#8B5E3C]">Email</label>
                  <input required type="email" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#8B5E3C] transition-colors bg-transparent" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="group">
                <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2 transition-colors group-focus-within:text-[#8B5E3C]">Adresse complète (Wilaya, Commune, Rue)</label>
                <textarea required rows={3} className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#8B5E3C] transition-colors bg-transparent resize-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
            </div>
            <div className="pt-10">
              <button type="submit" className="w-full bg-[#8B5E3C] text-white py-6 uppercase tracking-[0.5em] text-[10px] font-black hover:bg-black transition-all shadow-xl">
                Confirmer la commande — {total.toLocaleString()} DA
              </button>
              <p className="text-[9px] text-gray-400 text-center mt-6 uppercase tracking-widest italic font-bold">Paiement CASH à la réception</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
