import { createWorker } from 'tesseract.js';

// Esto es especifico para el ejemplo 1 de las facturas. pero igual sirve
// talvez ahora probar con 1 en español 
export const readElectronicInvoice = async () => {
  const worker = await createWorker('eng');
   const { data: { text } } = await worker.recognize('/factura-electronica-hotel-ejemplo-1.png');
  console.log({textFromWorker: text});
  await worker.terminate();

  const arrayBeroreSupabase = text.split("\n").filter(line => line.trim() !== "");
  const totalLine = arrayBeroreSupabase.find(l => l.toLowerCase().includes("total"));
const amount = totalLine?.match(/£\s?\d+(\.\d{1,2})?/)[0];
  console.log({amount})
}