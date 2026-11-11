# Inventory and Data Management System
## Assignment 3 — Web Dev III | Unit 3 | CO3

A complete backend REST API built with Node.js, Express.js, and MongoDB / Mongoose for managing store and warehouse inventory.

---

## Tech Stack
- **Runtime Environment:** Node.js (CommonJS)
- **Framework:** Express.js
- **Database ODM:** Mongoose (MongoDB)
- **Environment Management:** dotenv
- **Development Tooling:** nodemon

---

## Project Architecture
```text
Assign3_webdevIII/
│
├── config/
│   └── db.js                              # MongoDB connection configuration
│
├── controllers/
│   └── productController.js               # API controllers for 8 business operations
│
├── data/
│   └── sampleProducts.js                  # Realistic 12-item catalog across 4 categories
│
├── middleware/
│   ├── errorHandler.js                    # Centralized error and 404 handlers
│   ├── requestLogger.js                   # Lightweight HTTP request logger
│   ├── validateObjectId.js                # Pre-emptive MongoDB ObjectId validator
│   ├── validateProduct.js                 # Request payload validation middleware
│   └── validateStock.js                   # Stock adjustment payload validation
│
├── models/
│   └── Product.js                         # Mongoose schema, validation, virtual & indexes
│
├── postman/
│   └── inventory-api.postman_collection.json # Complete Postman API test collection
│
├── routes/
│   └── productRoutes.js                   # Express route definitions
│
├── tests/
│   ├── api.test.js                        # Zero-dependency end-to-end integration tests
│   └── testHelper.js                      # Native Node.js HTTP request runner
│
├── utils/
│   ├── pagination.js                      # Safe pagination bounds and sorting normalization
│   ├── queryFilter.js                     # ReDoS-safe query builder with regex escaping
│   └── responseHelper.js                  # Standardized JSON response formatting
│
├── .env.example                           # Sample environment configuration
├── .gitignore                             # Git ignore rules
├── index.js                               # Server entry point
├── package.json                           # Dependencies and scripts
├── seeder.js                              # Database population and destruction CLI
├── DEVELOPMENT_LOG.md                     # Incremental development tracking log
└── README.md                              # Comprehensive project documentation
```

---

## Product Database Schema

| Field | Type | Validation / Behavior |
|---|---|---|
| `name` | String | Required, trimmed |
| `sku` | String | Required, unique index, uppercase, trimmed |
| `category` | String | Required, trimmed |
| `price` | Number | Required, strictly positive (> 0) |
| `quantity` | Number | Required, non-negative (>= 0) |
| `reorderLevel` | Number | Required, non-negative (>= 0) |
| `supplier` | String | Required, trimmed |
| `stockValue` | Number | Computed virtual field (`price * quantity`), direct client assignment rejected |
| `createdAt` / `updatedAt` | Date | Automatically managed timestamps |

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or remotely

### Installation
```bash
git clone https://github.com/Acad-recs/Assign3_webdevIII.git
cd Assign3_webdevIII
npm install
```

### Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure environment variables:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/inventory_db
NODE_ENV=development
```

### Running the Application
```bash
# Production mode
npm start

# Development mode (auto-reload via nodemon)
npm run dev

# Seed database with sample inventory (12 products across 3 categories)
npm run data:import

# Clear all inventory records
npm run data:destroy

# Run complete automated end-to-end test suite
npm test
```

---

## API Endpoints (Eight Core Operations)

### 1. Create Product
- **Method:** `POST`
- **Endpoint:** `/api/products`
- **Status Code:** `201 Created`
- **Request Body:**
```json
{
  "name": "Logitech MX Master 3S",
  "sku": "LOGI-MX3S-001",
  "category": "Electronics",
  "price": 99.99,
  "quantity": 25,
  "reorderLevel": 5,
  "supplier": "Logitech Inc."
}
```

### 2. Get All Products (Filtering, Sorting, Pagination)
- **Method:** `GET`
- **Endpoint:** `/api/products`
- **Query Parameters:**
  - `category`: Filter by exact category (case-insensitive)
  - `supplier`: Filter by exact supplier (case-insensitive)
  - `search`: Substring search in product names
  - `minPrice` & `maxPrice`: Numeric price range boundaries
  - `sortBy`: `name`, `price`, `quantity`, or `createdAt` (default: `createdAt`)
  - `order`: `asc` or `desc` (default: `desc`)
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `10`)
- **Example:**
```bash
GET /api/products?category=Electronics&page=1&limit=10&sortBy=price&order=asc
```
- **Response Format:**
```json
{
  "success": true,
  "total": 45,
  "page": 1,
  "limit": 10,
  "totalPages": 5,
  "count": 10,
  "products": [...]
}
```

### 3. Get Single Product
- **Method:** `GET`
- **Endpoint:** `/api/products/:id`
- **Status Code:** `200 OK` (or `404 Not Found`, `400 Bad Request` for invalid ObjectId)

### 4. Update Product
- **Method:** `PUT`
- **Endpoint:** `/api/products/:id`
- **Status Code:** `200 OK`
- Runs validators, rejects direct client modifications to `stockValue`, and returns the updated document.

### 5. Delete Product
- **Method:** `DELETE`
- **Endpoint:** `/api/products/:id`
- **Status Code:** `200 OK`
- Returns confirmation message and deleted product details.

### 6. Adjust Stock Quantity
- **Method:** `PATCH`
- **Endpoint:** `/api/products/:id/stock`
- **Request Body:**
```json
{
  "change": 10
}
```
- **Rules:**
  - Positive integer increases stock.
  - Negative integer decreases stock.
  - Zero is rejected with HTTP 400.
  - Prevents stock from going below 0 with an atomic check.

### 7. Low-Stock Alert Report
- **Method:** `GET`
- **Endpoint:** `/api/products/low-stock`
- Returns all products where `quantity <= reorderLevel`.

### 8. Category-wise Inventory Summary
- **Method:** `GET`
- **Endpoint:** `/api/products/summary`
- MongoDB Aggregation Pipeline computing `totalItems`, `totalQuantity`, `totalStockValue`, and `avgPrice` grouped by category.

---

## Testing with Postman
Import the collection located at:
`postman/inventory-api.postman_collection.json`

Set the collection variable `baseUrl` to `http://localhost:5000/api`.

---

## License
Refer to [LICENSE](file:///C:/Users/WINNTUSIT/Desktop/Assign3_webdevIII/LICENSE) for license details.
