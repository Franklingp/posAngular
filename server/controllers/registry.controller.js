'use strict'

// Controlador para registro de compras

var Registry = require("../models/registry.model");

var registryController = {
	//Metodo de prueba
	test: function(req, res){
		return res.status(200).send({message: "Metodo de prueba para registro"});
	}
}

module.exports = registryController;