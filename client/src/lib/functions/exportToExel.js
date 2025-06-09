import * as XLSX from "xlsx";

export const exportOnePaymentToExel = (paymentData) => {

    const sheetHeaders = Object.keys(paymentData.main)

    const sheetData = Object.entries(paymentData.main)
    // console.log('SHEET DATA: ', sheetData)
    const completedData = sheetData.map((item) => ( 
            item[0] === 'amount' ||  item[0] === 'commission_amount' 
        ?
            Number(item[1]).toFixed(2) 
        : 
            item[0] === 'created_at' 
        ? 
            new Date(item[1]).toLocaleDateString() 
        : 
            item[1] === null 
        ? 
            '—' 
        : 
            item[1]
    ));

    const worksheetData = [
        sheetHeaders,
        completedData
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Платёж");

    XLSX.writeFile(workbook, `payment_${paymentData.id}.xlsx`);
};


export const exportPaymentsToExcel = (paymentsData) => {
    if (paymentsData.length === 0) return;
  
    // Получаем заголовки из первого объекта
    const sheetHeaders = Object.keys(paymentsData[0]);
  
    // Формируем массив данных: первая строка — заголовки, остальные — данные
    const sheetData = [
      sheetHeaders, // Заголовки
      ...paymentsData.map((item) => sheetHeaders.map((key) => item[key] ?? '')) // Данные
    ];
  
    console.log('SHEET DATA: ', sheetData);
  
    // Создаём worksheet и workbook
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments');
  
    // Сохраняем файл
    XLSX.writeFile(workbook, 'Payments.xlsx');
};
