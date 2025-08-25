import { useEffect, useState } from "react";
import { Link } from "react-router";
import supabase from "../utils/supabase";

type CardProps = {
    order: {
      id: string | number
        name: string
        state: number
    };
}

const ORDER_STATES = {
  1: "Pendiente de enviar",
  2: "Enviada"
}

const ORDER_STATES_BADGE_STYLE = {
  1: "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300",
  2: "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300"
}

const OrderCard = ({order}: CardProps) => {

    return (
         <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">

          <a href="#" className="text-xl font-bold leading-tight text-gray-900 hover:underline dark:text-white">{order.name}</a>

          <div className="mt-4 flex items-center justify-between gap-4">
            {/* Estado */}
            <p className={"text-m  leading-tight text-gray-900 dark:text-white" + ORDER_STATES_BADGE_STYLE[order?.state ?? 1]}>{ORDER_STATES[order.state]}</p>

            <Link to={"/orders/" + order.id} className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Ver más
            </Link>

            
          </div>
      </div>
    )
}


const OrdersView = () => {

  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
  
      const getOrders = async () => {
  
        const { data, error } = await supabase.from("Orders").select(`
          id,
          name, 
          state
          `)
  
        if (error) {
          console.log({ error });
        }
  
        const isDataNullable = data == null
  
        console.log(data)
  
        setOrders(isDataNullable ? {} : data)
      };
      getOrders()
    }, [])

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Pedidos</h1>


      



<div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">

    {
      orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))
    }
  
    </div>
    </div>
  )
}

export default OrdersView