/* 
BU KODLARIN AMACI LİSE DEVRİNİN İÇERİSİNDE BİR TALEBENİN BİLGİLERİNİ KAYDEDİP GEREKTİĞİNDE ÇIKTISINI ALABİLMEKTİR.
DAHA'DA GELİŞTİRMEYE AÇIKTIR... HADİ BAŞLAYALIM !
*/

const express = require('express');
require('express-async-errors')
const bodyParser = require('body-parser');
const app = express();
const connect = require('./db/connect_mongoose');
const studentsRouter = require('./routes/stu_router');
require('dotenv').config()

const port = process.env.PORT || 3000;

// Öğrenci işlemleri için routes'leri kullanma
app.use('/students', studentsRouter);

// Middleware tanımlama
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ana sayfa


// Sunucuyu dinleme
const start = async () => {
    try {
        await connect(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log("sunucu çalışmaya başladı....." + port);
        })
    } catch (error) {
        console.log(error);
    }
}


start()