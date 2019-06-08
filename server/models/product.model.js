'use strict'

//modelo de productos para el inventario

var mongoose = require('mongoose');
var schema = mongoose.Schema

var ProductModel = schema({
	name: String,
	description: String,
	category: String,
	quantity: Number,
	price: Number,
	cost: Number,
	enabled: Boolean
});

module.exports = mongoose.model("Product", ProductModel);