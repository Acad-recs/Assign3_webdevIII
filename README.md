# Inventory and Data Management System
## Assignment 3 — Web Dev III | Unit 3 | CO3

A robust backend REST API built with Node.js, Express.js, and MongoDB / Mongoose for managing store and warehouse inventory.

---

## Tech Stack
- **Runtime Environment:** Node.js (CommonJS)
- **Framework:** Express.js
- **Database ODM:** Mongoose (MongoDB)
- **Environment Management:** dotenv
- **Development Tooling:** nodemon

---

## Project Structure
```text
Assign3_webdevIII/
│
├── config/
│   └── db.js                              # MongoDB connection configuration
│
├── models/
│   └── Product.js                         # Mongoose schema, validation & virtual stockValue
│
├── controllers/
│   └── productController.js               # API controllers for business logic
│
├── routes/
│   └── productRoutes.js                   # Express route definitions
│
├── middleware/
│   ├── errorHandler.js                    # Centralized error and 404 handlers
│   └── validateProduct.js                 # Request payload validation middleware
│
├── postman/
│   └── inventory-api.postman_collection.json # API test suite
│
├── .env.example                           # Sample environment configuration
├── .gitignore                             # Git ignore rules
├── index.js                               # Server entry point
├── package.json                           # Dependencies and scripts
├── DEVELOPMENT_LOG.md                     # Incremental development tracking log
└── README.md                              # Project documentation
```

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

Configure your environment variables:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/inventory_db
NODE_ENV=development
```

### Running the Application
```bash
# Start server in production mode
npm start

# Start server in development mode (with nodemon)
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description | Status |
|---|---|---|---|
| POST | `/api/products` | Create a new product | Implemented |
| GET | `/api/products` | Retrieve all products (with filters & pagination) | Scaffolded |
| GET | `/api/products/:id` | Retrieve single product by ObjectId | Scaffolded |
| PUT | `/api/products/:id` | Update product details | Scaffolded |
| DELETE | `/api/products/:id` | Delete product | Scaffolded |
| PATCH | `/api/products/:id/stock` | Adjust stock quantity | Scaffolded |
| GET | `/api/products/low-stock` | Low-stock alert report | Scaffolded |
| GET | `/api/products/summary` | Category-wise inventory aggregation | Scaffolded |

---

## License
Refer to [LICENSE](file:///C:/Users/WINNTUSIT/Desktop/Assign3_webdevIII/LICENSE) for license details.
