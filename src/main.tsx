import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <Header/>
    <StrictMode>
      <Routes>
        <Route index element={<App />} />
        <Route path="/inventory" element={<h1>Inventarios</h1>}/>
         <Route path="/inventory-count-form" element={<h1>Formulario</h1>} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
