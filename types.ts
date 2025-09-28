
export interface CuratedItem {
  id: string;
  name: string;
  price: number;
}

export interface Expense {
  id: string;
  date: string; // ISO 8601 string format
  itemId: string;
  itemName: string;
  itemPrice: number;
  quantity: number;
}
