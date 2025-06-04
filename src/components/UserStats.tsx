import React from 'react';
import { User, Project, Transaction } from '../types';
import { 
  DollarSign, 
  TrendingUp, 
  Briefcase, 
  Users, 
  BarChart,
  PieChart,
  LineChart,
  Calendar
} from 'lucide-react';

interface UserStatsProps {
  user: User;
  projects: Project[];
  transactions: Transaction[];
}

const UserStats: React.FC<UserStatsProps> = ({ user, projects, transactions }) => {
  // Calcul des statistiques en fonction du rôle de l'utilisateur
  const stats = React.useMemo(() => {
    if (user.role === 'entrepreneur') {
      const userProjects = projects.filter(p => p.creatorId === user.id);
      const totalInvestment = transactions
        .filter(t => t.to === user.name && t.type === 'investment')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalSales = transactions
        .filter(t => t.to === user.name && t.type === 'sale')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const activeProjects = userProjects.filter(p => p.status === 'active').length;
      const pendingProjects = userProjects.filter(p => p.status === 'pending').length;
      const expiredProjects = userProjects.filter(p => p.status === 'expired').length;
      
      const uniqueInvestors = new Set(
        transactions
          .filter(t => t.to === user.name && t.type === 'investment')
          .map(t => t.from)
      ).size;
      
      return {
        mainValue: totalInvestment + totalSales,
        mainLabel: 'Total des revenus',
        secondaryValue: userProjects.length,
        secondaryLabel: 'Projets actifs',
        tertiaryValue: transactions.filter(t => t.to === user.name).length,
        tertiaryLabel: 'Transactions',
        stats: [
          { label: 'Investissements reçus', value: totalInvestment, icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Ventes réalisées', value: totalSales, icon: DollarSign, color: 'bg-blue-500' },
          { label: 'Projets actifs', value: activeProjects, icon: Briefcase, color: 'bg-teal-500' },
          { label: 'Projets en attente', value: pendingProjects, icon: Calendar, color: 'bg-amber-500' },
          { label: 'Projets expirés', value: expiredProjects, icon: Calendar, color: 'bg-red-500' },
          { label: 'Investisseurs uniques', value: uniqueInvestors, icon: Users, color: 'bg-purple-500' }
        ]
      };
    } else if (user.role === 'investor') {
      const totalInvested = transactions
        .filter(t => t.from === user.name && t.type === 'investment')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const activeInvestments = transactions
        .filter(t => 
          t.from === user.name && 
          t.type === 'investment' && 
          projects.find(p => p.id === t.projectId)?.status === 'active'
        ).length;
      
      const uniqueProjects = new Set(
        transactions
          .filter(t => t.from === user.name && t.type === 'investment')
          .map(t => t.projectId)
      ).size;
      
      const pendingInvestments = transactions
        .filter(t => t.from === user.name && t.type === 'investment' && t.status === 'pending')
        .length;
      
      return {
        mainValue: totalInvested,
        mainLabel: 'Total investi',
        secondaryValue: transactions.filter(t => t.from === user.name && t.type === 'investment').length,
        secondaryLabel: 'Investissements',
        tertiaryValue: uniqueProjects,
        tertiaryLabel: 'Projets financés',
        stats: [
          { label: 'Montant total investi', value: totalInvested, icon: DollarSign, color: 'bg-green-500' },
          { label: 'Projets financés', value: uniqueProjects, icon: Briefcase, color: 'bg-blue-500' },
          { label: 'Investissements actifs', value: activeInvestments, icon: TrendingUp, color: 'bg-teal-500' },
          { label: 'Investissements en attente', value: pendingInvestments, icon: Calendar, color: 'bg-amber-500' }
        ]
      };
    } else if (user.role === 'developer') {
      const totalEarned = transactions
        .filter(t => t.to === user.name && t.type === 'development')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const activeProjects = transactions
        .filter(t => 
          t.to === user.name && 
          t.type === 'development' && 
          projects.find(p => p.id === t.projectId)?.status === 'active'
        ).length;
      
      const uniqueProjects = new Set(
        transactions
          .filter(t => t.to === user.name && t.type === 'development')
          .map(t => t.projectId)
      ).size;
      
      const pendingPayments = transactions
        .filter(t => t.to === user.name && t.type === 'development' && t.status === 'pending')
        .length;
      
      return {
        mainValue: totalEarned,
        mainLabel: 'Total des gains',
        secondaryValue: uniqueProjects,
        secondaryLabel: 'Projets actifs',
        tertiaryValue: transactions.filter(t => t.to === user.name && t.type === 'development').length,
        tertiaryLabel: 'Contrats',
        stats: [
          { label: 'Montant total gagné', value: totalEarned, icon: DollarSign, color: 'bg-green-500' },
          { label: 'Projets en cours', value: uniqueProjects, icon: Briefcase, color: 'bg-blue-500' },
          { label: 'Contrats actifs', value: activeProjects, icon: Users, color: 'bg-teal-500' },
          { label: 'Paiements en attente', value: pendingPayments, icon: Calendar, color: 'bg-amber-500' }
        ]
      };
    }
    
    return {
      mainValue: 0,
      mainLabel: '',
      secondaryValue: 0,
      secondaryLabel: '',
      tertiaryValue: 0,
      tertiaryLabel: '',
      stats: []
    };
  }, [user, projects, transactions]);

  return (
    <div>
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
                  <dd className="text-lg font-semibold text-gray-900">{stats.mainValue.toLocaleString('fr-FR')} €</dd>
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
                  <dd className="text-lg font-semibold text-gray-900">{stats.secondaryValue}</dd>
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
                  <dd className="text-lg font-semibold text-gray-900">{stats.tertiaryValue}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {user.role === 'entrepreneur' 
              ? 'Statistiques de l\'entrepreneur' 
              : user.role === 'investor' 
              ? 'Statistiques de l\'investisseur' 
              : 'Statistiques du développeur'}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Vue détaillée de vos activités et performances
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {stats.stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${stat.color} rounded-md p-2`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {typeof stat.value === 'number' && stat.label.toLowerCase().includes('montant') 
                        ? `${stat.value.toLocaleString('fr-FR')} €` 
                        : stat.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
