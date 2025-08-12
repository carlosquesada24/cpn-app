import {
  Label,
  TextInput,
  Datepicker,
  Dropdown,
  DropdownItem,
} from "flowbite-react";
import { PRODUCT_TYPES, PRODUCTS_LIST } from "../data";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import supabase from "../utils/supabase";
import { useForm } from "../hooks/useForm";

const KITCHEN_INVENTORY_FORM_INITIAL_STATE = {
  cantidadIngreso: "", 
  cantidadMerma: ""
}

const KitchenInventoryForm = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { productId } = useParams();

  const {values: formValues, handleInputChange} = useForm(KITCHEN_INVENTORY_FORM_INITIAL_STATE, {})


  const existsProductId = typeof productId === "string";

  const navigate = useNavigate()

 useEffect(() => {

    const getProductById = async () => {


      const { data, error } = await supabase.from("Products").select(`
        id,
        name, 
        status,
        category,
        count
        `).eq('id', productId)
        .single()

      if (error) {
        console.log({ error });
      }

      const isDataNullable = data == null

 

      setSelectedProduct(isDataNullable ? {} : data)
    };
    getProductById()
  }, [])

  function getProductById(productId: string) {
    const productFound =
      PRODUCTS_LIST.find((product) => product.id === productId) || null;

    setSelectedProduct(productFound);
  }

  const dropdownLabel =
    selectedProduct !== null ? selectedProduct.name : "Seleccione 1 producto";

  const onSubmit = async () => {
  
    // Paso 1 - Convertir los datos a números
    const previousCount = selectedProduct?.count ?? 0
    const cantidadIngresoNumero = parseInt(`${formValues?.cantidadIngreso}`) ?? 0
    const cantidadMermaNumero = parseInt(`${formValues?.cantidadMerma}`) ?? 0

    // Paso 2 - Hacer las restas y sumas
    const valueToSum = cantidadIngresoNumero - cantidadMermaNumero
    const newCount = previousCount + valueToSum

    // Paso 3 - Editar en la DB
    const {data, error} = await supabase.from('Products').update({count: newCount, status: "DONE"}).eq('id', productId)
    console.log(data, error)

    !error ? alert("Producto contado con éxito!") : alert("Hubo un error!")

    // Paso 4 - Redireccionar a la vista de inventory
    navigate("/inventory")
  }

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
            value={selectedProduct?.name ?? ""}
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
          <Label htmlFor="Cantidad de ingreso" className="text-[#000]">
            Cantidad de ingreso
          </Label>
        </div>

        <TextInput
          id="Cantidad de ingreso"
          name="cantidadIngreso"
          type="text"
          placeholder="Ejemplo: 15"
          required
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          value={formValues.cantidadIngreso}
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
          name="cantidadMerma"
          type="text"
          placeholder="Ejemplo: 5"
          required
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          value={formValues.cantidadMerma}
        />
      </div>

      <button onClick={onSubmit} className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Enviar
      </button>
    </div>
  );
};

export default KitchenInventoryForm;
