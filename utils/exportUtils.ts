
import type { Expense, CuratedItem } from '../types';
import { formatDate, getDayOfWeek } from './dateUtils';

// This function relies on the SheetJS library being loaded globally from a CDN.
// The global object is typically `XLSX`. We declare it to satisfy TypeScript.
declare const XLSX: any;

export const exportToExcel = (expenses: Expense[], curatedItems: CuratedItem[]): void => {
  if (typeof XLSX === 'undefined') {
    console.error('XLSX library is not loaded. Make sure it is included in your HTML.');
    alert('Export feature is currently unavailable. Please try again later.');
    return;
  }

  // 1. Prepare Expenses data
  const expenseData = expenses.map(e => ({
    'Date': formatDate(e.date),
    'Day': getDayOfWeek(e.date),
    'Item': e.itemName,
    'Price per Item': e.itemPrice,
    'Quantity': e.quantity,
    'Total Cost': e.itemPrice * e.quantity,
  }));
  const expensesWorksheet = XLSX.utils.json_to_sheet(expenseData);

  // Set column widths for expenses sheet
  expensesWorksheet['!cols'] = [
    { wch: 12 }, // Date
    { wch: 12 }, // Day
    { wch: 25 }, // Item
    { wch: 15 }, // Price per Item
    { wch: 10 }, // Quantity
    { wch: 12 }, // Total Cost
  ];

  // 2. Prepare Curated Items data
  const curatedItemsData = curatedItems.map(item => ({
    'Item Name': item.name,
    'Price': item.price,
  }));
  const itemsWorksheet = XLSX.utils.json_to_sheet(curatedItemsData);

  // Set column widths for items sheet
  itemsWorksheet['!cols'] = [
    { wch: 25 }, // Item Name
    { wch: 12 }, // Price
  ];
  
  // 3. Create Workbook and append sheets
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, expensesWorksheet, 'Expenses');
  XLSX.utils.book_append_sheet(workbook, itemsWorksheet, 'Curated Item List');

  // 4. Trigger download
  const today = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `Spending_Report_${today}.xlsx`);
};
