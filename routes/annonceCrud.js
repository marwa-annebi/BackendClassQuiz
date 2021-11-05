const router = require('express').Router();
const Annonce = require('../models/annonce')
//Getting all 
router.get('/Read',async(req,res)=>{
    try{
        const annonces= await Annonce.find()
        res.json(annonces)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})
//Getting one
router.get('/get/:id',getAnnonce,(req,res)=>{
    res.json(res.annonce)
})
//creating annonce
router.post('/Create',async (req,res)=>{
    let {titre,description,Date}=req.body;
    const newAnnonce = new Annonce({
            titre : titre,
            description: description,
            Date:Date
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
router.put('/update/:id',getAnnonce,async(req,res)=>{
    if(req.body.titre != null){
        res.annonce.titre=req.body.titre
    }
    if(req.body.description != null){
        res.annonce.description=req.body.description
    }
    if(req.body.Date != null){
        res.annonce.Date=req.body.Date
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
router.delete('/delete/:id',getAnnonce,async(req,res) =>{
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