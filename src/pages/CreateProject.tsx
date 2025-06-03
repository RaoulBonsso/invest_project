import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Save, X, Upload, AlertTriangle } from 'lucide-react';

const CreateProject: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'tech',
    files: [] as File[]
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Check if user is entrepreneur
  if (user && user.role !== 'entrepreneur') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-amber-500" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Accès limité</h2>
          <p className="mt-1 text-sm text-gray-500">Seuls les entrepreneurs peuvent créer de nouveaux projets.</p>
          <div className="mt-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Retour au tableau de bord
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, files: [...prev.files, ...fileList] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'La description doit contenir au moins 50 caractères';
    }
    
    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
      // Show success notification
      alert('Projet créé avec succès!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 sm:truncate">Créer un nouveau projet</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Informations du projet</h3>
              <p className="mt-1 text-sm text-gray-600">
                Fournissez des détails précis sur votre projet pour attirer les investisseurs et les développeurs.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Titre du projet
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.title ? 'border-red-300' : ''
                        }`}
                        placeholder="Ex: Système de purification d'eau portable"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Catégorie
                    </label>
                    <div className="mt-1">
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.category ? 'border-red-300' : ''
                        }`}
                      >
                        <option value="tech">Technologie</option>
                        <option value="health">Santé</option>
                        <option value="energy">Énergie</option>
                        <option value="transport">Transport</option>
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          errors.description ? 'border-red-300' : ''
                        }`}
                        placeholder="Décrivez votre projet en détail, incluant ses avantages, le marché visé et sa valeur ajoutée."
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Une description détaillée permet aux investisseurs et développeurs de mieux comprendre votre projet.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Documents et fichiers
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Choisir des fichiers</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              multiple
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">ou glisser-déposer</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF, DOC jusqu'à 10Mo
                        </p>
                      </div>
                    </div>
                    
                    {formData.files.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700">Fichiers sélectionnés</h4>
                        <ul className="mt-2 divide-y divide-gray-200 border border-gray-200 rounded-md">
                          {formData.files.map((file, index) => (
                            <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div className="w-0 flex-1 flex items-center">
                                <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="font-medium text-red-600 hover:text-red-500"
                                >
                                  Supprimer
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Link
                    to="/dashboard"
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                  >
                    <X className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                    Annuler
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Publication en cours...
                      </>
                    ) : (
                      <>
                        <Save className="-ml-1 mr-2 h-5 w-5" />
                        Publier le projet
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;