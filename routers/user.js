const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
const { checkSchema } = require("express-validator");
const user = require("../validations/user");
const { checkValidity } = require("../middleware/schemaValidator");



router.get("/users", userController.index);


router.post("/register", checkSchema(user), checkValidity, userController.register);


router.post("/login", userController.login);

module.exports = router;