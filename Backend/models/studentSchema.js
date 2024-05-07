/*
  "firstName": "Ayşe",
  "lastName": "Demir",
  "age": 18,
  "passportNumber": "XYZ789",
  "nationality": "Türkiye",
  "scholarship": false,
  "highSchoolGrade": 2
*/
const mongoose = require('mongoose');

// ÖĞRENCİ BİLGİLERİ
const studentSchema = new mongoose.Schema({
    //Öğrencinin adı
    firstName:{
        type: String,
        required: [true, "İsim boş bırakılamaz"]
    },
    //Öğrencinin soyadı
    lastName:{
        type: String,
        required: [true, "Soyisim boş bırakılamaz"]
    },
    //Öğrencinin yaşi
    age:{
        type: Number,
        required: [true, "Yaş boş bırakılamaz"]
    },
    //Öğrencinin pasaport numarası
    passportNumber:{
        type: String,
        required: [true, "Pasaport numarası boş bırakılamaz"]
    },
    //Öğrencinin vatandaşı olduğu ülke
    nationality:{
        type: String,
        required: [true, "Vatandaşlık boş bırakılamaz"]
    },
    //Öğrencinin burs alıp almadığı bilgisi
    scholarship:{
        type: Boolean,
        default: false,
    },
    //Öğrencinin lise mezuniyet derecesi
    highSchoolGrade:{
        type: Number,
        enum: [1, 2, 3],
        required: [true, "Lise mezuniyet derecesi boş bırakılamaz"]
    },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;