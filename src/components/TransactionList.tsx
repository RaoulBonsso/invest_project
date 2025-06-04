import React from 'react';
import { Link } from 'react-router-dom';
import { Transaction } from '../types';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle,
  Clock as ClockIcon,
  AlertTriangle
} from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  userRole: string;
  showFilters?: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  userRole, 
  showFilters = false 
}) => {
  const [filter, setFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('date');
  const [sortOrder, setSortOrder] = React.useState('desc');

  // Filtrer les transactions
  const filteredTransactions = React.useMemo(() => {
    let result = [...transactions];
    
    if (filter !== 'all') {
      result = result.filter(t => t.type === filter);
    }
    
    // Tri des transactions
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'amount') {
        return sortOrder === 'desc' 
          ? b.amount - a.amount
          : a.amount - b.amount;
      }
      return 0;
    });
    
    return result;
  }, [transactions, filter, sortBy, sortOrder]);

  // Calculer les statistiques des transactions
  const stats = React.useMemo(() => {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    const totalInvestment = transactions
      .filter(t => t.type === 'investment')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalSales = transactions
      .filter(t => t.type === 'sale')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalDevelopment = transactions
      .filter(t => t.type === 'development')
      .reduce((sum, t) => sum + t.amount, 0);
      
    return {
      total,
      totalInvestment,
      totalSales,
      totalDevelopment,
      count: transactions.length
    };
  }, [transactions]);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center flex-wrap">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Historique des transactions</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {stats.count} transactions, total: {stats.total.toLocaleString('fr-FR')} €
          </p>
        </div>
        
        {showFilters && (
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <select
              className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="investment">Investissements</option>
              <option value="sale">Ventes</option>
              <option value="development">Développement</option>
            </select>
            
            <select
              className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
            >
              <option value="date-desc">Date (récent → ancien)</option>
              <option value="date-asc">Date (ancien → récent)</option>
              <option value="amount-desc">Montant (élevé → bas)</option>
              <option value="amount-asc">Montant (bas → élevé)</option>
            </select>
          </div>
        )}
      </div>
      
      {/* Statistiques des transactions */}
      {showFilters && (
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            <div className="px-4 py-3 sm:p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Investissements</div>
                  <div className="text-lg font-semibold text-gray-900">{stats.totalInvestment.toLocaleString('fr-FR')} €</div>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-3 sm:p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Ventes</div>
                  <div className="text-lg font-semibold text-gray-900">{stats.totalSales.toLocaleString('fr-FR')} €</div>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-3 sm:p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-amber-100 rounded-md p-2">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Développement</div>
                  <div className="text-lg font-semibold text-gray-900">{stats.totalDevelopment.toLocaleString('fr-FR')} €</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200">
        {filteredTransactions.length > 0 ? (
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
                    {userRole === 'entrepreneur' ? 'De' : 'À'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flux
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span>{new Date(transaction.date).toLocaleDateString('fr-FR')}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(transaction.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
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
                      <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : transaction.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status === 'completed' ? (
                          <><CheckCircle className="mr-1 h-3 w-3" /> Complété</>
                        ) : transaction.status === 'pending' ? (
                          <><ClockIcon className="mr-1 h-3 w-3" /> En attente</>
                        ) : (
                          <><AlertTriangle className="mr-1 h-3 w-3" /> Échoué</>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {userRole === 'entrepreneur' ? transaction.from : transaction.to}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {((userRole === 'entrepreneur' && transaction.to === transaction.from) || 
                        (userRole === 'investor' && transaction.from === transaction.to)) ? (
                        <span className="text-gray-400">-</span>
                      ) : ((userRole === 'entrepreneur' && transaction.type !== 'investment') || 
                           (userRole === 'investor' && transaction.type === 'investment')) ? (
                        <span className="text-red-500 flex items-center">
                          <ArrowUpRight className="h-4 w-4 mr-1" /> Sortant
                        </span>
                      ) : (
                        <span className="text-green-500 flex items-center">
                          <ArrowDownRight className="h-4 w-4 mr-1" /> Entrant
                        </span>
                      )}
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
    </div>
  );
};

export default TransactionList;
