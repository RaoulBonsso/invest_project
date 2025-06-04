import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center text-white">
              <Briefcase className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">Invest-Project</span>
            </Link>
            <p className="mt-2 text-gray-300 text-sm">
              Votre plateforme pour l'achat et la vente de brevets. Connectez entrepreneurs, investisseurs et développeurs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Projets
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Connexion
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Inscription
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300">75 Rue de Paris, 75001 Lyon, France</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <a href="mailto:contact@Invest-Project.fr" className="text-gray-300 hover:text-white transition-colors duration-200">
                  contact@Invest-Project.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Invest-Project. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;