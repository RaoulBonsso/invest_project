import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Tag } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Function to get the category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tech':
        return 'bg-blue-100 text-blue-800';
      case 'health':
        return 'bg-green-100 text-green-800';
      case 'energy':
        return 'bg-amber-100 text-amber-800';
      case 'transport':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  // Function to get the status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
            <Tag className="h-3 w-3 mr-1" />
            {getCategoryName(project.category)}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {getStatusName(project.status)}
          </span>
        </div>
        <Link to={`/projects/${project.id}`} className="block">
          <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 mb-2">
            {project.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            Créé le {new Date(project.createdAt).toLocaleDateString('fr-FR')}
          </span>
        </div>
        {project.investors && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Users className="h-4 w-4 mr-1" />
            <span>{project.investors} investisseurs</span>
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900">
              {project.creatorName}
            </span>
          </div>
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
          >
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;