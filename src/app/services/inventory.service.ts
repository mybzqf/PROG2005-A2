/**
 * Inventory Service
 * Manages all CRUD operations for inventory items
 * Author: Yu Jiutai
 * Assignment: Part 2 - Angular Inventory App
 */

import { Injectable } from '@angular/core';
import { InventoryItem, Category, StockStatus, PopularItem } from '../models/inventory-item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  /** In-memory database of inventory items */
  private inventoryDatabase: InventoryItem[] = [
    {
      itemId: 'ITEM001',
      itemName: 'Laptop',
      category: 'Electronics',
      quantity: 25,
      price: 1299.99,
      supplierName: 'TechWorld Supplies',
      stockStatus: 'In Stock',
      popularItem: 'Yes',
      comment: 'High performance gaming laptop'
    },
    {
      itemId: 'ITEM002',
      itemName: 'Office Chair',
      category: 'Furniture',
      quantity: 8,
      price: 349.50,
      supplierName: 'ComfortSeat Co.',
      stockStatus: 'Low Stock',
      popularItem: 'No'
    },
    {
      itemId: 'ITEM003',
      itemName: 'Winter Jacket',
      category: 'Clothing',
      quantity: 0,
      price: 89.99,
      supplierName: 'WarmWear Ltd.',
      stockStatus: 'Out of Stock',
      popularItem: 'No',
      comment: 'Seasonal item'
    },
    {
      itemId: 'ITEM004',
      itemName: 'Power Drill',
      category: 'Tools',
      quantity: 15,
      price: 129.00,
      supplierName: 'BuildRight Tools',
      stockStatus: 'In Stock',
      popularItem: 'Yes'
    },
    {
      itemId: 'ITEM005',
      itemName: 'USB-C Cable',
      category: 'Miscellaneous',
      quantity: 200,
      price: 12.99,
      supplierName: 'TechWorld Supplies',
      stockStatus: 'In Stock',
      popularItem: 'Yes',
      comment: 'Universal charging cable'
    }
  ];

  constructor() {}

  /**
   * Returns all inventory items
   * @returns Array of all InventoryItem objects
   */
  getAllItems(): InventoryItem[] {
    return [...this.inventoryDatabase];
  }

  /**
   * Returns all popular items (popularItem === 'Yes')
   * @returns Array of popular InventoryItem objects
   */
  getPopularItems(): InventoryItem[] {
    return this.inventoryDatabase.filter(
      (item: InventoryItem) => item.popularItem === 'Yes'
    );
  }

  /**
   * Finds an item by its name (case-insensitive exact match)
   * @param itemName - The name to search for
   * @returns The matching InventoryItem or undefined
   */
  findItemByName(itemName: string): InventoryItem | undefined {
    return this.inventoryDatabase.find(
      (item: InventoryItem) => item.itemName.toLowerCase() === itemName.toLowerCase()
    );
  }

  /**
   * Finds an item by its ID (case-insensitive)
   * @param itemId - The ID to search for
   * @returns The matching InventoryItem or undefined
   */
  findItemById(itemId: string): InventoryItem | undefined {
    return this.inventoryDatabase.find(
      (item: InventoryItem) => item.itemId.toLowerCase() === itemId.toLowerCase()
    );
  }

  /**
   * Searches items by name using partial, case-insensitive matching
   * @param searchTerm - The search keyword
   * @returns Array of matching InventoryItem objects
   */
  searchByName(searchTerm: string): InventoryItem[] {
    return this.inventoryDatabase.filter(
      (item: InventoryItem) => item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  /**
   * Filters items by category
   * @param category - The category to filter by
   * @returns Array of matching InventoryItem objects
   */
  filterByCategory(category: Category): InventoryItem[] {
    return this.inventoryDatabase.filter(
      (item: InventoryItem) => item.category === category
    );
  }

  /**
   * Filters items by stock status
   * @param status - The stock status to filter by
   * @returns Array of matching InventoryItem objects
   */
  filterByStockStatus(status: StockStatus): InventoryItem[] {
    return this.inventoryDatabase.filter(
      (item: InventoryItem) => item.stockStatus === status
    );
  }

  /**
   * Searches items with multiple filter criteria
   * @param searchTerm - Keyword for name search (optional)
   * @param category - Category filter (optional)
   * @param stockStatus - Stock status filter (optional)
   * @param popularOnly - Whether to show only popular items
   * @returns Filtered array of InventoryItem objects
   */
  searchWithFilters(
    searchTerm: string,
    category: string,
    stockStatus: string,
    popularOnly: boolean
  ): InventoryItem[] {
    let results: InventoryItem[] = [...this.inventoryDatabase];

    // Filter by search term (name)
    if (searchTerm.trim() !== '') {
      results = results.filter(
        (item: InventoryItem) => item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (category !== '') {
      results = results.filter(
        (item: InventoryItem) => item.category === category
      );
    }

    // Filter by stock status
    if (stockStatus !== '') {
      results = results.filter(
        (item: InventoryItem) => item.stockStatus === stockStatus
      );
    }

    // Filter by popular flag
    if (popularOnly) {
      results = results.filter(
        (item: InventoryItem) => item.popularItem === 'Yes'
      );
    }

    return results;
  }

  /**
   * Checks if an Item ID is unique in the database
   * @param itemId - The ID to check
   * @returns true if the ID does not exist
   */
  isItemIdUnique(itemId: string): boolean {
    return !this.inventoryDatabase.some(
      (item: InventoryItem) => item.itemId.toLowerCase() === itemId.toLowerCase()
    );
  }

  /**
   * Adds a new item to the inventory
   * Validates all required fields and ID uniqueness
   * @param item - The InventoryItem to add
   * @returns Object with success status and message
   */
  addItem(item: InventoryItem): { success: boolean; message: string } {
    // Validate Item ID
    if (!item.itemId || item.itemId.trim() === '') {
      return { success: false, message: 'Item ID cannot be empty.' };
    }
    if (!this.isItemIdUnique(item.itemId)) {
      return { success: false, message: 'Item ID "' + item.itemId + '" already exists.' };
    }

    // Validate Item Name
    if (!item.itemName || item.itemName.trim() === '') {
      return { success: false, message: 'Item Name cannot be empty.' };
    }

    // Validate Quantity
    if (item.quantity < 0 || !Number.isInteger(item.quantity)) {
      return { success: false, message: 'Quantity must be a non-negative whole number.' };
    }

    // Validate Price
    if (item.price < 0 || isNaN(item.price)) {
      return { success: false, message: 'Price must be a non-negative number.' };
    }

    // Validate Supplier Name
    if (!item.supplierName || item.supplierName.trim() === '') {
      return { success: false, message: 'Supplier Name cannot be empty.' };
    }

    this.inventoryDatabase.push({ ...item });
    return { success: true, message: 'Item "' + item.itemName + '" has been added successfully.' };
  }

  /**
   * Updates an existing item found by item name
   * @param originalName - The current name of the item to update
   * @param updatedItem - The updated InventoryItem data
   * @returns Object with success status and message
   */
  updateItem(originalName: string, updatedItem: Partial<InventoryItem>): { success: boolean; message: string } {
    const index: number = this.inventoryDatabase.findIndex(
      (item: InventoryItem) => item.itemName.toLowerCase() === originalName.toLowerCase()
    );

    if (index === -1) {
      return { success: false, message: 'Item "' + originalName + '" not found.' };
    }

    // Validate updated fields
    if (updatedItem.itemName !== undefined && updatedItem.itemName.trim() === '') {
      return { success: false, message: 'Item Name cannot be empty.' };
    }

    if (updatedItem.quantity !== undefined && (updatedItem.quantity < 0 || !Number.isInteger(updatedItem.quantity))) {
      return { success: false, message: 'Quantity must be a non-negative whole number.' };
    }

    if (updatedItem.price !== undefined && (updatedItem.price < 0 || isNaN(updatedItem.price))) {
      return { success: false, message: 'Price must be a non-negative number.' };
    }

    if (updatedItem.supplierName !== undefined && updatedItem.supplierName.trim() === '') {
      return { success: false, message: 'Supplier Name cannot be empty.' };
    }

    // Apply updates - Item ID cannot be changed
    const existingItem: InventoryItem = this.inventoryDatabase[index];
    if (updatedItem.itemName !== undefined) { existingItem.itemName = updatedItem.itemName; }
    if (updatedItem.category !== undefined) { existingItem.category = updatedItem.category; }
    if (updatedItem.quantity !== undefined) { existingItem.quantity = updatedItem.quantity; }
    if (updatedItem.price !== undefined) { existingItem.price = updatedItem.price; }
    if (updatedItem.supplierName !== undefined) { existingItem.supplierName = updatedItem.supplierName; }
    if (updatedItem.stockStatus !== undefined) { existingItem.stockStatus = updatedItem.stockStatus; }
    if (updatedItem.popularItem !== undefined) { existingItem.popularItem = updatedItem.popularItem; }
    if (updatedItem.comment !== undefined) { existingItem.comment = updatedItem.comment; }

    return { success: true, message: 'Item "' + existingItem.itemName + '" has been updated successfully.' };
  }

  /**
   * Deletes an item from the inventory by item name
   * @param itemName - The name of the item to delete
   * @returns Object with success status and message
   */
  deleteItem(itemName: string): { success: boolean; message: string } {
    const index: number = this.inventoryDatabase.findIndex(
      (item: InventoryItem) => item.itemName.toLowerCase() === itemName.toLowerCase()
    );

    if (index === -1) {
      return { success: false, message: 'Item "' + itemName + '" not found.' };
    }

    const removedItem: InventoryItem = this.inventoryDatabase[index];
    this.inventoryDatabase.splice(index, 1);
    return { success: true, message: 'Item "' + removedItem.itemName + '" has been deleted successfully.' };
  }
}
