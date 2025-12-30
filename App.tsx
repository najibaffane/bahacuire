import React, { useState, useEffect } from 'react';
import { View, Product, CartItem, Order, OrderStatus, Category } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import AIAdvisor from './components/AIAdvisor';
import Checkout from './components/Checkout';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { PRODUCTS as INITIAL_PRODUCTS, BRAND_NAME } from './constants';
import { supabase } from './services/supabase';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const onScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data: catsData } = await supabase.from('categories').select('*').order('name');
      if (catsData) setCategories(catsData);
      
      const { data: productsData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (productsData && productsData.length > 0) {
        setProducts(productsData);
      } else {
        const savedProducts = localStorage.getItem('baha_products');
        setProducts(savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS);
      }
      
      const { data: ordersData } = await supabase.from('orders').select('*').order('date', { ascending: false });
      if (ordersData) setOrders(ordersData);
    } catch (err) { 
      console.error("Fetch error:", err); 
    } finally { 
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Gestion de l'enregistrement de la commande
  const handleCompleteOrder = async (orderData: Omit<Order, 'id' | 'status' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `BC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'pending',
      date: new Date().toISOString()
    };

    try {
      const { error } = await supabase.from('orders').insert([newOrder]);
      if (error) throw error;
      
      // Mise à jour locale pour l'admin
      setOrders(prev => [newOrder, ...prev]);
      setCart([]);
    } catch (err) {
      console.error("Erreur lors de l'enregistrement de la commande:", err);
      alert("Une erreur est survenue. Votre commande n'a pas pu être enregistrée. Veuillez contacter l'atelier.");
    }
  };

  const navigateTo = (targetView: View, product: Product | null = null) => {
    setView(targetView);
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    if (isLoading && view === 'shop') return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border border-[#C9A66B] border-t-transparent rounded-full animate-spin" /></div>;
    
    if (view === 'product-detail' && selectedProduct) {
      return (
        <ProductDetail 
          product={selectedProduct} 
          onAddToCart={(p) => setCart(prev => [...prev, {...p, quantity: 1}])}
          onBuyNow={(p) => { 
            // Vider le panier actuel pour un achat immédiat "propre"
            setCart([{...p, quantity: 1}]); 
            navigateTo('checkout'); 
          }}
          onBack={() => navigateTo('shop')} 
        />
      );
    }

    switch (view) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-1000 h-screen overflow-hidden">
            <Hero onExplore={() => navigateTo('shop')} />
          </div>
        );
      case 'shop':
        return <ProductGrid products={products} categories={categories} onAddToCart={(p) => setCart(prev => [...prev, {...p, quantity: 1}])} onBuyNow={(p) => { setCart([{...p, quantity: 1}]); navigateTo('checkout'); }} onSelectProduct={(p) => navigateTo('product-detail', p)} />;
      case 'advisor': return <AIAdvisor />;
      case 'checkout': 
        return (
          <Checkout 
            cart={cart} 
            onRemove={(id) => setCart(c => c.filter(x => x.id !== id))} 
            onComplete={handleCompleteOrder} 
            onBackToShop={() => navigateTo('shop')} 
          />
        );
      case 'admin-login': return <AdminLogin onLogin={() => navigateTo('admin-dashboard')} onBack={() => navigateTo('home')} />;
      case 'admin-dashboard':
        return (
          <AdminDashboard 
            products={products} orders={orders} categories={categories}
            onAddProduct={async (p) => { const n = {...p, id: Date.now().toString()}; await supabase.from('products').insert([n]); setProducts([n, ...products]); }}
            onDeleteProduct={async (id) => { await supabase.from('products').delete().eq('id', id); setProducts(products.filter(p => p.id !== id)); }}
            onUpdateOrderStatus={async (id, status) => { await supabase.from('orders').update({ status }).eq('id', id); setOrders(orders.map(o => o.id === id ? {...o, status} : o)); }}
            onAddCategory={async (n) => { const s = n.toLowerCase().replace(/ /g, '-'); const c = {id: `cat-${Date.now()}`, name: n, slug: s}; await supabase.from('categories').insert([c]); setCategories([...categories, c]); }}
            onDeleteCategory={async (id) => { await supabase.from('categories').delete().eq('id', id); setCategories(categories.filter(c => c.id !== id)); }}
            onLogout={() => navigateTo('home')}
          />
        );
      default: return <Hero onExplore={() => navigateTo('shop')} />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-[#C9A66B] selection:text-black relative">
      <div className="fixed inset-y-0 left-6 w-[1px] z-[60] pointer-events-none hidden md:flex flex-col opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1 100" preserveAspectRatio="none">
          <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="#C9A66B" strokeWidth="0.5" strokeDasharray="3, 2" style={{ transform: `translateY(${(scrollPos * 0.1) % 5}px)` }} />
        </svg>
      </div>
      <div className="fixed inset-y-0 right-6 w-[1px] z-[60] pointer-events-none hidden md:block opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1 100" preserveAspectRatio="none">
          <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="#C9A66B" strokeWidth="0.5" strokeDasharray="3, 2" style={{ transform: `translateY(${(-scrollPos * 0.1) % 5}px)` }} />
        </svg>
      </div>

      {view !== 'admin-dashboard' && view !== 'admin-login' && (
        <Navbar currentView={view} setView={(v) => navigateTo(v)} cartCount={cart.length} />
      )}
      <main className="relative z-10">{renderView()}</main>
      
      {view !== 'admin-dashboard' && view !== 'admin-login' && view !== 'home' && (
        <footer className="relative z-20 py-20 px-8 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.6em] text-white/20 border-t border-white/5 bg-[#050404]/95">
          <div className="flex items-center">
            <button onClick={() => navigateTo('admin-login')} className="hover:text-[#C9A66B] transition-colors mr-1">©</button>
            <p>2024 {BRAND_NAME} — JIJEL, ALGÉRIE</p>
          </div>
          <div className="flex items-center space-x-12 mt-8 md:mt-0">
            <a href="https://www.instagram.com/baha_cuir/" target="_blank" className="hover:text-[#C9A66B] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#C9A66B] transition-colors">Contact</a>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;