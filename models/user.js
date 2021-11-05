var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name:{
        type : String
        
    },
    email:{
        type:String,
        max:255,
        min:6
   
    },
    password:{
        type:String,
        max:1024,
        min:6
    },
    age :{
        type:Number
    },
    isAdmin:{
        type:Boolean 
    },
    
}); 
module.exports =mongoose.model('User',userSchema);