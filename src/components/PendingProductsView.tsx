import { PRODUCTS_LIST } from '../data'

const PendingProductsView = () => {
  return (
    <div><h1 className='text-2xl font-bold'>Productos pendientes</h1>
      <ul>
        {
          PRODUCTS_LIST.map(product => <li>{product}</li>)
        }
      </ul></div>
  )
}

export default PendingProductsView