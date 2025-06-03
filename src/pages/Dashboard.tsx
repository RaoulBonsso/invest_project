import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockProjects, mockTransactions } from '../data/mockData';
import { 
  BarChart, 
  TrendingUp, 
  AlertCircle, 
  PlusCircle, 
  DollarSign, 
  Users, 
  Briefcase, 
  Clock
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return <div>Loading...</div>;
  }

  // Filter projects based on user role
  const userProjects = mockProjects.filter(project => {
    if (user.role === 'entrepreneur') {
      return project.creatorId === user.id;
    } else if (user.role === 'investor' || user.role === 'developer') {
      // For demo purposes, just show some projects
      return true;
    }
    return false;
  });

  // Filter transactions based on user role
  const userTransactions = mockTransactions.filter(transaction => {
    if (user.role === 'entrepreneur') {
      return transaction.to === user.name;
    } else if (user.role === 'investor') {
      return transaction.from === user.name && transaction.type === 'investment';
    } else if (user.role === 'developer') {
      return transaction.to === user.name && transaction.type === 'development';
    }
    return false;
  });

  // Calculate stats based on user role
  const calculateStats = () => {
    if (user.role === 'entrepreneur') {
      const totalInvestment = userTransactions
        .filter(t => t.type === 'investment')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalSales = userTransactions
        .filter(t => t.type === 'sale')
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        main: totalInvestment + totalSales,
        mainLabel: 'Total des revenus',
        secondary: userProjects.length,
        secondaryLabel: 'Projets actifs',
        tertiary: userTransactions.length,
        tertiaryLabel: 'Transactions'
      };
    } else if (user.role === 'investor') {
      const totalInvested = userTransactions
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        main: totalInvested,
        mainLabel: 'Total investi',
        secondary: userTransactions.length,
        secondaryLabel: 'Investissements',
        tertiary: userProjects.filter(p => p.status === 'active').length,
        tertiaryLabel: 'Projets actifs'
      };
    } else if (user.role === 'developer') {
      const totalEarned = userTransactions
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        main: totalEarned,
        mainLabel: 'Total des gains',
        secondary: userProjects.filter(p => p.status === 'active').length,
        secondaryLabel: 'Projets actifs',
        tertiary: userTransactions.length,
        tertiaryLabel: 'Contrats'
      };
    }
    
    return {
      main: 0,
      mainLabel: '',
      secondary: 0,
      secondaryLabel: '',
      tertiary: 0,
      tertiaryLabel: ''
    };
  };

  const stats = calculateStats();

  // Get role-specific action button
  const getActionButton = () => {
    if (user.role === 'entrepreneur') {
      return (
        <Link
          to="/projects/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Créer un projet
        </Link>
      );
    } else if (user.role === 'investor') {
      return (
        <Link
          to="/projects"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Briefcase className="mr-2 h-4 w-4" />
          Explorer les projets
        </Link>
      );
    } else if (user.role === 'developer') {
      return (
        <Link
          to="/projects"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Briefcase className="mr-2 h-4 w-4" />
          Parcourir les projets
        </Link>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Tableau de Bord {user.role === 'entrepreneur' ? 'Entrepreneur' : user.role === 'investor' ? 'Investisseur' : 'Développeur'}
            </h1>
            {getActionButton()}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stats.mainLabel}</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stats.main.toLocaleString('fr-FR')} €</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-teal-500 rounded-md p-3">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stats.secondaryLabel}</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stats.secondary}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-amber-500 rounded-md p-3">
                  {user.role === 'investor' ? (
                    <TrendingUp className="h-6 w-6 text-white" />
                  ) : (
                    <Users className="h-6 w-6 text-white" />
                  )}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stats.tertiaryLabel}</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stats.tertiary}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Projets
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`${
                activeTab === 'transactions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Transactions
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {activeTab === 'overview' && (
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Activité récente</h3>
              
              {/* Activity Feed */}
              <div className="flow-root">
                <ul className="-mb-8">
                  {userTransactions.slice(0, 5).map((transaction, index) => (
                    <li key={transaction.id}>
                      <div className="relative pb-8">
                        {index !== userTransactions.slice(0, 5).length - 1 && (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              transaction.type === 'investment' 
                                ? 'bg-green-500' 
                                : transaction.type === 'sale' 
                                ? 'bg-blue-500' 
                                : 'bg-amber-500'
                            }`}>
                              {transaction.type === 'investment' ? (
                                <TrendingUp className="h-5 w-5 text-white" />
                              ) : transaction.type === 'sale' ? (
                                <DollarSign className="h-5 w-5 text-white" />
                              ) : (
                                <Briefcase className="h-5 w-5 text-white" />
                              )}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {transaction.type === 'investment' 
                                  ? `Investissement dans `
                                  : transaction.type === 'sale' 
                                  ? `Vente de `
                                  : `Développement pour `}
                                <Link to={`/projects/${transaction.projectId}`} className="font-medium text-gray-900">
                                  {transaction.projectTitle}
                                </Link>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <div className="font-medium text-gray-900">{transaction.amount.toLocaleString('fr-FR')} €</div>
                              <time dateTime={transaction.date}>
                                {new Date(transaction.date).toLocaleDateString('fr-FR')}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {userTransactions.length === 0 && (
                <div className="text-center py-6">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune activité récente</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Commencez à utiliser la plateforme pour voir vos activités ici.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Vos projets</h3>
                {user.role === 'entrepreneur' && (
                  <Link
                    to="/projects/create"
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Nouveau
                  </Link>
                )}
              </div>

              {userProjects.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Projet
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Catégorie
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        {user.role === 'entrepreneur' || user.role === 'investor' ? (
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Investissement
                          </th>
                        ) : null}
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userProjects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{project.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              project.category === 'tech' 
                                ? 'bg-blue-100 text-blue-800' 
                                : project.category === 'health' 
                                ? 'bg-green-100 text-green-800' 
                                : project.category === 'energy'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {project.category === 'tech' 
                                ? 'Technologie' 
                                : project.category === 'health' 
                                ? 'Santé' 
                                : project.category === 'energy'
                                ? 'Énergie'
                                : 'Transport'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              project.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : project.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {project.status === 'active' 
                                ? 'Actif' 
                                : project.status === 'pending' 
                                ? 'En attente' 
                                : 'Expiré'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                          </td>
                          {user.role === 'entrepreneur' || user.role === 'investor' ? (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {project.investment?.toLocaleString('fr-FR')} €
                            </td>
                          ) : null}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/projects/${project.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Détails
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-6">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun projet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {user.role === 'entrepreneur' 
                      ? 'Commencez par créer votre premier projet.' 
                      : user.role === 'investor' 
                      ? 'Explorez les projets disponibles pour investir.' 
                      : 'Parcourez les projets disponibles pour contribuer.'}
                  </p>
                  {user.role === 'entrepreneur' ? (
                    <div className="mt-6">
                      <Link
                        to="/projects/create"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <PlusCircle className="-ml-1 mr-2 h-5 w-5" />
                        Créer un projet
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-6">
                      <Link
                        to="/projects"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Briefcase className="-ml-1 mr-2 h-5 w-5" />
                        Explorer les projets
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Historique des transactions</h3>
              
              {userTransactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Projet
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Montant
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {user.role === 'entrepreneur' ? 'De' : 'À'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              <Link to={`/projects/${transaction.projectId}`} className="hover:text-blue-600">
                                {transaction.projectTitle}
                              </Link>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              transaction.type === 'investment' 
                                ? 'bg-green-100 text-green-800' 
                                : transaction.type === 'sale' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {transaction.type === 'investment' 
                                ? 'Investissement' 
                                : transaction.type === 'sale' 
                                ? 'Vente' 
                                : 'Développement'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {transaction.amount.toLocaleString('fr-FR')} €
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              transaction.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : transaction.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {transaction.status === 'completed' 
                                ? 'Complété' 
                                : transaction.status === 'pending' 
                                ? 'En attente' 
                                : 'Échoué'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.role === 'entrepreneur' ? transaction.from : transaction.to}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Clock className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune transaction</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Vos futures transactions apparaîtront ici.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;