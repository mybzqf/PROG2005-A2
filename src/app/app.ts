/**
 * Root Application Component
 * Provides the main layout with navigation header and footer
 * Author: Yu Jiutai
 * Assignment: Part 2 - Angular Inventory App
 */

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /** Application title */
  title: string = 'Inventory Management System';

  /** Mobile menu toggle state */
  mobileMenuOpen: boolean = false;

  /**
   * Toggles the mobile navigation menu
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  /**
   * Closes the mobile navigation menu
   */
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
