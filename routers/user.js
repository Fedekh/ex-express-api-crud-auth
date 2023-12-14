const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
const { checkSchema } = require("express-validator");
const userRegister = require("../validations/userRegister");
const userLogin = require("../validations/userLogin");
const { checkValidity } = require("../middleware/schemaValidator");



router.get("/", userController.index);


router.post("/register",
 checkSchema(userRegister), 
 checkValidity,
  userController.register);


router.post("/login",
    // checkSchema(userLogin), 
    // checkValidity,
    userController.login);

module.exports = router;