export const getThisMonthName = () => {
// Mes actual en número (1 = enero, 12 = diciembre)
const mesNumero = new Date().getMonth() + 1;
console.log("Mes en número:", mesNumero);

// Mes actual en nombre (ej: "Febrero")
const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
const mesNombre = meses[new Date().getMonth()];

return mesNombre
}