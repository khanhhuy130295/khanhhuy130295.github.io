const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const getDb = require('../util/database').getDb;
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    static fetchAll(){
        const db = getDb();
        return db.collection('user').find().toArray().then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }

    save() {
        const db = getDb();
        let dbOp;
        dbOp = db.collection('user').insertOne(this);
        return dbOp.then((result) => {
        }).catch((err) => {
            console.log(err);
        });
    }
    
    static findByid(id){
        const db = getDb();
        return db.collection('user').findOne({_id: new ObjectId(id)}).then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = User;