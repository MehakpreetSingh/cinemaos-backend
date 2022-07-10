const express = require('express') ;
const Movie = require('../Models/Movie');
var router = express.Router() ;

router.get("/allposts" , async (req,res) => {
    try {
        const getallmovies = await Movie.find() ;
        res.status(200).json(getallmovies) ;
    } catch (error) {
        res.status(409).json({message:error.message}) ;
    }
})

router.get("/getmovie/:id" , async(req,res) => {
    try {
        const getpost = await Movie.findOne({tmdb_id : req.params.id}) 
        res.status(200).json(getpost) ;
    } catch (error) {
        res.status(409).json({message : error.message});
    }
})

router.post("/putmovie" , async (req,res) => {
    const newMovie = new Movie({name:req.body.name , url:req.body.url , imageUrl:req.body.imageUrl}) ;

    try {
        await newMovie.save() ;
        res.status(200).json(newMovie) ;
    } catch (error) {
        res.status(409).json({message : error.message}) ;
    }
})

module.exports =  router ;