'use strict'

//Configuraciones del servicio

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Archivos de rutas


//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors



//Rutas


//Exportar

module.exports = app;