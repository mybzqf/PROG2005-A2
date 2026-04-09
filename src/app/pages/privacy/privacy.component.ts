/**
 * Privacy and Security Analysis Page Component
 * Explains key privacy and security considerations for the inventory app
 * Author: Yu Jiutai
 * Assignment: Part 2 - Angular Inventory App
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent {
  /** Page title */
  pageTitle: string = 'Privacy & Security Analysis';

  /** Security topics displayed on the page */
  securityTopics: { title: string; description: string; icon: string }[] = [
    {
      title: 'Data Storage & Persistence',
      description: 'This application stores inventory data in-memory within the browser session. No data is persisted to a server or local storage, which means all data is cleared when the browser is closed. This approach eliminates risks associated with persistent data storage but also means data must be re-entered each session. For a production system, secure server-side storage with encryption at rest would be essential.',
      icon: '💾'
    },
    {
      title: 'Input Validation & Sanitisation',
      description: 'All user inputs are validated on the client side before being processed. Numeric fields are restricted to valid numbers only, and required fields are checked for completeness. This prevents malformed data from entering the system. In a production environment, server-side validation would also be necessary to prevent bypassing client-side checks.',
      icon: '✅'
    },
    {
      title: 'Cross-Site Scripting (XSS) Prevention',
      description: 'Angular provides built-in XSS protection by automatically sanitising values before rendering them in templates. The framework escapes potentially dangerous characters in data bindings, preventing malicious scripts from being injected through user input fields such as item names or comments.',
      icon: '🛡️'
    },
    {
      title: 'Authentication & Authorisation',
      description: 'The current application does not implement user authentication or role-based access control. In a real-world deployment, implementing secure authentication (e.g., OAuth 2.0 or JWT-based authentication) and role-based authorisation would be critical to ensure only authorised personnel can modify inventory data.',
      icon: '🔐'
    },
    {
      title: 'Data Integrity',
      description: 'The application enforces data integrity through TypeScript type definitions and validation rules. Item IDs are unique and immutable once assigned, preventing duplicate entries. Category, stock status, and popular item fields use predefined options to ensure consistency. These constraints help maintain a reliable dataset.',
      icon: '📊'
    },
    {
      title: 'Network Security',
      description: 'As a client-side only application, no network requests are made to external servers, eliminating risks such as man-in-the-middle attacks or data interception during transmission. However, if the application were extended to use a backend API, HTTPS encryption and proper CORS configuration would be essential to protect data in transit.',
      icon: '🌐'
    },
    {
      title: 'Supplier & Business Data Privacy',
      description: 'The inventory system stores supplier names and pricing information that could be considered commercially sensitive. In a production environment, access to this data should be restricted based on user roles, and audit logging should be implemented to track who accesses or modifies sensitive business information.',
      icon: '🏢'
    },
    {
      title: 'Browser Security Considerations',
      description: 'Since data resides only in the browser\'s memory, it is vulnerable to access through browser developer tools during an active session. Users should be aware that anyone with physical access to the device can potentially view the data. Using secure browser practices and session timeouts would mitigate this risk in a production scenario.',
      icon: '🌍'
    }
  ];
}
