'use stricts'

// Desarrollo del backend de proyectoPOS con Node JS
//Enlazando backend con la base de datos y lanzando servidor en puerto local

var app = require('./app.js');
var mongoose = require('mongoose');
var port = 3700;

	
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/proyectoPOS', {useNewUrlParser: true})

		.then( () => {
			console.log('Base de datos enlazada correctamente');
			app.listen(port, () => {
				console.log("Servidor corriendo exitosamente en la url: http://localhost:"+port);
			}); 
		})

		.catch( (error) => console.log(error) );