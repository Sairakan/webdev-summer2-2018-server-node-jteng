var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

const enrollStudentInSection = (enrollment) => {
    return enrollmentModel.create(enrollment);
}

const unenrollStudentFromSection = (studentId, sectionId) => {
    return enrollmentModel.remove({
        student: studentId,
        section: sectionId
    });
}

const findEnrollment = (studentId, sectionId) => {
    return enrollmentModel.findOne({
        student: studentId,
        section: sectionId
    });
}

const findSectionsForStudent = (studentId) => {
    return enrollmentModel
        .find({ student: studentId })
        .populate('section');
}

const deleteEnrollmentsWithSection = (sectionId) => {
    return enrollmentModel.remove({
        section: sectionId
    });
}

const deleteEnrollmentsWithStudent = (studentId) => {
    return enrollmentModel.remove({
        student: studentId
    });
}

module.exports = {
    enrollStudentInSection,
    unenrollStudentFromSection,
    findEnrollment,
    findSectionsForStudent,
    deleteEnrollmentsWithSection,
    deleteEnrollmentsWithStudent
};