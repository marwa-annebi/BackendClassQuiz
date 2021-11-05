const router = require('express').Router();
const User=require('../models/user');
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("./validation");
const dotenv = require("dotenv");
const session = require("express-session");
const jwt = require("jsonwebtoken");
router.post('/Register',async(req,res)=>{
   //lets validate the data before we a user
   const { name,  email, password, verifPassword,age } = req.body;
   const { error } = registerValidation({
    name,
     email,
    password,
    verifPassword,
    age});
  if (error) {
      return res.status(400).json({ message : error.message})
    };
    //checking if the user is already in the database 
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json("email already exists" );
    // hash the passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    console.log(req.body);
    if (password != verifPassword)
      return res.status(400).json("passsword not valid");
//create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      age:req.body.age,
      isAdmin : false
    });

    console.log(user);
     await user.save();
    res.send("user saved seccessfuly");
  } catch (err) {
    res.status(400).json({message : err.message})
  }
})

router.post('/login', async(req,res) => {
   //validate the data
   const { error } = loginValidation(req.body);
   if (error) return res.status(400).json({msg : error.details[0].message});
   //checking if the email exists
   const user = await User.findOne({ email: req.body.email });
   console.log(user)
   if (!user)
    return res.status(400).json( "email is not found " );
   //password is correct
   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) return res.status(400).json({msg : "Invalid password"});

   //create a,d assign a token
   const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
   res.status(200).json({token: token,id : user._id ,isAdmin : user.isAdmin,name : user.name})
   //res.header('auth-token',token).send(token)
})
router.get("/logout", async (req, res) => {
    req.session.destroy();
  });

module.exports=router;