import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Shield, Users } from 'lucide-react';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import { mockProjects } from '../data/mockData';

const LandingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'tech', name: 'Technologie' },
    { id: 'health', name: 'Santé' },
    { id: 'energy', name: 'Énergie' },
    { id: 'transport', name: 'Transport' },
  ];
  
  const filteredProjects = mockProjects.filter(project => {
    return (
      (category === 'all' || project.category === category) &&
      (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }).slice(0, 6); // Only show 6 on landing page

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Échangez des brevets, réalisez l'innovation
              </h1>
              <p className="text-xl text-blue-100">
                La première plateforme dédiée à l'échange de brevets entre entrepreneurs et investisseurs.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-200"
                >
                  Commencer Gratuitement
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  Explorer les Projets
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="Innovation team"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    category === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } transition-colors duration-200`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Projets à la Une
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Découvrez les derniers projets innovants disponibles sur notre plateforme
            </p>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Aucun projet ne correspond à votre recherche.
              </p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Voir tous les projets
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Pourquoi choisir Invest-Project?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Notre plateforme offre de nombreux avantages pour tous les acteurs de l'innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mb-5">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Croissance Rapide</h3>
              <p className="text-gray-600">
                Accélérez la croissance de vos projets en trouvant rapidement des investisseurs qualifiés.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-600 text-white mb-5">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sécurité Garantie</h3>
              <p className="text-gray-600">
                Toutes les transactions sont sécurisées et les informations des brevets sont protégées par des protocoles avancés.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-600 text-white mb-5">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Communauté Dynamique</h3>
              <p className="text-gray-600">
                Rejoignez une communauté active d'innovateurs, d'investisseurs et de développeurs partageant les mêmes idées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Prêt à rejoindre la révolution des brevets?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Créez votre compte gratuitement et commencez à explorer dès aujourd'hui.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-200"
              >
                S'inscrire Maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;