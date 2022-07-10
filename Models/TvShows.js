const mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

const TvSchema = new Schema({
    name : String ,
    url : String ,
    tmdb_id : String ,
    S : String ,
    E : String 
  });

  const TvShows = mongoose.model('tvshows' , TvSchema);
  TvShows.createIndexes() ;
  module.exports = TvShows