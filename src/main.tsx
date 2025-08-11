import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header.tsx";
import InventoryView from "./views/InventoryView.tsx";
import KitchenInventoryForm from "./components/KitchenInventoryForm.tsx";
import ReportsView from "./views/ReportsView.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <Header/>
    <StrictMode>
      <Routes>
        <Route index element={<App />} />
        <Route path="/inventory" element={<InventoryView/>}/>
         <Route path="/inventory-count-form" element={<KitchenInventoryForm/>} />
         <Route path="/inventory-count-form/:productId" element={<KitchenInventoryForm/>} />
         <Route path="/reports" element={<ReportsView/>}/>
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
