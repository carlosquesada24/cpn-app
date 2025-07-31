import { Link } from "react-router"
import { InventoryTable } from "../components/InventoryTable"
import Table from "../components/Table/Table"

const InventoryView = () => {
  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Inventarios</h1>

    
        <InventoryTable/>


    </div>
  )
}

export default InventoryView