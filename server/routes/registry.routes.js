'use strict'

//Rutas para servicio de registro

var express = require("express");
var router = express.Router();
var registryController = require("../controllers/registry.controller");

router.get("/test", registryController.test);
router.post("/add", registryController.add);		
router.get("/get/:id", registryController.getRegistry);
router.get("/get", registryController.getAll);
router.delete("/delete/:id", registryController.delete);
router.post("/get-set", registryController.getSet);

module.exports = router;