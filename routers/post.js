const express = require("express");
const router = express.Router();
const postController = require('../controllers/PostController');
const { query, param, body,checkSchema } = require("express-validator");
const postCreate = require("../validations/post.js");
const authHandler = require("../middleware/authHandler.js");


router.get('/', postController.index);

router.get('/:slug', postController.show);

router.post('/', postController.store);

router.put("/:slug",authHandler, postController.update);

router.delete('/:slug',authHandler, postController.destroy);

module.exports = router

