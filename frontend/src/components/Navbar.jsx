// Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as assets from '../assets/assets';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Users,
  Info,
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dropdown items data
  const dropdownItems = {
    services: {
      title: 'Nos Services',
      icon: Phone,
      items: [
        {
          title: 'Prise de rendez-vous',
          description:
            'Planification de rendez-vous qualifiés pour vos équipes',
          href: '/services/prise-de-rendez-vous',
        },
        {
          title: 'Qualification de leads',
          description:
            'Filtrage et qualification de prospects selon vos critères',
          href: '/services/qualification-leads',
        },
        {
          title: 'Prospection téléphonique',
          description: 'Campagnes de prospection ciblées pour votre marché',
          href: '/services/prospection-telephonique',
        },
        {
          title: 'Relance clients',
          description:
            'Réactivation et fidélisation de votre clientèle existante',
          href: '/services/relance-clients',
        },
        {
          title: 'Enquêtes et sondages',
          description: 'Collecte de données et feedback pour vos décisions',
          href: '/services/enquetes-sondages',
        },
        {
          title: 'Renouvellements',
          description: "Gestion des renouvellements d'abonnements et contrats",
          href: '/services/renouvellements',
        },
      ],
    },
    blogs: {
      title: 'Blog & Ressources',
      icon: BookOpen,
      items: [
        {
          title: 'Conseils de vente',
          description:
            'Techniques et stratégies pour améliorer vos conversions',
          href: '/blogs/conseils-vente',
        },
        {
          title: 'Tendances du marché',
          description: 'Analyses des dernières tendances en télémarketing',
          href: '/blogs/tendances-marche',
        },
        {
          title: 'Études de cas',
          description: "Retours d'expérience et réussites de nos clients",
          href: '/blogs/etudes-de-cas',
        },
        {
          title: 'Guide du téléprospecteur',
          description: 'Meilleures pratiques et scripts efficaces',
          href: '/blogs/guide-teleprospecteur',
        },
        {
          title: 'Technologie et outils',
          description: 'Revue des meilleurs outils pour la prospection',
          href: '/blogs/technologie-outils',
        },
        {
          title: 'Législation Québec',
          description: 'Conformité et réglementations en vigueur',
          href: '/blogs/legislation-quebec',
        },
      ],
    },
    about: {
      title: 'À propos de nous',
      icon: Users,
      items: [
        {
          title: 'Qui sommes-nous',
          description: 'Notre histoire et notre expertise au Québec',
          href: '/about/qui-sommes-nous',
        },
        {
          title: 'Notre mission',
          description: 'Notre engagement envers la réussite de nos clients',
          href: '/about/notre-mission',
        },
        {
          title: 'Nos valeurs',
          description: 'Les principes qui guident notre travail quotidien',
          href: '/about/nos-valeurs',
        },
        {
          title: 'Notre équipe',
          description: 'Rencontrez nos experts en télémarketing',
          href: '/about/notre-equipe',
        },
        {
          title: 'Notre processus',
          description: 'Comment nous garantissons des résultats mesurables',
          href: '/about/notre-processus',
        },
        {
          title: 'Carrières',
          description: 'Rejoignez notre équipe de téléprospecteurs',
          href: '/about/carrieres',
        },
      ],
    },
  };

  const navItems = [
    { label: 'Accueil', href: '/', type: 'link' },
    { label: 'Services', type: 'dropdown', key: 'services', href: '/services' },
    { label: 'Blogs', type: 'dropdown', key: 'blogs', href: '/blogs' },
    { label: 'À propos', type: 'dropdown', key: 'about', href: '/about' },
    { label: 'Contact', href: '/contact', type: 'link' },
  ];

  const isLinkActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
      },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      ref={dropdownRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-w-[100vw] ${
        isScrolled
          ? 'bg-white shadow-lg py-3'
          : 'bg-white/95 backdrop-blur-sm py-5'
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src={assets.logoMain}
              alt="LeadGen Booster"
              className="h-20 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.type === 'link' ? (
                  <Link
                    to={item.href}
                    className={`font-medium transition-colors duration-200 px-2 py-1 ${
                      isLinkActive(item.href)
                        ? 'text-[#D71C1C]'
                        : 'text-[#6D7280] hover:text-[#D71C1C]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.key ? null : item.key,
                        )
                      }
                      className={`font-medium transition-colors duration-200 px-2 py-1 flex items-center ${
                        isLinkActive(item.href)
                          ? 'text-[#D71C1C]'
                          : 'text-[#6D7280] hover:text-[#D71C1C]'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                          activeDropdown === item.key ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.key && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                        >
                          <div className="p-6">
                            <div className="flex items-center mb-4">
                              <div className="w-10 h-10 rounded-lg bg-[#E10C14]/10 flex items-center justify-center mr-3">
                                {(() => {
                                  const IconComponent =
                                    dropdownItems[item.key]?.icon;
                                  return IconComponent ? (
                                    <IconComponent className="w-5 h-5 text-[#E10C14]" />
                                  ) : null;
                                })()}
                              </div>
                              <h3 className="text-lg font-bold text-[#000000]">
                                {dropdownItems[item.key]?.title || ''}
                              </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              {dropdownItems[item.key]?.items?.map(
                                (dropdownItem, index) => (
                                  <Link
                                    key={index}
                                    to={dropdownItem.href}
                                    className="group p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="flex items-start">
                                      <div className="w-8 h-8 rounded-lg bg-[#000000]/5 flex items-center justify-center mr-3 group-hover:bg-[#E10C14]/10 transition-colors duration-200">
                                        <ChevronRight className="w-4 h-4 text-[#000000] group-hover:text-[#E10C14]" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-[#000000] mb-1">
                                          {dropdownItem.title}
                                        </h4>
                                        <p className="text-xs text-[#6D7280]">
                                          {dropdownItem.description}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                ),
                              )}
                            </div>
                          </div>
                          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                            <Link
                              to={`/${item.key}`}
                              className="text-[#E10C14] font-medium hover:text-[#000000] transition-colors duration-200 flex items-center"
                              onClick={() => setActiveDropdown(null)}
                            >
                              Voir tous les{' '}
                              {item.type === 'dropdown'
                                ? item.label.toLowerCase()
                                : ''}
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-[#E10C14] text-white font-semibold rounded-lg hover:bg-[#C00A11] transition-colors duration-200 shadow-sm"
            >
              Obtenir un devis
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 border-2 border-[#000000] text-[#000000] font-semibold rounded-lg hover:bg-[#000000]/5 transition-all duration-200"
            >
              Réserver un appel
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#000000]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-100"
          >
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.type === 'link' ? (
                    <Link
                      to={item.href}
                      className={`font-medium py-2 block transition-colors ${
                        isLinkActive(item.href)
                          ? 'text-[#D71C1C]'
                          : 'text-[#6D7280] hover:text-[#D71C1C]'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.key ? null : item.key,
                          )
                        }
                        className="flex items-center justify-between w-full text-[#6D7280] hover:text-[#000000] font-medium py-2"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.key ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.key && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-2 space-y-3"
                          >
                            {dropdownItems[item.key]?.items?.map(
                              (dropdownItem, index) => (
                                <Link
                                  key={index}
                                  to={dropdownItem.href}
                                  className="block py-2 text-[#6D7280] hover:text-[#000000]"
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded bg-[#000000]/5 flex items-center justify-center mr-3">
                                      <ChevronRight className="w-3 h-3" />
                                    </div>
                                    <span>{dropdownItem.title}</span>
                                  </div>
                                </Link>
                              ),
                            )}
                            <Link
                              to={`/${item.key}`}
                              className="block py-2 text-[#E10C14] font-medium"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              Voir tout →
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex flex-col space-y-3 pt-4">
                <button
                  className="w-full py-3 bg-[#E10C14] text-white font-semibold rounded-lg hover:bg-[#C00A11] transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Obtenir un devis
                </button>
                <button
                  className="w-full py-3 border-2 border-[#000000] text-[#000000] font-semibold rounded-lg hover:bg-[#000000]/5 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Réserver un appel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
