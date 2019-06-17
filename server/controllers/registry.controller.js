'use strict'

// Controlador para registro de compras

var Registry = require("../models/registry.model");
var Client = require("../models/client.model");
var Product = require("../models/product.model");

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
	},

	//Metodo para retornar un solo registro de la base de datos
	getRegistry: function(req, res){
		let id = req.params.id;
		//var client = "";
		var products = [JSON];

		//Metodo para retornar el registro con todos los ids del cliente y los productos 
		Registry.findById(id, (error, registry) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el registro"});
			}
			if(!registry){
				return res.status(404).send({message: "No se ha podido encontrar el registro"});
			}
			//Coloco en posicion 0 el primer id para evitar errores
			products[0] = registry.products[0].productId;


			//Metodo para retornar el cliente asociado a el registro
			Client.findById(registry.clientId, (error, client) => {
				if(error){
					return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el registro"});
				}
				if(!registry){
					return res.status(404).send({message: "No se ha podido encontrar el registro"});
				}				

				//Ciclo para saber cuantos productos ha comprado el cliente
				// y colocar en un arreglo los Ids de los producto que esta en el registro
				let quantityProducts = registry.products.length;
				let index = 0;
				while(index < quantityProducts){
					products.push(registry.products[index].productId);
					index ++;
				}

				//Metodo para retornar los productos que estan asocuados al registro
				Product.find({'_id': { $in: products}}).exec((err, product) => {
					if(error){
						return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el registro"});
					}
					if(!product){
						return res.status(404).send({message: "No se ha podido encontrar el registro"});
					}
					return res.status(200).send({Registry: registry, Client: client, Products: product});

				});
					
			});

			

		});

	}
}

module.exports = registryController;