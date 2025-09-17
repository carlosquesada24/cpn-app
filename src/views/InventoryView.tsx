import { InventoryTable } from "../components/InventoryTable";
import WeekSelectionDropDown from "../components/WeekSelectionDropDown/WeekSelectionDropDown";
import { useGlobal } from "../contexts/GlobalContext";

// Small helper: "week N of month" (Sunday-start)
const getCurrentWeekInMonthText = () => {
  const d = new Date();
  const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
  const offset = firstDay.getDay(); // 0=Sun
  const week = Math.ceil((d.getDate() + offset) / 7);
  const month = d.toLocaleString("en-US", { month: "long" }).toLowerCase();
  return `semana ${week} de ${month}`;
};

const InventoryView = () => {

  const {inventory: {productsList, productsTableFormatted, rows, setRows, productsCountedQuantity,
    productsPendingToCountQuantity}} = useGlobal()

  console.log({productsList})
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Inventarios</h1>

      <p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
        {getCurrentWeekInMonthText()}
      </p>

      {/* <WeekSelectionDropDown onResult={setRows} /> */}

    <p>Productos contados: {productsCountedQuantity}</p>
      <p>Productos pendientes de contar: {productsPendingToCountQuantity}</p>

      <InventoryTable inventoryProductsList={rows} />
    </div>
  )
}

export default InventoryView
