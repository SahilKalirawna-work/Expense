
import React from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { ExportIcon } from './icons/ExportIcon';

interface HeaderProps {
  onAddExpense: () => void;
  onManageItems: () => void;
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddExpense, onManageItems, onExport }) => {
  return (
    <header className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        Today's Spending
      </h1>
      <div className="flex items-center space-x-2 md:space-x-4">
        <button
          onClick={onAddExpense}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all duration-200 shadow-md"
          aria-label="Add Expense"
        >
          <PlusIcon />
        </button>
        <button
          onClick={onManageItems}
          className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 transition-all duration-200"
          aria-label="Manage Items"
        >
          <SettingsIcon />
        </button>
        <button
          onClick={onExport}
          className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-900 transition-all duration-200"
          aria-label="Export Data"
        >
          <ExportIcon />
        </button>
      </div>
    </header>
  );
};
