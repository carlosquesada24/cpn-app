import { Checkbox, Label, TextInput, Datepicker } from "flowbite-react";

const KitchenInventoryForm = () => {

  return (
    <div className="mt-4">
        <h1>Formulario 1: Inventario Cocina - Conteo</h1>
        <p>Este inventario es para Lorem ipsum dolor sit amet.</p>
      
      <div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="fecha de conteo" title="asd" className="text-black">Fecha de conteo</Label>
        </div>
        
        <Datepicker />
      </div>



<div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="selección de producto" className="text-[#000]">Selección de producto</Label>
        </div>
        
        <TextInput
          id="selección de producto"
          name="selección de producto"
          type="text"
          placeholder="Producto"
          required
        />
      </div>





        

        <div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="Cantidad de ingreso" className="text-[#000]">Cantidad de ingreso</Label>
        </div>
        
       <TextInput
          id="Cantidad de ingreso"
          name="Cantidad de ingreso"
          type="text"
                  placeholder="Cantidad de ingreso"
          required
        />
      </div>



 <div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="unidad de medida ingreso" className="text-[#000]">unidad de medida ingreso</Label>
        </div>
        
       <TextInput
          id="name"
          name="name"
          type="text"
          placeholder="unidad de medida ingreso"
          required
        />
      </div>



<div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="Cantidad de merma" className="text-[#000]">Cantidad de merma</Label>
        </div>
        
         <TextInput
          id="name"
          name="name"
          type="text"
          placeholder="Cantidad de merma"
          required
        />
      </div>

       
      <div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="Unidad de medida merma" className="text-[#000]">Unidad de medida merma</Label>
        </div>
        
         <TextInput
          id="name"
          name="name"
          type="text"
          placeholder="Unidad de medida merma"
          required
        />
      </div>
       


    </div>
  )
}

export default KitchenInventoryForm