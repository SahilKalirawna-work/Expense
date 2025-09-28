
import React, { useState } from 'react';
import type { CuratedItem } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { TrashIcon } from './icons/TrashIcon';
import { EditIcon } from './icons/EditIcon';
import { SaveIcon } from './icons/SaveIcon';

interface ManageItemsModalProps {
  curatedItems: CuratedItem[];
  onClose: () => void;
  onAddItem: (name: string, price: number) => void;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (id: string, name: string, price: number) => void;
}

export const ManageItemsModal: React.FC<ManageItemsModalProps> = ({ curatedItems, onClose, onAddItem, onDeleteItem, onUpdateItem }) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: '' });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(newItemPrice);
    if (newItemName.trim() && !isNaN(price) && price >= 0) {
      onAddItem(newItemName.trim(), price);
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  const handleStartEdit = (item: CuratedItem) => {
    setEditingItemId(item.id);
    setEditForm({ name: item.name, price: String(item.price) });
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItemId) return;

    const price = parseFloat(editForm.price);
    if (editForm.name.trim() && !isNaN(price) && price >= 0) {
      onUpdateItem(editingItemId, editForm.name.trim(), price);
      handleCancelEdit(); // Reset editing state
    }
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Curated Items</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <CloseIcon />
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto pr-2 mb-4">
            {curatedItems.length > 0 ? (
              <ul className="space-y-2">
                {curatedItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md min-h-[58px]">
                    {editingItemId === item.id ? (
                      <form onSubmit={handleSaveEdit} className="flex-grow flex items-center gap-2">
                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleEditFormChange}
                          className="flex-grow bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                          aria-label="Edit item name"
                        />
                        <input
                          type="number"
                          name="price"
                          value={editForm.price}
                          onChange={handleEditFormChange}
                          step="0.01"
                          min="0"
                          className="w-28 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          required
                          aria-label="Edit item price"
                        />
                        <div className="flex items-center">
                          <button type="submit" className="p-2 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300" aria-label="Save changes">
                              <SaveIcon />
                          </button>
                          <button type="button" onClick={handleCancelEdit} className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" aria-label="Cancel edit">
                              <CloseIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <span className="text-gray-800 dark:text-gray-200">{item.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900 dark:text-white">${item.price.toFixed(2)}</span>
                          <button onClick={() => handleStartEdit(item)} className="p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" aria-label={`Edit ${item.name}`}>
                            <EditIcon />
                          </button>
                          <button onClick={() => onDeleteItem(item.id)} className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300" aria-label={`Delete ${item.name}`}>
                            <TrashIcon />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">No items in your list.</p>
            )}
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Add New Item</h3>
            <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Item Name"
                className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <input
                type="number"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                placeholder="Price"
                step="0.01"
                min="0"
                className="w-full sm:w-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <button type="submit" className="w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
