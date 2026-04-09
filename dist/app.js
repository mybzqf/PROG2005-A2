"use strict";
/**
 * Inventory Management System - Part 1
 * A TypeScript-based inventory management application
 * Author: Yu Jiutai
 * Assignment: Part 1 - Basic TypeScript App
 */
// Data Store
/**
 * In-memory database storing all inventory items
 * Initialised with sample hardcoded data for demonstration
 */
let inventoryDatabase = [
    {
        itemId: "ITEM001",
        itemName: "Laptop",
        category: "Electronics",
        quantity: 25,
        price: 1299.99,
        supplierName: "TechWorld Supplies",
        stockStatus: "In Stock",
        popularItem: "Yes",
        comment: "High performance gaming laptop"
    },
    {
        itemId: "ITEM002",
        itemName: "Office Chair",
        category: "Furniture",
        quantity: 8,
        price: 349.50,
        supplierName: "ComfortSeat Co.",
        stockStatus: "Low Stock",
        popularItem: "No"
    },
    {
        itemId: "ITEM003",
        itemName: "Winter Jacket",
        category: "Clothing",
        quantity: 0,
        price: 89.99,
        supplierName: "WarmWear Ltd.",
        stockStatus: "Out of Stock",
        popularItem: "No",
        comment: "Seasonal item"
    },
    {
        itemId: "ITEM004",
        itemName: "Power Drill",
        category: "Tools",
        quantity: 15,
        price: 129.00,
        supplierName: "BuildRight Tools",
        stockStatus: "In Stock",
        popularItem: "Yes"
    },
    {
        itemId: "ITEM005",
        itemName: "USB-C Cable",
        category: "Miscellaneous",
        quantity: 200,
        price: 12.99,
        supplierName: "TechWorld Supplies",
        stockStatus: "In Stock",
        popularItem: "Yes",
        comment: "Universal charging cable"
    }
];
// Validation
/**
 * Validates that a string is not empty after trimming
 * @param value - The string value to validate
 * @returns true if the string is non-empty
 */
function isNonEmptyString(value) {
    return value.trim().length > 0;
}
/**
 * Validates that a value is a positive number
 * @param value - The number to validate
 * @returns true if the value is a valid positive number
 */
function isValidPositiveNumber(value) {
    return !isNaN(value) && value >= 0;
}
/**
 * Validates that the given category is one of the allowed values
 * @param category - The category string to validate
 * @returns true if it is a valid Category
 */
function isValidCategory(category) {
    const validCategories = ["Electronics", "Furniture", "Clothing", "Tools", "Miscellaneous"];
    return validCategories.includes(category);
}
/**
 * Validates that the given stock status is one of the allowed values
 * @param status - The stock status string to validate
 * @returns true if it is a valid StockStatus
 */
function isValidStockStatus(status) {
    const validStatuses = ["In Stock", "Low Stock", "Out of Stock"];
    return validStatuses.includes(status);
}
/**
 * Validates that the given popular item value is valid
 * @param value - The popular item string to validate
 * @returns true if it is a valid PopularItem value
 */
function isValidPopularItem(value) {
    return value === "Yes" || value === "No";
}
/**
 * Checks if an Item ID already exists in the database
 * @param itemId - The item ID to check
 * @returns true if the ID already exists
 */
function isItemIdUnique(itemId) {
    return !inventoryDatabase.some((item) => item.itemId.toLowerCase() === itemId.toLowerCase());
}
// CRUD Operations
/**
 * Adds a new item to the inventory database
 * Validates all fields before adding
 * @param item - The InventoryItem to add
 * @returns A message indicating success or failure
 */
function addItem(item) {
    // Validate Item ID uniqueness
    if (!isNonEmptyString(item.itemId)) {
        return "Error: Item ID cannot be empty.";
    }
    if (!isItemIdUnique(item.itemId)) {
        return "Error: Item ID '" + item.itemId + "' already exists. Each item must have a unique ID.";
    }
    // Validate Item Name
    if (!isNonEmptyString(item.itemName)) {
        return "Error: Item Name cannot be empty.";
    }
    // Validate Category
    if (!isValidCategory(item.category)) {
        return "Error: Invalid category. Must be one of: Electronics, Furniture, Clothing, Tools, Miscellaneous.";
    }
    // Validate Quantity
    if (!isValidPositiveNumber(item.quantity) || !Number.isInteger(item.quantity)) {
        return "Error: Quantity must be a non-negative whole number.";
    }
    // Validate Price
    if (!isValidPositiveNumber(item.price)) {
        return "Error: Price must be a non-negative number.";
    }
    // Validate Supplier Name
    if (!isNonEmptyString(item.supplierName)) {
        return "Error: Supplier Name cannot be empty.";
    }
    // Validate Stock Status
    if (!isValidStockStatus(item.stockStatus)) {
        return "Error: Invalid stock status. Must be one of: In Stock, Low Stock, Out of Stock.";
    }
    // Validate Popular Item
    if (!isValidPopularItem(item.popularItem)) {
        return "Error: Popular Item must be 'Yes' or 'No'.";
    }
    // All validations passed, add the item
    inventoryDatabase.push(item);
    return "Success: Item '" + item.itemName + "' (ID: " + item.itemId + ") has been added to the inventory.";
}
/**
 * Finds an item by its name (case-insensitive exact match)
 * @param itemName - The name of the item to find
 * @returns The found InventoryItem or undefined
 */
function findItemByName(itemName) {
    return inventoryDatabase.find((item) => item.itemName.toLowerCase() === itemName.toLowerCase());
}
/**
 * Updates an existing inventory item identified by item name
 * @param itemName - The name of the item to update
 * @param updates - A partial InventoryItem object with fields to update
 * @returns A message indicating success or failure
 */
function updateItem(itemName, updates) {
    const item = findItemByName(itemName);
    if (!item) {
        return "Error: Item '" + itemName + "' not found in the inventory.";
    }
    // Item ID cannot be changed once set
    if (updates.itemId && updates.itemId !== item.itemId) {
        return "Error: Item ID cannot be changed once it has been assigned.";
    }
    // Validate and apply updates
    if (updates.itemName !== undefined) {
        if (!isNonEmptyString(updates.itemName)) {
            return "Error: Item Name cannot be empty.";
        }
        item.itemName = updates.itemName;
    }
    if (updates.category !== undefined) {
        if (!isValidCategory(updates.category)) {
            return "Error: Invalid category.";
        }
        item.category = updates.category;
    }
    if (updates.quantity !== undefined) {
        if (!isValidPositiveNumber(updates.quantity) || !Number.isInteger(updates.quantity)) {
            return "Error: Quantity must be a non-negative whole number.";
        }
        item.quantity = updates.quantity;
    }
    if (updates.price !== undefined) {
        if (!isValidPositiveNumber(updates.price)) {
            return "Error: Price must be a non-negative number.";
        }
        item.price = updates.price;
    }
    if (updates.supplierName !== undefined) {
        if (!isNonEmptyString(updates.supplierName)) {
            return "Error: Supplier Name cannot be empty.";
        }
        item.supplierName = updates.supplierName;
    }
    if (updates.stockStatus !== undefined) {
        if (!isValidStockStatus(updates.stockStatus)) {
            return "Error: Invalid stock status.";
        }
        item.stockStatus = updates.stockStatus;
    }
    if (updates.popularItem !== undefined) {
        if (!isValidPopularItem(updates.popularItem)) {
            return "Error: Popular Item must be 'Yes' or 'No'.";
        }
        item.popularItem = updates.popularItem;
    }
    if (updates.comment !== undefined) {
        item.comment = updates.comment;
    }
    return "Success: Item '" + item.itemName + "' has been updated.";
}
/**
 * Deletes an item from the inventory by item name
 * @param itemName - The name of the item to delete
 * @returns A message indicating success or failure
 */
function deleteItem(itemName) {
    const index = inventoryDatabase.findIndex((item) => item.itemName.toLowerCase() === itemName.toLowerCase());
    if (index === -1) {
        return "Error: Item '" + itemName + "' not found in the inventory.";
    }
    const removedItem = inventoryDatabase[index];
    inventoryDatabase.splice(index, 1);
    return "Success: Item '" + removedItem.itemName + "' (ID: " + removedItem.itemId + ") has been deleted.";
}
/**
 * Searches for items by name (partial, case-insensitive match)
 * @param searchTerm - The search term to match against item names
 * @returns An array of matching InventoryItems
 */
function searchItems(searchTerm) {
    return inventoryDatabase.filter((item) => item.itemName.toLowerCase().includes(searchTerm.toLowerCase()));
}
/**
 * Returns all items in the inventory
 * @returns The full array of InventoryItems
 */
function getAllItems() {
    return inventoryDatabase;
}
/**
 * Returns all items marked as popular
 * @returns An array of InventoryItems where popularItem is "Yes"
 */
function getPopularItems() {
    return inventoryDatabase.filter((item) => item.popularItem === "Yes");
}
// UI Rendering
/**
 * Generates an HTML table string from an array of inventory items
 * @param items - Array of InventoryItems to display
 * @returns HTML string for the items table
 */
function generateItemsTable(items) {
    if (items.length === 0) {
        return '<div class="no-results">No items found.</div>';
    }
    let html = '<div class="table-container"><table class="items-table">';
    html += "<thead><tr>";
    html += "<th>Item ID</th>";
    html += "<th>Item Name</th>";
    html += "<th>Category</th>";
    html += "<th>Quantity</th>";
    html += "<th>Price ($)</th>";
    html += "<th>Supplier</th>";
    html += "<th>Stock Status</th>";
    html += "<th>Popular</th>";
    html += "<th>Comment</th>";
    html += "<th>Actions</th>";
    html += "</tr></thead><tbody>";
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // Determine row class based on stock status
        let rowClass = "";
        if (item.stockStatus === "Out of Stock") {
            rowClass = "out-of-stock";
        }
        else if (item.stockStatus === "Low Stock") {
            rowClass = "low-stock";
        }
        html += '<tr class="' + rowClass + '">';
        html += "<td>" + item.itemId + "</td>";
        html += "<td>" + item.itemName + "</td>";
        html += '<td><span class="category-badge category-' + item.category.toLowerCase() + '">' + item.category + "</span></td>";
        html += "<td>" + item.quantity + "</td>";
        html += "<td>$" + item.price.toFixed(2) + "</td>";
        html += "<td>" + item.supplierName + "</td>";
        html += '<td><span class="status-badge status-' + item.stockStatus.replace(/ /g, "-").toLowerCase() + '">' + item.stockStatus + "</span></td>";
        html += '<td><span class="popular-badge popular-' + item.popularItem.toLowerCase() + '">' + item.popularItem + "</span></td>";
        html += "<td>" + (item.comment || "—") + "</td>";
        html += "<td class=\"actions-cell\">";
        html += '<button class="btn btn-edit" onclick="openEditForm(\'' + item.itemName.replace(/'/g, "\\'") + '\')">Edit</button>';
        html += '<button class="btn btn-delete" onclick="confirmDelete(\'' + item.itemName.replace(/'/g, "\\'") + '\')">Delete</button>';
        html += "</td>";
        html += "</tr>";
    }
    html += "</tbody></table></div>";
    return html;
}
/**
 * Displays a notification message on the page
 * @param message - The message to display
 * @param type - The message type: "success", "error", or "info"
 */
function showNotification(message, type) {
    const notificationArea = document.getElementById("notification-area");
    if (notificationArea) {
        notificationArea.innerHTML =
            '<div class="notification notification-' + type + '">' +
                '<span>' + message + '</span>' +
                '<button class="notification-close" onclick="clearNotification()">×</button>' +
                '</div>';
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            clearNotification();
        }, 5000);
    }
}
/**
 * Clears the notification area
 */
function clearNotification() {
    const notificationArea = document.getElementById("notification-area");
    if (notificationArea) {
        notificationArea.innerHTML = "";
    }
}
/**
 * Renders the main items display area with all items
 */
function renderAllItems() {
    const displayArea = document.getElementById("items-display");
    if (displayArea) {
        const items = getAllItems();
        displayArea.innerHTML = "<h2>All Inventory Items (" + items.length + ")</h2>" + generateItemsTable(items);
    }
}
/**
 * Renders only the popular items in the display area
 */
function renderPopularItems() {
    const displayArea = document.getElementById("items-display");
    if (displayArea) {
        const items = getPopularItems();
        displayArea.innerHTML = "<h2>Popular Items (" + items.length + ")</h2>" + generateItemsTable(items);
    }
}
/**
 * Handles the search functionality and renders search results
 */
function handleSearch() {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        const searchTerm = searchInput.value.trim();
        if (searchTerm === "") {
            showNotification("Please enter a search term.", "error");
            return;
        }
        const results = searchItems(searchTerm);
        const displayArea = document.getElementById("items-display");
        if (displayArea) {
            displayArea.innerHTML =
                '<h2>Search Results for "' + searchTerm + '" (' + results.length + " found)</h2>" +
                    generateItemsTable(results);
        }
    }
}
// Form Handling
/**
 * Reads form values and returns an InventoryItem object
 * @param formPrefix - Prefix for form element IDs (e.g., "add" or "edit")
 * @returns An InventoryItem object with values from the form
 */
function getFormValues(formPrefix) {
    const itemId = document.getElementById(formPrefix + "-itemId").value.trim();
    const itemName = document.getElementById(formPrefix + "-itemName").value.trim();
    const category = document.getElementById(formPrefix + "-category").value;
    const quantity = parseInt(document.getElementById(formPrefix + "-quantity").value, 10);
    const price = parseFloat(document.getElementById(formPrefix + "-price").value);
    const supplierName = document.getElementById(formPrefix + "-supplierName").value.trim();
    const stockStatus = document.getElementById(formPrefix + "-stockStatus").value;
    const popularItem = document.getElementById(formPrefix + "-popularItem").value;
    const comment = document.getElementById(formPrefix + "-comment").value.trim();
    return {
        itemId: itemId,
        itemName: itemName,
        category: category,
        quantity: quantity,
        price: price,
        supplierName: supplierName,
        stockStatus: stockStatus,
        popularItem: popularItem,
        comment: comment || undefined
    };
}
/**
 * Generates HTML for the Add Item form
 * @returns HTML string for the add form
 */
function generateAddForm() {
    let html = '<div class="form-container">';
    html += '<h2>Add New Item</h2>';
    html += '<div class="form-grid">';
    // Item ID
    html += '<div class="form-group">';
    html += '<label for="add-itemId">Item ID *</label>';
    html += '<input type="text" id="add-itemId" placeholder="e.g., ITEM006" required>';
    html += '</div>';
    // Item Name
    html += '<div class="form-group">';
    html += '<label for="add-itemName">Item Name *</label>';
    html += '<input type="text" id="add-itemName" placeholder="Enter item name" required>';
    html += '</div>';
    // Category
    html += '<div class="form-group">';
    html += '<label for="add-category">Category *</label>';
    html += '<select id="add-category">';
    html += '<option value="">-- Select Category --</option>';
    html += '<option value="Electronics">Electronics</option>';
    html += '<option value="Furniture">Furniture</option>';
    html += '<option value="Clothing">Clothing</option>';
    html += '<option value="Tools">Tools</option>';
    html += '<option value="Miscellaneous">Miscellaneous</option>';
    html += '</select>';
    html += '</div>';
    // Quantity
    html += '<div class="form-group">';
    html += '<label for="add-quantity">Quantity *</label>';
    html += '<input type="number" id="add-quantity" min="0" step="1" placeholder="0" required>';
    html += '</div>';
    // Price
    html += '<div class="form-group">';
    html += '<label for="add-price">Price ($) *</label>';
    html += '<input type="number" id="add-price" min="0" step="0.01" placeholder="0.00" required>';
    html += '</div>';
    // Supplier Name
    html += '<div class="form-group">';
    html += '<label for="add-supplierName">Supplier Name *</label>';
    html += '<input type="text" id="add-supplierName" placeholder="Enter supplier name" required>';
    html += '</div>';
    // Stock Status
    html += '<div class="form-group">';
    html += '<label for="add-stockStatus">Stock Status *</label>';
    html += '<select id="add-stockStatus">';
    html += '<option value="">-- Select Status --</option>';
    html += '<option value="In Stock">In Stock</option>';
    html += '<option value="Low Stock">Low Stock</option>';
    html += '<option value="Out of Stock">Out of Stock</option>';
    html += '</select>';
    html += '</div>';
    // Popular Item
    html += '<div class="form-group">';
    html += '<label for="add-popularItem">Popular Item *</label>';
    html += '<select id="add-popularItem">';
    html += '<option value="">-- Select --</option>';
    html += '<option value="Yes">Yes</option>';
    html += '<option value="No">No</option>';
    html += '</select>';
    html += '</div>';
    // Comment
    html += '<div class="form-group form-group-full">';
    html += '<label for="add-comment">Comment (Optional)</label>';
    html += '<input type="text" id="add-comment" placeholder="Enter a comment (optional)">';
    html += '</div>';
    html += '</div>'; // close form-grid
    // Buttons
    html += '<div class="form-actions">';
    html += '<button class="btn btn-primary" onclick="handleAddItem()">Add Item</button>';
    html += '<button class="btn btn-secondary" onclick="renderAllItems()">Cancel</button>';
    html += '</div>';
    html += '</div>'; // close form-container
    return html;
}
/**
 * Opens the Add Item form in the display area
 */
function showAddForm() {
    const displayArea = document.getElementById("items-display");
    if (displayArea) {
        displayArea.innerHTML = generateAddForm();
    }
}
/**
 * Handles the Add Item form submission
 */
function handleAddItem() {
    const newItem = getFormValues("add");
    const result = addItem(newItem);
    if (result.startsWith("Success")) {
        showNotification(result, "success");
        renderAllItems();
    }
    else {
        showNotification(result, "error");
    }
}
/**
 * Opens the Edit form for a specific item, pre-populated with current values
 * @param itemName - The name of the item to edit
 */
function openEditForm(itemName) {
    const item = findItemByName(itemName);
    if (!item) {
        showNotification("Error: Item not found.", "error");
        return;
    }
    const displayArea = document.getElementById("items-display");
    if (!displayArea)
        return;
    let html = '<div class="form-container">';
    html += '<h2>Edit Item: ' + item.itemName + '</h2>';
    html += '<div class="form-grid">';
    // Item ID (read-only)
    html += '<div class="form-group">';
    html += '<label for="edit-itemId">Item ID</label>';
    html += '<input type="text" id="edit-itemId" value="' + item.itemId + '" readonly class="readonly-input">';
    html += '</div>';
    // Item Name
    html += '<div class="form-group">';
    html += '<label for="edit-itemName">Item Name *</label>';
    html += '<input type="text" id="edit-itemName" value="' + item.itemName + '">';
    html += '</div>';
    // Category
    html += '<div class="form-group">';
    html += '<label for="edit-category">Category *</label>';
    html += '<select id="edit-category">';
    const categories = ["Electronics", "Furniture", "Clothing", "Tools", "Miscellaneous"];
    for (let i = 0; i < categories.length; i++) {
        const selected = categories[i] === item.category ? " selected" : "";
        html += '<option value="' + categories[i] + '"' + selected + '>' + categories[i] + '</option>';
    }
    html += '</select>';
    html += '</div>';
    // Quantity
    html += '<div class="form-group">';
    html += '<label for="edit-quantity">Quantity *</label>';
    html += '<input type="number" id="edit-quantity" min="0" step="1" value="' + item.quantity + '">';
    html += '</div>';
    // Price
    html += '<div class="form-group">';
    html += '<label for="edit-price">Price ($) *</label>';
    html += '<input type="number" id="edit-price" min="0" step="0.01" value="' + item.price + '">';
    html += '</div>';
    // Supplier Name
    html += '<div class="form-group">';
    html += '<label for="edit-supplierName">Supplier Name *</label>';
    html += '<input type="text" id="edit-supplierName" value="' + item.supplierName + '">';
    html += '</div>';
    // Stock Status
    html += '<div class="form-group">';
    html += '<label for="edit-stockStatus">Stock Status *</label>';
    html += '<select id="edit-stockStatus">';
    const statuses = ["In Stock", "Low Stock", "Out of Stock"];
    for (let i = 0; i < statuses.length; i++) {
        const selected = statuses[i] === item.stockStatus ? " selected" : "";
        html += '<option value="' + statuses[i] + '"' + selected + '>' + statuses[i] + '</option>';
    }
    html += '</select>';
    html += '</div>';
    // Popular Item
    html += '<div class="form-group">';
    html += '<label for="edit-popularItem">Popular Item *</label>';
    html += '<select id="edit-popularItem">';
    html += '<option value="Yes"' + (item.popularItem === "Yes" ? " selected" : "") + '>Yes</option>';
    html += '<option value="No"' + (item.popularItem === "No" ? " selected" : "") + '>No</option>';
    html += '</select>';
    html += '</div>';
    // Comment
    html += '<div class="form-group form-group-full">';
    html += '<label for="edit-comment">Comment (Optional)</label>';
    html += '<input type="text" id="edit-comment" value="' + (item.comment || "") + '">';
    html += '</div>';
    html += '</div>'; // close form-grid
    // Store original name for the update function
    html += '<input type="hidden" id="edit-originalName" value="' + item.itemName + '">';
    // Buttons
    html += '<div class="form-actions">';
    html += '<button class="btn btn-primary" onclick="handleUpdateItem()">Save Changes</button>';
    html += '<button class="btn btn-secondary" onclick="renderAllItems()">Cancel</button>';
    html += '</div>';
    html += '</div>'; // close form-container
    displayArea.innerHTML = html;
}
/**
 * Handles the Edit/Update form submission
 * Uses the original item name to find and update the item
 */
function handleUpdateItem() {
    const originalName = document.getElementById("edit-originalName").value;
    const updatedValues = getFormValues("edit");
    // Build partial update object excluding itemId
    const updates = {
        itemName: updatedValues.itemName,
        category: updatedValues.category,
        quantity: updatedValues.quantity,
        price: updatedValues.price,
        supplierName: updatedValues.supplierName,
        stockStatus: updatedValues.stockStatus,
        popularItem: updatedValues.popularItem,
        comment: updatedValues.comment
    };
    const result = updateItem(originalName, updates);
    if (result.startsWith("Success")) {
        showNotification(result, "success");
        renderAllItems();
    }
    else {
        showNotification(result, "error");
    }
}
/**
 * Shows a confirmation dialog using innerHTML before deleting an item
 * @param itemName - The name of the item to potentially delete
 */
function confirmDelete(itemName) {
    const displayArea = document.getElementById("items-display");
    if (!displayArea)
        return;
    let html = '<div class="confirm-dialog">';
    html += '<div class="confirm-icon">⚠️</div>';
    html += '<h2>Confirm Deletion</h2>';
    html += '<p>Are you sure you want to delete the item "<strong>' + itemName + '</strong>"?</p>';
    html += '<p class="confirm-warning">This action cannot be undone.</p>';
    html += '<div class="confirm-actions">';
    html += '<button class="btn btn-delete" onclick="executeDelete(\'' + itemName.replace(/'/g, "\\'") + '\')">Yes, Delete</button>';
    html += '<button class="btn btn-secondary" onclick="renderAllItems()">Cancel</button>';
    html += '</div>';
    html += '</div>';
    displayArea.innerHTML = html;
}
/**
 * Executes the deletion of an item after confirmation
 * @param itemName - The name of the item to delete
 */
function executeDelete(itemName) {
    const result = deleteItem(itemName);
    if (result.startsWith("Success")) {
        showNotification(result, "success");
    }
    else {
        showNotification(result, "error");
    }
    renderAllItems();
}
// Navigation
/**
 * Sets the active state on navigation buttons
 * @param activeButtonId - The ID of the button to mark as active
 */
function setActiveNav(activeButtonId) {
    // Remove active class from all nav buttons
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach((btn) => {
        btn.classList.remove("active");
    });
    // Add active class to the clicked button
    const activeButton = document.getElementById(activeButtonId);
    if (activeButton) {
        activeButton.classList.add("active");
    }
}
// Event Listeners & Init
/**
 * Initialises the application when the DOM is fully loaded
 * Sets up event listeners and renders the initial view
 */
document.addEventListener("DOMContentLoaded", () => {
    // Render all items on initial load
    renderAllItems();
    // Navigation button event listeners
    const btnViewAll = document.getElementById("btn-view-all");
    if (btnViewAll) {
        btnViewAll.addEventListener("click", () => {
            setActiveNav("btn-view-all");
            renderAllItems();
        });
    }
    const btnViewPopular = document.getElementById("btn-view-popular");
    if (btnViewPopular) {
        btnViewPopular.addEventListener("click", () => {
            setActiveNav("btn-view-popular");
            renderPopularItems();
        });
    }
    const btnAddItem = document.getElementById("btn-add-item");
    if (btnAddItem) {
        btnAddItem.addEventListener("click", () => {
            setActiveNav("btn-add-item");
            showAddForm();
        });
    }
    // Search button event listener
    const btnSearch = document.getElementById("btn-search");
    if (btnSearch) {
        btnSearch.addEventListener("click", () => {
            handleSearch();
        });
    }
    // Search on Enter key press
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                handleSearch();
            }
        });
    }
});
//# sourceMappingURL=app.js.map