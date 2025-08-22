import { useEffect, useState } from "react";

type CardProps = {
    order: {
        name: string
        state: number
    };
}

const ORDER_STATES = {
  1: "Pendiente de enviar",
  2: "Enviada"
}

const OrderCard = ({order}: CardProps) => {
    return (
         <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">

          <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{order.name}</a>

          <div className="mt-4 flex items-center justify-between gap-4">
            {/* Estado */}
            <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">{ORDER_STATES[order.state]}</p>

            <button type="button" className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Ver más
            </button>
          </div>
      </div>
    )
}


const OrdersView = () => {

  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {

    
  }, [])

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Pedidos</h1>


        <hr />



<div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
      <OrderCard order={{name: "Orden 1 - 2° semana Agosto", state: 1}} />
     <OrderCard order={{name: "Orden 1 - 1° semana Agosto", state: 2}}/>
       <OrderCard order={{name: "Orden 4 - 4° semana Julio", state: 2}}/>
  
    </div>
    </div>
  )
}

export default OrdersView