import React, { useState } from 'react'
import supabase from '../../utils/supabase';

const WeekSelectionDropDown = () => {

    const [selectedWeek, setSelectedWeek] = useState(null);

  const weeks = [
    { id: 1, label: "Semana 1 (3 Ago – 9 Ago)", value: "2025-08-03" },
    { id: 2, label: "Semana 2 (10 Ago – 16 Ago)", value: "2025-08-10" },
    { id: 3, label: "Semana 3 (17 Ago – 23 Ago)", value: "2025-08-17" },
    { id: 4, label: "Semana 4 (24 Ago – 30 Ago)", value: "2025-08-24" },
  ];

  const handleSelect = async (value) => {

    setSelectedWeek(value);

    const inventoryMovementsRows = await supabase
      .from('InventoryMovements')
      .select()
       .gte('countDate', '2025-08-03') // Start date (inclusive)
        .lte('countDate', '2025-08-09'); // End date (inclusive)

    // console.log({inventoryMovementsRows})

    inventoryMovementsRows?.data?.map(row => {
      console.log({row})
    })

  };

  console.log({selectedWeek})

    return (
        <>
            <h1 className='text-xl text-bold'>Selección de semana de conteo</h1>

            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>


            <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {
                      weeks.map(week => (
                        <li className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selectedWeek === week.value && "dark:bg-primary-700"}`} onClick={() => handleSelect(week.value)}>{week.label}</li>
                      ))
                    }
                </ul>
            </div>
          
            
           {/* <div className='my-4'>
             <h1 className='text-xl font-bold'>Periodo abarca</h1>
            <p>Domingo 22 de Junio - Sábado 28 de Junio</p>
           </div> */}
        </>
    )
}

export default WeekSelectionDropDown