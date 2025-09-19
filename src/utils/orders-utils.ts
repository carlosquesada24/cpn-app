import * as XLSX from "xlsx";

export const exportHojaPedidos = (selectedOrder: any, productsList: any[] = []) => {
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
