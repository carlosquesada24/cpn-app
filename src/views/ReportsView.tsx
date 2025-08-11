import supabase from "../utils/supabase";
import { useEffect, useState } from "react";

const ReportsView = () => {

  const [reports, setReports] = useState<any[]>([])



  useEffect(() => {

    const getAllReports = async () => {
      const { data, error } = await supabase.from("Reports").select(`
        id,
        name,
        type,
        URL
        `);

      if (error) {
        console.log({ error });
      }

      const isDataNullable = data?.length === 0 || data == null

      console.log({data})

     setReports(isDataNullable ? [] : data)
    };
     getAllReports()
  }, [])

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Reportes</h1>

        {
            reports.map(item => 

<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.type}</p>
    <a href={item.URL} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Ver
    </a>
</div>
)
        }
      
    </div>
  )
}

export default ReportsView