const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//our  schema named IdeaSchema since this is a project about ideas has a title, description and a date 
//the time by default will get the current time
//
//we will need b-crypt.js to encrypt the passwords
// Create Schema
const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('users', UserSchema);