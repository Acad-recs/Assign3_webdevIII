# Development Log

## Project: Inventory and Data Management System (Assign3_webdevIII)

---

### Batch 1: Initial Architecture & Foundation Setup

- **Batch Target:** 10–15 meaningful commits.
- **Commits Created in Batch 1:** 12 commits.
- **Commit History for Batch 1:**
  1. `21a1923` — `chore: configure gitignore for node and environment files`
  2. `5e7c893` — `chore: initialize npm project and configure dependencies`
  3. `329c34e` — `feat: add environment variable configuration template`
  4. `d185a88` — `feat: configure MongoDB connection module using mongoose`
  5. `1d984df` — `feat: create Product mongoose schema with validations and virtual stockValue`
  6. `2262d63` — `feat: add product input validation middleware`
  7. `55adaf7` — `feat: implement centralized error handling middleware`
  8. `a478411` — `feat: scaffold product controller actions and implement createProduct`
  9. `e389e8b` — `feat: define product routes ensuring fixed routes precede param routes`
  10. `bdf2cdb` — `feat: setup Express application server with database connection and routing`
  11. `69982e5` — `docs: update README with project overview architecture and setup instructions`
  12. `[pending]` — `docs: initialize DEVELOPMENT_LOG for Batch 1 tracking`

- **Completed Functionality in Batch 1:**
  - Project configuration with `.gitignore`, `package.json`, `package-lock.json`.
  - Environment variable structure with `.env.example` and local `.env`.
  - MongoDB database connection handler in `config/db.js`.
  - Mongoose `Product` model with schema validations (name, unique sku, category, positive price, non-negative quantity, non-negative reorderLevel, supplier, timestamps) and virtual `stockValue` (`price * quantity`).
  - Product input validation middleware preventing direct client assignment of `stockValue` and validating required fields / numeric ranges.
  - Centralized error handling middleware handling `CastError` (invalid ObjectId), `ValidationError` (schema violations), and `E11000` (duplicate SKU).
  - Controller scaffolding with full implementation of `createProduct` (`POST /api/products`).
  - Route registration in `routes/productRoutes.js` with proper priority ordering (`/low-stock` and `/summary` registered ahead of `/:id`).
  - Express server entry point in `index.js` with JSON body parsing, health check endpoint (`/api/health`), and graceful routing.
  - Verified live database connection and product creation against local MongoDB instance.

- **Remaining Assignment Requirements:**
  - Complete implementation of `getAllProducts` (category filter, supplier filter, search, price ranges, sorting, pagination).
  - Complete implementation of `getProductById` (`GET /api/products/:id`).
  - Complete implementation of `updateProduct` (`PUT /api/products/:id`).
  - Complete implementation of `deleteProduct` (`DELETE /api/products/:id`).
  - Complete implementation of `adjustStock` (`PATCH /api/products/:id/stock` with negative stock guard).
  - Complete implementation of `getLowStockReport` (`GET /api/products/low-stock`).
  - Complete implementation of `getCategorySummary` (`GET /api/products/summary` aggregation pipeline).
  - Postman collection `postman/inventory-api.postman_collection.json` covering all test cases.
  - Full API documentation and automated verification scripts.

- **Next Recommended Steps:**
  - Proceed with Batch 2 upon user prompt to implement product querying, filtering, search, sorting, and pagination.
