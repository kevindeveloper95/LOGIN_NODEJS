const mysql = require('mysql')
const dotenv = require('dotenv')


const connection = mysql.createConnection({

  host: 'localhost',
  user: 'root',
  password: '1208',
  database: 'login_node',


})


connection.connect((error) => {
if (error) {
    console.log("el error en la consola es" + error)
    return
}else{
    console.log('Conexion correcta')
}
   

})

module.exports = connection; 