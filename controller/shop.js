const Product = require('../model/productModel');
const Cart = require('../model/cartModel');
// get Index
exports.getIndex = (req, res, next)=>{
    Product.setTitle('Main Page')
    res.render('shop/index',{
        pageTitle: Product.getTitle(),
        path: '/'
    });
}

// get All Product
exports.getProduct = (req, res, next) => {
    Product.fetchAll((products) => {
        Product.setTitle('Products Page');
        res.render('shop/product-list-detail', {
            pageTitle: Product.getTitle(),
            products: products,
            path: '/products'
        });
    })
};

// get detail 
exports.getDetail = (req, res , next)=>{
    let prodId = req.params.prodId;
    Product.findByID(prodId,(product)=>{
        Product.setTitle('Detail Page');
        res.render('shop/product-detail',{
            pageTitle: Product.getTitle(),
            product: product,
            path: '/detail'
        });
    });
};

// get Cart 
exports.getCart = (req, res, next)=>{
    Cart.fetchDataToShop((cartsData)=>{    
        res.render('shop/cart',{
            cartInfo: 'Waiting for udpate!',
            path:'/cart',
            pageTitle:'Cart',
            carts:cartsData
        });
    });

}

//post Cart 
exports.postCart = (req, res, next)=>{
    let prodId = req.body.productId;
    Product.findByID(prodId,(product)=>{
        Cart.addCart(prodId,product.price);
        res.redirect('/products');
    });
};

//post Delete cart item
exports.postDeleteCart = (req, res, next)=>{
    let prodId = req.body.productId;
    Product.findByID(prodId,(product)=>{
        Cart.deleteById(prodId, product.price);
        res.redirect('/cart');
    });
}

// get Order 
exports.getOrder = (req, res, next)=>{
    res.render('shop/order',{
        orderInfo: 'Waiting for udpate!',
        path:'/order',
        pageTitle:'Order'
    });
}