'use strict'

//Rutas para servicio de registro

var express = require("express");
var router = express.Router();
var registryController = require("../controllers/registry.controller");

router.get("/test", registryController.test);

module.exports = router;