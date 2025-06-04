import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockProjects, mockTransactions } from '../data/mockData';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Tag, 
  TrendingUp, 
  Edit, 
  MessageCircle, 
  Share2,
  AlertCircle
} from 'lucide-react';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find project with matching ID
  const project = mockProjects.find(p => p.id === id);
  
  // Get related transactions
  const projectTransactions = mockTransactions.filter(t => t.projectId === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Projet non trouvé</h2>
          <p className="mt-1 text-sm text-gray-500">Le projet que vous recherchez n'existe pas ou a été supprimé.</p>
          <div className="mt-6">
            <Link
              to="/projects"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Retour aux projets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle invest action
  const handleInvest = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setShowInvestModal(true);
  };

  // Handle investment submission
  const submitInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowInvestModal(false);
      
      // Dans une application réelle, cela serait géré par une API
      // Mise à jour du montant total d'investissement et du nombre d'investisseurs
      const amount = parseFloat(investmentAmount);
      if (project) {
        project.investment = (project.investment || 0) + amount;
        project.investors = (project.investors || 0) + 1;
        
        // Création d'une nouvelle transaction
        const newTransaction = {
          id: String(mockTransactions.length + 1),
          projectId: project.id,
          projectTitle: project.title,
          amount: amount,
          type: 'investment' as const,
          status: 'completed' as const,
          date: new Date().toISOString(),
          from: user?.name || 'Utilisateur anonyme',
          to: project.creatorName
        };
        
        // Ajout de la transaction à la liste des transactions
        mockTransactions.push(newTransaction);
      }
      
      // Show success alert or redirect to a success page
      alert(`Investissement de ${investmentAmount}€ effectué avec succès pour ${project.title}`);
    }, 1500);
  };

  // Function to get the category name
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'tech':
        return 'Technologie';
      case 'health':
        return 'Santé';
      case 'energy':
        return 'Énergie';
      case 'transport':
        return 'Transport';
      default:
        return category;
    }
  };

  // Function to get the status name
  const getStatusName = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'pending':
        return 'En attente';
      case 'expired':
        return 'Expiré';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Project Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 sm:truncate">{project.title}</h1>
              <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500">
                <div className="flex items-center mr-6">
                  <Calendar className="mr-1.5 h-5 w-5 text-gray-400" />
                  <span>Créé le {new Date(project.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center mr-6">
                  <Tag className="mr-1.5 h-5 w-5 text-gray-400" />
                  <span>{getCategoryName(project.category)}</span>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    project.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : project.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {getStatusName(project.status)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
              <button
                type="button"
                onClick={() => {
                  alert('Projet partagé!');
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Share2 className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                Partager
              </button>
              {user && (user.id === project.creatorId || user.role === 'investor') && (
                <>
                  {user.role === 'investor' ? (
                    <button
                      type="button"
                      onClick={handleInvest}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <DollarSign className="-ml-1 mr-2 h-5 w-5" />
                      Investir
                    </button>
                  ) : (
                    <Link
                      to={`/projects/${project.id}/edit`}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Edit className="-ml-1 mr-2 h-5 w-5" />
                      Modifier
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Informations du projet</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Détails et spécifications du brevet.</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  
                  <h4 className="text-lg font-medium text-gray-900 mt-8 mb-3">Caractéristiques</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Innovation brevetée avec protection intellectuelle complète</li>
                    <li>Marché potentiel estimé à plus de 100 millions d'euros</li>
                    <li>Prototype fonctionnel déjà développé et testé</li>
                    <li>Équipe de développement expérimentée</li>
                  </ul>

                  <h4 className="text-lg font-medium text-gray-900 mt-8 mb-3">Avantages</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Solution unique sur le marché actuel</li>
                    <li>Coûts de production optimisés</li>
                    <li>Forte demande anticipée</li>
                    <li>Potentiel d'expansion internationale</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Transactions</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Historique des proposition d'achat.</p>
                </div>
              </div>
              <div className="border-t border-gray-200">
                {projectTransactions.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {projectTransactions.map((transaction) => (
                      <li key={transaction.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                              transaction.type === 'investment' 
                                ? 'bg-green-100 text-green-600' 
                                : transaction.type === 'sale' 
                                ? 'bg-blue-100 text-blue-600' 
                                : 'bg-amber-100 text-amber-600'
                            }`}>
                              {transaction.type === 'investment' ? (
                                <TrendingUp className="h-5 w-5" />
                              ) : transaction.type === 'sale' ? (
                                <DollarSign className="h-5 w-5" />
                              ) : (
                                <Users className="h-5 w-5" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {transaction.type === 'investment' 
                                  ? "Proposition d'achat" 
                                  : transaction.type === 'sale' 
                                  ? 'Vente' 
                                  : "Proposition d'achat" }
                              </div>
                              <div className="text-sm text-gray-500">
                                De {transaction.from} à {transaction.to}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900 mr-4">
                              {transaction.amount.toLocaleString('fr-FR')} €
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(transaction.date).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune transaction</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Ce projet n'a pas encore reçu d'investissement.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-8 lg:mt-0">
            {/* Project Stats */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Statistiques</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <DollarSign className="mr-1 h-5 w-5 text-gray-400" />
                       Cout du Brevet
                    </dt>
                    <dd className="mt-1 text-xl font-semibold text-gray-900">
                      {project.investment?.toLocaleString('fr-FR')} €
                    </dd>
                  </div>

                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Dernière mise à jour</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(project.updatedAt).toLocaleDateString('fr-FR')}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Creator Info */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Créateur</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    {project.creatorName.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{project.creatorName}</h4>
                    <p className="text-sm text-gray-500">Entrepreneur</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <MessageCircle className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                    Contacter
                  </button>
                </div>
              </div>
            </div>

            {/* Action Card */}
            {user && user.role === 'investor' && (
              <div className="bg-blue-50 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-blue-900">Intéressé par ce projet?</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Investissez dès maintenant dans ce projet prometteur et devenez partenaire de son succès.</p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={handleInvest}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <DollarSign className="-ml-1 mr-2 h-5 w-5" />
                      Investir maintenant
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={submitInvestment}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Investir dans {project.title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Veuillez entrer le montant que vous souhaitez investir dans ce projet. Vous pouvez modifier ou retirer votre investissement jusqu'à la date de clôture du financement.
                        </p>

                        <div className="mt-4">
                          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Montant de l'investissement (€)
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">€</span>
                            </div>
                            <input
                              type="number"
                              name="amount"
                              id="amount"
                              required
                              min="100"
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              value={investmentAmount}
                              onChange={(e) => setInvestmentAmount(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">EUR</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Traitement...
                      </>
                    ) : (
                      'Investir'
                    )}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowInvestModal(false)}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;