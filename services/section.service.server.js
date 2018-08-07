module.exports = function (app) {

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    const createSection = (req, res) => {
        var section = req.body;
        sectionModel
            .createSection(section)
            .then((section) => {
                res.json(section);
            })
    }

    const deleteSection = (req, res) => {
        var sectionId = req.params.sectionId;
        sectionModel.deleteSection(sectionId)
            .then(() => {
                enrollmentModel.deleteEnrollmentsWithSection(sectionId)
                    .then(() => {
                        res.sendStatus(200);
                    });
            });
    }

    const findSectionsForCourse = (req, res) => {
        var courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then((sections) => {
                res.json(sections);
            })
    }

    const enrollStudentInSection = (req, res) => {
        var studentId = req.params['studentId'];
        var sectionId = req.params['sectionId'];
        var enrollment = {
            student: studentId,
            section: sectionId
        };

        sectionModel
            .decrementSectionSeats(sectionId)
            .then(() => {
                return enrollmentModel
                    .enrollStudentInSection(enrollment)
            })
            .then((enrollment) => {
                res.json(enrollment);
            })
    }

    const unenrollStudentFromSection = (req, res) => {
        var studentId = req.params['studentId'];
        var sectionId = req.params['sectionId'];

        sectionModel.incrementSectionSeats(sectionId)
            .then(() => {
                return enrollmentModel.unenrollStudentFromSection(studentId, sectionId);
            })
            .then(() => {
                res.sendStatus(200);
            });
    }

    const findSectionsForStudent = (req, res) => {
        var studentId = req.params['studentId'];
        enrollmentModel
            .findSectionsForStudent(studentId)
            .then((enrollments) => {
                res.json(enrollments);
            });
    }

    app.post('/api/course/:courseId/section', createSection);
    app.delete('/api/section/:sectionId', deleteSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/student/:studentId/section/:sectionId', enrollStudentInSection);
    app.delete('/api/student/:studentId/section/:sectionId', unenrollStudentFromSection);
    app.get('/api/student/:studentId/section', findSectionsForStudent);
};