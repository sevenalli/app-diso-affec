import React, { useState, useMemo } from 'react';
import {
  Layout,
  PageHeader,
  StatCard,
  FilterBar,
  Users,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  UserCheck,
  ArrowRight,
  ArrowLeft,
  Save,
  GripVertical
} from '../components/ui';

function Affectation() {
  // Sample engines data for affectation
  const [allEngines, setAllEngines] = useState([
    {
      id: 'MM1ET00803',
      dateJour: '2024-01-31',
      nombreShifts: 3,
      designation: 'ELEVATEUR THERMIQUE DCOSAN 8T',
      familleNormalisee: 'CHARIOT ELEVATEUR THERMIQUE',
      type: 'Levage',
      status: 'available',
      demandeur: null,
      dateAffectation: null
    },
    {
      id: 'MM1ET00804',
      dateJour: '2024-01-15',
      nombreShifts: 2,
      designation: 'CHARIOT ELEVATEUR ELECTRIQUE 3T',
      familleNormalisee: 'CHARIOT ELEVATEUR ELECTRIQUE',
      type: 'Roulants',
      status: 'available',
      demandeur: null,
      dateAffectation: null
    },
    {
      id: 'MM1ET00805',
      dateJour: '2024-01-20',
      nombreShifts: 1,
      designation: 'TRACTEUR INDUSTRIEL 5T',
      familleNormalisee: 'TRACTEUR INDUSTRIEL',
      type: 'Roulants',
      status: 'affected',
      demandeur: 'SMA',
      dateAffectation: '2024-02-01'
    },
    {
      id: 'MM1ET00806',
      dateJour: '2024-01-25',
      nombreShifts: 3,
      designation: 'GRUE MOBILE 10T',
      familleNormalisee: 'GRUE MOBILE',
      type: 'Levage',
      status: 'affected',
      demandeur: 'DEPA',
      dateAffectation: '2024-01-28'
    },
    {
      id: 'MM1ET00807',
      dateJour: '2024-01-28',
      nombreShifts: 2,
      designation: 'TRANSPALETTE ELECTRIQUE 2T',
      familleNormalisee: 'TRANSPALETTE ELECTRIQUE',
      type: 'Accessoires',
      status: 'available',
      demandeur: null,
      dateAffectation: null
    },
    {
      id: 'MM1ET00808',
      dateJour: '2024-01-30',
      nombreShifts: 3,
      designation: 'NACELLE ELEVATRICE 12M',
      familleNormalisee: 'NACELLE ELEVATRICE',
      type: 'Accessoires',
      status: 'affected',
      demandeur: 'SMA',
      dateAffectation: '2024-02-02'
    },
    {
      id: 'MM1ET00809',
      dateJour: '2024-02-01',
      nombreShifts: 1,
      designation: 'PONT ROULANT 15T',
      familleNormalisee: 'PONT ROULANT',
      type: 'Levage',
      status: 'available',
      demandeur: null,
      dateAffectation: null
    },
    {
      id: 'MM1ET00810',
      dateJour: '2024-02-03',
      nombreShifts: 2,
      designation: 'CHARIOT TELESCOPIQUE 4T',
      familleNormalisee: 'CHARIOT TELESCOPIQUE',
      type: 'Roulants',
      status: 'affected',
      demandeur: 'DEPA',
      dateAffectation: '2024-02-05'
    }
  ]);
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDemandeur, setSelectedDemandeur] = useState('');

  // Change tracking
  const [hasChanges, setHasChanges] = useState(false);
  const [draggedEngine, setDraggedEngine] = useState(null);

  // Get unique values for filters
  const engineFamilies = [...new Set(allEngines.map(engine => engine.familleNormalisee))];

  // Filtered engines
  const filteredEngines = useMemo(() => {
    return allEngines.filter(engine => {
      const matchesSearch = !searchTerm ||
        engine.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        engine.designation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesShift = !selectedShift || engine.nombreShifts.toString() === selectedShift;
      const matchesDate = !selectedDate || engine.dateJour === selectedDate;
      const matchesFamily = !selectedFamily || engine.familleNormalisee === selectedFamily;
      const matchesType = !selectedType || engine.type === selectedType;
      const matchesDemandeur = !selectedDemandeur || engine.demandeur === selectedDemandeur;

      return matchesSearch && matchesShift && matchesDate && matchesFamily && matchesType && matchesDemandeur;
    });
  }, [allEngines, searchTerm, selectedShift, selectedDate, selectedFamily, selectedType, selectedDemandeur]);

  // Separate available and affected engines
  const availableEngines = filteredEngines.filter(engine => engine.status === 'available');
  const affectedEngines = filteredEngines.filter(engine => engine.status === 'affected');

  // Move functions
  const moveToAffected = (engine) => {
    setAllEngines(prevEngines =>
      prevEngines.map(e =>
        e.id === engine.id
          ? { ...e, status: 'affected', demandeur: 'SMA', dateAffectation: new Date().toISOString().split('T')[0] }
          : e
      )
    );
    setHasChanges(true);
  };

  const moveToAvailable = (engine) => {
    setAllEngines(prevEngines =>
      prevEngines.map(e =>
        e.id === engine.id
          ? { ...e, status: 'available', demandeur: null, dateAffectation: null }
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
    if (draggedEngine && draggedEngine.status === 'affected') {
      moveToAvailable(draggedEngine);
    }
    setDraggedEngine(null);
  };

  const handleDropOnAffected = (e) => {
    e.preventDefault();
    if (draggedEngine && draggedEngine.status === 'available') {
      moveToAffected(draggedEngine);
    }
    setDraggedEngine(null);
  };

  const saveChanges = () => {
    console.log('Saving changes:', allEngines);
    setHasChanges(false);
    alert('Modifications sauvegardées avec succès!');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedShift('');
    setSelectedDate('');
    setSelectedFamily('');
    setSelectedType('');
    setSelectedDemandeur('');
  };
  return (
    <Layout>
      {/* Page Header */}
      <PageHeader
        title="Affectation des Engins"
        subtitle={
          <div className="flex items-center">
            <UserCheck className="w-4 h-4 mr-2 text-amber-500" />
            Gestion des affectations et assignation des engins
          </div>
        }
        icon={Users}
        actions={[
          {
            icon: Save,
            children: hasChanges ? 'Sauvegarder' : 'Sauvegardé',
            variant: hasChanges ? 'success' : 'secondary',
            onClick: saveChanges,
            disabled: !hasChanges
          }
        ]}
      />

      {/* Statistics Dashboard */}
      <Layout.Grid cols={4}>
        <StatCard
          title="Disponibles"
          value={availableEngines.length}
          subtitle="Engins libres"
          icon={CheckCircle}
          color="green"
          trend={TrendingUp}
          trendValue="Prêts"
        />

        <StatCard
          title="Affectés"
          value={affectedEngines.length}
          subtitle="Engins assignés"
          icon={Activity}
          color="blue"
          trend={Activity}
          trendValue="En mission"
        />

        <StatCard
          title="Total"
          value={filteredEngines.length}
          subtitle="Engins filtrés"
          icon={Users}
          color="purple"
          trend={TrendingUp}
          trendValue="Flotte"
        />

        <StatCard
          title="Taux Affectation"
          value={`${filteredEngines.length > 0 ? Math.round((affectedEngines.length / filteredEngines.length) * 100) : 0}%`}
          subtitle="Utilisation de la flotte"
          icon={TrendingUp}
          color="amber"
          trend={Activity}
          trendValue="Performance"
          progress={filteredEngines.length > 0 ? Math.round((affectedEngines.length / filteredEngines.length) * 100) : 0}
          progressLabel="Affectation"
        />
      </Layout.Grid>

      {/* Filter Bar */}
      <FilterBar
        title="Filtres Avancés"
        subtitle="Recherchez et filtrez les engins pour affectation"
        onClearFilters={clearFilters}
      >
        <FilterBar.Grid columns={6}>
          <FilterBar.Input
            label="Recherche Intelligente"
            emoji="🔍"
            type="search"
            placeholder="Rechercher par ID, désignation..."
            value={searchTerm}
            onChange={setSearchTerm}
            clearable
          />

          <FilterBar.Input
            label="Shift"
            emoji="⏰"
            type="select"
            placeholder="Tous les Shifts"
            value={selectedShift}
            onChange={setSelectedShift}
            options={[
              { value: '1', label: 'Shift 1' },
              { value: '2', label: 'Shift 2' },
              { value: '3', label: 'Shift 3' }
            ]}
          />

          <FilterBar.Input
            label="Date"
            emoji="�"
            type="date"
            value={selectedDate}
            onChange={setSelectedDate}
          />

          <FilterBar.Input
            label="Famille Normalisée"
            emoji="🏗️"
            type="select"
            placeholder="Toutes les Familles"
            value={selectedFamily}
            onChange={setSelectedFamily}
            options={engineFamilies}
          />

          <FilterBar.Input
            label="Type"
            emoji="⚙️"
            type="select"
            placeholder="Tous les Types"
            value={selectedType}
            onChange={setSelectedType}
            options={[
              { value: 'Levage', label: 'Levage' },
              { value: 'Roulants', label: 'Roulants' },
              { value: 'Accessoires', label: 'Accessoires' }
            ]}
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
        </FilterBar.Grid>
      </FilterBar>

      {/* Two Side-by-Side Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Engines Table */}
        <div
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          onDrop={handleDropOnAvailable}
          onDragOver={handleDragOver}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-5 text-white">
            <div className="relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Engins Disponibles</h2>
                    <p className="text-green-100 text-sm">Prêts pour affectation</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{availableEngines.length}</div>
                  <div className="text-green-100 text-xs">Disponibles</div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto max-h-96">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    🆔 ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    📝 Désignation
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    🏗️ Famille
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    ⚙️ Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    🎯 Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {availableEngines.map((engine) => (
                  <tr
                    key={engine.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, engine)}
                    className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 group cursor-move"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-green-500" />
                        <span className="text-sm font-bold text-gray-900">{engine.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900 truncate max-w-xs">{engine.designation}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600">{engine.familleNormalisee}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        {engine.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => moveToAffected(engine)}
                        className="group flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 transition-all duration-200 hover:scale-110"
                        title="Affecter cet engin"
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

        {/* Affected Engines Table */}
        <div
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          onDrop={handleDropOnAffected}
          onDragOver={handleDragOver}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5 text-white">
            <div className="relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Engins Affectés</h2>
                    <p className="text-blue-100 text-sm">En mission</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{affectedEngines.length}</div>
                  <div className="text-blue-100 text-xs">Affectés</div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto max-h-96">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    🆔 ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    📝 Désignation
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    🏗️ Famille
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    🏢 Demandeur
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    🎯 Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {affectedEngines.map((engine) => (
                  <tr
                    key={engine.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, engine)}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group cursor-move"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                        <span className="text-sm font-bold text-gray-900">{engine.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900 truncate max-w-xs">{engine.designation}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600">{engine.familleNormalisee}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        engine.demandeur === 'SMA'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {engine.demandeur === 'SMA' ? '🔧 SMA' : '🏭 DEPA'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => moveToAvailable(engine)}
                        className="group flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-110"
                        title="Libérer cet engin"
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

      {/* Save Changes Notification */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-amber-100 border border-amber-200 rounded-xl p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800">
                  Modifications non sauvegardées
                </p>
                <p className="text-xs text-amber-600">
                  Cliquez sur "Sauvegarder" pour enregistrer les changements
                </p>
              </div>
              <button
                onClick={saveChanges}
                className="flex items-center px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                <Save className="w-4 h-4 mr-1" />
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Affectation;
