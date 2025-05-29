import React, { useState, useMemo } from 'react';
import {ArrowRight , ArrowLeft} from 'lucide-react';


function Affectation() {
    const [allEngines, setAllEngines] = useState([
        {
          id: 'MM1ET00803',
          dateJour: '2024-01-31',
          nombreShifts: 3,
          designation: 'ELEVATEUR THERMIQUE DCOSAN 8T',
          familleNormalisee: 'CHARIOT ELEVATEUR THERMIQUE',
          type: 'Roulant',
          status: 'available'
          
        },
        {
          id: 'MM1ET00804',
          dateJour: '2024-01-15',
          nombreShifts: 3,
          designation: 'ELEVATEUR THERMIQUE DCOSAN 8T',
          familleNormalisee: 'CHARIOT ELEVATEUR THERMIQUE',
          type: 'Roulant',
          
          status: 'available'
        },
        {
          id: 'MM1ET00805',
          dateJour: '2024-01-20',
          nombreShifts: 2,           
          designation: 'ELEVATEUR THERMIQUE DCOSAN 8T',
          familleNormalisee: 'CHARIOT ELEVATEUR THERMIQUE',
          type: 'Roulant',  
          status: 'Affected'           
        },
        {
          id: 'MM1ET00806',
          dateJour: '2024-01-25',
          nombreShifts: 3,
          designation: 'CHARIOT ELEVATEUR ELECTRIQUE 2T',
          familleNormalisee: 'CHARIOT ELEVATEUR ELECTRIQUE',
          type: 'Roulant',
          status: 'Affected'
        },
        {
          id: 'MM1ET00807',
          dateJour: '2024-01-28',
          nombreShifts: 1,
          designation: 'CHARIOT ELEVATEUR ELECTRIQUE 2T',
          familleNormalisee: 'CHARIOT ELEVATEUR ELECTRIQUE',
          type: 'Roulant',
          status: 'Affected'

        },
        {
          id: 'MM1ET00808',
          dateJour: '2024-01-30',
          nombreShifts: 3,
          designation: 'TRANSPALETTE ELECTRIQUE 1.5T',
          familleNormalisee: 'TRANSPALETTE ELECTRIQUE',
          type: 'Roulant',
          status: 'Affected'

        }
      ]);
        // Filter states
        const [selectedDate, setSelectedDate] = useState('');
        const [selectedShift, setSelectedShift] = useState('');
        const [selectedFamily, setSelectedFamily] = useState('');
        const [selectedType, setSelectedType] = useState('');
        const [searchTerm, setSearchTerm] = useState('');
        const engineFamilies = [...new Set(allEngines.map(engine => engine.familleNormalisee))];
        const engineTypes = [...new Set(allEngines.map(engine => engine.type))];
        const FilteredEngines = useMemo(() => {
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
            
        });


        const availableEngines = FilteredEngines.filter(engine => engine.status === 'available');
        const affectedEngines = FilteredEngines.filter(engine => engine.status === 'Affected');
    return (
        <div className="min-h-screen  from-slate-50 via-blue-50 to-indigo-50 flex max-w-screen flex-col justify-center gap-40  " >
            <div className="flex flex-row bg-red-500 h-10 w-full flex flex-row gap-40 justify-center">   </div>
           
            <div className="flex flex-row h-screen w-full flex flex-row gap-40 justify-center">
            
            <div className="nonaffected w-1/3 float-left  ">
            <div className="flex flex-col h-10 ">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">Engins Disponibles</h1>
            </div> 
            <table className="table-auto w-full">  
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Désignation</th>
                        <th className="px-4 py-2">Famille</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Action</th>  
                    </tr>
                </thead>
                <tbody>
                        {availableEngines.map((engine, index) => (
                            <tr key={engine.id}>
                                <td className="border px-4 py-2">{engine.id} </td>
                                <td className="border px-4 py-2">{engine.designation}</td>
                                <td className="border px-4 py-2">{engine.familleNormalisee}</td>
                                <td className="border px-4 py-2">{engine.type}</td>
                                <td className="border px-4 py-2">
                                <button className="group flex items-center justify-center w-8 h-8 rounded-lg hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-110"
                                  title="Marquer comme indisponible">
                                    <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                                </td>

                                
                            </tr>
                            ))
}
                </tbody>




            </table>
            </div>
            <div className="affected w-1/3 float-right h-screen">
            <table className="table-auto w-full">  
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Désignation</th>
                        <th className="px-4 py-2">Famille</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Action</th>  
                    </tr>
                </thead>
                <tbody>
                    {affectedEngines.map((engine, index) => (
                            <tr key={engine.id}>
                                <td className="border px-4 py-2">{engine.id}</td>
                                <td className="border px-4 py-2">{engine.designation}</td>
                                <td className="border px-4 py-2">{engine.familleNormalisee}</td>
                                <td className="border px-4 py-2">{engine.type}</td>
                                <td className="border px-4 py-2">
                                <button className="group flex items-center justify-center w-8 h-8 rounded-lg hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-110"
                                  title="Marquer comme indisponible">
                                    <ArrowLeft className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                                </td>

                                
                            </tr>
                            ))
                            }
                </tbody>




            </table>
            </div>
            </div>
        </div>
        
    );
}

export default Affectation;
