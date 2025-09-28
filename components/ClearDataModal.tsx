import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface ClearDataModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearDataModal: React.FC<ClearDataModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400">Clear All Data</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <CloseIcon />
            </button>
          </div>
          <div className="text-gray-700 dark:text-gray-300">
            <p className="mb-4">
              Are you sure you want to delete all your data? This action will permanently remove all expenses and your curated item list.
            </p>
            <p className="font-semibold">
              This cannot be undone.
            </p>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button 
              onClick={onClose} 
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
            >
              Yes, Clear Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
