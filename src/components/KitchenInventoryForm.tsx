import { Checkbox, Label, TextInput } from "flowbite-react";

const KitchenInventoryForm = () => {

  return (
    <div>
        <h1>Formulario 1: Inventario Cocina - Conteo</h1>
        <p>Este inventario es para Lorem ipsum dolor sit amet.</p>
      

        <TextInput
          id="name"
          name="name"
          type="text"
          placeholder="Carlos Quesada"
          required
        />


    </div>
  )
}

export default KitchenInventoryForm