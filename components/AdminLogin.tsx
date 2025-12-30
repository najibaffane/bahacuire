
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'bahacuir@gmail.com' && password === 'bahacuiradminjijel') {
      onLogin(true);
    } else {
      setError('Identifiants incorrects.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 page-fade">
      <div className="glass-card w-full max-w-md p-12 md:p-16">
        <div className="text-center mb-12">
          <span className="text-[#C9A66B] uppercase tracking-[0.6em] text-[9px] font-black mb-4 block">Accès Atelier</span>
          <h2 className="text-4xl serif italic text-white">Administration</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="group">
            <label className="block text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 mb-3">Email</label>
            <input 
              required
              type="email"
              className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#C9A66B] text-white text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="group">
            <label className="block text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 mb-3">Mot de passe</label>
            <input 
              required
              type="password"
              className="w-full bg-white/5 border border-white/10 px-6 py-4 outline-none focus:border-[#C9A66B] text-white text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-[10px] uppercase tracking-widest text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-[#C9A66B] text-black py-5 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white transition-all"
          >
            Se connecter
          </button>
        </form>

        <button 
          onClick={onBack}
          className="w-full mt-8 text-[9px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors"
        >
          Retour au site
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
