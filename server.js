const express = require('express')
const app=express()
require('dotenv').config();
const { send } = require("process");
const { Console } = require("console");

const cors = require('cors');
//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({limit:"10mb",extended:true}));

const corsOptions = {
  exposedHeaders: 'Authorization',
};

app.use(cors(corsOptions));
// Connect to database
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})
const db =mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',()=>console.log('connected to database'))
// Middleware
app.use(express.json())
// Route Middleware

const UserRouter = require('./routes/userCrud')
app.use('/userDB',UserRouter)

const AuthRouter = require('./routes/auth')
app.use('/auth',AuthRouter)

const AnnonceRouter= require('./routes/annonceCrud');
app.use('/annonce',AnnonceRouter);

const sendMail = require("./routes/mailer");
app.use('/mailer',sendMail);





app.listen(3000,()=>console.log('Server started ..........'))