import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "../hooks/useForm";
import supabase from "../utils/supabase";
import * as XLSX from "xlsx";
import { useGlobal } from "../contexts/GlobalContext";

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

  const exportHojaPedidos = () => {
    // 1) Cabecera similar a "HOJA DE PEDIDOS COCINA"
    const today = new Date().toISOString().slice(0, 10);
    const header = [
      ["HOJA DE PEDIDOS COCINA"],
      ["Orden:", selectedOrder?.name ?? ""],
      ["Fecha:", today],
      [],
      ["#", "Articulo", "Categoria", "Monto base", "Inventario final anterior", "Cantidad a pedir"],
    ];

    // 2) Filas desde lo que hay hoy en OrderDetails (productos de inventario)
    const baseDefault = 30;
    const rows = productsList.map((p: any, i: number) => {
      const prev = Number(p?.count ?? 0);
      const base = Number(p?.target_stock ?? baseDefault);
      const toOrder = Math.max(base - prev, 0);
      return [i + 1, p?.name ?? "-", p?.category ?? "-", base, prev, toOrder];
    });

    // 3) Construir sheet y exportar
    const ws = XLSX.utils.aoa_to_sheet([...header, ...rows]);
    ws["!cols"] = [{ wch: 4 }, { wch: 30 }, { wch: 18 }, { wch: 12 }, { wch: 22 }, { wch: 14 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PEDIDO COCINA");
    XLSX.writeFile(wb, `HOJA_DE_PEDIDOS_COCINA_${selectedOrder?.name ?? "orden"}.xlsx`);
  };

  return (
    <div>
      <h1 className="text-2xl text-bold">{selectedOrder?.name ?? ""}</h1>

      <span className={"mt-2" + ORDER_STATES_BADGE_STYLE[selectedOrder?.state ?? 1]}>
        {ORDER_STATES[selectedOrder?.state ?? 1] ?? ""}
      </span>

      <button
        onClick={exportHojaPedidos}
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
          <div className="mb-4" key={product?.id ?? product?.name}>
            <p>{product.name}</p>
            <h1>Monto base: 777</h1>
            <h1>Inventario final anterior: 5</h1>
            <h1>Proximo pedido: +25</h1>
            <button
              type="button"
              className="mt-2 inline-flex items-center rounded-lg bg-primary-700 p-2 px-4 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Editar
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OrderDetailsView;
