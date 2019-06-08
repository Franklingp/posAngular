'use strict'

// Controlador para CRUD de inventario
var Product = require('../models/product.model');

var inventory = {
	//Metodo de prueba
	test: function(req, res){
		return res.status(200).send({message: "Peticion de prueba de invetario exitosa"});
	},
};

module.exports = inventory;