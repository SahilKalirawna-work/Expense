
import React from 'react';
import type { Expense } from '../types';
import { formatDate, getDayOfWeek } from '../utils/dateUtils';

interface ExpenseTableProps {
  expenses: Expense[];
}

export const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Expenses Logged Yet</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Click the '+' button to add your first expense.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Day</th>
            <th scope="col" className="px-6 py-3">Item</th>
            <th scope="col" className="px-6 py-3 text-right">Quantity</th>
            <th scope="col" className="px-6 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {formatDate(expense.date)}
              </td>
              <td className="px-6 py-4">{getDayOfWeek(expense.date)}</td>
              <td className="px-6 py-4">{expense.itemName}</td>
              <td className="px-6 py-4 text-right">{expense.quantity}</td>
              <td className="px-6 py-4 text-right font-semibold text-gray-900 dark:text-white">
                ${(expense.itemPrice * expense.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
