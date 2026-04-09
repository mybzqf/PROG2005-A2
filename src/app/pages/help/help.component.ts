/**
 * Help Page Component
 * Provides FAQs and troubleshooting guidance for the inventory app
 * Author: Yu Jiutai
 * Assignment: Part 2 - Angular Inventory App
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
  /** Page title */
  pageTitle: string = 'Help & FAQs';

  /** FAQ items with expandable answers */
  faqs: { question: string; answer: string; isOpen: boolean }[] = [
    {
      question: 'How do I add a new inventory item?',
      answer: 'Navigate to the Inventory Management page and click the "+ Add New Item" button. Fill in all required fields (marked with *) including Item ID, Item Name, Category, Quantity, Price, Supplier Name, Stock Status, and Popular Item. The Comment field is optional. Click "Add Item" to save.',
      isOpen: false
    },
    {
      question: 'How do I edit an existing item?',
      answer: 'Go to the Inventory Management page where all items are listed in a table. Find the item you want to edit and click the "Edit" button in the Actions column. The edit form will appear pre-filled with the current values. Make your changes and click "Save Changes". Note that the Item ID cannot be changed once assigned.',
      isOpen: false
    },
    {
      question: 'How do I delete an item?',
      answer: 'On the Inventory Management page, find the item in the table and click the "Delete" button. A confirmation dialog will appear asking you to confirm the deletion. Click "Yes, Delete" to proceed or "Cancel" to abort. Please note that deletions cannot be undone.',
      isOpen: false
    },
    {
      question: 'How do I search for items?',
      answer: 'Navigate to the Search page. You can search by item name using the search bar, and optionally filter by Category, Stock Status, or show only Popular Items. Click "Search" to execute your query. Use "Clear Filters" to reset all search parameters.',
      isOpen: false
    },
    {
      question: 'What are the available categories?',
      answer: 'The system supports five categories: Electronics, Furniture, Clothing, Tools, and Miscellaneous. You must select one of these categories when adding or editing an item.',
      isOpen: false
    },
    {
      question: 'What do the stock status values mean?',
      answer: '"In Stock" means the item is readily available. "Low Stock" indicates the item quantity is running low and may need restocking soon. "Out of Stock" means the item is currently unavailable. Items with different statuses are highlighted with different colours in the table for easy identification.',
      isOpen: false
    },
    {
      question: 'Why can\'t I change the Item ID?',
      answer: 'Item IDs are designed to be unique identifiers that are set once and never changed. This ensures data integrity and prevents confusion when tracking items. If you need a different ID, you would need to delete the item and create a new one with the desired ID.',
      isOpen: false
    },
    {
      question: 'Is my data saved permanently?',
      answer: 'No. This application stores data in-memory only. All data is lost when you close or refresh the browser. The application starts with sample data each time it is loaded. For permanent storage, a backend database would need to be integrated.',
      isOpen: false
    },
    {
      question: 'Why are numeric fields rejecting my input?',
      answer: 'Quantity and Price fields only accept valid numeric values. Quantity must be a non-negative whole number (no decimals), and Price must be a non-negative number (decimals allowed). Letters and special characters are blocked to ensure data validity.',
      isOpen: false
    },
    {
      question: 'How do I view only popular items?',
      answer: 'There are two ways: On the Inventory Management page, click the "Popular Items" button to filter the table. Alternatively, on the Search page, check the "Popular Items Only" checkbox and click "Search".',
      isOpen: false
    }
  ];

  /** Troubleshooting tips */
  troubleshootingTips: { title: string; solution: string }[] = [
    {
      title: 'Item not appearing after adding',
      solution: 'Ensure all required fields are filled in correctly. Check the notification message for specific validation errors. Make sure the Item ID is unique.'
    },
    {
      title: 'Search returns no results',
      solution: 'Verify that your search term matches part of an item name. Try removing filters to broaden your search. Check that items exist in the inventory.'
    },
    {
      title: 'Data disappeared after refresh',
      solution: 'This is expected behaviour. The application uses in-memory storage only. Data does not persist between browser sessions or page refreshes.'
    },
    {
      title: 'Form validation errors',
      solution: 'Ensure all required fields (marked with *) are completed. Verify that numeric fields contain only valid numbers. Check that a valid option is selected for dropdown fields.'
    },
    {
      title: 'Page not loading correctly',
      solution: 'Try refreshing the page. Ensure JavaScript is enabled in your browser. Clear your browser cache if issues persist. The application is compatible with modern browsers (Chrome, Firefox, Safari, Edge).'
    }
  ];

  /**
   * Toggles the expanded/collapsed state of a FAQ item
   * @param index - The index of the FAQ item to toggle
   */
  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
