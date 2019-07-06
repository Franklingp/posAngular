'use strict'

// Controlador para CRUD de inventario
var Product = require('../models/product.model');

//Funsion para validar y retornar una respuesta
function validate(error,success, res){
	if(error){
		return res.status(500).send({message: 'Ha ocurrido un error al intentar obtener el producto'});
	}
	if(!success){
		return res.status(404).send({message: 'No se ha encontrado el producto'});
	}
	if(success.length == 0){
		return res.status(404).send({message: 'No se ha encontrado el producto'});
	}
	return res.status(200).send({Product: success});
}

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
		let param = req.params.enable;

		Product.find({enabled: param}).sort('name').exec((error, inventory) => {
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
		//console.log(id);

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
	},

	
	//Metodo para deshabilitar un producto para ocultarlo al usuario
	disableProduct: function(req, res){
		let id = req.params.id;
		
		Product.findByIdAndUpdate(id, {enabled: false}, {new: true, useFindAndModify: false}, (error, disabled) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar inhabilitar el producto"});
			}
			if(!disabled){
				return res.status(404).send({message: "No se ha podido encontrar el producto a inhabilitar"});
			}
			return res.status(200).send({Product: disabled});
		});

	},

	//Metodo para habilitar un producto para volver a mostrar un pr
	enableProduct: function(req, res){
		let id = req.params.id;

		Product.findByIdAndUpdate(id, {enabled: true}, {new: true, useFindAndModify: false}, (error, enabled) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar inhabilitar el producto"});
			}
			if(!enabled){
				return res.status(404).send({message: "No se ha podido encontrar el producto a inhabilitar"});
			}
			return res.status(200).send({Product: enabled});
		});
	},

	//Metodo para obtener un producto en una busqueda personalizada
	//Recibe un json {key: "seccion del producto", value: "Valor que se busca"}
	getProductBy: function(req, res){
		let params = {
			key: String,
			value: String
		};

		params.key = req.body.key;
		params.value = req.body.value;


		if(params.key == 'name'){
			Product.find({'name': params.value}).sort('name').exec((error, products) => {
				return validate(error, products, res);
			});
		}
		if(params.key == 'brand'){
			Product.find({'brand': params.value}).sort('name').exec((error, products) => {
				return validate(error, products, res);
			});
		}
		if(params.key == 'category'){
			Product.find({'category': params.value}).sort('name').exec((error, products) => {
				return validate(error, products, res);
			});
		}
	}
};

module.exports = inventory;