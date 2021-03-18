//APP.JS in ~/app.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const MongooseConnectionConfig = require('mongoose-connection-config');

require("./config/passport")(passport)

//mongoose
const opts = {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.PORT || 27017,
    database: 'test'
  };

  const mcc = new MongooseConnectionConfig(opts);

mongoose.connect('mongodb+srv://Alberttran1:Cheekypoop123@cluster0.x4jd1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));

//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'secret',
    cookie: { maxAge: 60000},
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })
    
//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(process.env.PORT || 5000);

// images
app.use( express.static( "public" ) );
