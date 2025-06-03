import React, { useState } from 'react';
import { 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Loader,
  Search,
  Filter
} from 'lucide-react';

const BulkDelete = ({ engines, onDelete, onCancel, isLoading = false }) => {
  const [selectedEngines, setSelectedEngines] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Get unique engine types for filter
  const engineTypes = [...new Set(engines.map(engine => engine.type))];

  // Filter engines based on search and type
  const filteredEngines = engines.filter(engine => {
    const matchesSearch = !searchTerm || 
      engine.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engine.designation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filterType || engine.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Handle individual engine selection
  const toggleEngine = (engineId) => {
    const newSelected = new Set(selectedEngines);
    if (newSelected.has(engineId)) {
      newSelected.delete(engineId);
    } else {
      newSelected.add(engineId);
    }
    setSelectedEngines(newSelected);
  };

  // Handle select all/none
  const toggleSelectAll = () => {
    if (selectedEngines.size === filteredEngines.length) {
      setSelectedEngines(new Set());
    } else {
      setSelectedEngines(new Set(filteredEngines.map(engine => engine.id)));
    }
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    if (selectedEngines.size === 0) return;
    
    try {
      await onDelete(Array.from(selectedEngines));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // Get selected engines data
  const selectedEnginesData = engines.filter(engine => selectedEngines.has(engine.id));

  if (confirmDelete) {
    return (
      <div className="space-y-6">
        {/* Confirmation Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Confirmer la Suppression
          </h3>
          <p className="text-gray-600">
            Êtes-vous sûr de vouloir supprimer {selectedEngines.size} engin(s) ?
          </p>
        </div>

        {/* Selected Engines Summary */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h4 className="font-medium text-red-800 mb-3">
            Engins à supprimer ({selectedEngines.size}):
          </h4>
          <div className="max-h-32 overflow-y-auto space-y-2">
            {selectedEnginesData.map(engine => (
              <div key={engine.id} className="flex items-center justify-between text-sm">
                <span className="font-medium text-red-700">{engine.id}</span>
                <span className="text-red-600 truncate ml-2">{engine.designation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">⚠️ Attention:</p>
              <ul className="space-y-1">
                <li>• Cette action est irréversible</li>
                <li>• Toutes les données liées seront également supprimées</li>
                <li>• Les historiques de disponibilité et d'affectation seront perdus</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Confirmation Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            onClick={() => setConfirmDelete(false)}
            disabled={isLoading}
            className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4 mr-2" />
            Annuler
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            Supprimer Définitivement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Trash2 className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Suppression en Lot
        </h3>
        <p className="text-gray-600">
          Sélectionnez les engins à supprimer
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher par ID ou désignation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Type Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tous les types</option>
            {engineTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Selection Summary */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filteredEngines.length > 0 && selectedEngines.size === filteredEngines.length}
              onChange={toggleSelectAll}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Tout sélectionner ({filteredEngines.length})
            </span>
          </label>
        </div>
        
        <div className="text-sm text-gray-600">
          {selectedEngines.size} engin(s) sélectionné(s)
        </div>
      </div>

      {/* Engines List */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="max-h-64 overflow-y-auto">
          {filteredEngines.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>Aucun engin trouvé</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredEngines.map(engine => (
                <label
                  key={engine.id}
                  className="flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedEngines.has(engine.id)}
                    onChange={() => toggleEngine(engine.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{engine.id}</p>
                        <p className="text-sm text-gray-600 truncate">{engine.designation}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {engine.type}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{engine.operating_hours || 0}h</p>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-4 h-4 mr-2" />
          Annuler
        </button>
        
        <button
          onClick={() => setConfirmDelete(true)}
          disabled={selectedEngines.size === 0 || isLoading}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Supprimer ({selectedEngines.size})
        </button>
      </div>
    </div>
  );
};

export default BulkDelete;
