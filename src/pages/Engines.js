
import React, { useState, useMemo } from 'react';
import {
  Layout,
  PageHeader,
  StatCard,
  FilterBar,
  Table,
  Button,
  Settings,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap
} from '../components/ui';

function Engines() {
  // Use the same data structure as Disponibility page for consistency
  const [allEngines] = useState([
    {
      id: 'MM1ET00803',
      dateJour: '2024-01-31',
      nombreShifts: 3,
      tauxDispo: 100,
      designation: 'ELEVATEUR THERMIQUE DCOSAN 8T',
      familleNormalisee: 'CHARIOT ELEVATEUR THERMIQUE',
      month: 1,
      year: 2024,
      type: 'Roulant',
      status: 'available',
      location: 'Warehouse A',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-03-15',
      operatingHours: 1250,
      fuelConsumption: 45.2,
      operator: 'Jean Dupont'
    },
    {
      id: 'MM1ET00804',
      dateJour: '2024-01-31',
      nombreShifts: 2,
      tauxDispo: 85,
      designation: 'CHARIOT ELEVATEUR ELECTRIQUE 3T',
      familleNormalisee: 'CHARIOT ELEVATEUR ELECTRIQUE',
      month: 1,
      year: 2024,
      type: 'Electrique',
      status: 'available',
      location: 'Warehouse B',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-04-20',
      operatingHours: 980,
      fuelConsumption: 0,
      operator: 'Marie Martin'
    },
    {
      id: 'MM1ET00805',
      dateJour: '2024-01-31',
      nombreShifts: 1,
      tauxDispo: 0,
      designation: 'TRACTEUR INDUSTRIEL 5T',
      familleNormalisee: 'TRACTEUR INDUSTRIEL',
      month: 1,
      year: 2024,
      type: 'Roulant',
      status: 'unavailable',
      location: 'Maintenance Bay',
      lastMaintenance: '2024-01-25',
      nextMaintenance: '2024-02-25',
      operatingHours: 2100,
      fuelConsumption: 78.5,
      operator: 'Pierre Dubois',
      reason: 'Maintenance préventive',
      estimatedReturn: '2024-02-05'
    },
    {
      id: 'MM1ET00806',
      dateJour: '2024-01-31',
      nombreShifts: 3,
      tauxDispo: 95,
      designation: 'GRUE MOBILE 10T',
      familleNormalisee: 'GRUE MOBILE',
      month: 1,
      year: 2024,
      type: 'Roulant',
      status: 'available',
      location: 'Warehouse C',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      operatingHours: 1850,
      fuelConsumption: 92.3,
      operator: 'Sophie Leroy'
    },
    {
      id: 'MM1ET00807',
      dateJour: '2024-01-31',
      nombreShifts: 2,
      tauxDispo: 0,
      designation: 'TRANSPALETTE ELECTRIQUE 2T',
      familleNormalisee: 'TRANSPALETTE ELECTRIQUE',
      month: 1,
      year: 2024,
      type: 'Electrique',
      status: 'unavailable',
      location: 'Repair Shop',
      lastMaintenance: '2024-01-28',
      nextMaintenance: '2024-03-28',
      operatingHours: 750,
      fuelConsumption: 0,
      operator: 'Luc Bernard',
      reason: 'Réparation urgente',
      estimatedReturn: '2024-02-02'
    },
    {
      id: 'MM1ET00808',
      dateJour: '2024-01-31',
      nombreShifts: 3,
      tauxDispo: 88,
      designation: 'NACELLE ELEVATRICE 12M',
      familleNormalisee: 'NACELLE ELEVATRICE',
      month: 1,
      year: 2024,
      type: 'Electrique',
      status: 'available',
      location: 'Warehouse D',
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-04-12',
      operatingHours: 1420,
      fuelConsumption: 0,
      operator: 'Anne Moreau'
    }
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('');

  // Get unique values for filters
  const engineFamilies = [...new Set(allEngines.map(engine => engine.familleNormalisee))];
  const engineTypes = [...new Set(allEngines.map(engine => engine.type))];

  // Filtered engines
  const filteredEngines = useMemo(() => {
    return allEngines.filter(engine => {
      const matchesSearch = !searchTerm ||
        engine.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        engine.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        engine.operator.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !selectedStatus || engine.status === selectedStatus;
      const matchesType = !selectedType || engine.type === selectedType;
      const matchesFamily = !selectedFamily || engine.familleNormalisee === selectedFamily;

      return matchesSearch && matchesStatus && matchesType && matchesFamily;
    });
  }, [allEngines, searchTerm, selectedStatus, selectedType, selectedFamily]);

  // Statistics
  const availableEngines = filteredEngines.filter(engine => engine.status === 'available');
  const unavailableEngines = filteredEngines.filter(engine => engine.status === 'unavailable');
  const averageAvailability = filteredEngines.length > 0
    ? Math.round(filteredEngines.reduce((sum, engine) => sum + engine.tauxDispo, 0) / filteredEngines.length)
    : 0;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('');
    setSelectedType('');
    setSelectedFamily('');
  };

  return (
    <Layout>
      {/* Page Header */}
      <PageHeader
        title="Gestion des Engins"
        subtitle={
          <div className="flex items-center">
            <Zap className="w-4 h-4 mr-2 text-amber-500" />
            Surveillance complète et gestion avancée de votre flotte
          </div>
        }
        icon={Settings}
        actions={[
          {
            icon: Plus,
            children: 'Ajouter Engin',
            onClick: () => console.log('Add engine')
          }
        ]}
      />

      {/* Statistics Dashboard */}
      <Layout.Grid cols={4}>
        <StatCard
          title="Disponibles"
          value={availableEngines.length}
          icon={CheckCircle}
          color="green"
          trend={TrendingUp}
          trendValue="+2.3%"
        />

        <StatCard
          title="Maintenance"
          value={unavailableEngines.length}
          icon={AlertTriangle}
          color="red"
          trend={AlertTriangle}
          trendValue="Attention"
        />

        <StatCard
          title="Total Engins"
          value={filteredEngines.length}
          icon={Settings}
          color="blue"
          trend={Activity}
        />

        <StatCard
          title="Disponibilité"
          value={`${averageAvailability}%`}
          icon={TrendingUp}
          color="purple"
          trend={Activity}
          trendValue="Excellent"
          progress={averageAvailability}
          progressLabel="Performance"
        />
      </Layout.Grid>

      {/* Filter Bar */}
      <FilterBar
        title="Filtres Avancés"
        subtitle="Recherchez et filtrez vos engins"
        onClearFilters={clearFilters}
      >
        <FilterBar.Grid columns={5}>
          <FilterBar.Input
            label="Recherche Intelligente"
            emoji="🔍"
            type="search"
            placeholder="Rechercher par ID, désignation, opérateur..."
            value={searchTerm}
            onChange={setSearchTerm}
            clearable
            className="md:col-span-2"
          />

          <FilterBar.Input
            label="Statut"
            emoji="📊"
            type="select"
            placeholder="Tous les Statuts"
            value={selectedStatus}
            onChange={setSelectedStatus}
            options={[
              { value: 'available', label: 'Disponible' },
              { value: 'unavailable', label: 'Indisponible' }
            ]}
          />

          <FilterBar.Input
            label="Type"
            emoji="⚙️"
            type="select"
            placeholder="Tous les Types"
            value={selectedType}
            onChange={setSelectedType}
            options={engineTypes}
          />

          <FilterBar.Input
            label="Famille"
            emoji="🏗️"
            type="select"
            placeholder="Toutes les Familles"
            value={selectedFamily}
            onChange={setSelectedFamily}
            options={engineFamilies}
          />
        </FilterBar.Grid>
      </FilterBar>

      {/* Engines Table */}
      <Table
        title="Liste des Engins"
        subtitle="Gestion complète de votre flotte"
        icon={Settings}
        headerColor="blue"
        data={filteredEngines}
        columns={[
          {
            key: 'id',
            label: 'ID Engin',
            emoji: '🆔',
            render: (value, engine, index) => (
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full shadow-sm ${
                  engine.status === 'available'
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                    : 'bg-gradient-to-r from-red-400 to-rose-500 animate-pulse'
                }`}></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">{value}</span>
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                </div>
              </div>
            )
          },
          {
            key: 'designation',
            label: 'Désignation',
            emoji: '📝',
            render: (value, engine) => (
              <div className="max-w-xs">
                <div className="text-sm font-medium text-gray-900 truncate">{value}</div>
                <div className="text-xs text-gray-500">{engine.familleNormalisee}</div>
              </div>
            )
          },
          {
            key: 'status',
            label: 'Statut',
            emoji: '📊',
            render: (value) => (
              <Table.StatusBadge
                variant={value === 'available' ? 'success' : 'danger'}
              >
                {value === 'available' ? '✅ Disponible' : '🔧 Maintenance'}
              </Table.StatusBadge>
            )
          },
          {
            key: 'operator',
            label: 'Opérateur',
            emoji: '👤',
            render: (value, engine) => (
              <div>
                <div className="text-sm text-gray-900">{value}</div>
                <div className="text-xs text-gray-500">{engine.location}</div>
              </div>
            )
          },
          {
            key: 'lastMaintenance',
            label: 'Dernière Maintenance',
            emoji: '🔧',
            render: (value, engine) => (
              <div>
                <div className="text-sm text-gray-900">{value}</div>
                <div className="text-xs text-gray-500">Prochaine: {engine.nextMaintenance}</div>
              </div>
            )
          },
          {
            key: 'operatingHours',
            label: 'Heures Fonct.',
            emoji: '⏱️',
            render: (value, engine) => (
              <div>
                <div className="text-sm font-medium text-gray-900">{value}h</div>
                <div className="text-xs text-gray-500">
                  {engine.type === 'Electrique' ? '⚡ Électrique' : `⛽ ${engine.fuelConsumption}L`}
                </div>
              </div>
            )
          },
          {
            key: 'actions',
            label: 'Actions',
            emoji: '🎯',
            render: (_, engine) => (
              <Table.ActionButtons
                actions={[
                  {
                    icon: Eye,
                    title: 'Voir détails',
                    color: 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700',
                    onClick: () => console.log('View', engine.id)
                  },
                  {
                    icon: Edit3,
                    title: 'Modifier',
                    color: 'bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700',
                    onClick: () => console.log('Edit', engine.id)
                  },
                  {
                    icon: Trash2,
                    title: 'Supprimer',
                    color: 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700',
                    onClick: () => console.log('Delete', engine.id)
                  }
                ]}
              />
            )
          }
        ]}
        onRowClick={(engine) => console.log('Row clicked:', engine.id)}
      />
    </Layout>
  );
}

export default Engines;

