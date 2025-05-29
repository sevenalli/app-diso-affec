import React, { useState, useMemo } from 'react';
import {
  Layout,
  PageHeader,
  StatCard,
  FilterBar,
  Table,
  Plus,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity,
  Eye,
  Edit3,
  Trash2,
  UserCheck
} from '../components/ui';

function Affectation() {
  // Sample affectation data
  const [allAffectations] = useState([
    {
      id: 'AFF001',
      engineId: 'MM1ET00803',
      engineDesignation: 'ELEVATEUR THERMIQUE DCOSAN 8T',
      demandeur: 'SMA',
      operateur: 'Jean Dupont',
      dateDebut: '2024-02-01',
      dateFin: '2024-02-15',
      statut: 'active',
      priorite: 'haute',
      zone: 'Warehouse A',
      tache: 'Transport de marchandises',
      heuresPrevu: 120,
      heuresRealisees: 85,
      progression: 71,
      commentaires: 'Mission en cours, bon déroulement'
    },
    {
      id: 'AFF002',
      engineId: 'MM1ET00804',
      engineDesignation: 'CHARIOT ELEVATEUR ELECTRIQUE 3T',
      demandeur: 'DEPA',
      operateur: 'Marie Martin',
      dateDebut: '2024-01-28',
      dateFin: '2024-02-10',
      statut: 'completed',
      priorite: 'normale',
      zone: 'Warehouse B',
      tache: 'Manutention produits finis',
      heuresPrevu: 80,
      heuresRealisees: 78,
      progression: 100,
      commentaires: 'Mission terminée avec succès'
    },
    {
      id: 'AFF003',
      engineId: 'MM1ET00806',
      engineDesignation: 'GRUE MOBILE 10T',
      demandeur: 'SMA',
      operateur: 'Sophie Leroy',
      dateDebut: '2024-02-05',
      dateFin: '2024-02-20',
      statut: 'pending',
      priorite: 'urgente',
      zone: 'Warehouse C',
      tache: 'Levage équipements lourds',
      heuresPrevu: 160,
      heuresRealisees: 0,
      progression: 0,
      commentaires: 'En attente de validation'
    },
    {
      id: 'AFF004',
      engineId: 'MM1ET00808',
      engineDesignation: 'NACELLE ELEVATRICE 12M',
      demandeur: 'DEPA',
      operateur: 'Anne Moreau',
      dateDebut: '2024-01-25',
      dateFin: '2024-02-08',
      statut: 'active',
      priorite: 'normale',
      zone: 'Warehouse D',
      tache: 'Maintenance en hauteur',
      heuresPrevu: 100,
      heuresRealisees: 65,
      progression: 65,
      commentaires: 'Progression normale'
    },
    {
      id: 'AFF005',
      engineId: 'MM1ET00805',
      engineDesignation: 'TRACTEUR INDUSTRIEL 5T',
      demandeur: 'SMA',
      operateur: 'Pierre Dubois',
      dateDebut: '2024-02-10',
      dateFin: '2024-02-25',
      statut: 'cancelled',
      priorite: 'basse',
      zone: 'Maintenance Bay',
      tache: 'Remorquage équipements',
      heuresPrevu: 60,
      heuresRealisees: 15,
      progression: 25,
      commentaires: 'Mission annulée - engin en panne'
    },
    {
      id: 'AFF006',
      engineId: 'MM1ET00804',
      engineDesignation: 'CHARIOT ELEVATEUR ELECTRIQUE 3T',
      demandeur: 'DEPA',
      operateur: 'Luc Bernard',
      dateDebut: '2024-02-12',
      dateFin: '2024-02-18',
      statut: 'active',
      priorite: 'haute',
      zone: 'Warehouse B',
      tache: 'Stockage produits chimiques',
      heuresPrevu: 90,
      heuresRealisees: 30,
      progression: 33,
      commentaires: 'Début de mission'
    }
  ]);
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDemandeur, setSelectedDemandeur] = useState('');
  const [selectedStatut, setSelectedStatut] = useState('');
  const [selectedPriorite, setSelectedPriorite] = useState('');
  const [selectedOperateur, setSelectedOperateur] = useState('');
  const [selectedDateDebut, setSelectedDateDebut] = useState('');

  // Get unique values for filters
  const demandeurs = ['SMA', 'DEPA'];
  const statuts = [...new Set(allAffectations.map(aff => aff.statut))];
  const priorites = [...new Set(allAffectations.map(aff => aff.priorite))];
  const operateurs = [...new Set(allAffectations.map(aff => aff.operateur))];

  // Filtered affectations
  const filteredAffectations = useMemo(() => {
    return allAffectations.filter(affectation => {
      const matchesSearch = !searchTerm ||
        affectation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affectation.engineDesignation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affectation.operateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affectation.tache.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDemandeur = !selectedDemandeur || affectation.demandeur === selectedDemandeur;
      const matchesStatut = !selectedStatut || affectation.statut === selectedStatut;
      const matchesPriorite = !selectedPriorite || affectation.priorite === selectedPriorite;
      const matchesOperateur = !selectedOperateur || affectation.operateur === selectedOperateur;
      const matchesDate = !selectedDateDebut || affectation.dateDebut >= selectedDateDebut;

      return matchesSearch && matchesDemandeur && matchesStatut && matchesPriorite && matchesOperateur && matchesDate;
    });
  }, [allAffectations, searchTerm, selectedDemandeur, selectedStatut, selectedPriorite, selectedOperateur, selectedDateDebut]);

  // Statistics
  const activeAffectations = filteredAffectations.filter(aff => aff.statut === 'active');
  const completedAffectations = filteredAffectations.filter(aff => aff.statut === 'completed');
  const pendingAffectations = filteredAffectations.filter(aff => aff.statut === 'pending');
  const totalHeuresPrevu = filteredAffectations.reduce((sum, aff) => sum + aff.heuresPrevu, 0);
  const totalHeuresRealisees = filteredAffectations.reduce((sum, aff) => sum + aff.heuresRealisees, 0);
  const tauxRealisation = totalHeuresPrevu > 0 ? Math.round((totalHeuresRealisees / totalHeuresPrevu) * 100) : 0;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDemandeur('');
    setSelectedStatut('');
    setSelectedPriorite('');
    setSelectedOperateur('');
    setSelectedDateDebut('');
  };
  return (
    <Layout>
      {/* Page Header */}
      <PageHeader
        title="Affectation des Engins"
        subtitle={
          <div className="flex items-center">
            <UserCheck className="w-4 h-4 mr-2 text-amber-500" />
            Gestion des affectations et suivi des missions
          </div>
        }
        icon={Users}
        actions={[
          {
            icon: Plus,
            children: 'Nouvelle Affectation',
            onClick: () => console.log('Add affectation')
          }
        ]}
      />

      {/* Statistics Dashboard */}
      <Layout.Grid cols={4}>
        <StatCard
          title="Actives"
          value={activeAffectations.length}
          subtitle="Missions en cours"
          icon={Activity}
          color="blue"
          trend={TrendingUp}
          trendValue="En cours"
        />

        <StatCard
          title="Terminées"
          value={completedAffectations.length}
          subtitle="Missions accomplies"
          icon={CheckCircle}
          color="green"
          trend={CheckCircle}
          trendValue="Succès"
        />

        <StatCard
          title="En Attente"
          value={pendingAffectations.length}
          subtitle="À valider"
          icon={Clock}
          color="amber"
          trend={AlertTriangle}
          trendValue="Attention"
        />

        <StatCard
          title="Réalisation"
          value={`${tauxRealisation}%`}
          subtitle="Taux d'accomplissement"
          icon={TrendingUp}
          color="purple"
          trend={Activity}
          trendValue="Performance"
          progress={tauxRealisation}
          progressLabel="Heures réalisées"
        />
      </Layout.Grid>

      {/* Filter Bar */}
      <FilterBar
        title="Filtres Avancés"
        subtitle="Recherchez et filtrez les affectations"
        onClearFilters={clearFilters}
      >
        <FilterBar.Grid columns={6}>
          <FilterBar.Input
            label="Recherche Intelligente"
            emoji="🔍"
            type="search"
            placeholder="Rechercher par ID, engin, opérateur, tâche..."
            value={searchTerm}
            onChange={setSearchTerm}
            clearable
            className="md:col-span-2"
          />

          <FilterBar.Input
            label="Demandeur"
            emoji="🏢"
            type="select"
            placeholder="Tous les Demandeurs"
            value={selectedDemandeur}
            onChange={setSelectedDemandeur}
            options={[
              { value: 'SMA', label: 'SMA - Service Maintenance' },
              { value: 'DEPA', label: 'DEPA - Département Production' }
            ]}
          />

          <FilterBar.Input
            label="Statut"
            emoji="📊"
            type="select"
            placeholder="Tous les Statuts"
            value={selectedStatut}
            onChange={setSelectedStatut}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Terminée' },
              { value: 'pending', label: 'En attente' },
              { value: 'cancelled', label: 'Annulée' }
            ]}
          />

          <FilterBar.Input
            label="Priorité"
            emoji="⚡"
            type="select"
            placeholder="Toutes les Priorités"
            value={selectedPriorite}
            onChange={setSelectedPriorite}
            options={[
              { value: 'urgente', label: 'Urgente' },
              { value: 'haute', label: 'Haute' },
              { value: 'normale', label: 'Normale' },
              { value: 'basse', label: 'Basse' }
            ]}
          />

          <FilterBar.Input
            label="Date Début"
            emoji="📅"
            type="date"
            value={selectedDateDebut}
            onChange={setSelectedDateDebut}
          />
        </FilterBar.Grid>
      </FilterBar>

      {/* Affectations Table */}
      <Table
        title="Liste des Affectations"
        subtitle="Suivi complet des missions et affectations"
        icon={Users}
        headerColor="blue"
        data={filteredAffectations}
        columns={[
          {
            key: 'id',
            label: 'ID Affectation',
            emoji: '🆔',
            render: (value, affectation) => (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">{value}</span>
                <span className="text-xs text-gray-500">{affectation.engineId}</span>
              </div>
            )
          },
          {
            key: 'engineDesignation',
            label: 'Engin',
            emoji: '🚛',
            render: (value, affectation) => (
              <div className="max-w-xs">
                <div className="text-sm font-medium text-gray-900 truncate">{value}</div>
                <div className="text-xs text-gray-500">{affectation.zone}</div>
              </div>
            )
          },
          {
            key: 'demandeur',
            label: 'Demandeur',
            emoji: '🏢',
            render: (value) => (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                value === 'SMA'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {value === 'SMA' ? '🔧 SMA' : '🏭 DEPA'}
              </span>
            )
          },
          {
            key: 'operateur',
            label: 'Opérateur',
            emoji: '👤',
            render: (value, affectation) => (
              <div>
                <div className="text-sm text-gray-900">{value}</div>
                <div className="text-xs text-gray-500">{affectation.tache}</div>
              </div>
            )
          },
          {
            key: 'statut',
            label: 'Statut',
            emoji: '📊',
            render: (value) => {
              const variants = {
                active: 'success',
                completed: 'info',
                pending: 'warning',
                cancelled: 'danger'
              };
              const labels = {
                active: '🟢 Active',
                completed: '✅ Terminée',
                pending: '🟡 En attente',
                cancelled: '❌ Annulée'
              };
              return (
                <Table.StatusBadge variant={variants[value]}>
                  {labels[value]}
                </Table.StatusBadge>
              );
            }
          },
          {
            key: 'priorite',
            label: 'Priorité',
            emoji: '⚡',
            render: (value) => {
              const colors = {
                urgente: 'bg-red-100 text-red-800',
                haute: 'bg-orange-100 text-orange-800',
                normale: 'bg-blue-100 text-blue-800',
                basse: 'bg-gray-100 text-gray-800'
              };
              const icons = {
                urgente: '🔴',
                haute: '🟠',
                normale: '🔵',
                basse: '⚪'
              };
              return (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${colors[value]}`}>
                  {icons[value]} {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              );
            }
          },
          {
            key: 'progression',
            label: 'Progression',
            emoji: '📈',
            render: (value, affectation) => (
              <div className="w-24">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>{value}%</span>
                  <span>{affectation.heuresRealisees}h/{affectation.heuresPrevu}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      value === 100 ? 'bg-green-500' :
                      value >= 75 ? 'bg-blue-500' :
                      value >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            )
          },
          {
            key: 'actions',
            label: 'Actions',
            emoji: '🎯',
            render: (_, affectation) => (
              <Table.ActionButtons
                actions={[
                  {
                    icon: Eye,
                    title: 'Voir détails',
                    color: 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700',
                    onClick: () => console.log('View', affectation.id)
                  },
                  {
                    icon: Edit3,
                    title: 'Modifier',
                    color: 'bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700',
                    onClick: () => console.log('Edit', affectation.id)
                  },
                  {
                    icon: Trash2,
                    title: 'Supprimer',
                    color: 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700',
                    onClick: () => console.log('Delete', affectation.id)
                  }
                ]}
              />
            )
          }
        ]}
        onRowClick={(affectation) => console.log('Row clicked:', affectation.id)}
      />
    </Layout>
  );
}

export default Affectation;
