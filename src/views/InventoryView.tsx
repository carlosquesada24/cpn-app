import { Link } from "react-router"
import { InventoryTable } from "../components/InventoryTable"
import { PRODUCTS_LIST } from "../data"
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import WeekSelectionDropDown from "../components/WeekSelectionDropDown/WeekSelectionDropDown";

const InventoryView = () => {

  const [products, setProducts] = useState<any[]>(PRODUCTS_LIST)
    const [rows, setRows] = useState<any[]>([]);


  console.log({rows})

  useEffect(() => {

    const getAllProducts = async () => {
      const { data, error } = await supabase.from("Products").select(`
        id,
        name, 
        status,
        category,
        count
        `);

      if (error) {
        console.log({ error });
      }

      const isDataNullable = data?.length === 0 || data == null

      setProducts(isDataNullable ? [] : data)
      setRows(isDataNullable ? [] : data)
    };

    getAllProducts()
  }, [])



// Cambiar esta vara en el fetch general de productos
// Me está dando 1 formato fuck
   const productsForTable = rows.map(r => ({
    id: r.Products?.id ?? r.productId,
    name: r.Products?.name ?? "—",
    category: r.Products?.category ?? "—",
    status: r.Products?.status ?? "PENDING",
    count: r.Products?.count ?? 0,
  }));

  return (
    
    <div>
      <h1 className='text-2xl font-bold mb-4'>Inventarios</h1>

      

    <WeekSelectionDropDown onResult={setRows}/>


      <InventoryTable inventoryProductsList={productsForTable} />
    </div>
  )
}

export default InventoryView