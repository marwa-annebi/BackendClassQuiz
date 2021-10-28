var mongoose = require('mongoose');
var annonceSchema = new mongoose.Schema({
    titre:{
        type : String
        
    },
    description:{
        type:String,
        trim: true,
   
    },
    Date :{
        type:Date,
        default :Date.now
    }
}); 
module.exports =mongoose.model('Annonce',annonceSchema);