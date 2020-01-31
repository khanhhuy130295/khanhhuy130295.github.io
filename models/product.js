const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(name, imgUrl, price, description, id) {
        this.name = name;
        this.imgUrl = imgUrl;
        this.price = price;
        this.description = description;
        this._id = id ? new mongodb.ObjectID(id) : null;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update item
            dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
        } else {
            // Insert item
            dbOp = db.collection('products').insertOne(this);
        }

        return dbOp.then(result => {
        }).catch(err => {
            throw err;
        });
    }

    static fetchAll() {
        const db = getDb();
        let resultDoc = db.collection('products').find();
        return resultDoc.toArray().then(result => {
            return result;
        }).catch(err => {
            console.log(err);
        });
    }

    static findById(id) {
        const db = getDb();
        return db.collection('products').findOne({ _id: new mongodb.ObjectId(id) })
            .then(result => {
                return result;
            });
    }

    static deleteById(id) {
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(id) })
            .then(result => {
               
            }).catch(err => {
                console.log(err);
            });

    }
}



module.exports = Product;

