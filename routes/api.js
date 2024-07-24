const express = require('express')
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
    windowMs: 1000*60*1,   // 1 minutes
    max: 5,
    message: 'Too many requests, please try again after 1 minutes!'
});
const router = express.Router();
const customerController = require('../controllers/customers')
const productController = require('../controllers/products')

// Customer routes
router.post('/customers', customerController.createCustomer);
router.put('/customers', customerController.updateCustomer); //สร้างเส้น Update
router.delete('/customers/:id',  customerController.deleteCustomer); //:id = paramitor
router.get('/customers/:id', customerController.getCustomer);
router.get('/customers/q/:term',  customerController.getCustomersByTerm);
router.get('/customers', apiLimiter,customerController.getCustomers); //apiLimiter

// Product routes
router.post('/products', productController.createProduct); // Use productController
router.put('/products', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products/:id', productController.getProduct);
router.get('/products/q/:term', productController.getProductsByTerm);
router.get('/products', apiLimiter, productController.getProducts); // Apply rate limiter
//เรียกใช้ fetch , axios

module.exports = router;
