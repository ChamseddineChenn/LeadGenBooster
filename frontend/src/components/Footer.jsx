import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react';
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
            <div className="flex items-center gap-2 mb-6">
              <img
                src={assets.logoWhite}
                alt="Lead Gen Booster"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Votre partenaire de confiance pour la génération de leads et la
              prospection commerciale.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#D71C1C] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#D71C1C] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#D71C1C] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6">Services</h3>
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
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Prospection Téléphonique
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Prise de Rendez-vous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Qualification de Leads
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#D71C1C] transition-colors text-sm"
                >
                  Relance Clients
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-6">Entreprise</h3>
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
            <h3 className="text-white font-bold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D71C1C] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">+1 (514) 555-0000</p>
                  <p className="text-gray-500 text-xs">Lun-Ven: 9h-18h EST</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D71C1C] flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">
                  contact@leadgenbooster.ca
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D71C1C] flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">
                  123 Rue du Commerce
                  <br />
                  Montréal, QC H2X 1Y8
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
              <a href="#" className="hover:text-[#D71C1C] transition-colors">
                Politique de Confidentialité
              </a>{' '}
              |{' '}
              <a href="#" className="hover:text-[#D71C1C] transition-colors">
                Conditions d'Utilisation
              </a>
            </p>
          </div>
          <div className="text-gray-400 text-sm">
            Conçu et construit avec ❤️ par Code Anvil
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
