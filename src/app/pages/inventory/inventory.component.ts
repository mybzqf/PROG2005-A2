/**
 * Inventory Management Page Component
 * Handles adding, editing, and deleting inventory items
 * Author: Yu Jiutai
 * Assignment: Part 2 - Angular Inventory App
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import {
  InventoryItem,
  Category,
  StockStatus,
  PopularItem,
  CATEGORIES,
  STOCK_STATUSES,
  POPULAR_OPTIONS
} from '../../models/inventory-item.model';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  /** List of all inventory items */
  items: InventoryItem[] = [];

  /** Options for form dropdowns */
  categories: Category[] = CATEGORIES;
  stockStatuses: StockStatus[] = STOCK_STATUSES;
  popularOptions: PopularItem[] = POPULAR_OPTIONS;

  /** Current view mode */
  currentView: string = 'all';

  /** Form visibility flags */
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  /** Confirmation dialog state */
  showDeleteConfirm: boolean = false;
  deleteTargetName: string = '';

  /** Notification state */
  notification: { message: string; type: string } | null = null;

  /** New item form model */
  newItem: InventoryItem = this.createEmptyItem();

  /** Edit item form model */
  editItem: InventoryItem = this.createEmptyItem();
  editOriginalName: string = '';

  constructor(private inventoryService: InventoryService) {
    this.loadItems();
  }

  /**
   * Creates an empty InventoryItem object for form initialisation
   * @returns A blank InventoryItem with default values
   */
  createEmptyItem(): InventoryItem {
    return {
      itemId: '',
      itemName: '',
      category: 'Electronics',
      quantity: 0,
      price: 0,
      supplierName: '',
      stockStatus: 'In Stock',
      popularItem: 'No',
      comment: ''
    };
  }

  /**
   * Loads items based on the current view mode
   */
  loadItems(): void {
    if (this.currentView === 'popular') {
      this.items = this.inventoryService.getPopularItems();
    } else {
      this.items = this.inventoryService.getAllItems();
    }
  }

  /**
   * Switches between 'all' and 'popular' view modes
   * @param view - The view to switch to
   */
  switchView(view: string): void {
    this.currentView = view;
    this.loadItems();
    this.hideAllForms();
  }

  /**
   * Shows the Add Item form and hides other forms
   */
  openAddForm(): void {
    this.newItem = this.createEmptyItem();
    this.showAddForm = true;
    this.showEditForm = false;
    this.showDeleteConfirm = false;
  }

  /**
   * Opens the Edit form pre-populated with the selected item's data
   * @param item - The InventoryItem to edit
   */
  openEditForm(item: InventoryItem): void {
    this.editOriginalName = item.itemName;
    this.editItem = { ...item };
    this.showEditForm = true;
    this.showAddForm = false;
    this.showDeleteConfirm = false;
  }

  /**
   * Hides all forms and dialogs
   */
  hideAllForms(): void {
    this.showAddForm = false;
    this.showEditForm = false;
    this.showDeleteConfirm = false;
  }

  /**
   * Handles the submission of the Add Item form
   * Validates and adds the new item to the inventory
   */
  handleAddItem(): void {
    // Parse numeric fields to ensure correct types
    this.newItem.quantity = Math.floor(Number(this.newItem.quantity));
    this.newItem.price = Number(this.newItem.price);

    const result = this.inventoryService.addItem(this.newItem);
    if (result.success) {
      this.showNotification(result.message, 'success');
      this.showAddForm = false;
      this.loadItems();
    } else {
      this.showNotification(result.message, 'error');
    }
  }

  /**
   * Handles the submission of the Edit Item form
   * Validates and updates the item in the inventory
   */
  handleUpdateItem(): void {
    // Parse numeric fields to ensure correct types
    this.editItem.quantity = Math.floor(Number(this.editItem.quantity));
    this.editItem.price = Number(this.editItem.price);

    const result = this.inventoryService.updateItem(this.editOriginalName, this.editItem);
    if (result.success) {
      this.showNotification(result.message, 'success');
      this.showEditForm = false;
      this.loadItems();
    } else {
      this.showNotification(result.message, 'error');
    }
  }

  /**
   * Shows the delete confirmation dialog for the specified item
   * @param itemName - The name of the item to confirm deletion for
   */
  confirmDelete(itemName: string): void {
    this.deleteTargetName = itemName;
    this.showDeleteConfirm = true;
    this.showAddForm = false;
    this.showEditForm = false;
  }

  /**
   * Executes the deletion of the targeted item after confirmation
   */
  executeDelete(): void {
    const result = this.inventoryService.deleteItem(this.deleteTargetName);
    if (result.success) {
      this.showNotification(result.message, 'success');
    } else {
      this.showNotification(result.message, 'error');
    }
    this.showDeleteConfirm = false;
    this.loadItems();
  }

  /**
   * Cancels the delete operation
   */
  cancelDelete(): void {
    this.showDeleteConfirm = false;
  }

  /**
   * Displays a notification message to the user
   * @param message - The notification text
   * @param type - The type: 'success' or 'error'
   */
  showNotification(message: string, type: string): void {
    this.notification = { message, type };
    setTimeout((): void => {
      this.notification = null;
    }, 4000);
  }

  /**
   * Clears the current notification
   */
  clearNotification(): void {
    this.notification = null;
  }

  /**
   * Validates that a numeric input does not contain letters
   * Used for quantity and price fields
   * @param event - The keyboard event
   */
  validateNumericInput(event: KeyboardEvent): void {
    const allowedKeys: string[] = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (allowedKeys.includes(event.key)) {
      return;
    }
    // Allow digits, decimal point, and minus sign
    if (!/[\d.]/.test(event.key)) {
      event.preventDefault();
    }
  }
}
