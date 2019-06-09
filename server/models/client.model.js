'use strict'

//Modelo para registrar los clientes en la base de datos

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var clientModel = schema({			//razon social
	name: String,
	surname: String,
	identification: Number,
	company: String
});

module.exports = mongoose.model("client", clientModel);