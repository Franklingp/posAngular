'use strict'

// Controlador para registro de compras

var Registry = require("../models/registry.model");

// Funsion para validar las peticiones a la base de datos
function validate(error, success, res){
	if(error){
		return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el registro"});
	}
	if(!success){
		return res.status(404).send({message: "No se ha podido encontrar el registro"});
	}
	return res.status(200).send({Registy: success});
}

var registryController = {
	//Metodo de prueba
	test: function(req, res){
		return res.status(200).send({message: "Metodo de prueba para registro"});
	},

	//Metodo para agregar un nuevo registro
	add: function(req, res){
		let registry = new Registry();
		let params = req.body;

		registry.clientId = params.clientId;
		registry.date =	params.date;
		registry.total_price = params.total_price;
		
		/*
		let elements = params.products.length; 
		let index = 0;
		while(index < elements){
			let product = params.products[index];
			//registry.products.push(params.products[index]);
			//console.log(product);
			index ++;
		}
		*/
		//console.log(registry);

		registry.save((error, success) => {
			return validate(error, success, res);
		});
	}
}

module.exports = registryController;