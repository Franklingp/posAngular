'use strict'

//Rutas para metodos del cliente

var express = require("express");
var router = express.Router();
var clientController = require("../controllers/clients.controller");

router.get("/test", clientController.test);
router.get("/get", clientController.getDataBase);
router.post("/add", clientController.addClient);
router.get("/get/:id", clientController.getClient);
router.put("/update/:id", clientController.updateClient);
router.delete("/delete/:id", clientController.deleteClient);
router.post("/get-by", clientController.getClientBy);

module.exports = router;