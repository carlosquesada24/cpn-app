import React, { useEffect, useState } from "react";

interface OrderProductCardProps {
  product: any;
}

const OrderProductCard: React.FC<OrderProductCardProps> = ({ product }) => {
  // Esto tiene que ser reemplazado por un monto a crear en la DB
  const baseDefault = 30;
  const calculateDefaults = () => {
    const prev = Number(product?.count ?? 0);
    const target = Number(product?.target_stock ?? baseDefault);
    const next = Math.max(target - prev, 0);
    return { prev, target, next };
  };

  const [{ prev, target, next }, setDefaults] = useState(() => calculateDefaults());
  const [nextOrder, setNextOrder] = useState<string>(String(next));
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const defaults = calculateDefaults();
    setDefaults(defaults);
    setNextOrder(String(defaults.next));
    setIsEditing(false);
  }, [product?.count, product?.target_stock]);

  const handleToggleEdit = () => {
    setIsEditing((prevValue) => !prevValue);
  };

  return (
    <div className="mb-4">
      <p>{product.name}</p>
      <h1>Monto base: {target}</h1>
      <h1>Inventario final anterior: {prev}</h1>
      <h1>
        Proximo pedido:
        {isEditing ? (
          <input
            type="number"
            className="ml-2 w-20 rounded border border-gray-300 px-2 py-1 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-300"
            value={nextOrder}
            min={0}
            onChange={(event) => setNextOrder(event.target.value)}
          />
        ) : (
          <span className="ml-2">+{nextOrder}</span>
        )}
      </h1>
      <button
        type="button"
        className="mt-2 inline-flex items-center rounded-lg bg-primary-700 p-2 px-4 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={handleToggleEdit}
      >
        {isEditing ? "Guardar" : "Editar"}
      </button>
    </div>
  );
};

export default OrderProductCard;
