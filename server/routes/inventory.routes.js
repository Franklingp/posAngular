'use strict'

// Rutas para los metodos del inventario
var express = require('express');express
var router = express.Router();
var inventoryController = require("../controllers/inventory.controller");

//Rutas de Inventario
router.get("/test", inventoryController.test);
router.post("/add", inventoryController.addProduct);
router.get("/get-inventory", inventoryController.getInventory);
router.get("/get-product/:id", inventoryController.getProduct);
router.delete("/delete/:id", inventoryController.deleteProduct);

module.exports = router;