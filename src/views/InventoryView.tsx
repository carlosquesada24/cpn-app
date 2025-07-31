import { InventoryTable } from "../components/InventoryTable"
import { PRODUCTS_LIST } from "../data"

const InventoryView = () => {
  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Inventarios</h1>

    
        <InventoryTable inventoryProductsList={PRODUCTS_LIST}/>
    </div>
  )
}

export default InventoryView