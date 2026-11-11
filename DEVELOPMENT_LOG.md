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
  36. `[pending]` — `docs: record Batch 3 milestones in DEVELOPMENT_LOG`

- **Completed Functionality in Batch 3:**
  - Separated complex query building into `utils/queryFilter.js` with regex sanitation preventing ReDoS attacks.
  - Implemented pagination and sorting utility `utils/pagination.js` ensuring safe limits and graceful defaults.
  - Built pre-emptive ObjectId validator middleware `middleware/validateObjectId.js` attached to `/:id` and `/:id/stock` endpoints.
  - Created realistic 12-item sample catalog `data/sampleProducts.js` spanning Electronics, Furniture, Audio, and Accessories.
  - Created standalone database seeder script `seeder.js` supporting import and teardown flags.
  - Added `data:import`, `data:destroy`, and `test` scripts in `package.json`.
  - Built pure Node.js HTTP test client `tests/testHelper.js` eliminating heavyweight external testing dependencies.
  - Built complete end-to-end integration test runner `tests/api.test.js` covering all 15 positive, negative, and edge validation tests.
  - Verified 100% test pass rate with `npm test`.
  - Updated `README.md` with operational guidance for tests and database seeding.

- **Cumulative Commits:**
  - Total project commits created so far: 35 commits.

- **Next Recommended Steps:**
  - Proceed with Batch 4 upon user instruction toward reaching the 55–60 target commit goal (e.g. enhanced error handling responses, request logging middleware, detailed query response pagination headers, and API edge-case hardening).
