/**
 * Setup connection with mysql2
 */

// const mysql = require('mysql2');
// const db = mysql.createConnection({
//     host:'localhost',
//     port:3306,
//     user: "root",
//     password:"root",
//     database: "hellojdbcserverjsp"
// });

// module.exports = db.promise();

/**
 * Set up connect with Sequelize
 */
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('nodejstest','root','root',{
//     host:'localhost',
//     dialect:'mysql',
//     port:'3306',

// });

// module.exports = sequelize;

/**
 * Set up connect with MongoDB use Cluster
 */

const mongoDB = require('mongodb');
const MongoClient = mongoDB.MongoClient;
//const connectionStr ='mongodb://huy-dhk:TD0D9DkF7LBv3WR5@nodejsguild-shard-00-00-ap0eh.mongodb.net:27017,nodejsguild-shard-00-01-ap0eh.mongodb.net:27017,nodejsguild-shard-00-02-ap0eh.mongodb.net:27017/test?ssl=true&replicaSet=NodeJSGuild-shard-0&authSource=admin&retryWrites=true&w=majority';
const connectionStr = 'mongodb+srv://huy-dhk:TD0D9DkF7LBv3WR5@nodejsguild-ap0eh.mongodb.net/shopManage?retryWrites=true';
let _db;
const mongoConnect = () => {
    MongoClient.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        _db = client.db();
    }).catch((err) => {
        //console.log(err);
        throw err;
    });
}

getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No Database Found!";
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
