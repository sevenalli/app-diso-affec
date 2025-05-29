
import React, { useState, useMemo } from 'react';
import {
  Settings,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
  Zap
} from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Premium Page Header */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
          <div className="relative px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                    Gestion des Engins
                  </h1>
                  <p className="text-gray-600 mt-1 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-amber-500" />
                    Surveillance complète et gestion avancée de votre flotte
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg border">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Mis à jour: {new Date().toLocaleString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: '2-digit',
                      month: '2-digit'
                    })}
                  </span>
                </div>

                <button
                  onClick={() => window.location.reload()}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Actualiser"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>

                <button
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Exporter les données"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Exporter</span>
                </button>

                <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Plus className="w-5 h-5 mr-2" />
                  Ajouter Engin
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Available Engines Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Disponibles</p>
                    <p className="text-2xl font-bold text-gray-900">{availableEngines.length}</p>
                  </div>
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Unavailable Engines Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-rose-50 opacity-50"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Maintenance</p>
                    <p className="text-2xl font-bold text-gray-900">{unavailableEngines.length}</p>
                  </div>
                </div>
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </div>

          {/* Total Engines Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Engins</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredEngines.length}</p>
                  </div>
                </div>
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Average Availability Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-50 opacity-50"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Disponibilité</p>
                    <p className="text-2xl font-bold text-gray-900">{averageAvailability}%</p>
                  </div>
                </div>
                <Activity className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Premium Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Filter className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Filtres Avancés</h2>
                  <p className="text-sm text-gray-600">Recherchez et filtrez vos engins</p>
                </div>
              </div>
              <button
                onClick={clearFilters}
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Réinitialiser
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Search Bar */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  🔍 Recherche Intelligente
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher par ID, désignation, opérateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  📊 Statut
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                >
                  <option value="">Tous les Statuts</option>
                  <option value="available">Disponible</option>
                  <option value="unavailable">Indisponible</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  ⚙️ Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                >
                  <option value="">Tous les Types</option>
                  {engineTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Family Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  🏗️ Famille
                </label>
                <select
                  value={selectedFamily}
                  onChange={(e) => setSelectedFamily(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                >
                  <option value="">Toutes les Familles</option>
                  {engineFamilies.map((family) => (
                    <option key={family} value={family}>
                      {family}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Engines Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Liste des Engins</h2>
                  <p className="text-blue-100 text-sm">Gestion complète de votre flotte</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{filteredEngines.length}</div>
                <div className="text-blue-100 text-xs">Engins trouvés</div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    🆔 ID Engin
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    📝 Désignation
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    📊 Statut
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    👤 Opérateur
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    🔧 Dernière Maintenance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    ⏱️ Heures Fonct.
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    🎯 Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEngines.map((engine, index) => (
                  <tr
                    key={engine.id}
                    className={`hover:bg-gradient-to-r transition-all duration-200 group ${
                      engine.status === 'available'
                        ? 'hover:from-green-50 hover:to-emerald-50'
                        : 'hover:from-red-50 hover:to-rose-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full shadow-sm ${
                          engine.status === 'available'
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                            : 'bg-gradient-to-r from-red-400 to-rose-500 animate-pulse'
                        }`}></div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">{engine.id}</span>
                          <span className="text-xs text-gray-500">#{index + 1}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 truncate">{engine.designation}</div>
                        <div className="text-xs text-gray-500">{engine.familleNormalisee}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        engine.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {engine.status === 'available' ? '✅ Disponible' : '🔧 Maintenance'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{engine.operator}</div>
                      <div className="text-xs text-gray-500">{engine.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{engine.lastMaintenance}</div>
                      <div className="text-xs text-gray-500">Prochaine: {engine.nextMaintenance}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{engine.operatingHours}h</div>
                      <div className="text-xs text-gray-500">
                        {engine.type === 'Electrique' ? '⚡ Électrique' : `⛽ ${engine.fuelConsumption}L`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="group flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-110"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="group flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 transition-all duration-200 hover:scale-110"
                          title="Modifier"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          className="group flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-110"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Engines;

