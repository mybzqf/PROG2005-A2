/**
 * Application Routes Configuration
 * Defines navigation paths for all pages in the inventory app
 * Author: Yu Jiutai
 * Assignment: Part 2 - Angular Inventory App
 */

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { SearchComponent } from './pages/search/search.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { HelpComponent } from './pages/help/help.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' }
];
