const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const conection = require('./database/db');
const path = require('path');




app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));



app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))



app.use(express.urlencoded({extended:true})) 
app.use(express.json())
/* app.use(cookieParser) */


dotenv.config({path:'./env/.env'});


app.use('/', require('./routes/routes'))








app.listen(3000, (req, res) => {
    console.log('corriendo')
})