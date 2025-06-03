import React, { useState } from 'react';
import { Save, X, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const EngineForm = ({ 
  engine = null, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    id: engine?.id || '',
    designation: engine?.designation || '',
    famille_normalisee: engine?.famille_normalisee || '',
    type: engine?.type || '',
    operating_hours: engine?.operating_hours || 0,
    fuel_consumption: engine?.fuel_consumption || 0
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const engineTypes = ['Levage', 'Roulants', 'Accessoires'];
  
  const commonFamilies = [
  'ACCESSOIRES MANUTENTION',
'AUTO-GRUE',
'CHARGEUSE GRANDE CAPACITE',
'CHARGEUSE PETITE CAPACITE',
'CHARIOT ÉLÉVATEUR ELECTRIQUE',
'CHARIOT ÉLÉVATEUR THERMIQUE',
'CHARIOTS CAVALIERS',
'ÉLÉVATEUR POUR CONTENEUR',
'GRUES MOBILES',
'GRUES SUR RAIL',
'PORTIQUES A CONTENEURS',
'REACH-STACKER',
'TRACTEUR 25T',
'TRACTEUR 25T',
'TRACTEURS A SELETTE SOT',
  ];

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'id':
        if (!value.trim()) return 'ID est requis';
        if (!/^[A-Z0-9]+$/.test(value)) return 'ID doit contenir uniquement des lettres majuscules et des chiffres';
        if (value.length > 20) return 'ID ne peut pas dépasser 20 caractères';
        return '';
      
      case 'designation':
        if (!value.trim()) return 'Désignation est requise';
        if (value.length > 100) return 'Désignation ne peut pas dépasser 100 caractères';
        return '';
      
      case 'famille_normalisee':
        if (!value.trim()) return 'Famille normalisée est requise';
        if (value.length > 50) return 'Famille normalisée ne peut pas dépasser 50 caractères';
        return '';
      
      case 'type':
        if (!value) return 'Type est requis';
        if (!engineTypes.includes(value)) return 'Type invalide';
        return '';
      
      case 'operating_hours':
        if (value < 0) return 'Les heures de fonctionnement ne peuvent pas être négatives';
        if (value > 999999) return 'Valeur trop élevée';
        return '';
      
      case 'fuel_consumption':
        if (value < 0) return 'La consommation de carburant ne peut pas être négative';
        if (value > 9999.99) return 'Valeur trop élevée';
        return '';
      
      default:
        return '';
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? parseFloat(value) || 0 : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Validate field
    const error = validateField(name, processedValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Check if field has error and is touched
  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  const isFormValid = Object.keys(errors).length === 0 && 
    Object.values(formData).every(value => value !== '' && value !== null);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Engine ID */}
      <div>
        <label htmlFor="id" className="block text-sm font-semibold text-gray-700 mb-2">
          🆔 ID Engin *
        </label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={!!engine} // Disable editing ID for existing engines
          placeholder="Ex: MM1ET00809"
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
            getFieldError('id')
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400'
          } ${engine ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        {getFieldError('id') && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.id}
          </div>
        )}
      </div>

      {/* Designation */}
      <div>
        <label htmlFor="designation" className="block text-sm font-semibold text-gray-700 mb-2">
          📝 Désignation *
        </label>
        <input
          type="text"
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ex: ELEVATEUR THERMIQUE DCOSAN 8T"
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
            getFieldError('designation')
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400'
          }`}
        />
        {getFieldError('designation') && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.designation}
          </div>
        )}
      </div>

      {/* Famille Normalisée */}
      <div>
        <label htmlFor="famille_normalisee" className="block text-sm font-semibold text-gray-700 mb-2">
          🏗️ Famille Normalisée *
        </label>
        <select
          id="famille_normalisee"
          name="famille_normalisee"
          value={formData.famille_normalisee}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
            getFieldError('famille_normalisee')
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400'
          }`}
        >
          <option value="">Sélectionner une famille</option>
          {commonFamilies.map(family => (
            <option key={family} value={family}>
              {family}
            </option>
          ))}
        </select>
        {getFieldError('famille_normalisee') && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.famille_normalisee}
          </div>
        )}
      </div>

      {/* Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
          ⚙️ Type *
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
            getFieldError('type')
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400'
          }`}
        >
          <option value="">Sélectionner un type</option>
          {engineTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {getFieldError('type') && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.type}
          </div>
        )}
      </div>

      {/* Operating Hours and Fuel Consumption */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Operating Hours */}
        <div>
          <label htmlFor="operating_hours" className="block text-sm font-semibold text-gray-700 mb-2">
            ⏱️ Heures de Fonctionnement
          </label>
          <input
            type="number"
            id="operating_hours"
            name="operating_hours"
            value={formData.operating_hours}
            onChange={handleChange}
            onBlur={handleBlur}
            min="0"
            step="1"
            placeholder="0"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
              getFieldError('operating_hours')
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400'
            }`}
          />
          {getFieldError('operating_hours') && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.operating_hours}
            </div>
          )}
        </div>

        {/* Fuel Consumption */}
        <div>
          <label htmlFor="fuel_consumption" className="block text-sm font-semibold text-gray-700 mb-2">
            ⛽ Consommation Carburant (L)
          </label>
          <input
            type="number"
            id="fuel_consumption"
            name="fuel_consumption"
            value={formData.fuel_consumption}
            onChange={handleChange}
            onBlur={handleBlur}
            min="0"
            step="0.1"
            placeholder="0.0"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
              getFieldError('fuel_consumption')
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400'
            }`}
          />
          {getFieldError('fuel_consumption') && (
            <div className="mt-1 flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.fuel_consumption}
            </div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-4 h-4 mr-2" />
          Annuler
        </button>
        
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isLoading ? (
            <Loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {engine ? 'Modifier' : 'Créer'} Engin
        </button>
      </div>
    </form>
  );
};

export default EngineForm;
