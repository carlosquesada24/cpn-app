import { Link } from "react-router"
import { InventoryTable } from "../components/InventoryTable"
import { PRODUCTS_LIST } from "../data"
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";

const InventoryView = () => {

  const [products, setProducts] = useState<any[]>(PRODUCTS_LIST)



 useEffect(()=> {

const getAllProducts = async () =>  {
    const { data, error } = await supabase.from("Products").select(`
        name, 
        status,
        category
        `);

    if (error) {
        console.log({ error });
    }

    const isDataNullable = data?.length === 0 || data == null

    setProducts(isDataNullable ? [] : data)
};
   getAllProducts()
 }, [])

  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Inventarios</h1>
        
    
        <InventoryTable inventoryProductsList={products}/>
    </div>
  )
}

export default InventoryView