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
  12. `9d220ce` — `docs: initialize DEVELOPMENT_LOG for Batch 1 tracking`

---

### Batch 2: Implementation of All Eight Core API Operations, Postman Suite & Docs

- **Batch Target:** 10 meaningful commits.
- **Commits Created in Batch 2:** 10 commits.
- **Commit History for Batch 2:**
  13. `6a8105c` — `feat: implement getAllProducts with filtering sorting and pagination`
  14. `e1fc6cb` — `feat: implement getProductById with 404 and CastError handling`
  15. `1655db2` — `feat: implement updateProduct with validations and safe field updates`
  16. `c918089` — `feat: implement deleteProduct with confirmation payload`
  17. `767eb6e` — `feat: implement atomic stock adjustment with negative stock validation`
  18. `a29342a` — `feat: implement low-stock alert report using field comparison query`
  19. `300edad` — `feat: implement category-wise inventory summary aggregation pipeline`
  20. `c1d134b` — `fix: update mongoose returnDocument option to resolve deprecation warnings`
  21. `ec2a3c6` — `feat: add Postman collection covering all 8 operations and edge cases`
  22. `98295e5` — `docs: expand README with comprehensive documentation for all 8 API operations`
  23. `[pending]` — `docs: update DEVELOPMENT_LOG for Batch 2 tracking`

- **Completed Functionality in Batch 2:**
  - Implemented `getAllProducts` with category filtering, supplier filtering, name search, min/max price range filtering, multi-field sorting, and pagination metadata.
  - Implemented `getProductById` with proper 404 resource check and CastError propagation.
  - Implemented `updateProduct` with schema re-validation, guard against client-specified `stockValue`, and updated document return.
  - Implemented `deleteProduct` returning confirmation payload with deleted product information.
  - Implemented atomic `adjustStock` with negative stock guard ensuring quantity does not fall below 0.
  - Implemented `getLowStockReport` querying `quantity <= reorderLevel` using MongoDB `$expr`.
  - Implemented `getCategorySummary` with MongoDB aggregation pipeline computing `totalItems`, `totalQuantity`, `totalStockValue`, and `avgPrice`.
  - Resolved Mongoose deprecation warnings by updating update queries to `returnDocument: 'after'`.
  - Created complete Postman collection `postman/inventory-api.postman_collection.json` covering 20 test requests.
  - Updated comprehensive `README.md` with full endpoint specifications and request/response contracts.

- **Cumulative Commits:**
  - Total project commits created so far: 22 commits.

- **Next Recommended Steps:**
  - Proceed with Batch 3 (e.g. 10 or 15 commits) based on user instructions to add automated integration test scripts, refined query edge-case handling, and enhanced logging/validation helpers.
