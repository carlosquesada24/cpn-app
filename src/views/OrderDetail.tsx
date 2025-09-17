import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import OrderProductCard from "../components/OrderProductCard";
import supabase from "../utils/supabase";
import { useGlobal } from "../contexts/GlobalContext";
import { exportHojaPedidos } from "../utils/orders-utils";

const ORDER_STATES = {
  1: "Pendiente de enviar",
  2: "Enviada",
};

const ORDER_STATES_BADGE_STYLE = {
  1: "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300",
  2: "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300",
};

const OrderDetailsView = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { id } = useParams();

  const { inventory } = useGlobal();
  const { productsList = [] } = inventory;

  const existsProductId = typeof id === "string";

  const navigate = useNavigate();

  useEffect(() => {
    const getOrderById = async () => {
      const { data, error } = await supabase
        .from("Orders")
        .select(`
        id,
        name, 
        state
        `)
        .eq("id", id)
        .single();

      if (error) {
        console.log({ error });
      }

      const isDataNullable = data == null;

      setSelectedOrder(isDataNullable ? {} : data);
    };

    getOrderById();
  }, []);

  const onSubmit = async () => {
    alert("Enviando!");

    navigate("/orders");
  };

  console.log(productsList);

  const handleExportHojaPedidos = () => {
    exportHojaPedidos(selectedOrder, productsList);
  };

  return (
    <div>
      <h1 className="text-2xl text-bold">{selectedOrder?.name ?? ""}</h1>

      <span className={"mt-2" + ORDER_STATES_BADGE_STYLE[selectedOrder?.state ?? 1]}>
        {ORDER_STATES[selectedOrder?.state ?? 1] ?? ""}
      </span>

      <button
        onClick={handleExportHojaPedidos}
        type="button"
        className="mt-2 inline-flex items-center rounded-lg bg-green-700 p-2 px-4 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Enviar reporte a WhatsApp
      </button>

      {/* <Link to={"/"} className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Abrir archivo en Google Drive
            </Link> */}

      {/* Esto cambiarlo a dinamico, pero antes preguntar */}
      <section className="mt-4">
        <h2 className="text-2xl text-bold">Resumen</h2>

        {productsList.map((product: any) => (
          <OrderProductCard key={product?.id ?? product?.name} product={product} />
        ))}
      </section>
    </div>
  );
};

export default OrderDetailsView;
