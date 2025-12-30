
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
import StitchTransition from './components/StitchTransition';
import { PRODUCTS as INITIAL_PRODUCTS, BRAND_NAME } from './constants';
import { supabase } from './services/supabase';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  useEffect(() => {
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
      } catch (err) { console.error(err); }
      finally { setIsLoading(false); }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [view, selectedProduct, products, categories, isLoading]);

  const triggerTransition = (targetView: View, product: Product | null = null) => {
    setIsTransitioning(true);
    // Changement de vue au moment où les rideaux sont fermés (0.6s)
    setTimeout(() => {
      setView(targetView);
      setSelectedProduct(product);
      window.scrollTo(0, 0);
    }, 600);
    // Fin totale après la couture et la réouverture (1.6s)
    setTimeout(() => setIsTransitioning(false), 1600);
  };

  const renderView = () => {
    if (isLoading && view === 'shop') return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border border-[#C9A66B] border-t-transparent rounded-full animate-spin" /></div>;
    if (view === 'product-detail' && selectedProduct) {
      return (
        <ProductDetail 
          product={selectedProduct} 
          onAddToCart={(p) => setCart(prev => [...prev, {...p, quantity: 1}])}
          onBuyNow={(p) => { setCart(prev => [...prev, {...p, quantity: 1}]); triggerTransition('checkout'); }}
          onBack={() => triggerTransition('shop')} 
        />
      );
    }
    switch (view) {
      case 'home':
        return (
          <div className="page-fade">
            <Hero onExplore={() => triggerTransition('shop')} />
            <section className="py-60 px-6 max-w-4xl mx-auto">
              <div className="glass-card p-16 md:p-24 reveal text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B]/30 to-transparent" />
                <span className="text-[#C9A66B] uppercase tracking-[0.6em] text-[9px] font-black mb-10 block">L'Héritage Artisanal</span>
                <h2 className="text-5xl md:text-7xl serif mb-12 leading-tight">La Main qui <span className="italic">pense.</span></h2>
                <p className="text-white/50 font-light text-xl leading-relaxed mb-16 max-w-xl mx-auto italic">
                  Chaque point est une signature. Chaque pièce Baha Cuir raconte l'histoire d'une patience infinie.
                </p>
                <div className="flex justify-center">
                  <button onClick={() => triggerTransition('shop')} className="group flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A66B] hover:text-white transition-all">
                    Explorer la collection <div className="w-12 h-[1px] bg-[#C9A66B] group-hover:w-24 group-hover:bg-white transition-all" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        );
      case 'shop':
        return <ProductGrid products={products} categories={categories} onAddToCart={(p) => setCart(prev => [...prev, {...p, quantity: 1}])} onBuyNow={(p) => { setCart(prev => [...prev, {...p, quantity: 1}]); triggerTransition('checkout'); }} onSelectProduct={(p) => triggerTransition('product-detail', p)} />;
      case 'advisor': return <AIAdvisor />;
      case 'checkout': return <Checkout cart={cart} onRemove={(id) => setCart(c => c.filter(x => x.id !== id))} onComplete={() => setCart([])} onBackToShop={() => triggerTransition('shop')} />;
      case 'admin-login': return <AdminLogin onLogin={() => triggerTransition('admin-dashboard')} onBack={() => triggerTransition('home')} />;
      case 'admin-dashboard':
        return (
          <AdminDashboard 
            products={products} orders={orders} categories={categories}
            onAddProduct={async (p) => { const n = {...p, id: Date.now().toString()}; await supabase.from('products').insert([n]); setProducts([...products, n]); }}
            onDeleteProduct={async (id) => { await supabase.from('products').delete().eq('id', id); setProducts(products.filter(p => p.id !== id)); }}
            onUpdateOrderStatus={async (id, status) => { await supabase.from('orders').update({ status }).eq('id', id); setOrders(orders.map(o => o.id === id ? {...o, status} : o)); }}
            onAddCategory={async (n) => { const s = n.toLowerCase().replace(/ /g, '-'); const c = {id: `cat-${Date.now()}`, name: n, slug: s}; await supabase.from('categories').insert([c]); setCategories([...categories, c]); }}
            onDeleteCategory={async (id) => { await supabase.from('categories').delete().eq('id', id); setCategories(categories.filter(c => c.id !== id)); }}
            onLogout={() => triggerTransition('home')}
          />
        );
      default: return <Hero onExplore={() => triggerTransition('shop')} />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-[#C9A66B] selection:text-black relative">
      {/* Couture Latérale Interactive Discrète */}
      <div className="fixed inset-y-0 left-6 w-[1px] z-[60] pointer-events-none hidden md:flex flex-col opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1 100" preserveAspectRatio="none">
          <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="#C9A66B" strokeWidth="0.5" strokeDasharray="3, 2" style={{ transform: `translateY(${(scrollPos * 0.1) % 5}px)` }} />
        </svg>
      </div>
      <div className="fixed inset-y-0 right-6 w-[1px] z-[60] pointer-events-none hidden md:block opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1 100" preserveAspectRatio="none">
          <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="#C9A66B" strokeWidth="0.5" strokeDasharray="3, 2" style={{ transform: `translateY(${(-scrollPos * 0.1) % 5}px)` }} />
        </svg>
      </div>

      {isTransitioning && <StitchTransition />}
      {view !== 'admin-dashboard' && view !== 'admin-login' && (
        <Navbar currentView={view} setView={(v) => triggerTransition(v)} cartCount={cart.length} />
      )}
      <main className="relative z-10">{renderView()}</main>
      
      {view !== 'admin-dashboard' && view !== 'admin-login' && (
        <footer className="relative z-20 py-20 px-8 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.6em] text-white/30 border-t border-white/5 bg-[#050404]/95 backdrop-blur-xl">
          <div className="flex items-center">
            <button onClick={() => triggerTransition('admin-login')} className="hover:text-[#C9A66B] transition-colors mr-1">©</button>
            <p>2024 {BRAND_NAME} — ATELIER DE MAROQUINERIE</p>
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
