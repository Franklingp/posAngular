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
	},

	//Metodo para retornar el inventario completo de la base de datos
	getInventory: function(req, res){

		Product.find().sort('name').exec((error, inventory) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar obtener los datos del servidor"});
			}
			if(!inventory){
				return res.status(404).send({message: "No se han podido encontrar los datos en el servidor"});
			}
			return res.status(200).send({Product: inventory});
		});
	},

	//Metodo para retornar un solo producto de la base de datos
	getProduct: function(req, res){
		let id = req.params.id;

		Product.findById(id, (error, product)=>{
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar obtener el producto"});
			}
			if(!product){
				return res.status(404).send({message: "No se ha podido encontrar el producto"});
			}
			return res.status(200).send({Product: product});
		});
	},

	//Metodo para eliminar un producto de la base de datos
	deleteProduct: function(req, res){
		let id = req.params.id;

		Product.findByIdAndRemove(id,{useFindAndModify: false}, (error, productDeleted) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar eliminar el producto"});
			}
			if(!productDeleted){
				return res.status(404).send({message: "No se ha podido encontrar el producto para eliminar"});
			}
			return res.status(200).send({Product: productDeleted});
		});
	},

	//Metodo para actualizar un producto de la base de datos
	updateProduct: function(req, res){
		let id = req.params.id;
		let params = req.body;

		Product.findByIdAndUpdate(id, params, {new: true, useFindAndModify: false}, (error, updated) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el producto"});
			}
			if(!updated){
				return res.status(404).send({message: "No se ha podido encontrar el producto a actualizar"});
			}
			return res.status(200).send({Product: updated});
		});
	}

	/*
	//Metodo para deshabilitar un producto en caso de no poder eliminarlo
	unableProduct: function(req, res){
		let id = req.params.id;
		let update = new Product();
		update.enabled = false;

		console.log(update);

		Product.findByIdAndUpdate(id, update, (error, unabled) => { // {new: true, useFindAndModify: false},
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar inhabilitar el producto"});
			}
			if(!unabled){
				return res.status(404).send({message: "No se ha podido encontrar el producto a inhabilitar"});
			}
			return res.status(200).send({Product: unabled});
		});

	} */
};

module.exports = inventory;