import { Project, Transaction, User } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Système de Purification d\'Eau Portable',
    description: 'Un système portable qui purifie l\'eau contaminée en utilisant une technologie de filtration avancée, rendant l\'eau potable en quelques minutes sans électricité.',
    category: 'tech',
    creatorId: '1',
    creatorName: 'Alice Dupont',
    status: 'active',
    createdAt: '2025-03-10T09:30:00Z',
    updatedAt: '2025-03-15T14:45:00Z',
    investment: 45000,
    investors: 3,
    developersCount: 2
  },
  {
    id: '2',
    title: 'Dispositif Médical de Surveillance à Distance',
    description: 'Un appareil qui permet aux médecins de surveiller les signes vitaux des patients à distance, réduisant la nécessité de visites fréquentes à l\'hôpital tout en maintenant un suivi médical de qualité.',
    category: 'health',
    creatorId: '3',
    creatorName: 'Sophie Leblanc',
    status: 'active',
    createdAt: '2025-02-20T11:15:00Z',
    updatedAt: '2025-03-12T08:30:00Z',
    investment: 75000,
    investors: 5,
    developersCount: 4
  },
  {
    id: '3',
    title: 'Panneaux Solaires Flexibles Haute Efficacité',
    description: 'Une nouvelle génération de panneaux solaires flexibles qui peuvent être installés sur des surfaces courbes, avec un rendement énergétique supérieur aux modèles traditionnels.',
    category: 'energy',
    creatorId: '1',
    creatorName: 'Alice Dupont',
    status: 'pending',
    createdAt: '2025-03-05T15:20:00Z',
    updatedAt: '2025-03-18T10:10:00Z',
    investment: 120000,
    investors: 8,
    developersCount: 6
  },
  {
    id: '4',
    title: 'Système de Transport Urbain Intelligent',
    description: 'Un réseau de transport public automatisé qui optimise les itinéraires en temps réel en fonction du trafic et de la demande, réduisant les temps de trajet et les émissions de carbone.',
    category: 'transport',
    creatorId: '2',
    creatorName: 'Jean Martin',
    status: 'active',
    createdAt: '2025-01-15T08:45:00Z',
    updatedAt: '2025-03-01T16:30:00Z',
    investment: 250000,
    investors: 12,
    developersCount: 10
  },
  {
    id: '5',
    title: 'Batterie Écologique Longue Durée',
    description: 'Une batterie rechargeable fabriquée à partir de matériaux biodégradables offrant une autonomie supérieure aux modèles lithium-ion actuels, avec un impact environnemental réduit.',
    category: 'energy',
    creatorId: '3',
    creatorName: 'Sophie Leblanc',
    status: 'active',
    createdAt: '2025-02-28T13:40:00Z',
    updatedAt: '2025-03-20T09:15:00Z',
    investment: 180000,
    investors: 9,
    developersCount: 7
  },
  {
    id: '6',
    title: 'Assistant IA pour Diagnostic Médical',
    description: 'Un système d\'intelligence artificielle qui aide les médecins à diagnostiquer les maladies en analysant les symptômes et les antécédents médicaux, améliorant la précision des diagnostics.',
    category: 'health',
    creatorId: '2',
    creatorName: 'Jean Martin',
    status: 'expired',
    createdAt: '2024-12-10T10:20:00Z',
    updatedAt: '2025-01-25T11:50:00Z',
    investment: 90000,
    investors: 6,
    developersCount: 5
  },
  {
    id: '7',
    title: 'Drone de Livraison Autonome',
    description: 'Un drone de livraison qui utilise l\'IA pour naviguer dans les environnements urbains complexes, permettant des livraisons rapides et économiques pour les petits colis.',
    category: 'transport',
    creatorId: '1',
    creatorName: 'Alice Dupont',
    status: 'active',
    createdAt: '2025-03-08T09:10:00Z',
    updatedAt: '2025-03-22T14:25:00Z',
    investment: 65000,
    investors: 4,
    developersCount: 3
  },
  {
    id: '8',
    title: 'Plateforme de Cybersécurité Prédictive',
    description: 'Un système de sécurité informatique qui utilise l\'apprentissage automatique pour prédire et prévenir les cyberattaques avant qu\'elles ne se produisent.',
    category: 'tech',
    creatorId: '3',
    creatorName: 'Sophie Leblanc',
    status: 'pending',
    createdAt: '2025-03-15T16:30:00Z',
    updatedAt: '2025-03-25T08:45:00Z',
    investment: 110000,
    investors: 7,
    developersCount: 6
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    projectId: '1',
    projectTitle: 'Système de Purification d\'Eau Portable',
    amount: 15000,
    type: 'investment',
    status: 'completed',
    date: '2025-03-12T10:30:00Z',
    from: 'Jean Martin',
    to: 'Alice Dupont'
  },
  {
    id: '2',
    projectId: '2',
    projectTitle: 'Dispositif Médical de Surveillance à Distance',
    amount: 20000,
    type: 'investment',
    status: 'completed',
    date: '2025-03-15T14:20:00Z',
    from: 'Jean Martin',
    to: 'Sophie Leblanc'
  },
  {
    id: '3',
    projectId: '3',
    projectTitle: 'Panneaux Solaires Flexibles Haute Efficacité',
    amount: 30000,
    type: 'investment',
    status: 'pending',
    date: '2025-03-18T09:45:00Z',
    from: 'Jean Martin',
    to: 'Alice Dupont'
  },
  {
    id: '4',
    projectId: '1',
    projectTitle: 'Système de Purification d\'Eau Portable',
    amount: 5000,
    type: 'development',
    status: 'completed',
    date: '2025-03-20T11:15:00Z',
    from: 'Alice Dupont',
    to: 'Sophie Leblanc'
  },
  {
    id: '5',
    projectId: '4',
    projectTitle: 'Système de Transport Urbain Intelligent',
    amount: 50000,
    type: 'investment',
    status: 'completed',
    date: '2025-03-10T16:30:00Z',
    from: 'Jean Martin',
    to: 'Jean Martin'
  },
  {
    id: '6',
    projectId: '2',
    projectTitle: 'Dispositif Médical de Surveillance à Distance',
    amount: 10000,
    type: 'development',
    status: 'completed',
    date: '2025-03-22T13:40:00Z',
    from: 'Sophie Leblanc',
    to: 'Sophie Leblanc'
  },
  {
    id: '7',
    projectId: '5',
    projectTitle: 'Batterie Écologique Longue Durée',
    amount: 40000,
    type: 'investment',
    status: 'completed',
    date: '2025-03-05T10:10:00Z',
    from: 'Jean Martin',
    to: 'Sophie Leblanc'
  },
  {
    id: '8',
    projectId: '7',
    projectTitle: 'Drone de Livraison Autonome',
    amount: 25000,
    type: 'sale',
    status: 'completed',
    date: '2025-03-25T15:20:00Z',
    from: 'Entreprise XYZ',
    to: 'Alice Dupont'
  }
];