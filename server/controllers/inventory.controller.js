'use strict'

// Controlador para CRUD de inventario
var Product = require('../models/product.model');

var inventory = {
	//Metodo de prueba
	test: function(req, res){
		return res.status(200).send({message: "Peticion de prueba de invetario exitosa"});
	},

	//Metodo para agregar un producto al inventario
	addProduct: function(req, res){
		let product = new Product();
		let params = req.body;

		product.name = params.name;
		product.description = params.description;
		product.category = params.category;
		product.quantity = params.quantity;
		product.price = params.price;
		product.cost = params.cost;
		product.brand = params.brand;
		product.enabled = true;

		product.save((error, productSave)=>{
			if(error){
				return res.status(500).send({message: 'Ha ocurrido un error al intentar guardar el producto'});
			}
			if(!productSave){
				return res.status(404).send({message: 'No se ha encontrado el producto para guardar'});
			}
			return res.status(200).send({Product: productSave});
		});
	}
};

module.exports = inventory;