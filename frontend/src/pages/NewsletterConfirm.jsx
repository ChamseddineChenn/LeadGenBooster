import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const NewsletterConfirm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [message, setMessage] = useState('');
  const hasConfirmed = useRef(false);

  useEffect(() => {
    const confirm = async () => {
      // Prevent multiple requests
      if (hasConfirmed.current) return;
      hasConfirmed.current = true;

      if (!token) {
        setStatus('error');
        setMessage('Lien de confirmation invalide');
        return;
      }

      try {
        const res = await fetch(`${API_URL}/newsletter/confirm/${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.message);
        }
      } catch {
        setStatus('error');
        setMessage('Erreur de connexion au serveur');
      }
    };

    confirm();
  }, [token]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center pt-20 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-[#D71C1C] animate-spin" />
            <p className="text-gray-600 text-lg">Confirmation en cours...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-black">
              Inscription confirmée !
            </h1>
            <p className="text-gray-600">{message}</p>
            <Link
              to="/"
              className="mt-4 inline-flex items-center gap-2 bg-[#D71C1C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#B01818] transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-black">Erreur</h1>
            <p className="text-gray-600">{message}</p>
            <Link
              to="/"
              className="mt-4 inline-flex items-center gap-2 bg-[#D71C1C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#B01818] transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NewsletterConfirm;
