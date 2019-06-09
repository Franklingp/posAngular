'use strict'

// Rutas para los metodos del inventario
var express = require('express');
var router = express.Router();
var inventoryController = require("../controllers/inventory.controller");

//Rutas de Inventario
router.get("/test", inventoryController.test);
router.post("/add", inventoryController.addProduct);
router.get("/get", inventoryController.getInventory);
router.get("/get/:id", inventoryController.getProduct);
router.delete("/delete/:id", inventoryController.deleteProduct);
router.put("/update/:id", inventoryController.updateProduct);
//router.put("/unable/:id", inventoryController.unableProduct);

module.exports = router;