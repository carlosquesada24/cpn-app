import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { PRODUCTS_LIST } from "../data";

// Minimal, clear logic: rows = products pending to count
export const useInventory = () => {
  const [productsList, setProductsList] = useState<any[]>(PRODUCTS_LIST);
  const [rows, setRows] = useState<any[]>([]);
  const [countProductsList, setCountProductsList] = useState<any[]>([]);
  let productsCountedQuantity = 0
  let productsPendingToCountQuantity = 0

  // Week helpers (Sunday start)
  const getWeekRange = (date = new Date()) => {
    const start = new Date(date);
    const day = start.getDay(); // 0=Sun
    start.setDate(start.getDate() - day);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  };

  const refreshInventory = async () => {
    const { start, end } = getWeekRange();

    const [productsRes, movementsRes] = await Promise.all([
      supabase
        .from("Products")
        .select("id, name, status, category, count"),
      supabase
        .from("InventoryMovements")
        .select("productId, created_at")
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString()),
    ]);

    if (productsRes.error) console.log({ error: productsRes.error });
    if (movementsRes.error) console.log({ error: movementsRes.error });

    const products = productsRes.data ?? [];
    const movements = movementsRes.data ?? [];

    setProductsList(products);

    const countedIds = new Set((movements as any[]).map((m: any) => m.productId));
    const counted = products.filter((p: any) => countedIds.has(p.id));
    const pending = products.filter((p: any) => !countedIds.has(p.id));

    setCountProductsList(counted);
    setRows(pending);
    productsCountedQuantity = counted.length;
    productsPendingToCountQuantity = pending.length;
  };

  useEffect(() => {
    refreshInventory();
  }, []);

  // Normalize for table consumers (works with joined or plain rows)
  const productsTableFormatted = rows.map((row: any) => ({
    id: row.Products?.id ?? row.productId ?? row.id,
    name: row.Products?.name ?? row.name ?? "-",
    category: row.Products?.category ?? row.category ?? "-",
    status: row.Products?.status ?? row.status ?? "-",
    count: row.Products?.count ?? row.count ?? 0,
  }));

  return {
    productsList,
    countProductsList,
    rows,
    setRows,
    productsTableFormatted,
    productsCountedQuantity,
    productsPendingToCountQuantity,
    refreshInventory,
  };
};
