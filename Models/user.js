const mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true ,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    profileImage : {
        type : String ,
        default : '' 
    },
    date : {
        type : Date ,
        default : Date.now
    } ,
    currentlyWatch : [{
        type : String 
    }]
  });

  const User = mongoose.model('user' , UserSchema);
  User.createIndexes() ;
  module.exports = User;