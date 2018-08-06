var mongoose = require('mongoose');

var sectionSchema = mongoose.Schema({
  name: String,
  seats: Number,
  courseId: Number,
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}]
}, {collection: 'section'});

module.exports = sectionSchema;