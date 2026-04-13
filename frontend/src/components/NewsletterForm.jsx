import { useState } from 'react';
import { Loader2, Check, AlertCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const NewsletterForm = ({ variant = 'light' }) => {
  const isDark = variant === 'dark';
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur de connexion' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none ${
            isDark
              ? 'bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-white'
              : 'border-gray-300 focus:border-[#D71C1C]'
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap ${
            isDark
              ? 'bg-white text-[#D71C1C] hover:bg-gray-100'
              : 'bg-[#D71C1C] text-white hover:bg-[#B01818]'
          }`}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          S&apos;inscrire
        </button>
      </form>

      {message && (
        <div
          className={`mt-3 flex items-center justify-center gap-2 text-sm ${
            message.type === 'success'
              ? isDark
                ? 'text-green-200'
                : 'text-green-600'
              : isDark
                ? 'text-red-200'
                : 'text-red-600'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          {message.text}
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;
