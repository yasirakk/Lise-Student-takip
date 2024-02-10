
const express = require('express');
const router = express.Router();
const studentsController = require('../controller/student_cont');

// Öğrenci ekleme endpoint'i
router.post('/', studentsController.createStudent);

// Tüm öğrenci bilgilerini alma endpoint'i
router.get('/', studentsController.getAllStudents);

// Belirli bir öğrenci bilgisini alma endpoint'i
router.get('/:id', studentsController.getStudent);

// Öğrenci bilgilerini güncelleme endpoint'i
router.put('/:id', studentsController.updateStudent);

// Öğrenci silme endpoint'i
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;
