const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Create Schema 
//our  schema named IdeaSchema since this is a project about ideas has a title, description and a date 
//the time by default will get the current time
//

// Create Schema
const IdeaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('ideas', IdeaSchema);