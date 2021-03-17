//USER.JS in MODELS/USER.JS
const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
  name :{
      type  : String,
      required : true
  } ,
  email :{
    type  : String,
    required : true
} ,
password :{
    type  : String,
    required : true
} ,
linkedin :{
    type  : String,
    required : false
} ,
github :{
    type  : String,
    required : false
} ,
personal_web :{
    type  : String,
    required : false
} ,
medium :{
    type  : String,
    required : false
} ,
date :{
    type : Date,
    default : Date.now
}
});
const User= mongoose.model('User',UserSchema);

module.exports = User;