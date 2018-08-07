var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

const findSectionById = (sectionId) => {
  return sectionModel.findById(sectionId);
}

const createSection = (section) => {
  return sectionModel.create(section);
}

const deleteSection = (sectionId) => {
  return sectionModel.remove({ _id: sectionId });
}

const findSectionsForCourse = (courseId) => {
  return sectionModel.find({ courseId: courseId });
}

const decrementSectionSeats = (sectionId) => {
  return sectionModel.update({
    _id: sectionId
  }, {
      $inc: { seats: -1 }
    });
}

const incrementSectionSeats = (sectionId) => {
  return sectionModel.update({
    _id: sectionId
  }, {
      $inc: { seats: +1 }
    });
}

module.exports = {
  findSectionById,
  createSection,
  deleteSection,
  findSectionsForCourse,
  decrementSectionSeats,
  incrementSectionSeats
};