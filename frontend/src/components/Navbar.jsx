// Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as assets from '../assets/assets';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Users,
  Info,
  Palette,
  Globe,
  Share2,
  PenTool,
  Target,
  CalendarCheck,
  RefreshCw,
  GraduationCap,
  Sparkles,
  Zap,
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMouseEnter = (key) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

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
      poles: [
        {
          name: 'Communication',
          tagline: 'Image & Présence digitale',
          icon: Sparkles,
          items: [
            {
              title: 'Création Graphique',
              description: 'Logo, charte graphique et identité visuelle',
              href: '/services/creation-graphique',
              icon: Palette,
            },
            {
              title: 'Développement Web',
              description: 'Sites vitrines, landing pages et e-commerce',
              href: '/services/developpement-web',
              icon: Globe,
            },
            {
              title: 'Réseaux Sociaux',
              description: 'Community management et stratégie éditoriale',
              href: '/services/gestion-reseaux-sociaux',
              icon: Share2,
            },
            {
              title: 'Rédaction & SEO',
              description: 'Contenu optimisé et référencement naturel',
              href: '/services/redaction-contenu-seo',
              icon: PenTool,
            },
          ],
        },
        {
          name: 'Prospection & Visibilité',
          tagline: 'Croissance & Conquête',
          icon: Zap,
          items: [
            {
              title: 'Prospection B2B',
              description: 'Ciblage et approche multicanale des décideurs',
              href: '/services/prospection-commerciale-b2b',
              icon: Target,
            },
            {
              title: 'Prise de RDV Qualifiés',
              description: 'Rendez-vous BANT avec les bons interlocuteurs',
              href: '/services/prise-rdv-qualifies',
              icon: CalendarCheck,
            },
            {
              title: 'Relance Clients Inactifs',
              description: 'Réactivation de votre portefeuille dormant',
              href: '/services/relance-clients-inactifs',
              icon: RefreshCw,
            },
            {
              title: 'Formation Commerciale',
              description: 'Cold calling, closing et social selling',
              href: '/services/formation-commerciale',
              icon: GraduationCap,
            },
          ],
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
          href: '/blogs',
        },
        {
          title: 'Tendances du marché',
          description: 'Analyses des dernières tendances en télémarketing',
          href: '/blogs',
        },
        {
          title: 'Études de cas',
          description: "Retours d'expérience et réussites de nos clients",
          href: '/blogs',
        },
        {
          title: 'Guide du téléprospecteur',
          description: 'Meilleures pratiques et scripts efficaces',
          href: '/blogs',
        },
        {
          title: 'Technologie et outils',
          description: 'Revue des meilleurs outils pour la prospection',
          href: '/blogs',
        },
        {
          title: 'Législation',
          description: 'Conformité et réglementations en vigueur',
          href: '/blogs',
        },
      ],
    },
    about: {
      title: 'À propos de nous',
      icon: Users,
      items: [
        {
          title: 'Qui sommes-nous',
          description: 'Notre histoire et notre expertise',
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
      ],
    },
  };

  const navItems = [
    { label: 'Accueil', href: '/', type: 'link' },
    { label: 'Services', type: 'dropdown', key: 'services', href: '/services' },
    { label: 'Blogs', type: 'dropdown', key: 'blogs', href: '/blogs' },
    { label: 'Carrières', href: '/carrieres', type: 'link' },
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
                  <div
                    className="relative"
                    onMouseEnter={() => setHoveredNav(item.label)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <Link
                      to={item.href}
                      className={`font-medium transition-colors duration-200 px-2 py-1 cursor-pointer ${
                        isLinkActive(item.href)
                          ? 'text-[#D71C1C]'
                          : 'text-[#6D7280] hover:text-[#D71C1C]'
                      }`}
                    >
                      {item.label}
                    </Link>
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D71C1C] rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredNav === item.label ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      style={{ originX: 0 }}
                    />
                  </div>
                ) : (
                  <div
                    onMouseEnter={() => {
                      handleMouseEnter(item.key);
                      setHoveredNav(item.label);
                    }}
                    onMouseLeave={() => {
                      handleMouseLeave();
                      setHoveredNav(null);
                    }}
                  >
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.key ? null : item.key,
                          )
                        }
                        className={`font-medium transition-colors duration-200 px-2 py-1 flex items-center cursor-pointer ${
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
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D71C1C] rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredNav === item.label ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ originX: 0 }}
                      />
                    </div>

                    <AnimatePresence>
                      {activeDropdown === item.key && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-2xl shadow-2xl overflow-hidden z-50 ${
                            item.key === 'services'
                              ? 'w-[750px]'
                              : 'w-96 bg-white border border-gray-100'
                          }`}
                        >
                          {/* === SERVICES MEGA MENU === */}
                          {item.key === 'services' &&
                          dropdownItems[item.key]?.poles ? (
                            <div className="relative">
                              {/* Two-pole split */}
                              <div className="grid grid-cols-2">
                                {dropdownItems[item.key].poles.map(
                                  (pole, poleIdx) => {
                                    const PoleIcon = pole.icon;
                                    return (
                                      <div
                                        key={poleIdx}
                                        className={`relative p-5 ${
                                          poleIdx === 0
                                            ? 'bg-white'
                                            : 'bg-[#f2f2f2]'
                                        }`}
                                      >
                                        {/* Pole header */}
                                        <div className="flex items-center gap-2.5 mb-4">
                                          <div
                                            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                              poleIdx === 0
                                                ? 'bg-[#D71C1C]/10'
                                                : 'bg-[#D71C1C]/10'
                                            }`}
                                          >
                                            <PoleIcon
                                              className={`w-4.5 h-4.5 ${
                                                poleIdx === 0
                                                  ? 'text-[#D71C1C]'
                                                  : 'text-[#D71C1C]'
                                              }`}
                                            />
                                          </div>
                                          <div>
                                            <h4
                                              className={`text-base font-bold tracking-wide uppercase ${
                                                poleIdx === 0
                                                  ? 'text-gray-900'
                                                  : 'text-gray-900'
                                              }`}
                                            >
                                              {pole.name}
                                            </h4>
                                            <p
                                              className={`text-[10px] uppercase tracking-widest font-medium ${
                                                poleIdx === 0
                                                  ? 'text-[#D71C1C]'
                                                  : 'text-[#D71C1C]'
                                              }`}
                                            >
                                              {pole.tagline}
                                            </p>
                                          </div>
                                        </div>

                                        {/* Service items */}
                                        <div className="space-y-1">
                                          {pole.items.map(
                                            (dropdownItem, index) => {
                                              const ItemIcon =
                                                dropdownItem.icon;
                                              return (
                                                <motion.div
                                                  key={index}
                                                  initial={{
                                                    opacity: 0,
                                                    x: poleIdx === 0 ? -12 : 12,
                                                  }}
                                                  animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                  }}
                                                  transition={{
                                                    duration: 0.25,
                                                    delay: 0.08 + index * 0.05,
                                                  }}
                                                >
                                                  <Link
                                                    to={dropdownItem.href}
                                                    className={`group flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                                                      poleIdx === 0
                                                        ? 'hover:bg-[#D71C1C]/[0.06] hover:shadow-sm'
                                                        : 'hover:bg-black/[0.06] hover:shadow-sm'
                                                    }`}
                                                    onClick={() =>
                                                      setActiveDropdown(null)
                                                    }
                                                  >
                                                    <div
                                                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                                                        poleIdx === 0
                                                          ? 'bg-gray-100 group-hover:bg-[#D71C1C] group-hover:shadow-md group-hover:shadow-[#D71C1C]/25'
                                                          : 'bg-gray-200 group-hover:bg-[#D71C1C] group-hover:shadow-md group-hover:shadow-[#D71C1C]/25'
                                                      }`}
                                                    >
                                                      <ItemIcon
                                                        className={`w-4.5 h-4.5 transition-all duration-200 ${
                                                          poleIdx === 0
                                                            ? 'text-[#D71C1C] group-hover:text-white'
                                                            : 'text-[#D71C1C] group-hover:text-white'
                                                        }`}
                                                      />
                                                    </div>
                                                    <div className="min-w-0">
                                                      <h4
                                                        className={`text-sm font-semibold leading-tight mb-0.5 transition-colors duration-200 ${
                                                          poleIdx === 0
                                                            ? 'text-gray-800 group-hover:text-[#D71C1C]'
                                                            : 'text-gray-800 group-hover:text-[#D71C1C]'
                                                        }`}
                                                      >
                                                        {dropdownItem.title}
                                                      </h4>
                                                      <p
                                                        className={`text-[11px] leading-snug ${
                                                          poleIdx === 0
                                                            ? 'text-gray-500'
                                                            : 'text-gray-500'
                                                        }`}
                                                      >
                                                        {
                                                          dropdownItem.description
                                                        }
                                                      </p>
                                                    </div>
                                                    <ChevronRight
                                                      className={`w-3.5 h-3.5 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ${
                                                        poleIdx === 0
                                                          ? 'text-[#D71C1C]'
                                                          : 'text-[#D71C1C]'
                                                      }`}
                                                    />
                                                  </Link>
                                                </motion.div>
                                              );
                                            },
                                          )}
                                        </div>
                                      </div>
                                    );
                                  },
                                )}
                              </div>

                              {/* Bottom bar */}
                              <div className="bg-[#f2f2f2] px-5 py-3 flex items-center justify-between border-t border-gray-100">
                                <span className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">
                                  2 pôles · 8 expertises
                                </span>
                                <Link
                                  to="/services"
                                  className="group flex items-center gap-1.5 text-sm font-semibold text-[#D71C1C] hover:text-[#B01818] transition-colors"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  Tous nos services
                                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>
                            </div>
                          ) : (
                            /* Standard grid for other dropdowns */
                            <div>
                              <div className="p-5">
                                <div className="flex items-center mb-4">
                                  <div className="w-9 h-9 rounded-xl bg-[#D71C1C]/10 flex items-center justify-center mr-3">
                                    {(() => {
                                      const IconComponent =
                                        dropdownItems[item.key]?.icon;
                                      return IconComponent ? (
                                        <IconComponent className="w-4.5 h-4.5 text-[#D71C1C]" />
                                      ) : null;
                                    })()}
                                  </div>
                                  <h3 className="text-base font-bold text-gray-900">
                                    {dropdownItems[item.key]?.title || ''}
                                  </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {dropdownItems[item.key]?.items?.map(
                                    (dropdownItem, index) => (
                                      <Link
                                        key={index}
                                        to={dropdownItem.href}
                                        className="group p-2.5 rounded-xl hover:bg-[#D71C1C]/[0.06] transition-all duration-200"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        <div className="flex items-start">
                                          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center mr-2.5 group-hover:bg-[#D71C1C] transition-colors duration-200 shrink-0 mt-0.5">
                                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
                                          </div>
                                          <div>
                                            <h4 className="font-medium text-gray-800 text-sm mb-0.5 group-hover:text-[#D71C1C] transition-colors">
                                              {dropdownItem.title}
                                            </h4>
                                            <p className="text-[11px] text-gray-500 leading-snug">
                                              {dropdownItem.description}
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    ),
                                  )}
                                </div>
                              </div>
                              <div className="bg-[#f2f2f2] px-5 py-3 border-t border-gray-100">
                                <Link
                                  to={`/${item.key === 'about' ? 'about' : item.key}`}
                                  className="group flex items-center gap-1.5 text-sm font-semibold text-[#D71C1C] hover:text-[#B01818] transition-colors"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  Voir tous les{' '}
                                  {item.type === 'dropdown'
                                    ? item.label.toLowerCase()
                                    : ''}
                                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
              onClick={() => navigate('/contact')}
            >
              Obtenir un devis
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 border-2 border-[#000000] text-[#000000] font-semibold rounded-lg hover:bg-[#000000]/5 transition-all duration-200"
              onClick={() =>
                window.dispatchEvent(new Event('openBookingModal'))
              }
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
                            {/* Two-pole layout for services mobile */}
                            {item.key === 'services' &&
                            dropdownItems[item.key]?.poles
                              ? dropdownItems[item.key].poles.map(
                                  (pole, poleIdx) => (
                                    <div key={poleIdx} className="mb-3">
                                      <h4 className="text-xs font-bold text-[#D71C1C] uppercase tracking-wider mb-2 pb-1 border-b border-gray-100">
                                        {pole.name}
                                      </h4>
                                      {pole.items.map((dropdownItem, index) => (
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
                                      ))}
                                    </div>
                                  ),
                                )
                              : /* Standard items for other dropdowns */
                                dropdownItems[item.key]?.items?.map(
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
                              to={`/${item.key === 'about' ? 'about' : item.key}`}
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
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/contact');
                  }}
                >
                  Obtenir un devis
                </button>
                <button
                  className="w-full py-3 border-2 border-[#000000] text-[#000000] font-semibold rounded-lg hover:bg-[#000000]/5 transition-all duration-200"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.dispatchEvent(new Event('openBookingModal'));
                  }}
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
