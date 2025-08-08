import { Link } from "react-router"
import { InventoryTable } from "../components/InventoryTable"
import { PRODUCTS_LIST } from "../data"
import supabase from "../utils/supabase";
import { useEffect } from "react";

const InventoryView = () => {

const getAllProducts = async() =>  {
    const { data, error } = await supabase.from("Products").select(`
        name
        `);

    if (error) {
        console.log({ error });
    }

    console.log({ data, error});
};

useEffect(()=> {
  getAllProducts()
})

  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Inventarios</h1>
        
    
        <InventoryTable inventoryProductsList={PRODUCTS_LIST}/>
    </div>
  )
}

export default InventoryView