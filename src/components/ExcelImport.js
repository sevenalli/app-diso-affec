import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { 
  Upload, 
  FileSpreadsheet, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Loader,
  Eye,
  Trash2
} from 'lucide-react';

const ExcelImport = ({ onImport, onCancel, isLoading = false }) => {
  const [parsedData, setParsedData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [fileName, setFileName] = useState('');
  const [step, setStep] = useState('upload'); // 'upload', 'preview', 'importing'

  // Expected columns for engine data
  const expectedColumns = [
    { key: 'id', label: 'ID', required: true },
    { key: 'designation', label: 'Désignation', required: true },
    { key: 'famille_normalisee', label: 'Famille Normalisée', required: true },
    { key: 'type', label: 'Type', required: true },
    { key: 'operating_hours', label: 'Heures Fonctionnement', required: false },
    { key: 'fuel_consumption', label: 'Consommation Carburant', required: false }
  ];

  const validTypes = ['Levage', 'Roulants', 'Accessoires'];

  // Validate a single engine record
  const validateEngine = (engine, index) => {
    const engineErrors = [];

    // Required fields validation
    if (!engine.id || engine.id.toString().trim() === '') {
      engineErrors.push(`Ligne ${index + 2}: ID est requis`);
    } else if (!/^[A-Z0-9]+$/.test(engine.id.toString().trim())) {
      engineErrors.push(`Ligne ${index + 2}: ID doit contenir uniquement des lettres majuscules et des chiffres`);
    }

    if (!engine.designation || engine.designation.toString().trim() === '') {
      engineErrors.push(`Ligne ${index + 2}: Désignation est requise`);
    }

    if (!engine.famille_normalisee || engine.famille_normalisee.toString().trim() === '') {
      engineErrors.push(`Ligne ${index + 2}: Famille Normalisée est requise`);
    }

    if (!engine.type || engine.type.toString().trim() === '') {
      engineErrors.push(`Ligne ${index + 2}: Type est requis`);
    } else if (!validTypes.includes(engine.type.toString().trim())) {
      engineErrors.push(`Ligne ${index + 2}: Type doit être ${validTypes.join(', ')}`);
    }

    // Optional fields validation
    if (engine.operating_hours && (isNaN(engine.operating_hours) || engine.operating_hours < 0)) {
      engineErrors.push(`Ligne ${index + 2}: Heures de fonctionnement doit être un nombre positif`);
    }

    if (engine.fuel_consumption && (isNaN(engine.fuel_consumption) || engine.fuel_consumption < 0)) {
      engineErrors.push(`Ligne ${index + 2}: Consommation carburant doit être un nombre positif`);
    }

    return engineErrors;
  };

  // Process Excel file
  const processFile = useCallback((file) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length < 2) {
          setErrors(['Le fichier doit contenir au moins une ligne d\'en-tête et une ligne de données']);
          return;
        }

        // Get headers from first row
        const headers = jsonData[0];
        const dataRows = jsonData.slice(1);

        // Map headers to expected columns
        const columnMapping = {};
        expectedColumns.forEach(col => {
          const headerIndex = headers.findIndex(h => 
            h && h.toString().toLowerCase().includes(col.label.toLowerCase().split(' ')[0])
          );
          if (headerIndex !== -1) {
            columnMapping[col.key] = headerIndex;
          }
        });

        // Check for required columns
        const missingColumns = expectedColumns
          .filter(col => col.required && !(col.key in columnMapping))
          .map(col => col.label);

        if (missingColumns.length > 0) {
          setErrors([`Colonnes manquantes: ${missingColumns.join(', ')}`]);
          return;
        }

        // Parse data rows
        const engines = [];
        const allErrors = [];

        dataRows.forEach((row, index) => {
          if (row.some(cell => cell !== null && cell !== undefined && cell !== '')) {
            const engine = {};
            
            // Map columns to engine properties
            Object.keys(columnMapping).forEach(key => {
              const cellValue = row[columnMapping[key]];
              if (cellValue !== null && cellValue !== undefined && cellValue !== '') {
                if (key === 'operating_hours' || key === 'fuel_consumption') {
                  engine[key] = parseFloat(cellValue) || 0;
                } else {
                  engine[key] = cellValue.toString().trim();
                }
              }
            });

            // Validate engine
            const engineErrors = validateEngine(engine, index);
            allErrors.push(...engineErrors);

            if (engineErrors.length === 0) {
              engines.push(engine);
            }
          }
        });

        setErrors(allErrors);
        setParsedData(engines);
        setStep('preview');

      } catch (error) {
        setErrors(['Erreur lors de la lecture du fichier: ' + error.message]);
      }
    };

    reader.readAsArrayBuffer(file);
  }, []);

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      setErrors([]);
      setParsedData([]);
      processFile(file);
    }
  }, [processFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    multiple: false
  });

  // Handle import
  const handleImport = async () => {
    if (parsedData.length === 0) return;
    
    setStep('importing');
    try {
      await onImport(parsedData);
    } catch (error) {
      setErrors(['Erreur lors de l\'importation: ' + error.message]);
      setStep('preview');
    }
  };

  // Download template
  const downloadTemplate = () => {
    const templateData = [
      ['ID', 'Désignation', 'Famille Normalisée', 'Type', 'Heures Fonctionnement', 'Consommation Carburant'],
      ['MM1ET00820', 'EXEMPLE CHARIOT ELEVATEUR', 'CHARIOT ELEVATEUR THERMIQUE', 'Roulants', '1500', '45.5'],
      ['MM1ET00821', 'EXEMPLE GRUE MOBILE', 'GRUE MOBILE', 'Levage', '2000', '85.2']
    ];

    const ws = XLSX.utils.aoa_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Engins');
    XLSX.writeFile(wb, 'template_engins.xlsx');
  };

  // Remove engine from preview
  const removeEngine = (index) => {
    const newData = parsedData.filter((_, i) => i !== index);
    setParsedData(newData);
  };

  if (step === 'importing') {
    return (
      <div className="text-center py-8">
        <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Importation en cours...
        </h3>
        <p className="text-gray-600">
          Importation de {parsedData.length} engin(s)
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <FileSpreadsheet className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Importer des Engins depuis Excel
        </h3>
        <p className="text-gray-600">
          Téléchargez un fichier Excel (.xlsx, .xls) ou CSV avec vos données d'engins
        </p>
      </div>

      {/* Download Template Button */}
      <div className="flex justify-center">
        <button
          onClick={downloadTemplate}
          className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Télécharger le Modèle Excel
        </button>
      </div>

      {step === 'upload' && (
        <>
          {/* File Drop Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-blue-600 font-medium">
                Déposez le fichier ici...
              </p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">
                  Glissez-déposez votre fichier Excel ici, ou cliquez pour sélectionner
                </p>
                <p className="text-sm text-gray-500">
                  Formats supportés: .xlsx, .xls, .csv
                </p>
              </div>
            )}
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 mb-2">Erreurs détectées:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {step === 'preview' && (
        <>
          {/* Preview Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold text-gray-900">
                Aperçu des données ({parsedData.length} engin(s))
              </h4>
            </div>
            <button
              onClick={() => {
                setStep('upload');
                setParsedData([]);
                setErrors([]);
                setFileName('');
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* File Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-sm text-blue-800">
              📁 Fichier: <span className="font-medium">{fileName}</span>
            </p>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">
                    Avertissements ({errors.length}):
                  </h4>
                  <div className="max-h-32 overflow-y-auto">
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {errors.slice(0, 10).map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                      {errors.length > 10 && (
                        <li className="font-medium">... et {errors.length - 10} autres erreurs</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Preview Table */}
          {parsedData.length > 0 && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="max-h-64 overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Désignation</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Famille</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heures</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parsedData.map((engine, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{engine.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{engine.designation}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{engine.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{engine.famille_normalisee}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{engine.operating_hours || 0}h</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => removeEngine(index)}
                            className="text-red-600 hover:text-red-800"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

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
        
        {step === 'preview' && parsedData.length > 0 && (
          <button
            onClick={handleImport}
            disabled={isLoading}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <Upload className="w-4 h-4 mr-2" />
            Importer {parsedData.length} Engin(s)
          </button>
        )}
      </div>
    </div>
  );
};

export default ExcelImport;
