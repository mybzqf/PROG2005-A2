/**
 * Search Page Component
 * Provides search and filtering functionality for inventory items
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
  CATEGORIES,
  STOCK_STATUSES
} from '../../models/inventory-item.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  /** Search and filter parameters */
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedStockStatus: string = '';
  popularOnly: boolean = false;

  /** Search results */
  results: InventoryItem[] = [];
  hasSearched: boolean = false;

  /** Filter options */
  categories: Category[] = CATEGORIES;
  stockStatuses: StockStatus[] = STOCK_STATUSES;

  constructor(private inventoryService: InventoryService) {}

  /**
   * Executes the search with the current filter parameters
   */
  performSearch(): void {
    this.results = this.inventoryService.searchWithFilters(
      this.searchTerm,
      this.selectedCategory,
      this.selectedStockStatus,
      this.popularOnly
    );
    this.hasSearched = true;
  }

  /**
   * Resets all search filters and clears results
   */
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedStockStatus = '';
    this.popularOnly = false;
    this.results = [];
    this.hasSearched = false;
  }

  /**
   * Handles the Enter key press in the search input
   * @param event - The keyboard event
   */
  onSearchKeypress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.performSearch();
    }
  }
}
