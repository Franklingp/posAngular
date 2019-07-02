'use strict'

//Modelo de registro de POS
var mongoose = require("mongoose");
var schema = mongoose.Schema;

var registryModel = schema({
	client: {
		id: Object,
		name: String,
		surname: String,
		identification: Number		//Identification
	},
	date: Date,
	products:[
		{id: Object,
		name: String,
		brand: String,
		price: Number,
		quantity: Number}
	],
	total_price: Number
});

module.exports = mongoose.model("Registry", registryModel);