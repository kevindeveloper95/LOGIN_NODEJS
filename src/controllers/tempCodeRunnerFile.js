const bcrypts = require('bcrypt')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const connection = require('../database/db')




exports.register = async (req, res) => {

    try {
        const usuario = req.body.usuarios
        const name = req.body.name
        const rol = req.body.rol
        const pass = req.body.password
        const passwordHash = await bcrypts.hash(pass, 8);
        connection.query('INSERT INTO users SET ?', { user:usuario, name:name, rol:rol, password:passwordHash}, async (error, results) => {
            if (!error) {
                res.render('register', {
                  alert: true,
                  alertTitle: 'registration',
                  alertMessage: "Success Registration",
                  alertIcon: 'success',
                  showConfirmationButton: false,
                  time: 1500,
                  ruta: 'login'  
                })
            }
    
        }) 
    } catch (error) {
        console.error(error)
    }
 
}

exports.login = async (req,res) => {

  try {
    const user = req.body.user;
    const pass = req.body.pass
    if (!user && !pass) {
                res.render('login', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: "Usuario y/o password incorrectas",
                    alertIcon: 'error',
                    showConfirmationButton: true,
                    time: false,
                    ruta: 'login'  
                  })
            }else{
                connection.query('SELECT * FROM users WHERE user = ? ', [user], async (error, results) => {
                if (results.length == 0 || !(await bcrypts.compare(pass, results[0].pass))){
                res.render('login', {
                    alert: true,
                    alertTitle: 'Error ',
                    alertMessage: "Usuario y/o password incorrectas",
                    alertIcon: 'error',
                    showConfirmationButton: true,
                    time: false,
                    ruta: 'login'  
                  })
             }else{
                 console.log("todo salio bien")
             }
        })  
    }
  } catch (error) {
      console.log(error)
  }


}