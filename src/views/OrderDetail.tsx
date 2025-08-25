import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "../hooks/useForm";
import supabase from "../utils/supabase";

const ORDER_STATES = {
  1: "Pendiente de enviar",
  2: "Enviada"
}

const ORDER_STATES_BADGE_STYLE = {
  1: "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300",
  2: "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300"
}

const OrderDetailsView = () => {

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const { id } = useParams();

//   const {values: formValues, handleInputChange} = useForm(KITCHEN_INVENTORY_FORM_INITIAL_STATE, {})


  const existsProductId = typeof id === "string";

  const navigate = useNavigate()

 useEffect(() => {

    const getProductById = async () => {

      const { data, error } = await supabase.from("Orders").select(`
        id,
        name, 
        state
        `).eq('id', id)
        .single()

      if (error) {
        console.log({ error });
      }

      const isDataNullable = data == null

      setSelectedOrder(isDataNullable ? {} : data)
    };
    getProductById()
  }, [])


  const onSubmit = async () => {
    alert("Enviando!")

  
    navigate("/orders")
  }



  return (
    <div>
        <h1 className="text-2xl text-bold">{selectedOrder?.name ?? ""}</h1>
        
        <span className={"mt-2"+ORDER_STATES_BADGE_STYLE[selectedOrder?.state ?? 1]}>{ORDER_STATES[selectedOrder?.state ?? 1] ?? ""}</span>
        
        <button type="button" className="mt-2 inline-flex items-center rounded-lg bg-green-700 p-2 px-4 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Enviar reporte a WhatsApp
        </button>

         {/* <Link to={"/"} className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Abrir archivo en Google Drive
            </Link> */}




        {/* Esto cambiarlo a dinámico, pero antes preguntar */}
       <section className="mt-4">
         <h2 className="text-2xl text-bold">Resumen</h2>

        <div className="mb-4">
            <p>Producto 1</p>
            <h1>Monto base: 30</h1>
            <h1>Inventario final anterior: 5</h1>
            <h1>Próximo pedido: +25</h1>
        </div>

        <div className="mb-4">
            <p>Producto 2</p>
            <h1>Monto base: 30</h1>
            <h1>Inventario final anterior: 5</h1>
            <h1>Próximo pedido: +25</h1>
        </div>

        <div>
            <p>Producto 3</p>
            <h1>Monto base: 30</h1>
            <h1>Inventario final anterior: 5</h1>
            <h1>Próximo pedido: +25</h1>
        </div>  
       </section>
        


         <button type="button" className="mt-2 inline-flex items-center rounded-lg bg-primary-700 p-2 px-4 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Editar
            </button>


         
    </div>

    
  )
}

export default OrderDetailsView