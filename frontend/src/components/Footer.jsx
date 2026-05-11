import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
} from 'lucide-react';
import * as assets from '../assets/assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300">
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-5 gap-2">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <img
                  src={assets.logoWhite}
                  alt="Lead Gen Booster"
                  className="h-15 w-auto"
                />
              </Link>
            </div>
            <p className="text-gray-400 max-w-60 text-shadow-md mb-6 leading-relaxed">
              Votre partenaire de confiance pour la génération de leads et la
              prospection commerciale.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/lead-gen-booster/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#D71C1C] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61584634036102"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#D71C1C] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/leadgenbooster?igsh=MWFncHpneWJuZGJmNQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#D71C1C] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Tous les Services
                </Link>
              </li>
              <li>
                <Link
                  to="/services/creation-graphique"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Création Graphique
                </Link>
              </li>
              <li>
                <Link
                  to="/services/developpement-web"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Développement Web
                </Link>
              </li>
              <li>
                <Link
                  to="/services/prospection-commerciale-b2b"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Prospection B2B
                </Link>
              </li>
              <li>
                <Link
                  to="/services/prise-rdv-qualifies"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Prise de RDV Qualifiés
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="ml-5">
            <h3 className="text-white text-2xl font-bold mb-6">Entreprise</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link
                  to="/about/notre-equipe"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Notre Équipe
                </Link>
              </li>
              <li>
                <Link
                  to="/about/carrieres"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Carrières
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D71C1C] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">98 635 324</p>
                  <p className="text-gray-500 text-sm">Lun-Ven: 9h-18h</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D71C1C] flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">
                  contact@leadgen-booster.com
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D71C1C] flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">
                  39, Bis av Khereddine Pacha
                  <br />
                  5ème étage Montplaisir – Tunis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 text-sm text-center md:text-left mb-6 md:mb-0">
            <p>
              © {currentYear} Lead Gen Booster. Tous les droits réservés. |{' '}
              <Link
                to="/contact"
                className="hover:text-[#D71C1C] transition-colors"
              >
                Politique de Confidentialité
              </Link>{' '}
              |{' '}
              <Link
                to="/contact"
                className="hover:text-[#D71C1C] transition-colors"
              >
                Conditions d'Utilisation
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
