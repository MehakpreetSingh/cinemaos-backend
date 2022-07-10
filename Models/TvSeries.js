const mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

const TvSeriesSchema = new Schema({
    name : String ,
    tmdb_id : String ,
  });

  const TvSeries = mongoose.model('tvseries' , TvSeriesSchema);
  TvSeries.createIndexes() ;
  module.exports = TvSeries