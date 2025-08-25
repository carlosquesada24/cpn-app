import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header.tsx";
import InventoryView from "./views/InventoryView.tsx";
import KitchenInventoryForm from "./components/KitchenInventoryForm.tsx";
import OrdersView from "./views/OrdersView.tsx";
import OrderDetailsView from "./views/OrderDetail.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <Header/>
    <StrictMode>
      <Routes>
        <Route index element={<App />} />
        <Route path="/inventory" element={<InventoryView/>}/>
         <Route path="/inventory-count-form" element={<KitchenInventoryForm/>} />
         <Route path="/inventory-count-form/:productId" element={<KitchenInventoryForm/>} />
         <Route path="/orders" element={<OrdersView/>} />
         <Route path="/orders/:id" element={<OrderDetailsView/>} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
