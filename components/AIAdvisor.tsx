
import React, { useState, useRef, useEffect } from 'react';
import { getLeatherAdvice } from '../services/gemini';
import { BRAND_NAME } from '../constants';

const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: `Bienvenue chez ${BRAND_NAME}. Je suis votre conseiller personnel en maroquinerie d'exception. Comment puis-je vous éclairer sur nos cuirs ou nos méthodes aujourd'hui ?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const advice = await getLeatherAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: advice || '' }]);
    setLoading(false);
  };

  return (
    <div className="pt-40 pb-24 max-w-5xl mx-auto px-6 min-h-screen">
      <div className="text-center mb-16">
        <span className="text-[#8B5E3C] uppercase tracking-[0.4em] text-[10px] font-black mb-4 block">Dialogue avec l'Atelier</span>
        <h2 className="text-4xl md:text-6xl mb-6 tracking-tighter">Conseils d'Expert</h2>
        <p className="text-gray-500 italic font-light text-lg">Découvrez les secrets du cuir authentique et de son entretien.</p>
      </div>

      <div className="bg-white border border-[#E5E1DA] shadow-2xl flex flex-col h-[650px] overflow-hidden rounded-sm">
        <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-8 bg-[#FDFBF7]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-6 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-[#2C2C2C] text-white rounded-sm' 
                  : 'bg-white border border-gray-100 text-gray-700 rounded-sm italic font-light border-l-4 border-l-[#8B5E3C]'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-sm flex space-x-2 border border-gray-100">
                <div className="w-1.5 h-1.5 bg-[#8B5E3C] rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[#8B5E3C] rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-[#8B5E3C] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="flex space-x-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ex: Pourquoi choisir le point de sellier ?"
              className="flex-1 bg-gray-50 border-none px-6 py-5 focus:ring-1 focus:ring-[#8B5E3C] text-sm outline-none placeholder:text-gray-300 italic"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-[#2C2C2C] text-white px-10 py-5 uppercase tracking-[0.2em] text-[10px] font-black hover:bg-[#8B5E3C] transition-all disabled:opacity-50"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          "C'est quoi le tannage végétal ?", 
          "Comment entretenir un cuir bleu marine ?", 
          "Délai pour une pièce sur mesure ?"
        ].map((q, idx) => (
          <button 
            key={idx}
            onClick={() => setInput(q)}
            className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#8B5E3C] border border-gray-100 p-5 transition-all hover:border-[#8B5E3C]/20 hover:bg-white"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIAdvisor;
