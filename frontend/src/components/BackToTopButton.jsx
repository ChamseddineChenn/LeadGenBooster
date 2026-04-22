import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleBackToTop}
      aria-label="Retour en haut"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-[#D71C1C] text-white shadow-lg transition-all duration-300 hover:bg-[#B01818] hover:shadow-xl ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default BackToTopButton;
