const express = require("express");
const _ = require('lodash');
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');
const mongo = require('./util/database');

app.set('view engine', 'ejs');
app.set('views', 'views');

// router
const shopRouter = require('./routes/shop');
const adminRouter = require('./routes/admin');
const errorRouter = require('./controller/error');


//config application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// end config
app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(errorRouter.error404);

mongo.mongoConnect();

app.listen(3000);
