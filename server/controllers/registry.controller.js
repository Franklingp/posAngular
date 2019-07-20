'use strict'

// Controlador para registro de compras

var Registry = require("../models/registry.model");
var Client = require("../models/client.model");
var Product = require("../models/product.model");

// Funsion para validar las peticiones a la base de datos
function validate(error, success, res){
	if(error){
		return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el registro"});
	}
	if(!success){
		return res.status(404).send({message: "No se ha podido encontrar el registro"});
	}
	if(success.length == 0){
		return res.status(404).send({message: "No se ha podido encontrar el registro"});
	}
	return res.status(200).send({Registry: success});
}

var registryController = {
	//Metodo de prueba
	test: function(req, res){
		return res.status(200).send({message: "Metodo de prueba para registro"});
	},

	//Metodo para agregar un nuevo registro
	add: function(req, res){
		let registry = new Registry();
		let params = req.body;

		/*let params = {
		    "products" : [ 
		        {
		            "id" : "5cfb1e87c1048721fce1fdb9",
		            "name" : "Xbox One X",
		            "brand" : "Microsoft",
		            "price" : 500,
		            "quantity" : 2
		        }, 
		        {
		            "id" : "5cfb1e59c1048721fce1fdb8",
		            "name" : "S10",
		            "brand" : "Samsung",
		            "price" : 500,
		            "quantity" : 1
		        }
		    ],
		    "client" : {
		        "id" : "5cfd3442f418431bb488238d",
		        "name" : "Gerafadrdo",
		        "surname" : "Pifadfmentel",
		        "identification" : 145234523
		    },
		    "date" : "2019-12-01T05:00:00.000Z",
		    "total_price" : 700,
		};
		*/

		registry.client = params.client;
		registry.date =	params.date;
		registry.total_price = params.total_price;

		let quantityProducts = params.products.length; 
		let index = 0;
		while(index < quantityProducts){
			registry.products.push(params.products[index]);
			index ++;
		}

		registry.save((error, registrySaved) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el registro"});
			}
			if(!registrySaved){
				return res.status(404).send({message: "No se ha podido encontrar el registro"});
			}
			
			//Seccion donde actualizo el inventario para restar los productos que se acaban de vender
			// y agregar el id del registro
			let productsId = [String];
			index = 0;
			//productsId[0] = params.products[0].id;
			while(index < quantityProducts){
				if(index == 0){
					productsId[0] = params.products[0].id;
					index++;
					continue;
				}
				productsId.push(params.products[index].id);
				index++;
			}

			//A continuacion se accede a base de datos para obtener un arreglo de productos para actualizar
			Product.find({'_id' : {$in: productsId}}).exec((error, products) => {
				if(error){
					return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el registro"});
				}
				if(!products){
					return res.status(404).send({message: "No se ha podido encontrar el registro"});
				}

				//A Continuacion se realizan dos ciclos para recorrer los productos y agregarle el registro
				//al igual que descontar la cantidad de productos del inventario
				index = 0;
				let indexB = 0;
				while(index < quantityProducts){
					while(indexB < quantityProducts){
						if(products[index]._id == productsId[indexB]){
							console.log(registrySaved.products[indexB].quantity);
							products[index].quantity = products[index].quantity - registrySaved.products[indexB].quantity;
							products[index].registryId.push(registrySaved._id);

							products[index].save((error, succes) =>{
								if(error){
									return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el registro"});
								}
								if(!products){
									return res.status(404).send({message: "No se ha podido encontrar el registro"});
								}
							});						
							indexB = 0;
							break;
						}
						indexB++;
					}
					index++;
				}
			});

			//En la siguiente seccion se le agrega el id de registro al cliente.
			Client.findById(registrySaved.client.id, (error, client) =>{
				if(error){
					return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el registro"});
				}
				if(!registrySaved){
					return res.status(404).send({message: "No se ha podido encontrar el registro"});
				}
				client.registryId.push(registrySaved._id);
				client.save((error, success) => {
					return validate(error, registrySaved, res);
				});
			});
		});
	},

	//Metodo para retornar un solo registro de la base de datos
	getRegistry: function(req, res){
		let id = req.params.id;
		//var client = "";
		var products = [JSON];

		//Metodo para retornar el registro con todos los ids del cliente y los productos 
		Registry.findById(id, (error, registry) => {
			if(error){
				return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el registro"});
			}
			if(!registry){
				return res.status(404).send({message: "No se ha podido encontrar el registro"});
			}
			//Coloco en posicion 0 el primer id para evitar errores
			products[0] = registry.products[0].id;


			//Metodo para retornar el cliente asociado a el registro
			Client.findById(registry.client.id, (error, client) => {
				if(error){
					return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el registro"});
				}
				if(!registry){
					return res.status(404).send({message: "No se ha podido encontrar el registro"});
				}				

				//Ciclo para saber cuantos productos ha comprado el cliente
				// y colocar en un arreglo los Ids de los producto que esta en el registro
				let quantityProducts = registry.products.length;
				let index = 0;
				while(index < quantityProducts){
					products.push(registry.products[index].id);
					index ++;
				}

				//Metodo para retornar los productos que estan asocuados al registro
				Product.find({'_id': { $in: products}}).exec((err, product) => {
					if(error){
						return res.status(500).send({message: "Ha ocurrido un error al intentar actualizar el registro"});
					}
					if(!product){
						return res.status(404).send({message: "No se ha podido encontrar el registro"});
					}
					return res.status(200).send({Registry: registry, Client: client, Products: product});
				});	
			});
		});

	},

	//Metodo para retornar todos los registros como listado
	getAll: function(req, res){
		Registry.find().sort("-date").exec((error, registry) => {
			return validate(error, registry, res);
		});
	},

	//Metodo para eliminar un registro en la base de datos;
	delete: function(req, res){
		let id = req.params.id;

		Registry.findByIdAndRemove(id, {useFindAndModify: false},(error, remove) =>{
			return validate(error, remove, res);
		});
	},

	//Metodo para obtener un conjunto de registros en particular por id
	//Recoge un arreglo de ids de registros
	getSet: function(req, res){
		let registry = [String];
		registry = req.body;

		/*
		registry = [
                "5d045c8e376523240c0666ce",
                "5d09b2714534641ae1ac52d8",
                "5d09b45f3f69cb1b7a334d8b"
            ];
		*/

		Registry.find({'_id': {$in: registry}}).sort("-date").exec((error, success) => {
			return validate(error, success, res);
		});
	}
}

module.exports = registryController;