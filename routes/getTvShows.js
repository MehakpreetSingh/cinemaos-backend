const express = require('express') ;
const TvShows = require('../Models/TvShows');
var router = express.Router() ;

router.get("/alltvseries" , async (req,res) => {
    try {
        const getallmovies = await TvShows.find() ;
        res.status(200).json(getallmovies) ;
    } catch (error) {
        res.status(409).json({message:error.message}) ;
    }
})

router.get("/getepisode/:id/:S/:E" , async(req,res) => {
    try {
        const getpost = await TvShows.findOne({tmdb_id : req.params.id , S:req.params.S , E:req.params.E}) 
        if(getpost) {
            res.status(200).json({success:true , getpost : getpost}) ;
        }
        else {
            res.status(404).json({success:false , getpost : getpost}) ;
        }
    } catch (error) {
        res.status(409).json({message : error.message});
    }
})

router.post("/puttvshow" , async (req,res) => {
    const newTv = new TvShows({name:req.body.name , url:req.body.url , tmdb_id : req.body.tmdb_id , S:req.body.S , E:req.body.E}) ;

    try {
        await newTv.save() ;
        res.status(200).json(newTv) ;
    } catch (error) {
        res.status(409).json({message : error.message}) ;
    }
})

module.exports =  router ;