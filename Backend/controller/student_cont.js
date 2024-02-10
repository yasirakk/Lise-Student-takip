// studentsController.js

const Student = require('../models/model-Student');

// Öğrenci ekleme işlevi
async function createStudent(req, res) {
  try {
    const { firstName, lastName, age, passportNumber, nationality, scholarship, highSchoolGrade } = req.body;
    const student = new Student({ firstName, lastName, age, passportNumber, nationality, scholarship, highSchoolGrade });
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Tüm öğrenci bilgilerini alma işlevi
async function getAllStudents(req, res) {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Öğrenci bilgilerini alma işlevi
async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Öğrenci bulunamadı' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.student = student;
  next();
}

// Öğrenci bilgilerini güncelleme işlevi
async function updateStudent(req, res) {
  try {
    const { firstName, lastName, age, passportNumber, nationality, scholarship, highSchoolGrade } = req.body;
    res.student.firstName = firstName;
    res.student.lastName = lastName;
    res.student.age = age;
    res.student.passportNumber = passportNumber;
    res.student.nationality = nationality;
    res.student.scholarship = scholarship;
    res.student.highSchoolGrade = highSchoolGrade;
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Öğrenci silme işlevi
async function deleteStudent(req, res) {
  try {
    await res.student.remove();
    res.json({ message: 'Öğrenci başarıyla silindi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent
};
