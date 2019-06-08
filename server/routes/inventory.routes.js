'use strict'

// Rutas para los metodos del inventario
var express = require('express');express
var router = express.Router();
var inventoryController = require("../controllers/inventory.controller");

//Rutas de Inventario
router.get("/test", inventoryController.test);
router.post("/add", inventoryController.addProduct);	

module.exports = router;