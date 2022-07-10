const express = require('express') ;
const TvSeries = require('../Models/TvSeries');
var router = express.Router() ;

router.get("/allseries" , async (req,res) => {
    try {
        const getallmovies = await TvSeries.find() ;
        res.status(200).json(getallmovies) ;
    } catch (error) {
        res.status(409).json({message:error.message}) ;
    }
})

// router.get("/getepisode/:id/:S/:E" , async(req,res) => {
//     try {
//         const getpost = await Movie.findOne({tmdb_id : req.params.id}) 
//         res.status(200).json(getpost) ;
//     } catch (error) {
//         res.status(409).json({message : error.message});
//     }
// })

router.post("/putseries" , async (req,res) => {
    const newTv = new TvSeries({name:req.body.name , tmdb_id : req.body.tmdb_id }) ;

    try {
        await newTv.save() ;
        res.status(200).json(newTv) ;
    } catch (error) {
        res.status(409).json({message : error.message}) ;
    }
})

module.exports =  router ;