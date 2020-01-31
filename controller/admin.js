const Product = require('../models/product');
const _ = require('lodash');
const breadCrumb = require('../util/breadCrumb');

exports.getIndex = (req, res, next) => {
    res.render('admin/index', {
        pageTitle: 'Adminstrator',
        path: '/admin'
    });
};

// get All Product
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then((products) => {
        let breadcrumbArr = breadCrumb.setUpBreadCrumb('admin/products');
        let header = _.keysIn(products[0]);
        res.render('admin/products', {
            pageTitle: 'List products',
            products: products,
            path: '/admin/products',
            header: header.slice(1),
            breadCrumb: breadcrumbArr

        });
    }).catch((err) => {
        throw 'No Products List!'
    });
};

// add new Product
exports.addProduct = (req, res, next) => {
    let breadcrumbArr = breadCrumb.setUpBreadCrumb('admin/add-product');
    res.render('admin/add-Product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        breadCrumb: breadcrumbArr
    });
}

// save Product 
exports.saveProduct = (req, res, next) => {
    const product = new Product(req.body.name,
        req.body.imgUrl, req.body.price,
        req.body.description);
    product.save();
    res.redirect('/admin/products');
}

// find product by ID
exports.getDetail = (req, res, next) => {
    Product.findById(req.params.prodId).then(product => {
        let breadcrumbArr = breadCrumb.setUpBreadCrumb('admin/products/product-detail');
        res.render('admin/product-detail', {
            path: '/admin/product-detail/' + product._id,
            breadCrumb: breadcrumbArr,
            pageTitle: 'Detail Product',
            product: product
        });
    });
}

// update product
exports.update = (req, res, next) => {
    const product = new Product(req.body.name,
        req.body.imgUrl, req.body.price,
        req.body.description, req.body.id);
    product.save();
    res.redirect('/admin/products');
}

exports.deleteProduct = (req, res, next)=>{
    Product.deleteById(req.body.id);
    res.redirect('/admin/products');
}