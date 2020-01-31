const express = require("express");
const _ = require('lodash');
const path = require('path');

const rootDir = require('../util/path');
const router = express.Router();
const shopController = require('../controller/shop');

// get index => GET
router.get('/', shopController.getIndex);
// get list product => GET
router.get('/products', shopController.getProduct);
// get detail by Id = > GET
router.get('/detail/:prodId',shopController.getDetail);
// get cart Info => GET
router.get('/cart', shopController.getCart);
// add to cart Info => GET
router.post('/cart', shopController.postCart);
// delete cart Item by id => POST
router.post('/deleteCartItem',shopController.postDeleteCart );
// get order Info => GET
router.get('/order', shopController.getOrder);
module.exports = router;