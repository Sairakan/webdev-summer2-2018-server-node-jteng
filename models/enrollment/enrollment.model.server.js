var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

const enrollStudentInSection = (enrollment) => {
    return enrollmentModel.create(enrollment);
}

const findSectionsForStudent = (studentId) => {
    return enrollmentModel
        .find({ student: studentId })
        .populate('section');
}

module.exports = {
    enrollStudentInSection,
    findSectionsForStudent
};