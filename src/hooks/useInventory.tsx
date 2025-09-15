import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { PRODUCTS_LIST } from "../data";

// Lo de las rows se va a utils

export const useInventory = () => {
  const [productsList, setProductsList] = useState<any[]>(PRODUCTS_LIST)
      const [rows, setRows] = useState<any[]>([]);
      const [countProductsList, setCountProductsList] = useState<any[]>([])
  
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
  
        setProductsList(isDataNullable ? [] : data)
        setRows(isDataNullable ? [] : data)
      };
  
       const getAllInventoryMovements = async () => {
        const { data: inventoryMovementsData, error } = await supabase.from("InventoryMovements").select(`
            id,
            created_at,
            Products (   id,
          name, 
          status,
          category,
          count)
          `)
  
        if (error) {
          console.log({ error });
        }
  
        console.log({data: inventoryMovementsData})
  
        // Productos contados
        const countProductsList = [inventoryMovementsData[0].Products]
        console.log({countProductsList})
        setCountProductsList(countProductsList)

  
        const uncountProductsList = productsList.filter()
        console.log({uncountProductsList})
  
        //
  
        const allTableProducts = [
          ...countProducts,
          ...productsList
        ]
  
        console.log({allTableProducts})
      };
  
      getAllProducts()
      getAllInventoryMovements()
    }, [])

    // Cambiar esta vara en el fetch general de productos
// Me está dando 1 formato fuck
   const productsTableFormatted = rows.map(r => ({
    id: r.Products?.id ?? r.productId,
    name: r.Products?.name ?? r.name ?? "-",
    category: r.Products?.category ?? r.category ?? "-",
    status: r.Products?.status ?? r.status ?? "-",
    count: r.Products?.count ?? r.status ?? 0,
  }));

  return {
    productsList,
    countProductsList,
    rows,
    setRows,
    productsTableFormatted
  };
};