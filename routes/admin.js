const express = require("express");
const _ = require('lodash');
const path = require('path');

const rootDir = require('../util/path'); 
const router = express.Router();
const adminController = require('../controller/admin');

// Get Index => GET
router.get('/',adminController.getIndex);
/**
 * Region Product
 */
// Get List Product => GET
router.get('/products',adminController.getProducts);
// Get  page Add Product => GET
router.get('/add-product', adminController.addProduct);
// Save product => POST
router.post('/add-product', adminController.saveProduct);
// Get product Detail By ID => GET
router.get('/product-detail/:prodId',adminController.getDetail);
// Update product => POST
router.post('/product-detail/update',adminController.update);
// Delete Product => POST
router.post('/postDeleteProduct', adminController.deleteProduct);

 // --- End Region Product ---


module.exports = router;
