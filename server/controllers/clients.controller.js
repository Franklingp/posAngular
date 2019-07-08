'use strict'

//Contolador para Gestionar base de datos de los clientes
var Client = require("../models/client.model");

var clientController = {
	//Metodo de prueba
	test: function(req, res){
		return res.status(200).send({message: "Metodo de prueba ejecutado correctamente"});
	},

	//Metodo para obtener la base de datos de los clientes
	getDataBase: function(req, res){
		Client.find().sort('name').exec((error, clients) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar obtener la base de datos"});
			}
			if(!clients){
				return res.status(404).send({message: "No se han encontrado los datos"});
			}
			return res.status(200).send({Client: clients});
		});
	},

	//Metodo para agregar un cliente nuevo en la base de datos
	addClient: function(req, res){
		let params = req.body;
		let client = new Client;

		client.name = params.name;
		client.surname = params.surname;
		client. identification = params.identification;
		client.company = params.company;


		client.save((error, client) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar guardar los datos"});
			}
			if(!client){
				return res.status(404).send({message: "No se han encontrado los datos"});
			}
			return res.status(200).send({Client: client});
		});
	},

	//Metodo para obtener un cliente en especifico de la base de datos
	getClient: function(req, res){
		let id = req.params.id;

		Client.findById(id, (error, client) =>{
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar obtener los datos"});
			}
			if(!client){
				return res.status(404).send({message: "No se ha encontrado el cliente en la base de datos"});
			}
			return res.status(200).send({Client: client});
		});
	},

	// Metodo para actualizar los datos de un cliente en la base de datos
	updateClient: function(req, res){
		let id = req.params.id;
		let update = req.body;

		Client.findByIdAndUpdate(id, update, {new: true, useFindAndModify: false}, (error, updated) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar los datos"});
			}
			if(!updated){
				return res.status(404).send({message: "No se ha encontrado el cliente en la base de datos"});
			}
			return res.status(200).send({Client: updated});
		});
	},

	// Metodo par eliminar un cliente de la base de datos
	deleteClient: function(req, res){
		let id = req.params.id;

		Client.findByIdAndRemove(id, {useFindAndModify: false} , (error, Deleted) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar eliminar el cliente"});
			}
			if(!Deleted){
				return res.status(404).send({message: "No se ha podido encontrar el cliente para eliminar"});
			}
			return res.status(200).send({Client: Deleted});
		});
	},

	//Metodo para obtener un cliente mediante una clave (nombre, identificacion, etc)
	// Recibe un JSON {key: "clave en donde buscar", value: "Valor a buscar"}
	getClientBy: function(req, res){
		let params = {
			key: String,
			value: String
		};

		params.key = req.body.key;
		params.value = req.body.value;

		if(params.key == 'name'){
			Client.find({'name': params.value}).sort('name').exec((error, clients) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar obtener el cliente"});
			}
			if(!clients){
				return res.status(404).send({message: "No se ha podido encontrar el cliente"});
			}
			return res.status(200).send({Client: clients});
			});
		}

		if(params.key == 'identification'){

			Client.find({'identification': params.value}).sort('name').exec((error, clients) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar obtener el cliente"});
			}
			if(!clients){
				return res.status(404).send({message: "No se ha podido encontrar el cliente"});
			}
			return res.status(200).send({Client: clients});
			});
		}
	}
};

module.exports = clientController;