import React, { useState, useMemo } from 'react';
import { Calendar, CheckCircle, XCircle, ArrowRight, ArrowLeft, Clock, Search, Filter, Save, GripVertical, TrendingUp, Activity, Zap, AlertTriangle, Download, RefreshCw } from 'lucide-react';

function Disponibility() {
  // Sample engine Array
  const [allEngines, setAllEngines] = useState([
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
      location: 'Warehouse A'
    },
    {
      id: 'MM1ET00804',
      dateJour: '2024-01-15',
      nombreShifts: 3,
      tauxDispo: 85,
      designation: 'ELEVATEUR THERMIQUE DCOSAN 8T',
      familleNormalisee: 'CHARIOT ELEVATEUR THERMIQUE',
      month: 1,
      year: 2024,
      type: 'Roulant',
      status: 'available',
      location: 'Warehouse B'
    },
    {
      id: 'MM1ET00805',
      dateJour: '2024-01-20',
      nombreShifts: 2,
      tauxDispo: 0,
      designation: 'ELEVATEUR THERMIQUE DCOSAN 8T',
      familleNormalisee: 'CHARIOT ELEVATEUR THERMIQUE',
      month: 1,
      year: 2024,
      type: 'Roulant',
      status: 'unavailable',
      reason: 'Scheduled Maintenance',
      estimatedReturn: '2024-02-15',
      location: 'Maintenance Bay 1'
    },
    {
      id: 'MM1ET00806',
      dateJour: '2024-01-25',
      nombreShifts: 3,
      tauxDispo: 100,
      designation: 'CHARIOT ELEVATEUR ELECTRIQUE 2T',
      familleNormalisee: 'CHARIOT ELEVATEUR ELECTRIQUE',
      month: 1,
      year: 2024,
      type: 'Electrique',
      status: 'available',
      location: 'Warehouse C'
    },
    {
      id: 'MM1ET00807',
      dateJour: '2024-01-28',
      nombreShifts: 1,
      tauxDispo: 0,
      designation: 'CHARIOT ELEVATEUR ELECTRIQUE 2T',
      familleNormalisee: 'CHARIOT ELEVATEUR ELECTRIQUE',
      month: 1,
      year: 2024,
      type: 'Electrique',
      status: 'unavailable',
      reason: 'Repair - Battery Issue',
      estimatedReturn: '2024-02-10',
      location: 'Repair Shop'
    },
    {
      id: 'MM1ET00808',
      dateJour: '2024-01-30',
      nombreShifts: 3,
      tauxDispo: 95,
      designation: 'TRANSPALETTE ELECTRIQUE 1.5T',
      familleNormalisee: 'TRANSPALETTE ELECTRIQUE',
      month: 1,
      year: 2024,
      type: 'Electrique',
      status: 'available',
      location: 'Warehouse D'
    }
  ]);

  // Filter states
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Change tracking
  const [hasChanges, setHasChanges] = useState(false);
  const [draggedEngine, setDraggedEngine] = useState(null);

  // Get unique values for filters
  const engineFamilies = [...new Set(allEngines.map(engine => engine.familleNormalisee))];
  const engineTypes = [...new Set(allEngines.map(engine => engine.type))];

  // Filter engines based on current filters
  const filteredEngines = useMemo(() => {
    return allEngines.filter(engine => {
      const matchesDate = !selectedDate || engine.dateJour === selectedDate;
      const matchesShift = !selectedShift || engine.nombreShifts.toString() === selectedShift;
      const matchesFamily = !selectedFamily || engine.familleNormalisee === selectedFamily;
      const matchesType = !selectedType || engine.type === selectedType;
      const matchesSearch = !searchTerm ||
        engine.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        engine.designation.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesDate && matchesShift && matchesFamily && matchesType && matchesSearch;
    });
  }, [allEngines, selectedDate, selectedShift, selectedFamily, selectedType, searchTerm]);

  const availableEngines = filteredEngines.filter(engine => engine.status === 'available');
  const unavailableEngines = filteredEngines.filter(engine => engine.status === 'unavailable');

  const moveToUnavailable = (engine) => {
    setAllEngines(prevEngines =>
      prevEngines.map(e =>
        e.id === engine.id
          ? { ...e, status: 'unavailable', reason: 'Manual Assignment', estimatedReturn: '2024-02-28' }
          : e
      )
    );
    setHasChanges(true);
  };

  const moveToAvailable = (engine) => {
    setAllEngines(prevEngines =>
      prevEngines.map(e =>
        e.id === engine.id
          ? { ...e, status: 'available', reason: undefined, estimatedReturn: undefined }
          : e
      )
    );
    setHasChanges(true);
  };

  // Drag and Drop handlers
  const handleDragStart = (e, engine) => {
    setDraggedEngine(engine);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnAvailable = (e) => {
    e.preventDefault();
    if (draggedEngine && draggedEngine.status === 'unavailable') {
      moveToAvailable(draggedEngine);
    }
    setDraggedEngine(null);
  };

  const handleDropOnUnavailable = (e) => {
    e.preventDefault();
    if (draggedEngine && draggedEngine.status === 'available') {
      moveToUnavailable(draggedEngine);
    }
    setDraggedEngine(null);
  };

  const saveChanges = () => {
    // This would typically make API calls to save changes
    console.log('Saving changes:', allEngines);
    setHasChanges(false);
    alert('Modifications sauvegardées avec succès!');
  };

  const clearFilters = () => {
    setSelectedDate('');
    setSelectedShift('');
    setSelectedFamily('');
    setSelectedType('');
    setSearchTerm('');
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
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                    Disponibilité des Engins
                  </h1>
                  <p className="text-gray-600 mt-1 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-amber-500" />
                    Surveillance intelligente et gestion en temps réel
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

                <button
                  onClick={saveChanges}
                  disabled={!hasChanges}
                  className={`
                    relative flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform
                    ${hasChanges
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  <Save className="w-5 h-5 mr-2" />
                  Sauvegarder
                  {hasChanges && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  )}
                </button>
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
                  <p className="text-sm text-gray-600">Affinez votre recherche avec précision</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {/* Date Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  📅 Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Shift Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  👥 Équipe
                </label>
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                >
                  <option value="">Toutes les Équipes</option>
                  <option value="1">Équipe 1</option>
                  <option value="2">Équipe 2</option>
                  <option value="3">Équipe 3</option>
                </select>
              </div>

              {/* Engine Family Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  🏗️ Famille d'Engin
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

              {/* Engine Type Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  ⚙️ Type d'Engin
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

              {/* Search Bar */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  🔍 Recherche Intelligente
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher par ID, désignation, famille..."
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
            </div>
          </div>
        </div>

        {/* Premium Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Available Engines Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Engins Disponibles</p>
                    <p className="text-3xl font-bold text-gray-900">{availableEngines.length}</p>
                  </div>
                </div>
                <div className="text-right">
                  <TrendingUp className="h-5 w-5 text-green-500 mb-1" />
                  <p className="text-xs text-green-600 font-medium">+2.3%</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: `${(availableEngines.length / (availableEngines.length + unavailableEngines.length)) * 100}%`}}></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-600">Opérationnel</span>
              </div>
            </div>
          </div>

          {/* Unavailable Engines Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-rose-50 opacity-50"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <AlertTriangle className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Engins Indisponibles</p>
                    <p className="text-3xl font-bold text-gray-900">{unavailableEngines.length}</p>
                  </div>
                </div>
                <div className="text-right">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mb-1" />
                  <p className="text-xs text-red-600 font-medium">Attention</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-500 to-rose-500 h-2 rounded-full" style={{width: `${(unavailableEngines.length / (availableEngines.length + unavailableEngines.length)) * 100}%`}}></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-600">En maintenance</span>
              </div>
            </div>
          </div>

          {/* Availability Rate Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Activity className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Taux de Disponibilité</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {Math.round((availableEngines.length / (availableEngines.length + unavailableEngines.length)) * 100)}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <TrendingUp className="h-5 w-5 text-blue-500 mb-1" />
                  <p className="text-xs text-blue-600 font-medium">Excellent</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Performance</span>
                  <span className="font-medium">
                    {Math.round((availableEngines.length / (availableEngines.length + unavailableEngines.length)) * 100)}%
                  </span>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{width: `${Math.round((availableEngines.length / (availableEngines.length + unavailableEngines.length)) * 100)}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Engines Table */}
          <div
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
            onDragOver={handleDragOver}
            onDrop={handleDropOnAvailable}
          >
            <div className="relative px-6 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Engins Disponibles</h2>
                    <p className="text-green-100 text-sm">Prêts pour utilisation</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{availableEngines.length}</div>
                  <div className="text-green-100 text-xs">Opérationnels</div>
                </div>
              </div>
              <div className="relative mt-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-green-100 flex items-center">
                  <GripVertical className="w-4 h-4 mr-2" />
                  Glissez les engins indisponibles ici pour les activer
                </p>
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
                      🏗️ Famille
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                      ⚙️ Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                      🎯 Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {availableEngines.map((engine, index) => (
                    <tr
                      key={engine.id}
                      className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 cursor-move transition-all duration-200 group"
                      draggable
                      onDragStart={(e) => handleDragStart(e, engine)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-sm"></div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900">{engine.id}</span>
                            <span className="text-xs text-gray-500">#{index + 1}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">{engine.designation}</div>
                          <div className="text-xs text-gray-500">Disponible maintenant</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {engine.familleNormalisee}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          engine.type === 'Roulant'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {engine.type === 'Roulant' ? '🚛' : '⚡'} {engine.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => moveToUnavailable(engine)}
                          className="group flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-110"
                          title="Marquer comme indisponible"
                        >
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        </div>

          {/* Unavailable Engines Table */}
          <div
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
            onDragOver={handleDragOver}
            onDrop={handleDropOnUnavailable}
          >
            <div className="relative px-6 py-5 bg-gradient-to-r from-red-500 to-rose-600 text-white">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Engins Indisponibles</h2>
                    <p className="text-red-100 text-sm">En maintenance ou réparation</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{unavailableEngines.length}</div>
                  <div className="text-red-100 text-xs">Hors service</div>
                </div>
              </div>
              <div className="relative mt-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-red-100 flex items-center">
                  <GripVertical className="w-4 h-4 mr-2" />
                  Glissez les engins disponibles ici pour les désactiver
                </p>
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
                      🏗️ Famille
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                      ⚙️ Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                      🎯 Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {unavailableEngines.map((engine, index) => (
                    <tr
                      key={engine.id}
                      className="hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 cursor-move transition-all duration-200 group"
                      draggable
                      onDragStart={(e) => handleDragStart(e, engine)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                            <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-rose-500 rounded-full shadow-sm animate-pulse"></div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900">{engine.id}</span>
                            <span className="text-xs text-red-500">#{index + 1} • Hors service</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">{engine.designation}</div>
                          <div className="text-xs text-red-500 flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            En maintenance
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {engine.familleNormalisee}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          engine.type === 'Roulant'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {engine.type === 'Roulant' ? '🚛' : '⚡'} {engine.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => moveToAvailable(engine)}
                          className="group flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 transition-all duration-200 hover:scale-110"
                          title="Marquer comme disponible"
                        >
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Disponibility;
