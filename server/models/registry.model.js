'use strict'

//Modelo de registro de POS
var mongoose = require("mongoose");
var schema = mongoose.Schema;

var registryModel = schema({
	clientId: String,
	date: String,
	products: [
		{
			productId: String,
			quantity: Number
		}
	],
	total_price: Number
});

module.exports = mongoose.model("Registry", registryModel);


/*
Plan B

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var registryModel = schema({
	client: String,
	date: String,
	products: Array,
	quantity: Array,
	totalPrice: Number
});

module.exports = mongoose.model("Registry", registryModel); */