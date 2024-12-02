var express = require('express')
//const path = require('path');
var app = express()

//console.log(path)
//determina el directorio donde estan los archivos estáticos
//const staticDir = path.join(__dirname, 'public');
//console.log(staticDir)
// Usa express.static para servir archivos desde el directorio especificado
//app.use(express.static(staticDir));
app.use(express.static('public/JS'))
app.use(express.static('public/estilos'))
app.use(express.static('public/imagenes'))

app.set('view engine','ejs')

app.get('/',function(req, res){

    var mysql = require('mysql')
    
    var conexion = mysql.createConnection({
        host:'localhost',  
        database:'db_escuela',
        user:'root',
        password:''
    
    })
    
    conexion.connect(function(error){
        if(error){
            throw error
        }else{
            console.log('Conexión Exitosa')
        }
    
    })
    
    conexion.query('Select * from alumnos',function(error,results,fields){
         
         if(error) throw error
        console.log(results)
       
        res.render('inicio.ejs',{results: ['1','2','3']})
    })   
    
   // res.render('inicio.ejs',)
    //res.send('RUTA INCIOooooo')

})


app.get('/formulario',function(req, res){
    res.render('formulario')
   

})



app.get('/tabla',function(req, res){
    res.render('tabla')
   

})

app.listen(3000,function(req, res){
    console.log('Hola Mundo')


})


//A PARTIR DE ACA LO DE BASE DE DATOS

// var mysql = require('mysql')

// var conexion = mysql.createConnection({
//     host:'localhost',  
//     database:'db_escuela',
//     user:'root',
//     password:''

// })

// conexion.connect(function(error){
//     if(error){
//         throw error
//     }else{
//         console.log('Conexión Exitosa')
//     }

// })

// conexion.query('Select * from alumnos',function(error,results,fields){
//      console.log(results)
//      if(error) throw error
//     //console.log(error)
    
//     results.forEach(alumno =>{
//         console.log(alumno)
//     })

//     fields.forEach(campo =>{
//         console.log(campo.name)
//     })
// })