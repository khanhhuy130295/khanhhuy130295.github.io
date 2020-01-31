const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const rootDir = require('../util/path');
const pathResource = path.join(rootDir, 'data', 'cartData.json');
// class Product
const Product = require('../model/productModel');

module.exports = class Cart {

    // Fetch data
    static fetchDataToShop(cb) {
        Product.fetchAll((products) => {
            fs.readFile(pathResource, (err, fileContent) => {
                let carts = [];
                let cartResult = {
                    totalPrice: 0,
                    products: []
                }

                if (!err) {
                    carts = JSON.parse(fileContent);
                };
                _.forEach(products, (prod) => {
                    let cartProductIdx = _.findIndex(carts.products, p => p.id === prod.id);

                    if (cartProductIdx > -1) {
                        let objTemp = {
                            product: prod,
                            quantity: carts.products[cartProductIdx].qty
                        };
                        cartResult.products.push(objTemp);
                    }

                });
                cartResult.totalPrice = carts.totalPrice;
                return cb(cartResult);
            });
        });

    }

    // Add item to Cart 
    static addCart(id, prodPrice) {
        fs.readFile(pathResource, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product
            let existProductIdx = cart.products.findIndex(p => p.id === id);
            let existProuct = cart.products[existProductIdx];
            let updateProduct;
            // Add new product/ increase quantity
            if (existProuct) {
                //Update
                updateProduct = { ...existProuct };
                updateProduct.qty = updateProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existProductIdx] = updateProduct;
            } else {
                // Add new
                updateProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updateProduct];

            }
            cart.totalPrice = cart.totalPrice + +prodPrice;
            fs.writeFile(pathResource, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

    // Delete by Id
    static deleteById(id, prodPrice) {
        fs.readFile(pathResource, (err, fileContent) => {
            if (err) {
                return;
            }
            let updatedCarts = JSON.parse(fileContent);

            let product = _.find(updatedCarts.products, p => p.id === id);
            if (!product) {
                return;
            }
            let prodQuantity = product.qty;
            updatedCarts.products = _.filter(updatedCarts.products, prod => prod.id !== id);
            updatedCarts.totalPrice = updatedCarts.totalPrice - (prodPrice * prodQuantity);
            fs.writeFile(pathResource, JSON.stringify(updatedCarts), (err) => {
                console.log(err);
            });
        });
    }

}