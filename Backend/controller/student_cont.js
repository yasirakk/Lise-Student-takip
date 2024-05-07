// studentsController.js
// find

const Student = require('../models/studentSchema');

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

// getAllstudentler işlevi
async function getAllStudents(req, res) {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Öğrenci bilgileri filtreleyerek çağırma işlevi
async function getStudents(req, res) {

  const turkishRegex = (text) => {
    return text
    .replace(/ü/g,'u')
    .replace(/ö/g,'o')
    .replace(/ğ/g,'g')
    .replace(/ş/g,'s')
    .replace(/ç/g,'c')
    .replace(/ı/g,'i');
  }

  let filter = {};

  if(req.query.firstName) {
    filter.firstName = { 
      $regex: turkishRegex(req.query.firstName),
      $options: 'i'
    };
  }

  if(req.query.lastName) {
    filter.lastName = {
      $regex: turkishRegex(req.query.lastName),
      $options: 'i' 
    };
  }

  if(req.query.age) {
    filter.age = req.query.age;
  }

  if(req.query.passportNumber) {
    filter.passportNumber = {
      $regex: req.query.passportNumber,
      $options: 'i'
    };
  }

  if(req.query.nationality) {
    filter.nationality = {
      $regex: turkishRegex(req.query.nationality),
      $options: 'i'
    };
  }

  if(req.query.scholarship) {
    filter.scholarship = req.query.scholarship;
  }

  if(req.query.highSchoolGrade) {
    filter.highSchoolGrade = req.query.highSchoolGrade;
  }

  try {
    const students = await Student.find(filter);
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

}



// Öğrenci bilgilerini alma işlevi
async function getStudent(req, res, next) {

  try {

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Öğrenci bulunamadı'});
    }

    res.student = student;
    next();

  } catch (err) {
    return res.status(500).json({message: err.message});
  }

}


// Öğrenci bilgilerini güncelleme işlevi
async function updateStudent(req, res) {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    );

    res.json(student);

  } catch (err) {
     res.status(400).json({message: err.message});
  }
}



// Öğrenci silme işlevi
async function deleteStudent(req, res) {
  try {
    await Student.findByIdAndDelete(req.params.id); 
    res.json({message: 'Öğrenci silindi'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}


module.exports = {
  createStudent,
  getAllStudents,
  getStudent,
  getStudents,
  updateStudent,
  deleteStudent
};
