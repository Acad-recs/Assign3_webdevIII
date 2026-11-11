const assert = require('assert');
const mongoose = require('mongoose');
const { app, server } = require('../index');
const Product = require('../models/Product');
const { request } = require('./testHelper');

async function runTests() {
  console.log('\n--- Running Complete Inventory API Test Suite ---\n');

  try {
    // 1. Reset database with known test item
    await Product.deleteMany({});
    const initialProduct = await Product.create({
      name: 'Sony WH-1000XM5',
      sku: 'TEST-SNY-XM5',
      category: 'Audio',
      price: 399.99,
      quantity: 10,
      reorderLevel: 5,
      supplier: 'Sony Corp',
    });
    const id = initialProduct._id.toString();

    // Test 1: Health check
    const health = await request('/api/health');
    assert.strictEqual(health.status, 200, 'Health check must return 200');
    console.log('✓ Health Check passed');

    // Test 2: Create product (positive)
    const createRes = await request('/api/products', {
      method: 'POST',
      body: {
        name: 'Apple iPad Air',
        sku: 'TEST-APPL-IPAD',
        category: 'Tablets',
        price: 599.0,
        quantity: 15,
        reorderLevel: 4,
        supplier: 'Apple Inc.',
      },
    });
    assert.strictEqual(createRes.status, 201, 'Product creation should return 201');
    assert.strictEqual(createRes.data.data.stockValue, 8985.0, 'Calculated stockValue must equal price * quantity');
    console.log('✓ Create Product (Positive) passed');

    // Test 3: Reject direct stockValue on create
    const rejectStockValRes = await request('/api/products', {
      method: 'POST',
      body: {
        name: 'Spoofed Item',
        sku: 'TEST-SPOOF',
        category: 'Tablets',
        price: 100,
        quantity: 5,
        reorderLevel: 2,
        supplier: 'Unknown',
        stockValue: 999999,
      },
    });
    assert.strictEqual(rejectStockValRes.status, 400, 'Client direct stockValue must be rejected with 400');
    console.log('✓ Reject direct stockValue input passed');

    // Test 4: Duplicate SKU error
    const duplicateSkuRes = await request('/api/products', {
      method: 'POST',
      body: {
        name: 'Duplicate iPad',
        sku: 'TEST-APPL-IPAD',
        category: 'Tablets',
        price: 599.0,
        quantity: 1,
        reorderLevel: 1,
        supplier: 'Apple Inc.',
      },
    });
    assert.strictEqual(duplicateSkuRes.status, 409, 'Duplicate SKU must return 409 Conflict');
    console.log('✓ Duplicate SKU conflict handling passed');

    // Test 5: Get All with Filter & Pagination
    const listRes = await request('/api/products?category=Audio&page=1&limit=5');
    assert.strictEqual(listRes.status, 200, 'List products must return 200');
    assert.strictEqual(listRes.data.count, 1, 'Audio category filter count must equal 1');
    assert.strictEqual(listRes.data.products[0].sku, 'TEST-SNY-XM5');
    console.log('✓ Category filter and pagination passed');

    // Test 6: Get Product By ID
    const getByIdRes = await request(`/api/products/${id}`);
    assert.strictEqual(getByIdRes.status, 200, 'Get by ID must return 200');
    assert.strictEqual(getByIdRes.data.data.name, 'Sony WH-1000XM5');
    console.log('✓ Get Product by ID passed');

    // Test 7: Invalid ObjectId format error handling
    const invalidIdRes = await request('/api/products/non-existent-hex-id');
    assert.strictEqual(invalidIdRes.status, 400, 'Malformed ObjectId must return 400 Bad Request');
    console.log('✓ Malformed ObjectId validation passed');

    // Test 8: Non-existent valid ObjectId (404)
    const notFoundRes = await request('/api/products/507f1f77bcf86cd799439011');
    assert.strictEqual(notFoundRes.status, 404, 'Non-existent ID must return 404');
    console.log('✓ Non-existent product 404 handling passed');

    // Test 9: Update Product
    const updateRes = await request(`/api/products/${id}`, {
      method: 'PUT',
      body: { price: 349.99 },
    });
    assert.strictEqual(updateRes.status, 200, 'Update must return 200');
    assert.strictEqual(updateRes.data.data.price, 349.99);
    console.log('✓ Update Product passed');

    // Test 10: Stock increment
    const stockIncRes = await request(`/api/products/${id}/stock`, {
      method: 'PATCH',
      body: { change: 5 },
    });
    assert.strictEqual(stockIncRes.status, 200);
    assert.strictEqual(stockIncRes.data.data.quantity, 15, 'Quantity should be 10 + 5 = 15');
    console.log('✓ Stock Increment passed');

    // Test 11: Stock decrement
    const stockDecRes = await request(`/api/products/${id}/stock`, {
      method: 'PATCH',
      body: { change: -12 },
    });
    assert.strictEqual(stockDecRes.status, 200);
    assert.strictEqual(stockDecRes.data.data.quantity, 3, 'Quantity should be 15 - 12 = 3');
    console.log('✓ Stock Decrement passed');

    // Test 12: Negative stock prevention
    const stockNegRes = await request(`/api/products/${id}/stock`, {
      method: 'PATCH',
      body: { change: -100 },
    });
    assert.strictEqual(stockNegRes.status, 400, 'Over-decrement must be rejected with 400');
    console.log('✓ Negative stock prevention passed');

    // Test 12b: Stock adjustment rejecting zero change
    const stockZeroRes = await request(`/api/products/${id}/stock`, {
      method: 'PATCH',
      body: { change: 0 },
    });
    assert.strictEqual(stockZeroRes.status, 400, 'Zero stock change must be rejected with 400');
    console.log('✓ Zero stock change rejection passed');

    // Test 12c: Stock adjustment rejecting missing change field
    const stockMissingRes = await request(`/api/products/${id}/stock`, {
      method: 'PATCH',
      body: {},
    });
    assert.strictEqual(stockMissingRes.status, 400, 'Missing change field must be rejected with 400');
    console.log('✓ Missing stock change validation passed');

    // Test 13: Low-stock report
    const lowStockRes = await request('/api/products/low-stock');
    assert.strictEqual(lowStockRes.status, 200);
    assert.strictEqual(lowStockRes.data.count, 1, 'Only Sony (qty 3 <= reorder 5) should appear');
    console.log('✓ Low-stock report passed');

    // Test 14: Category summary aggregation
    const summaryRes = await request('/api/products/summary');
    assert.strictEqual(summaryRes.status, 200);
    assert.strictEqual(summaryRes.data.categories.length, 2, 'Audio and Tablets categories present');
    console.log('✓ Category summary aggregation passed');

    // Test 15: Delete Product
    const deleteRes = await request(`/api/products/${id}`, { method: 'DELETE' });
    assert.strictEqual(deleteRes.status, 200);
    assert.strictEqual(deleteRes.data.deletedProduct.sku, 'TEST-SNY-XM5');
    console.log('✓ Delete Product passed');

    console.log('\n--- ALL 15 AUTOMATED TESTS COMPLETED SUCCESSFULLY! ---\n');
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  } finally {
    await Product.deleteMany({ sku: /^TEST-/ });
    server.close(() => {
      mongoose.connection.close().then(() => {
        process.exit(0);
      });
    });
  }
}

// Allow server port to bind
setTimeout(runTests, 1200);
