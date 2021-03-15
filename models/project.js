const mongoose = require('mongoose');
const projectSchema  = new mongoose.Schema({
  url :{
      type  : String,
      required : true
  } ,
  project_url :{
    type  : String,
    required : false
} ,
  project_name :{
    type  : String,
    required : true
} ,
project_desc :{
    type  : String,
    required : true
} ,
user_id :{
    type  : String,
    required : true
}
});
const Project = mongoose.model('project',projectSchema);

module.exports = Project;