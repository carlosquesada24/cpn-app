import './App.css'
import KitchenInventoryForm from './components/KitchenInventoryForm'
import { PRODUCTS_LIST } from './data'

function App() {

  return (
    <>
      
      <h1 className='text-2xl font-bold'>Formularios - Café Playa Negra</h1>
      <KitchenInventoryForm/>
      <hr />
      <h1 className='text-2xl font-bold'>Productos pendientes</h1>
      <ul>
        {
          PRODUCTS_LIST.map(product => <li>{product}</li>)
        }
      </ul>
    </>
  )
}

export default App
