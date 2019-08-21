//When using TS on the backend, use ES6 style imports!
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('./config/ppConfig');
// import {Facebook, FacebookApiException} from 'fb';
// const fb = new Facebook(options);

const app = express();
const request = require('request-promise');  

app.use(express.static(__dirname + '/client/build'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');

//The mongoose connection string needs to be types as string
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
//Connection types dont seem to supprt db.host or db.port
db.once('open', () => {
   console.log("Connected to mongo!")
})
db.on('error', (err) => {
   console.log("ERROR", err)
})

app.get('/test', (req, res) => {
   res.send('server is up.')
})
//Configure the express-session middleware
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: true,
   saveUninitialized: true
}));
//Configure the passport middleware
app.use(passport.initialize());
app.use(passport.session());

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.get('*', (req,res) =>{
   res.sendFile(__dirname + "/client/build/index.html");
});

app.listen(process.env.PORT || 3000);
