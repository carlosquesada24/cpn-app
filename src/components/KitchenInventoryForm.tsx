import {
  Label,
  TextInput,
  Datepicker,
  Dropdown,
  DropdownItem,
} from "flowbite-react";
import { PRODUCT_TYPES, PRODUCTS_LIST } from "../data";
import { useState } from "react";

const KitchenInventoryForm = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  function getProductById(productId: string) {
    const productFound =
      PRODUCTS_LIST.find((product) => product.id === productId) || null;

    setSelectedProduct(productFound);
  }

  const dropdownLabel =
    selectedProduct !== null ? selectedProduct.name : "Seleccione 1 producto";

  return (
    <div className="mt-4">
      <h1>Formulario 1: Inventario Cocina - Conteo</h1>
      <p>Este inventario es para Lorem ipsum dolor sit amet.</p>

      <div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="fecha de conteo" title="asd" className="text-black">
            Fecha de conteo
          </Label>
        </div>

        <Datepicker />
      </div>

      <div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="selección de producto" className="text-[#000]">
            Selección de producto
          </Label>
        </div>

        <Dropdown label={dropdownLabel} dismissOnClick={false}>
          {PRODUCTS_LIST.map(
            (product) =>
              product.status === PRODUCT_TYPES.PENDING && (
                <DropdownItem onClick={() => getProductById(product.id)}>
                  {product.name}
                </DropdownItem>
              )
          )}
        </Dropdown>
      </div>

      <div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="Cantidad de ingreso" className="text-[#000]">
            Cantidad de ingreso
          </Label>
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
          <Label htmlFor="unidad de medida ingreso" className="text-[#000]">
            unidad de medida ingreso
          </Label>
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
          <Label htmlFor="Cantidad de merma" className="text-[#000]">
            Cantidad de merma
          </Label>
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
          <Label htmlFor="Unidad de medida merma" className="text-[#000]">
            Unidad de medida merma
          </Label>
        </div>

        <TextInput
          id="name"
          name="name"
          type="text"
          placeholder="Unidad de medida merma"
          required
        />
      </div>

      <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Enviar</button>
    </div>
  );
};

export default KitchenInventoryForm;
