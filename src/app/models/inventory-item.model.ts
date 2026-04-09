/**
 * Inventory Item Data Model
 * Author: Yu Jiutai
 * Assignment: Part 2 - Angular Inventory App
 */

/**
 * Type for item categories
 */
export type Category = 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';

/**
 * Type for stock status values
 */
export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

/**
 * Type for popular item flag
 */
export type PopularItem = 'Yes' | 'No';

/**
 * Interface representing an inventory item
 * All fields required except comment which is optional
 */
export interface InventoryItem {
  itemId: string;
  itemName: string;
  category: Category;
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: StockStatus;
  popularItem: PopularItem;
  comment?: string;
}

/**
 * Available category options for forms
 */
export const CATEGORIES: Category[] = [
  'Electronics',
  'Furniture',
  'Clothing',
  'Tools',
  'Miscellaneous'
];

/**
 * Available stock status options for forms
 */
export const STOCK_STATUSES: StockStatus[] = [
  'In Stock',
  'Low Stock',
  'Out of Stock'
];

/**
 * Available popular item options for forms
 */
export const POPULAR_OPTIONS: PopularItem[] = ['Yes', 'No'];
