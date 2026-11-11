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
- **Commits Created in Batch 2:** 11 commits.
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
  23. `55898f1` — `docs: update DEVELOPMENT_LOG for Batch 2 tracking`

---

### Batch 3: Modular Utilities, Parameter Validation, Seeding Pipeline & Automated Test Suite

- **Batch Target:** 12–13 meaningful commits.
- **Commits Created in Batch 3:** 13 commits.
- **Commit History for Batch 3:**
  24. `a0fdb58` — `feat: add query filter builder utility with regex escaping and price bounds`
  25. `66dfae6` — `feat: add pagination and sorting utility with safe limits and defaults`
  26. `e210d14` — `refactor: integrate queryFilter and pagination utilities into productController`
  27. `5491f9b` — `feat: add validateObjectId middleware for early parameter validation`
  28. `c5fe742` — `feat: attach validateObjectId middleware to parameterized routes`
  29. `0b79057` — `feat: add sample product dataset for development seeding and testing`
  30. `727bc66` — `feat: add database seeder script for population and teardown`
  31. `9b5c187` — `chore: add data:import and data:destroy npm scripts for seeder`
  32. `d52e789` — `test: add HTTP request helper for zero-dependency API testing`
  33. `0b17d4f` — `test: implement automated end-to-end integration test suite`
  34. `ce6c2fe` — `chore: bind test script to run automated test suite in package.json`
  35. `3b823bf` — `docs: add testing and seeder commands to README documentation`
  36. `edeca76` — `docs: record Batch 3 milestones in DEVELOPMENT_LOG`

---

### Batch 4: Observability, Query Optimization, Response Formatting & Edge Hardening

- **Batch Target:** 10–12 meaningful commits.
- **Commits Created in Batch 4:** 10 commits.
- **Commit History for Batch 4:**
  37. `b72798e` — `feat: add lightweight HTTP request logger middleware`
  38. `5389178` — `feat: register requestLogger middleware in Express application`
  39. `1a5d3eb` — `feat: add responseHelper utility for consistent API payloads`
  40. `e7e0de9` — `perf: add category supplier price and text indexes on Product model`
  41. `941986e` — `feat: add dedicated validateStockAdjustment middleware`
  42. `e5d2dc8` — `feat: attach validateStockAdjustment middleware to stock route`
  43. `49fe6d2` — `refactor: standardize product controller success responses using sendSuccess helper`
  44. `5c40d42` — `test: add test assertions for zero and missing stock change validation`
  45. `bd3b64c` — `docs: update architecture tree in README reflecting middleware and utilities`
  46. `[pending]` — `docs: record Batch 4 milestones in DEVELOPMENT_LOG`

- **Completed Functionality in Batch 4:**
  - Added HTTP request logging middleware reporting method, path, HTTP status, and response latency.
  - Built `utils/responseHelper.js` standardizing JSON success and failure envelopes across controllers.
  - Added query performance indexes to `models/Product.js` covering `category`, `supplier`, `price`, and text index on `name`.
  - Created dedicated `middleware/validateStock.js` validating payload presence, numeric type, finiteness, and non-zero constraint.
  - Refactored `productController.js` with `sendSuccess` helper for uniform response envelopes.
  - Extended automated test suite with edge assertions for zero-change and missing-change stock adjustments.
  - Updated architectural map in `README.md`.

- **Cumulative Commits:**
  - Total project commits created so far: 45 commits.

- **Next Recommended Steps:**
  - Proceed with Batch 5 (10–12 commits) to conclude remaining refinements and reach the 55–60 target commit goal.
