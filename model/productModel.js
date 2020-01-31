const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const rootDir = require('../util/path');
const pathResource = path.join(rootDir, 'data', 'productData.json');

const getDataFormFile = (cb) => {
    fs.readFile(pathResource, (err, fileContent) => {
        if (!err) {
            cb(JSON.parse(fileContent));
        } else {
            cb([]);
        }
    });
};

const makeid = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = class Product {
    constructor(prodctName, ImgUrl, price, description) {
        this.id = makeid(20);
        this.name = prodctName;
        this.imgUrl = ImgUrl;
        this.price = price;
        this.description = description;
    }

    static setTitle(titlePara) {
        this.title = titlePara;
    }

    static getTitle() {
        return this.title;
    }

    static fetchAll(cb) {
        return getDataFormFile(cb);
    }
    
    save() {
        getDataFormFile((products) => {
            if (products == undefined) {
                products = [];
            };
            products.push(this);
            fs.writeFile(pathResource, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static findByID(id, cb) {
        getDataFormFile((products) => {
            let item = products.find((p) => {
                return p.id === id;
            });           
            return cb(item);
        });
    }

    static update(itemEdit, cb) {
        if (itemEdit != null) {
            getDataFormFile((products) => {
                let idx = products.findIndex(p => p.id === itemEdit.id);
                if (idx > -1) {
                    products[idx].name = itemEdit.name;
                    products[idx].price = itemEdit.price;
                    products[idx].imgUrl = itemEdit.imgUrl;
                    products[idx].description = itemEdit.description;

                    fs.writeFile(pathResource, JSON.stringify(products), (err) => {
                        console.log(err);
                    });
                    return cb();
                }else{         
                    console.log('update fail')   
                    return cb();
                }
            });
        }
    }
}