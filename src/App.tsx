import './App.css'
import KitchenInventoryForm from './components/KitchenInventoryForm'
import PendingProductsView from './components/PendingProductsView'
import { PRODUCTS_LIST } from './data'

function App() {

  return (
    <>
      
      <h1 className='text-2xl font-bold'>Formularios - Café Playa Negra</h1>
      <KitchenInventoryForm/>
      <hr />
      <PendingProductsView/>
    </>
  )
}

export default App
