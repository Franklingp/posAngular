'use strict'

//Configuraciones del servicio

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Archivos de rutas
var inventoryRoutes = require('./routes/inventory.routes');
var clientsRoutes = require('./routes/clients.routes');
var registryRoutes = require('./routes/registry.routes')

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.use("/api/inventory", inventoryRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/registry", registryRoutes);

//Exportar

module.exports = app;