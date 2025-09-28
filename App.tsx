
import React, { useState, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { CuratedItem, Expense } from './types';
import { Header } from './components/Header';
import { ExpenseTable } from './components/ExpenseTable';
import { AddExpenseModal } from './components/AddExpenseModal';
import { ManageItemsModal } from './components/ManageItemsModal';
import { exportToExcel } from './utils/exportUtils';

const DEFAULT_ITEMS: CuratedItem[] = [];

function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
  const [curatedItems, setCuratedItems] = useLocalStorage<CuratedItem[]>('curated_items', DEFAULT_ITEMS);

  const [isAddExpenseModalOpen, setAddExpenseModalOpen] = useState(false);
  const [isManageItemsModalOpen, setManageItemsModalOpen] = useState(false);

  const addExpense = useCallback((itemId: string, quantity: number) => {
    const item = curatedItems.find(i => i.id === itemId);
    if (!item) return;

    const newExpense: Expense = {
      id: new Date().toISOString() + Math.random(),
      date: new Date().toISOString(),
      itemId: item.id,
      itemName: item.name,
      itemPrice: item.price,
      quantity,
    };
    setExpenses(prev => [...prev, newExpense].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [curatedItems, setExpenses]);

  const addCuratedItem = useCallback((name: string, price: number) => {
    const newItem: CuratedItem = {
      id: new Date().toISOString() + name,
      name,
      price,
    };
    setCuratedItems(prev => [...prev, newItem]);
  }, [setCuratedItems]);

  const deleteCuratedItem = useCallback((id: string) => {
    setCuratedItems(prev => prev.filter(item => item.id !== id));
  }, [setCuratedItems]);
  
  const updateCuratedItem = useCallback((id: string, newName: string, newPrice: number) => {
    setCuratedItems(prev => prev.map(item => 
      item.id === id ? { ...item, name: newName, price: newPrice } : item
    ));
  }, [setCuratedItems]);

  const handleExport = useCallback(() => {
    exportToExcel(expenses, curatedItems);
  }, [expenses, curatedItems]);

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="container mx-auto p-4 md:p-8">
        <Header
          onAddExpense={() => setAddExpenseModalOpen(true)}
          onManageItems={() => setManageItemsModalOpen(true)}
          onExport={handleExport}
        />
        <main className="mt-8">
          <ExpenseTable expenses={expenses} />
        </main>
      </div>

      {isAddExpenseModalOpen && (
        <AddExpenseModal
          curatedItems={curatedItems}
          onClose={() => setAddExpenseModalOpen(false)}
          onAddExpense={addExpense}
        />
      )}

      {isManageItemsModalOpen && (
        <ManageItemsModal
          curatedItems={curatedItems}
          onClose={() => setManageItemsModalOpen(false)}
          onAddItem={addCuratedItem}
          onDeleteItem={deleteCuratedItem}
          onUpdateItem={updateCuratedItem}
        />
      )}
    </div>
  );
}

export default App;
