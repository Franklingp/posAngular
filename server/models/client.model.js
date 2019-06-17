'use strict'

//Modelo para registrar los clientes en la base de datos

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var clientModel = schema({			//razon social
	name: String,
	surname: String,
	identification: Number,
	company: Boolean,				//Booleano en caso de que sea una compannia o una persona natural
	registryId: Array 				//Arreglo de ids hacia los registros donde se encuentre el cliente
});

module.exports = mongoose.model("client", clientModel);