import { InventoryTable } from "../components/InventoryTable";
import WeekSelectionDropDown from "../components/WeekSelectionDropDown/WeekSelectionDropDown";
import { useGlobal } from "../contexts/GlobalContext";

const InventoryView = () => {

  const {inventory: {productsList, productsTableFormatted, rows, setRows}} = useGlobal()

  console.log({productsList})
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Inventarios</h1>

      <WeekSelectionDropDown onResult={setRows} />

      <InventoryTable inventoryProductsList={rows} />
    </div>
  )
}

export default InventoryView