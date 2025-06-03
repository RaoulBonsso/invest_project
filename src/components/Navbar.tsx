import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Briefcase, Menu, X, Bell, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center text-blue-600">
                <Briefcase className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">Invest-Project</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-gray-300">
                Accueil
              </Link>
              {user && (
                <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-gray-300">
                  Tableau de Bord
                </Link>
              )}
              <Link to="/projects" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-gray-300">
                Projets
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <>
                <button className="p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Bell className="h-6 w-6" />
                </button>
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {user.profileImage ? (
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={user.profileImage}
                          alt={user.name}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </button>
                  </div>
                  {isProfileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="px-4 py-2 text-xs text-gray-500">
                        Connecté en tant que {user.role}
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Tableau de Bord
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Tableau de Bord
              </Link>
            )}
            <Link
              to="/projects"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Projets
            </Link>
          </div>
          {user ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                {user.profileImage ? (
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={user.profileImage}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <User className="h-6 w-6" />
                  </div>
                )}
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tableau de Bord
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex flex-col space-y-2 px-4">
                <Link
                  to="/login"
                  className="block text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="block text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;