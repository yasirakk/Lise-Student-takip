
const express = require('express');
const router = express.Router();
const {
    createStudent,
    getAllStudents,
    getStudent,
    getStudents,
    updateStudent,
    deleteStudent
} = require('../controller/student_cont');

// endpoint tanımlama / endpoint nedir? bu: .get(getStudents)
router.route('/').get(getStudents).get(getAllStudents).post(createStudent)
router.route('/:id').get(getStudent).put(updateStudent).delete(deleteStudent)
module.exports = router;
