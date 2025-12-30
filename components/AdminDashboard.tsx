
import React, { useState } from 'react';
import { Product, Order, OrderStatus, Category } from '../types';
import { supabase } from '../services/supabase';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  categories: Category[];
  onAddProduct: (p: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (id: string, status: OrderStatus) => void;
  onAddCategory: (name: string) => void;
  onDeleteCategory: (id: string) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, 
  orders, 
  categories,
  onAddProduct, 
  onDeleteProduct, 
  onUpdateOrderStatus,
  onAddCategory,
  onDeleteCategory,
  onLogout 
}) => {
  const [tab, setTab] = useState<'orders' | 'products' | 'categories' | 'stats'>('orders');
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newP, setNewP] = useState<Omit<Product, 'id'>>({
    name: '', category: categories[0]?.slug || '', price: 0, description: '', images: [], 
    details: [], realizationTime: '', waitingTime: ''
  });

  const totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((acc, o) => acc + o.total, 0);

  const pendingCount = orders.filter(o => o.status === 'pending').length;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 4) as File[];
      const promises = files.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then(base64Images => {
        setNewP(prev => ({ ...prev, images: base64Images }));
      });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-40 px-6 bg-stone-950 text-white page-fade">
      <div className="max-w-[1400px] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <span className="text-[#C9A66B] text-[10px] font-black uppercase tracking-[0.5em] mb-3 block">Dashboard Artisan</span>
            <h1 className="text-5xl serif italic">L'Atelier Baha</h1>
          </div>
          <div className="flex gap-4">
             <button onClick={onLogout} className="px-8 py-3 border border-white/10 text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">Déconnexion</button>
          </div>
        </header>

        <div className="flex flex-wrap gap-8 md:gap-12 border-b border-white/5 mb-12">
          {[
            { id: 'orders', label: `Commandes (${pendingCount})` },
            { id: 'products', label: 'Collection' },
            { id: 'categories', label: 'Catégories' },
            { id: 'stats', label: 'Finances' }
          ].map(t => (
            <button 
              key={t.id} 
              onClick={() => setTab(t.id as any)}
              className={`pb-4 text-[10px] font-black uppercase tracking-[0.4em] transition-all relative ${tab === t.id ? 'text-[#C9A66B]' : 'text-white/40'}`}
            >
              {t.label}
              {tab === t.id && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A66B]" />}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="py-20 text-center glass-card border-dashed">
                <p className="text-white/30 italic">Aucune commande reçue via le site pour le moment.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[9px] uppercase tracking-widest text-white/30 border-b border-white/5">
                      <th className="py-6 px-4">ID & Date</th>
                      <th className="py-6 px-4">Client (Algérie)</th>
                      <th className="py-6 px-4">Panier</th>
                      <th className="py-6 px-4">Total</th>
                      <th className="py-6 px-4">Statut</th>
                      <th className="py-6 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {orders.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(order => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                        <td className="py-6 px-4">
                          <div className="text-[#C9A66B] font-mono text-[10px]">{order.id}</div>
                          <div className="opacity-30 text-[9px]">{new Date(order.date).toLocaleString()}</div>
                        </td>
                        <td className="py-6 px-4">
                          <div className="font-bold text-base">{order.customerName}</div>
                          <div className="text-[#C9A66B] font-bold">{order.phone}</div>
                          <div className="text-[10px] opacity-50 max-w-xs">{order.address}</div>
                        </td>
                        <td className="py-6 px-4">
                          {order.items.map(i => (
                            <div key={i.id} className="text-[10px]">
                              {i.quantity}x {i.name}
                            </div>
                          ))}
                        </td>
                        <td className="py-6 px-4 font-serif text-lg">{order.total.toLocaleString()} DA</td>
                        <td className="py-6 px-4">
                          <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full ${
                            order.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
                            order.status === 'confirmed' ? 'bg-blue-500/20 text-blue-400' :
                            order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-6 px-4 text-right">
                          <select 
                            value={order.status} 
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="bg-stone-900 border border-white/10 text-[9px] p-2 outline-none focus:border-[#C9A66B] rounded"
                          >
                            <option value="pending">En attente</option>
                            <option value="confirmed">Confirmer</option>
                            <option value="shipped">Expédiée</option>
                            <option value="delivered">Livrée</option>
                            <option value="cancelled">Annulée</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-12">
               <h3 className="serif text-3xl italic">Le Catalogue de l'Atelier</h3>
               <button 
                onClick={() => setIsAdding(!isAdding)}
                className="bg-[#C9A66B] text-black px-10 py-4 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg"
               >
                 {isAdding ? 'Annuler' : 'Ajouter une pièce'}
               </button>
            </div>

            {isAdding && (
              <div className="glass-card p-12 mb-20 border-[#C9A66B]/30 animate-in fade-in slide-in-from-top-4 duration-500">
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  onAddProduct(newP); 
                  setIsAdding(false);
                  setNewP({ name: '', category: categories[0]?.slug || '', price: 0, description: '', images: [], details: [], realizationTime: '', waitingTime: '' });
                }} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-white/40">Nom de la pièce</label>
                      <input required placeholder="Nom" className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-[#C9A66B]" value={newP.name} onChange={e => setNewP({...newP, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-white/40">Prix (DA)</label>
                      <input required type="number" placeholder="DA" className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-[#C9A66B]" value={newP.price} onChange={e => setNewP({...newP, price: Number(e.target.value)})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-white/40">Catégorie</label>
                      <select required className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-[#C9A66B]" value={newP.category} onChange={e => setNewP({...newP, category: e.target.value})}>
                        {categories.map(c => (
                          <option key={c.id} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-widest text-white/40 block">Photos (Max 4)</label>
                    <div className="flex flex-wrap gap-4">
                      {newP.images.map((img, i) => (
                        <div key={i} className="relative w-24 h-24 border border-white/10 overflow-hidden">
                          <img src={img} className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => setNewP(prev => ({...prev, images: prev.images.filter((_, idx) => idx !== i)}))}
                            className="absolute top-0 right-0 bg-red-500 text-white text-[8px] p-1"
                          >X</button>
                        </div>
                      ))}
                      {newP.images.length < 4 && (
                        <label className="w-24 h-24 border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-[#C9A66B] transition-colors">
                          <span className="text-2xl">+</span>
                          <span className="text-[8px] uppercase tracking-widest">Upload</span>
                          <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <input required placeholder="Temps de réalisation" className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-[#C9A66B]" value={newP.realizationTime} onChange={e => setNewP({...newP, realizationTime: e.target.value})} />
                    <input required placeholder="Temps d'attente" className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-[#C9A66B]" value={newP.waitingTime} onChange={e => setNewP({...newP, waitingTime: e.target.value})} />
                  </div>

                  <textarea required placeholder="Description..." className="w-full bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-[#C9A66B] h-32 resize-none" value={newP.description} onChange={e => setNewP({...newP, description: e.target.value})} />

                  <button type="submit" className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#C9A66B] transition-all">
                    Enregistrer la création
                  </button>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {products.map(p => (
                <div key={p.id} className="glass-card p-6 flex flex-col group relative">
                  <button onClick={() => onDeleteProduct(p.id)} className="absolute top-4 right-4 z-10 p-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                  <div className="overflow-hidden mb-6 aspect-[4/5]">
                    <img src={p.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <h4 className="serif text-xl mb-2">{p.name}</h4>
                  <div className="flex justify-between items-center">
                    <p className="text-[#C9A66B] font-bold text-[10px] uppercase tracking-widest">{p.price.toLocaleString()} DA</p>
                    <span className="text-[8px] opacity-40 uppercase tracking-widest">
                       {categories.find(c => c.slug === p.category)?.name || p.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'categories' && (
          <div className="max-w-2xl">
            <h3 className="serif text-3xl italic mb-12">Gestion des Catégories</h3>
            
            <div className="glass-card p-8 mb-12">
               <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40 mb-4 block">Nouvelle Catégorie</label>
               <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="Ex: Ceintures" 
                    className="flex-1 bg-white/5 border border-white/10 p-4 text-sm outline-none focus:border-[#C9A66B]"
                    value={newCatName}
                    onChange={e => setNewCatName(e.target.value)}
                  />
                  <button 
                    onClick={() => { if(newCatName) { onAddCategory(newCatName); setNewCatName(''); } }}
                    className="bg-[#C9A66B] text-black px-8 py-4 text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all"
                  >
                    Ajouter
                  </button>
               </div>
            </div>

            <div className="space-y-4">
              {categories.map(cat => (
                <div key={cat.id} className="flex justify-between items-center p-6 border border-white/5 bg-white/5 group hover:border-[#C9A66B]/30 transition-all">
                  <div>
                    <span className="text-lg serif">{cat.name}</span>
                    <span className="ml-4 text-[9px] text-white/20 uppercase tracking-widest italic">{cat.slug}</span>
                  </div>
                  <button 
                    onClick={() => onDeleteCategory(cat.id)}
                    className="text-white/20 hover:text-red-500 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-in fade-in duration-700">
            <div className="glass-card p-12 text-center border-b-4 border-b-green-500/30">
               <span className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-4 block">CA (DA)</span>
               <h4 className="text-5xl serif italic text-[#C9A66B]">{totalRevenue.toLocaleString()} DA</h4>
            </div>
            <div className="glass-card p-12 text-center border-b-4 border-b-blue-500/30">
               <span className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-4 block">Commandes</span>
               <h4 className="text-5xl serif italic">{orders.length}</h4>
            </div>
            <div className="glass-card p-12 text-center border-b-4 border-b-orange-500/30">
               <span className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-4 block">À confirmer</span>
               <h4 className="text-5xl serif italic text-orange-400">{pendingCount}</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
