const mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name : String ,
    url : String ,
    imageUrl : String ,
    tmdb_id : String
     
  });

  const Movie = mongoose.model('movie' , MovieSchema);
  Movie.createIndexes() ;
  module.exports = Movie