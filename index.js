var express = require("express");
const path = require('path');
var app = express();

var router = require('./routes/routes');
const { PORT } = require('./config/config.js');

//let port = 3001

//console.log(path)
//determina el directorio donde estan los archivos estáticos
//const staticDir = path.join(__dirname, 'public');
//console.log(staticDir)
// Usa express.static para servir archivos desde el directorio especificado
//app.use(express.static(staticDir));
//Esto se pone para que el req.body tome bien los json
app.use(express.json())
//Esto se pone para que se puedan tomar correctamente los datos en req.body


const {urlencoded, json} =  require('express')
app.use(urlencoded({ extended: false }));

// Configura el middleware para servir archivos estáticos A MANO
app.use(express.static("public/JS"));
app.use(express.static("public/estilos"));
app.use(express.static("public"));


const cors = require('cors')
const { request } = require('http')

// Configura el middleware para servir archivos estáticos MAS AUTOMATICO
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.set("view engine", "ejs");

app.listen(PORT, function (req, res) {
  console.log("Servidor listo en puerto " + PORT)
  console.log("http://localhost:" + PORT);
});




