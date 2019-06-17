'use strict'

//modelo de productos para el inventario

var mongoose = require('mongoose');
var schema = mongoose.Schema

var ProductModel = schema({
	name: String,
	description: String,
	category: String,
	quantity: Number,
	brand: String,			//Marca del producto
	price: Number,			
	cost: Number,
	enabled: Boolean,		//Si esta deshabilitado para no eliminar y romper la base de datos
	registryId: [Object] 		//Arreglo de ids de la base de datos de registro donde se compro este producto
});	

module.exports = mongoose.model("Product", ProductModel);