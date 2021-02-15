// all imports done here
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const ejs = require('ejs');
const PORT = process.env.PORT||4000;
const app = express();
const userRoutes = require('./routes/users');

require("./controllers/passport")(passport);


// front-end setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// To get bootstrap and other static CSS files
app.use(express.static(path.join(__dirname,'node_modules')));
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// database connection setup
mongoose.connect(process.env.CONNECTION_URL,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true
})
.then(()=>{
    console.log('DATABASE CONNECTED')
})
.catch((err)=>{
    console.log(err.message);
})

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use("/api",userRoutes);
app.get("/",(req,res)=>{
    res.render("index")
})

// started the server
app.listen(PORT,()=>{console.log(`app is listening on port ${PORT}`)});
