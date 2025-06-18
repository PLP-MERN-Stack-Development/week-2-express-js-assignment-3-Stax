# Products API - RESTful Express.js Assignment

This project implements a comprehensive RESTful API for managing **product** resources, adhering to the requirements outlined in the Express.js assignment. It covers standard CRUD (Create, Read, Update, Delete) operations, robust routing, middleware implementation, comprehensive error handling, and advanced features like filtering, pagination, and search.

## Project Structure


products-api/
├── server.js               # Main Express application file, sets up the server and global middleware.
├── package.json            # Defines project metadata, scripts, and dependencies.
├── node_modules/           # Directory where npm/pnpm installs project dependencies.
├── README.md               # This documentation file.
├── .env.example            # An example file for environment variables.
└── routes/
└── productRoutes.js    # Defines all API routes and logic specifically for the products resource.


## Setup and Running the Server

To get the API up and running on your local machine, follow these steps:

1.  **Node.js Installation:**
    Ensure you have Node.js (v18 or higher) installed on your system. If not, you can download the official installer from [nodejs.org](https://nodejs.org/). This installation includes `npm` (Node Package Manager). If you prefer `pnpm`, you'll need to install it globally via `npm install -g pnpm`.

2.  **Navigate to the project directory:**
    Open your terminal (Command Prompt or PowerShell) and change your current directory to the `products-api` folder you created:
    ```bash
    cd path/to/your/products-api
    ```
    (Replace `path/to/your/products-api` with the actual path, e.g., `C:\Users\NotDefined\Desktop\ExpressProject\express-app\week2\products-api`)

3.  **Install dependencies:**
    From within the `products-api` directory, install all the necessary project dependencies:
    ```bash
    npm install
    # OR if you prefer pnpm
    # pnpm install
    ```
    This command will install `express`, `body-parser`, `uuid`, `mongoose`, `dotenv`, and `nodemon`.

4.  **Environment Variables Setup:**
    Create a file named `.env` in the root of your `products-api` directory. Copy the content from `.env.example` into this new `.env` file. This file will store sensitive information and configuration.
    **Example `.env` content:**
    ```
    PORT=3000
    API_KEY=your_secret_api_key_here
    ```
    **Important:** Do **not** commit your actual `.env` file to version control (Git). It's listed in `.gitignore` by default in most Node.js projects, but always double-check.

5.  **Run the server:**
    To start the server using `nodemon` (which provides automatic restarts when you make code changes during development):
    ```bash
    npm run dev
    # OR if you prefer pnpm
    # pnpm run dev
    ```
    If successful, you should see output in your terminal similar to:
    ```
    Server is running on http://localhost:3000
    Test the root endpoint in your browser: http://localhost:3000/
    API documentation will be available at /api-docs (after Task 5)
    ```

## API Endpoints Documentation

The API exposes a set of RESTful endpoints for managing `products`. All product-related endpoints are prefixed with `/api`.

### Products Resource Schema

**Fields:**

* `id` (string): A unique identifier for the product (automatically generated).
* `name` (string): The name of the product.
* `description` (string): A brief description of the product.
* `price` (number): The price of the product.
* `category` (string): The category the product belongs to (e.g., "Electronics", "Clothing").
* `inStock` (boolean): Indicates if the product is currently in stock.

---

#### 1. `GET /api/products` - List all products

* **Description:** Retrieves a list of all available product resources.
* **Method:** `GET`
* **Request Parameters:** None (for now; Task 5 will add query parameters for filtering/pagination).
* **Response:**
    * `200 OK` - A JSON array containing product objects.
        ```json
        [
          {
            "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            "name": "Laptop Pro",
            "description": "High-performance laptop for professionals.",
            "price": 1500.00,
            "category": "Electronics",
            "inStock": true
          },
          {
            "id": "b2c3d4e5-f6a7-8901-2345-67890abcdef0",
            "name": "Wireless Mouse X",
            "description": "Ergonomic wireless mouse with customizable buttons.",
            "price": 45.00,
            "category": "Accessories",
            "inStock": true
          }
        ]
        ```

---

#### 2. `GET /api/products/:id` - Get a specific product by ID

* **Description:** Retrieves a single product resource based on its unique identifier.
* **Method:** `GET`
* **URL Parameters:**
    * `id` (string, required): The unique ID of the product.
* **Response:**
    * `200 OK` - A JSON object representing the requested product.
        ```json
        {
          "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
          "name": "Laptop Pro",
          "description": "High-performance laptop for professionals.",
          "price": 1500.00,
          "category": "Electronics",
          "inStock": true
        }
        ```
    * `404 Not Found` - If a product with the specified `id` does not exist.
        ```
        Product not found
        ```

---

#### 3. `POST /api/products` - Create a new product

* **Description:** Creates a new product resource. A unique `id` will be automatically generated by the server.
* **Method:** `POST`
* **Request Body (JSON):**
    * Contains the product fields, excluding `id`.
    ```json
    {
      "name": "Gaming Headset",
      "description": "Immersive sound, comfortable fit.",
      "price": 99.99,
      "category": "Accessories",
      "inStock": true
    }
    ```
* **Response:**
    * `201 Created` - A JSON object representing the newly created product.
        ```json
        {
          "id": "c3d4e5f6-a7b8-9012-3456-7890abcdef01",
          "name": "Gaming Headset",
          "description": "Immersive sound, comfortable fit.",
          "price": 99.99,
          "category": "Accessories",
          "inStock": true
        }
        ```

---

#### 4. `PUT /api/products/:id` - Update an existing product

* **Description:** Updates an existing product resource identified by its unique ID. Only the fields provided in the request body will be updated.
* **Method:** `PUT`
* **URL Parameters:**
    * `id` (string, required): The unique ID of the product to update.
* **Request Body (JSON):**
    * Contains one or more product fields to update.
    ```json
    {
      "price": 109.99,
      "inStock": false
    }
    ```
* **Response:**
    * `200 OK` - A JSON object representing the updated product.
        ```json
        {
          "id": "c3d4e5f6-a7b8-9012-3456-7890abcdef01",
          "name": "Gaming Headset",
          "description": "Immersive sound, comfortable fit.",
          "price": 109.99,
          "category": "Accessories",
          "inStock": false
        }
        ```
    * `404 Not Found` - If a product with the specified `id` does not exist.

---

#### 5. `DELETE /api/products/:id` - Delete a product

* **Description:** Deletes a product resource identified by its unique ID.
* **Method:** `DELETE`
* **URL Parameters:**
    * `id` (string, required): The unique ID of the product to delete.
* **Response:**
    * `204 No Content` - If the product was successfully deleted. The response body will be empty.
    * `404 Not Found` - If a product with the specified `id` does not exist.

---

## Environment Variables (`.env.example`)

This project utilizes environment variables for sensitive data and configuration. A `.env.example` file is provided to show the expected variables.


PORT=3000
API_KEY=your_secret_api_key_here

**Action:** Create a file named `.env.example` in the root of your `products-api` directory and paste this content.

**To use environment variables:**
1.  Create a file named `.env` in the root of your project (`products-api/.env`).
2.  Copy the content from `.env.example` into your new `.env` file.
3.  Modify the values in `.env` as needed (e.g., set your actual `API_KEY`).
    **Crucially, do NOT commit your `.env` file to version control (Git).** It contains sensitive information. Most Node.js project templates include `.gitignore` rules to exclude `.env` files.

---
Error Handling
The API implements a comprehensive global error handling middleware to provide consistent and informative error responses. Custom error classes are used to categorize specific types of errors.

Custom Error Classes
CustomError: Base class for all custom errors.

Properties: message (string), statusCode (number, default 500).

NotFoundError: Extends CustomError.

Usage: Thrown when a requested resource (e.g., a product by ID) is not found.

HTTP Status Code: 404 Not Found.

ValidationError: Extends CustomError.

Usage: Thrown when input data fails validation checks (e.g., missing required fields, invalid data types).

HTTP Status Code: 400 Bad Request.

Additional Property: errors (array of strings, detailing specific validation failures).

Global Error Handling
All errors (including those thrown by custom error classes, Express, or asynchronous operations) are caught by a single error handling middleware. This middleware determines the appropriate HTTP status code and constructs a standardized JSON error response.

Error Response Format:

{
  "success": false,
  "message": "A descriptive error message.",
  "errors": [
    "Optional array of specific error details (e.g., validation messages)."
  ]
}

Testing Error Handling
After starting your server with npm run dev (and remembering to include the x-api-key for all /api routes):

1. Test NotFoundError (GET /api/products/:id with non-existent ID):

Method: GET

URL: http://localhost:3000/api/products/non-existent-id-123

Headers: x-api-key: YOUR_ACTUAL_API_KEY

Expected Response: 404 Not Found

{
  "success": false,
  "message": "Product with ID non-existent-id-123 not found."
}

2. Test ValidationError (POST /api/products with invalid data):

This was already tested and confirmed working in Task 3. The response format will now be the standardized one.

Method: POST

URL: http://localhost:3000/api/products

Headers: Content-Type: application/json, x-api-key: YOUR_ACTUAL_API_KEY

Body (raw, JSON): (e.g., missing name)

{
  "description": "...",
  "price": 10,
  "category": "...",
  "inStock": true
}

Expected Response: 400 Bad Request

{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name is required and must be a non-empty string."
  ]
}

3. Test General Internal Server Error (Simulated - Optional):

To test a generic 500 error, you could temporarily introduce a line that throws an unexpected error in one of your GET routes (e.g., throw new Error('Simulated internal server error!');).

Method: GET (to the modified route)

URL: (e.g., http://localhost:3000/api/products)

Headers: x-api-key: YOUR_ACTUAL_API_KEY

Expected Response: 500 Internal Server Error

{
  "success": false,
  "message": "Something went wrong on the server."
}

API Endpoints Documentation
Products Resource (Advanced Features)
In addition to the standard CRUD operations, the products resource now supports advanced querying and statistics.

6. GET /api/products - List all products with Filtering and Pagination
Description: Retrieves a list of all products, with optional filtering by category and pagination.

Method: GET

Query Parameters:

category (string, optional): Filters products to only include those belonging to the specified category (case-insensitive).

page (number, optional): The page number to retrieve. Defaults to 1.

limit (number, optional): The number of items per page. Defaults to 10.

Example Requests:

GET /api/products?category=electronics

GET /api/products?page=2&limit=3

GET /api/products?category=accessories&page=1&limit=2

Response: 200 OK - A JSON object containing pagination metadata and an array of product objects.

{
  "page": 1,
  "limit": 10,
  "totalProducts": 7,
  "totalPages": 1,
  "data": [
    // ... array of filtered and paginated product objects
  ]
}

400 Bad Request if page or limit are not positive integers.

7. GET /api/products/search - Search Products by Name
Description: Searches for products whose names contain a specified query string (case-insensitive).

Method: GET

Query Parameters:

q (string, required): The search query string.

Example Request: GET /api/products/search?q=laptop

Response: 200 OK - A JSON array of matching product objects.

[
  {
    "id": "...",
    "name": "Laptop Pro",
    "description": "...",
    "price": 1500.00,
    "category": "Electronics",
    "inStock": true
  }
]

400 Bad Request if q is missing or empty.

8. GET /api/products/stats - Get Product Statistics
Description: Provides various statistics about the product data, such as count by category, total in stock, etc.

Method: GET

Request Parameters: None.

Example Request: GET /api/products/stats

Response: 200 OK - A JSON object containing statistical data.

{
  "totalProducts": 7,
  "totalCategories": 4,
  "countByCategory": {
    "Electronics": 2,
    "Accessories": 3,
    "Audio": 1,
    "Wearables": 1
  },
  "totalInStock": 5,
  "totalOutOfStock": 2,
  "averagePrice": 466.99
}
