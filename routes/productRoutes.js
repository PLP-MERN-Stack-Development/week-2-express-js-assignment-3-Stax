// routes/productRoutes.js

const express = require('express');
const { v4: uuidv4 } = require('uuid');

// Import middleware
const validateProduct = require('../middleware/validation');

// Import custom error classes
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const router = express.Router();

// In-memory data store for products (for Task 2 initial implementation)
let products = [
    {
        id: uuidv4(),
        name: "Laptop Pro",
        description: "High-performance laptop for professionals.",
        price: 1500.00,
        category: "Electronics",
        inStock: true
    },
    {
        id: uuidv4(),
        name: "Wireless Mouse X",
        description: "Ergonomic wireless mouse with customizable buttons.",
        price: 45.00,
        category: "Accessories",
        inStock: true
    },
    {
        id: uuidv4(),
        name: "Mechanical Keyboard RGB",
        description: "Full-size mechanical keyboard with per-key RGB lighting.",
        price: 120.00,
        category: "Accessories",
        inStock: false
    },
    {
        id: uuidv4(),
        name: "USB-C Hub",
        description: "Multi-port USB-C adapter for modern laptops.",
        price: 35.00,
        category: "Accessories",
        inStock: true
    },
    {
        id: uuidv4(),
        name: "Smartphone Z",
        description: "Latest generation smartphone with advanced camera.",
        price: 999.00,
        category: "Electronics",
        inStock: true
    },
    {
        id: uuidv4(),
        name: "Bluetooth Headphones",
        description: "Over-ear headphones with noise cancellation.",
        price: 199.00,
        category: "Audio",
        inStock: true
    },
    {
        id: uuidv4(),
        name: "Smart Watch",
        description: "Fitness tracker and smartwatch combined.",
        price: 250.00,
        category: "Wearables",
        inStock: false
    }
];

// Helper function for async error handling
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// --- Task 5: Advanced Features (Place MORE SPECIFIC routes first) ---

// Task 5: Create a search endpoint that allows searching products by name
// GET /api/products/search?q=query_string
router.get('/products/search', asyncHandler((req, res) => {
    const { q } = req.query;

    if (!q || typeof q !== 'string' || q.trim().length === 0) {
        throw new ValidationError('Search query (q) is required and must be a non-empty string.');
    }

    const searchQuery = q.toLowerCase();
    const searchResults = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery)
    );

    res.json(searchResults);
}));


// Task 5: Implement route for getting product statistics (e.g., count by category)
// GET /api/products/stats
router.get('/products/stats', asyncHandler((req, res) => {
    const stats = {};

    products.forEach(product => {
        const category = product.category || 'Uncategorized';
        stats[category] = (stats[category] || 0) + 1;
    });

    const totalInStock = products.filter(p => p.inStock).length;
    const totalOutOfStock = products.filter(p => !p.inStock).length;
    const averagePrice = products.length > 0
        ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
        : 0;

    res.json({
        totalProducts: products.length,
        totalCategories: Object.keys(stats).length,
        countByCategory: stats,
        totalInStock: totalInStock,
        totalOutOfStock: totalOutOfStock,
        averagePrice: parseFloat(averagePrice)
    });
}));


// --- Task 2: Standard CRUD Operations (More specific than general /products, but less than /search or /stats) ---

// GET /api/products/:id: Get a specific product by ID
router.get('/products/:id', asyncHandler((req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        throw new NotFoundError(`Product with ID ${id} not found.`);
    }
}));


// Task 2 & 3: POST /api/products: Create a new product (with validation)
router.post('/products', validateProduct, asyncHandler((req, res) => {
    const newProduct = {
        id: uuidv4(),
        inStock: true,
        ...req.body
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
}));


// Task 2 & 3: PUT /api/products/:id: Update an existing product (with validation)
router.put('/products/:id', validateProduct, asyncHandler((req, res) => {
    const { id } = req.params;
    const updatedProductData = req.body;
    let productIndex = products.findIndex(p => p.id === id);

    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProductData, id: products[productIndex].id };
        res.json(products[productIndex]);
    } else {
        throw new NotFoundError(`Product with ID ${id} not found.`);
    }
}));


// Task 2: DELETE /api/products/:id: Delete a product
router.delete('/products/:id', asyncHandler((req, res) => {
    const { id } = req.params;
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    if (products.length < initialLength) {
        res.status(204).send();
    } else {
        throw new NotFoundError(`Product with ID ${id} not found.`);
    }
}));


// --- Task 5: GET /api/products (Filtering and Pagination - Most general, so it goes last) ---
router.get('/products', asyncHandler((req, res) => {
    let filteredProducts = [...products];

    const { category, page, limit } = req.query;

    if (category) {
        filteredProducts = filteredProducts.filter(p =>
            p.category.toLowerCase() === category.toLowerCase()
        );
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;

    if (pageNum < 1 || limitNum < 1) {
        throw new ValidationError('Page and limit must be positive integers.');
    }

    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / limitNum);

    res.json({
        page: pageNum,
        limit: limitNum,
        totalProducts: totalProducts,
        totalPages: totalPages,
        data: paginatedProducts
    });
}));


module.exports = router;
