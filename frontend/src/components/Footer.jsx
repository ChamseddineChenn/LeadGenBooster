import { useState } from 'react';
import {
  Phone,
  Mail,
  MessageSquare,
  Facebook,
  Linkedin,
  Instagram,
  ChevronUp,
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic
    console.log('Subscribed:', email);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A2846] text-white pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo & Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/src/assets/LOGO LEADGEN BOOSTER.svg"
                alt="LeadGen Booster"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold">LeadGen Booster</span>
            </div>
            <p className="text-white/80 mb-6">
              Nous transformons la prospection téléphonique en opportunités
              commerciales concrètes. Des solutions sur mesure pour accélérer
              votre croissance au Québec.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E10C14] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E10C14] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E10C14] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Pages</h3>
            <ul className="space-y-3">
              {[
                'Services',
                'Processus',
                'Tarifs',
                'FAQ',
                'Blog & Articles',
                'Contact',
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Légal</h3>
            <ul className="space-y-3">
              {[
                'Mentions légales',
                'Politique de confidentialité',
                'Cookies',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
            <div className="space-y-4">
              <a
                href="tel:+15145551234"
                className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+1 (514) 555-1234</span>
              </a>
              <a
                href="mailto:contact@callinova.ca"
                className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>contact@callinova.ca</span>
              </a>
              <a
                href="https://wa.me/15145551234"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-[#25D366] rounded-lg hover:bg-[#20b858] transition-colors"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-sm font-bold mb-3">NEWSLETTER</h4>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg placeholder-white/50 focus:outline-none focus:border-[#E10C14]"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#E10C14] rounded-lg hover:bg-[#C00A11] transition-colors font-medium"
                >
                  S'abonner
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} LeadGen Booster. Tous droits
              réservés.
            </div>
            <div className="text-white/60 text-sm">
              Basé à Montréal, Québec • TVQ 123456789
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#E10C14] rounded-full flex items-center justify-center shadow-lg hover:bg-[#C00A11] transition-colors z-50"
          aria-label="Retour en haut"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
