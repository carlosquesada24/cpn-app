import { Link } from "react-router"

const InventoryView = () => {
  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Inventarios</h1>

        <Link to="/inventory-count-form" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Contabilizar</Link>
    </div>
  )
}

export default InventoryView