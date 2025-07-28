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

        <Dropdown label="Seleccionar 1 producto" dismissOnClick={false}>
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
    </div>
  );
};

export default KitchenInventoryForm;
