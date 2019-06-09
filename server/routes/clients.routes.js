'use strict'

//Rutas para metodos del cliente

var express = require("express");
var router = express.Router();
var clientController = require("../controllers/clients.controller");

router.get("/test", clientController.test);
router.get("/get", clientController.getDataBase);
router.post("/add", clientController.addClient);

module.exports = router;