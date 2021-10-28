const router = require('express').Router();
const Annonce = require('../models/annonce')
//Getting all 
router.get('/',async(req,res)=>{
    try{
        const annonces= await Annonce.find()
        res.json(annonces)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})
//Getting one
router.get(':/id',getAnnonce,(req,res)=>{
    res.json(res.annonce)
})
//creating annonce
router.post('/',async (req,res)=>{
    let {titre,description,date}=req.body;
    const newAnnonce = new Annonce({
            titre : titre,
            description: description,
            date:date
    })
    try{
        await newAnnonce.save()
        res.status(200).json(newAnnonce)
    }
    catch(err){
        res.status(400).json({message : err.message})
    }
})
//update annonce
router.patch('/:id',getAnnonce,async(req,res)=>{
    if(req.body.titre != null){
        res.annonce.titre=req.body.titre
    }
    if(req.body.description != null){
        res.annonce.description=req.body.description
    }
    if(req.body.date != null){
        res.annonce.date=req.body.date
    }
    try{
        const updateAnnonce = await res.annonce.save()
        res.json(updateAnnonce)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})
//delete annonce
router.delete('/:id',getAnnonce,async(req,res) =>{
    try{
        await res.annonce.remove()
        res.json({message :'deleted annonce'})
    }catch(err){
        res.status(500).json({message : err.message})
    }
})
async function  getAnnonce(req,res,next){
    let annonce 
    try{
        annonce=await Annonce.findById(req.params.id)
        if(annonce == null){
            return res.status(404).json({message : 'cannot find annonce'})
        }
    }
    catch(err){
        return res.status(500).json({message : err.message})
    }
    res.annonce=annonce
    next()
}
module.exports= router