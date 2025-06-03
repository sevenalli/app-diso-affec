
import React, { useState, useMemo, useEffect } from 'react';
import {
  Settings,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Zap,
  Loader,
  Upload
} from 'lucide-react';
import { enginesAPI } from '../services/api';
import Modal from '../components/Modal';
import EngineForm from '../components/EngineForm';
import ExcelImport from '../components/ExcelImport';
import BulkDelete from '../components/BulkDelete';
import { useToast, ToastContainer } from '../components/Toast';

function Engines() {
  // State management
  const [allEngines, setAllEngines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create', 'edit', 'import', 'bulkDelete'

  // Toast notifications
  const { toasts, success, error, removeToast } = useToast();

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('');

  // Load engines data
  useEffect(() => {
    loadEngines();
  }, []);

  const loadEngines = async () => {
    try {
      setLoading(true);
      const response = await enginesAPI.getAll();
      setAllEngines(response.engines || []);
    } catch (err) {
      console.error('Error loading engines:', err);
      error('Erreur lors du chargement des engins: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);

      if (selectedEngine) {
        // Update existing engine
        await enginesAPI.update(selectedEngine.id, formData);
        success('Engin modifié avec succès!');
      } else {
        // Create new engine
        await enginesAPI.create(formData);
        success('Engin créé avec succès!');
      }

      // Reload engines and close modal
      await loadEngines();
      setIsModalOpen(false);
      setSelectedEngine(null);
    } catch (err) {
      console.error('Error saving engine:', err);
      error('Erreur lors de la sauvegarde: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete engine
  const handleDeleteEngine = async (engineId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet engin?')) {
      return;
    }

    try {
      await enginesAPI.delete(engineId);
      success('Engin supprimé avec succès!');
      await loadEngines();
    } catch (err) {
      console.error('Error deleting engine:', err);
      error('Erreur lors de la suppression: ' + err.message);
    }
  };

  // Handle Excel import
  const handleExcelImport = async (engines) => {
    try {
      setIsSubmitting(true);
      const response = await enginesAPI.bulkCreate(engines);

      if (response.errors && response.errors.length > 0) {
        const errorCount = response.errors.length;
        const successCount = response.createdEngines.length;

        if (successCount > 0) {
          success(`${successCount} engin(s) importé(s) avec succès. ${errorCount} erreur(s) détectée(s).`);
        } else {
          error(`Échec de l'importation. ${errorCount} erreur(s) détectée(s).`);
        }
      } else {
        success(`${engines.length} engin(s) importé(s) avec succès!`);
      }

      await loadEngines();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error importing engines:', err);
      error('Erreur lors de l\'importation: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async (engineIds) => {
    try {
      setIsSubmitting(true);
      const response = await enginesAPI.bulkDelete(engineIds);

      if (response.errors && response.errors.length > 0) {
        const errorCount = response.errors.length;
        const successCount = response.deletedEngines.length;

        if (successCount > 0) {
          success(`${successCount} engin(s) supprimé(s) avec succès. ${errorCount} erreur(s) détectée(s).`);
        } else {
          error(`Échec de la suppression. ${errorCount} erreur(s) détectée(s).`);
        }
      } else {
        success(`${engineIds.length} engin(s) supprimé(s) avec succès!`);
      }

      await loadEngines();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error deleting engines:', err);
      error('Erreur lors de la suppression: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal handlers
  const openCreateModal = () => {
    setSelectedEngine(null);
    setModalType('create');
    setIsModalOpen(true);
  };

  const openEditModal = (engine) => {
    setSelectedEngine(engine);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const openImportModal = () => {
    setSelectedEngine(null);
    setModalType('import');
    setIsModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setSelectedEngine(null);
    setModalType('bulkDelete');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEngine(null);
    setModalType('create');
  };

  // Get unique values for filters
  const engineFamilies = [...new Set(allEngines.map(engine => engine.famille_normalisee))];
  const engineTypes = [...new Set(allEngines.map(engine => engine.type))];

  // Filtered engines
  const filteredEngines = useMemo(() => {
    return allEngines.filter(engine => {
      const matchesSearch = !searchTerm ||
        engine.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        engine.designation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || engine.type === selectedType;
      const matchesFamily = !selectedFamily || engine.famille_normalisee === selectedFamily;

      return matchesSearch && matchesType && matchesFamily;
    });
  }, [allEngines, searchTerm, selectedType, selectedFamily]);

  // Statistics (simplified for now - will be enhanced with real availability data)
  const averageOperatingHours = filteredEngines.length > 0
    ? Math.round(filteredEngines.reduce((sum, engine) => sum + (engine.operating_hours || 0), 0) / filteredEngines.length)
    : 0;

  const clearFilters = () => {
    setSearchTerm('');
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
                  onClick={openImportModal}
                  className="flex items-center px-3 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
                  title="Importer depuis Excel"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Importer</span>
                </button>

                <button
                  onClick={openBulkDeleteModal}
                  disabled={allEngines.length === 0}
                  className="flex items-center px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Suppression en lot"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Suppr. Lot</span>
                </button>

                <button
                  onClick={openCreateModal}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
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
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Engins</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredEngines.length}</p>
                  </div>
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Types Count Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-rose-50 opacity-50"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Types</p>
                    <p className="text-2xl font-bold text-gray-900">{engineTypes.length}</p>
                  </div>
                </div>
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </div>

          {/* Families Count Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Familles</p>
                    <p className="text-2xl font-bold text-gray-900">{engineFamilies.length}</p>
                  </div>
                </div>
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Average Operating Hours Card */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-50 opacity-50"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Heures Moy.</p>
                    <p className="text-2xl font-bold text-gray-900">{averageOperatingHours}h</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Search Bar */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  🔍 Recherche Intelligente
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher par ID, désignation..."
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
                    ⚙️ Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    🏗️ Famille
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    ⏱️ Heures Fonct.
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    ⛽ Carburant
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50">
                    🎯 Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Loader className="w-6 h-6 animate-spin text-blue-600" />
                        <span className="text-gray-600">Chargement des engins...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredEngines.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">Aucun engin trouvé</p>
                        <p className="text-sm">Essayez de modifier vos filtres ou ajoutez un nouvel engin</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEngines.map((engine, index) => (
                    <tr
                      key={engine.id}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full shadow-sm bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900">{engine.id}</span>
                            <span className="text-xs text-gray-500">#{index + 1}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">{engine.designation}</div>
                          <div className="text-xs text-gray-500">Créé: {new Date(engine.created_at).toLocaleDateString('fr-FR')}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {engine.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{engine.famille_normalisee}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{engine.operating_hours || 0}h</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {engine.fuel_consumption ? `${engine.fuel_consumption}L` : '⚡ Électrique'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openEditModal(engine)}
                            className="group flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 transition-all duration-200 hover:scale-110"
                            title="Modifier"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEngine(engine.id)}
                            className="group flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-110"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Add/Edit/Import/BulkDelete Engine */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={
            modalType === 'import' ? 'Importer des Engins' :
            modalType === 'bulkDelete' ? 'Suppression en Lot' :
            selectedEngine ? 'Modifier Engin' : 'Ajouter Nouvel Engin'
          }
          size={modalType === 'import' || modalType === 'bulkDelete' ? 'xl' : 'lg'}
        >
          {modalType === 'import' ? (
            <ExcelImport
              onImport={handleExcelImport}
              onCancel={closeModal}
              isLoading={isSubmitting}
            />
          ) : modalType === 'bulkDelete' ? (
            <BulkDelete
              engines={allEngines}
              onDelete={handleBulkDelete}
              onCancel={closeModal}
              isLoading={isSubmitting}
            />
          ) : (
            <EngineForm
              engine={selectedEngine}
              onSubmit={handleFormSubmit}
              onCancel={closeModal}
              isLoading={isSubmitting}
            />
          )}
        </Modal>

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </div>
  );
}

export default Engines;

