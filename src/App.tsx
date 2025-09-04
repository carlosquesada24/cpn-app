import './App.css'
import Chart from "react-apexcharts";
import { getThisMonthName } from './utils/dates';
import { readVentaHabitacionesReport, readVentasSkillReport, getNetSalesBooking, getNetSalesRestaurant, readIngresosyGastosReport } from './utils/csv';
import { useEffect, useState } from 'react';
import { readElectronicInvoice } from './utils/electronic-invoices';
import { chart3 } from './data';

function App() {

const [netSalesRooms, setNetSalesRooms] = useState(0)
const [netSalesRestaurant, setNetSalesRestaurant] = useState(0)

  const [netSales, setNetSales] = useState(0)

const thisMonthName = getThisMonthName()


useEffect(() => {
readElectronicInvoice()
}, [])

    // runIngresosyGastos();

    readVentaHabitacionesReport().then(limitedRows => {
      console.log({limitedRowsVentaHabitaciones: limitedRows})

      const netSalesBooking = getNetSalesBooking(limitedRows)

      setNetSalesRooms(netSalesBooking)
    })

    // fetchVentasSkill().then(limitedRows => {
    //   console.log({limitedRows})



    //   const netSales = getNetSalesRestaurant(limitedRows)
    //   setNetSalesRestaurant(netSales)
    // })
  
  const totalIncome = netSalesRestaurant + netSalesRooms //Esto es de solo 1 dia, tengo que hacerlo en todos
  const totalExpenses = 500

  return (
    <>    
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      
      <h2 className='text-1xl font-bold'>Mes: {thisMonthName}</h2>


      <div className="mb-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ingresos totales</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{totalIncome}</p>
         
      </div>


      <div className="mb-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Gastos totales</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{totalExpenses}</p>
          
      </div>

      <h1 className='text-2xl font-bold'>Anual</h1>

      <Chart
        options={chart3.options}
        series={chart3.series}
        type="line"
        width="100%"
      />
    </>
  )
}

export default App
