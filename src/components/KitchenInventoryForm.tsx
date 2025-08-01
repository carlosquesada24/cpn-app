import {
  Label,
  TextInput,
  Datepicker,
  Dropdown,
  DropdownItem,
} from "flowbite-react";
import { PRODUCT_TYPES, PRODUCTS_LIST } from "../data";
import { useState } from "react";
import { useParams } from "react-router";
import { useForm } from "../hooks/useForm";

type KitchenInventoryFormProps = {
  productId?: string;
};

const KITCHEN_INVENTORY_FORM_INITIAL_VALUES = {
  ingresoQuantity: 0,
  mermaQuantity: 0
}

const KITCHEN_INVENTORY_FORM_VALIDATIONS = {

}


const KitchenInventoryForm = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { productId } = useParams();

  const existsProductId = typeof productId === "string";

  const {values: formValues, handleInputChange} = useForm(KITCHEN_INVENTORY_FORM_INITIAL_VALUES, KITCHEN_INVENTORY_FORM_VALIDATIONS)

const productFound =
      PRODUCTS_LIST.find((product) => product.id === productId) || null;

  function getProductById(productId: string) {
    const productFound =
      PRODUCTS_LIST.find((product) => product.id === productId) || null;

    setSelectedProduct(productFound);
  }

  const dropdownLabel =
    selectedProduct !== null ? selectedProduct.name : "Seleccione 1 producto";

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">
        Formulario - Conteo Inventario Cocina
      </h1>

      <div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="fecha de conteo" title="asd" className="text-black">
            Fecha de conteo
          </Label>
        </div>

        <Datepicker />
      </div>

      {existsProductId ? (
        <div className="mt-4">
          <div className="mb-2 block">
            <Label htmlFor="selección de producto" className="text-[#000]">
              Producto
            </Label>
          </div>

          <TextInput
            id="product-name"
            name="product-name"
            type="text"
            value={productFound?.name ?? ""}
            required
            disabled
          />
        </div>
      ) : (
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
      )}

      <div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="ingresoQuantity" className="text-[#000]">
            Cantidad de ingreso
          </Label>
        </div>

        <TextInput
          id="ingresoQuantity"
          name="ingresoQuantity"
          type="text"
          placeholder="Ejemplo: 15"
          required
        />
      </div>

      <div className="mt-4">
        <div className="mb-2 block">
          <Label htmlFor="mermaQuantity" className="text-[#000]">
            Cantidad de merma
          </Label>
        </div>

        <TextInput
          id="mermaQuantity"
          name="mermaQuantity"
          type="text"
          placeholder="Ejemplo: 5"
          required
        />
      </div>

      <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Enviar
      </button>
    </div>
  );
};

export default KitchenInventoryForm;
