import React, { useState } from 'react';
import { User } from '../types';
import { 
  Mail, 
  Phone, 
  UserPlus, 
  Search, 
  Filter, 
  Download,
  MessageSquare
} from 'lucide-react';

interface UsersListProps {
  users: User[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  
  // Filtrer les utilisateurs
  const filteredUsers = React.useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);
  
  // Statistiques des utilisateurs
  const userStats = React.useMemo(() => {
    const total = users.length;
    const entrepreneurs = users.filter(u => u.role === 'entrepreneur').length;
    const investors = users.filter(u => u.role === 'investor').length;
    const developers = users.filter(u => u.role === 'developer').length;
    
    return { total, entrepreneurs, investors, developers };
  }, [users]);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Gestion des utilisateurs</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {userStats.total} utilisateurs au total ({userStats.entrepreneurs} entrepreneurs, {userStats.investors} investisseurs, {userStats.developers} développeurs)
            </p>
          </div>
          
          <div className="mt-3 sm:mt-0 flex flex-wrap gap-2">
            <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <UserPlus className="mr-1 h-4 w-4" />
              Ajouter
            </button>
            <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Download className="mr-1 h-4 w-4" />
              Exporter
            </button>
          </div>
        </div>
        
        {/* Filtres et recherche */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-2 text-base border-gray-300 rounded-md"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">Tous les rôles</option>
              <option value="entrepreneur">Entrepreneurs</option>
              <option value="investor">Investisseurs</option>
              <option value="developer">Développeurs</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200">
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.profileImage ? (
                            <img className="h-10 w-10 rounded-full" src={user.profileImage} alt={user.name} />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'entrepreneur' 
                          ? 'bg-purple-100 text-purple-800' 
                          : user.role === 'investor' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'entrepreneur' 
                          ? 'Entrepreneur' 
                          : user.role === 'investor' 
                          ? 'Investisseur' 
                          : 'Développeur'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Actif
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="Envoyer un message">
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900" title="Appeler">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900" title="Ajouter à un projet">
                          <UserPlus className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <Search className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun utilisateur trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              Essayez de modifier vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
