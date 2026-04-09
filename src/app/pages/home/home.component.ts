/**
 * Home Page Component
 * Displays the purpose and overview of the inventory management app
 * Author: Yu Jiutai
 * Assignment: Part 2 - Angular Inventory App
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  /** Application title */
  appTitle: string = 'Inventory Management System';

  /** Application description */
  appDescription: string = 'A comprehensive tool for managing your inventory efficiently. Track items, monitor stock levels, and keep your business organised.';

  /** Feature highlights displayed on the home page */
  features: { title: string; description: string; icon: string }[] = [
    {
      title: 'Add & Edit Items',
      description: 'Easily add new inventory items and update existing ones with full validation.',
      icon: '📝'
    },
    {
      title: 'Search & Filter',
      description: 'Quickly find items using powerful search and filtering capabilities.',
      icon: '🔍'
    },
    {
      title: 'Stock Monitoring',
      description: 'Track stock levels with visual indicators for in stock, low stock, and out of stock items.',
      icon: '📊'
    },
    {
      title: 'Popular Items',
      description: 'Identify and display your most popular inventory items at a glance.',
      icon: '⭐'
    },
    {
      title: 'Data Validation',
      description: 'Built-in validation ensures data integrity across all operations.',
      icon: '✅'
    },
    {
      title: 'Responsive Design',
      description: 'Works seamlessly on both desktop and mobile devices.',
      icon: '📱'
    }
  ];
}
