var express = require("express");
var router = express.Router();
var dbConn = require("../db/db.js");

//1
const { PORT } = require('../config/config.js');
const uploader = require('../config/multer.js');
//2 const storage = require('../config/multer.js')
//2 const multer = require('multer')

//const connection = require('../db/db.js')
const util = require('util')
const query = util.promisify(dbConn.query).bind(dbConn)
//1



router.get("/", function (req, res) {
  dbConn.query("Select * from alumnos", function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("enviando Inicio");
      console.log(results);
      res.render("inicio.ejs", { results });
    }
  });
});
//1 se agrego el uploader
router.post("/confirmaAgregarUsuario", uploader.single('file'), function (req, res, error) {
    console.log("MOSTRANDO DESDE EL SERVIDOR");
    //console.log(req.body);
    //console.log(req.file);
    let dni = req.body.dni;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let especialidad = req.body.especialidad;
    //let activo =  req.body.activo
   let activo =  req.body.activo == null ?  0 : 1
    console.log('Mostrando req.body')
    console.log(req.body)
    //1
   
    let url = `http://localhost:${PORT}/images/${req.file.filename}`;
    //1
    var form_data = {
      dni: dni,
      nombre: nombre,
      apellido: apellido,
      especialidad: especialidad,
      //1
      img_url: url,
      //1
      activo:activo
    };
    console.log(form_data)
     // insert query
    dbConn.query("INSERT INTO ALUMNOS SET ?", form_data, function (err, result) {
  //       //if(err) throw err
          if (err) {
  
           console.log("Error desde agregar", err.message );
           mensaje = "ERROR EN LOS DATOS";
           res.json({
            dni: form_data.dni,
            nombre: form_data.nombre,
            apellido: form_data.apellido,
            especialidad: form_data.especialidad,
            img_url: form_data.img_url,
            activo:form_data.activo,      
            mensaje,  
             });
          } else {
             //req.flash('success', 'User successfully added');
            mensaje = "ALUMNO CARGADO";
            res.json({ mensaje });

          }
       }
      );
  //   }
});

router.get("/AgregarUsuario", function (req, res, error) {
  dbConn.query(
    "Select * from especialidades",
    function (error, resultsE, fields) {
      if (error) {
        throw error;
      } else {
        console.log("enviando Especialidades");

        mensajeError = "";
        //Esto se pone porque cuando se edite, se va a usar el mismo formulario pero se le van a pasar datos
        dni = "";
        nombre = "";
        apellido = "";
        especialidad = "";
        //
        console.log(resultsE);
        res.render("agregar", {
          especialidades: resultsE,
          mensajeError,
          dni,
          nombre,
          apellido,
          especialidad,
        });
      }
    }
  );
});

router.get("/borrarUsuario/(:dni)", function (req, res, error) {
  console.log("Borrando");
  let dni = req.params.dni;
  console.log(dni);
  dbConn.query(
    "DELETE FROM alumnos WHERE dni = " + dni,
    function (err, result) {
      //if(err) throw err
      if (err) {
        // set flash message
        //   req.flash('error', err)
        // redirect to user page
        res.redirect("/tabla");
      } else {
        // set flash message
        // req.flash('success', 'User successfully deleted! ID = ' + id)
        // redirect to user page
        res.redirect("/tabla");
      }
    }
  );
});
router.get("/formulario", function (req, res, error) {
  res.render("formulario");
});

router.get("/tabla", function (req, res) {
  dbConn.query("Select * from alumnos", function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      // console.log("Enviando Tablas");
      //console.log(results)

      res.render("tabla.ejs", { results: results });
    }
  });
});


router.get("/lista", function (req, res) {
  dbConn.query("Select * from alumnos where activo = 1", function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      // console.log("Enviando Tablas");
      console.log( results)

      res.render("lista.ejs", { alumnos: results });
    }
  });
});

router.get("/EditarUsuario", function (req, res, error) {
  
  
});
module.exports = router;
