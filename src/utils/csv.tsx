import * as XLSX from "xlsx";

export const runIngresosyGastos = async () => {
      try {
        // Si el archivo está en /public/data/EJEMPLO FLUJO INGRESO Y SALIDAS.xlsx
        const res = await fetch("/EJEMPLO FLUJO INGRESO Y SALIDAS.xlsx");
        if (!res.ok) throw new Error("No se pudo cargar el archivo");

        const buf = await res.arrayBuffer();

        // Leer workbook desde ArrayBuffer (navegador)
        const wb = XLSX.read(buf, { type: "array" });

        // Hoja: primera o por nombre
        const ws = wb.Sheets[wb.SheetNames[0]];

        // A arrays (primera fila = encabezados)
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        console.log(data);
        // setRows(data);
      } catch (err) {
        console.error(err);
      }
    };


    export const fetchReporteVentaHabitaciones = async () => {
      try {

  console.log("VENTAS Habiltaciones")

        // 1. Cargar archivo desde /public/data
        const res = await fetch("/REPORTE VENTA DE HABOTACIONES (1).xlsx");
        if (!res.ok) throw new Error("No se pudo cargar el archivo");

        const buf = await res.arrayBuffer();

        // 2. Leer workbook
        const workbook = XLSX.read(buf, { type: "array" });

        // 3. Seleccionar la primera hoja (o por nombre si lo conocés)
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // 4. Convertir a arrays (filas)
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1, range: "A1:L30" });

        console.log(data);


      
        return data

        // setRows(data);
      } catch (err) {
        console.error("Error leyendo Excel:", err);
      }
    };




    export const fetchVentasSkill = async () => {
      try {

        console.log("VENTAS restaurante")

        // 1. Cargar archivo desde public
        const res = await fetch("/ventas skill.xlsx");
        if (!res.ok) throw new Error("No se pudo cargar el archivo");

        const buf = await res.arrayBuffer();

        // 2. Leer workbook
        const workbook = XLSX.read(buf, { type: "array" });

        // 3. Seleccionar la primera hoja
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // 4. Convertir solo primeras 100 filas
        const allRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const limitedRows = allRows.slice(0, 100);

        console.log(limitedRows);
        // setRows(limitedRows);

        

return limitedRows

        // getNetSales(limitedRows)

      } catch (err) {
        console.error("Error leyendo Excel:", err);
      }
    };

    export const getNetSalesRestaurant = (limitedRows: any) => {

          const totalGeneralRow = limitedRows.find(
        (row) => Array.isArray(row) && row[0]?.includes("TOTAL GENERAL (COL)")
        );

        const ventasNetas = totalGeneralRow[5]

                console.log(totalGeneralRow);
                console.log(ventasNetas);

                return ventasNetas
    }

     export const getNetSalesBooking = (limitedRows: any) => {

        //   const totalGeneralRow = limitedRows.find(
        // (row) => Array.isArray(row) && row[0]?.includes("TOTAL")
        // );

        // const totalGeneralRow = limitedRows.find(
        // (row) => Array.isArray(row) && row[0]?.includes("TOTAL")
        // );

        const totalGeneralRow = limitedRows
            .filter((row) => Array.isArray(row) && row[0]?.toString().includes("TOTAL"))
            .pop(); // devuelve el último

        console.log({totalMonto: totalGeneralRow[9]})

        return totalGeneralRow[9]

        // const ventasNetas = totalGeneralRow[5]

        //         console.log(totalGeneralRow);
        //         console.log(ventasNetas);

        //         return ventasNetas
    }

    // 1. Fetch Xslx info
    // 2. Format data
    // 3. Get net Sales