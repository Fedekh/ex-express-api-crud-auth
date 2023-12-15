const express = require("express");
const router = express.Router();
const postController = require('../controllers/PostController');
const { query, param, body,checkSchema } = require("express-validator");
const postCreate = require("../validations/post.js");
const authHandler = require("../middleware/authHandler.js");
const multer = require("multer");

router.get('/', postController.index);

router.get('/:slug', postController.show);

router.post('/', 
multer({dest:'public',preservePath:true}).single('image')
,
postController.store);

router.put("/:slug"
// ,authHandler
, 
multer({dest:'public',preservePath:true}).single('image'),
postController.update);

router.delete('/:slug'
// ,authHandler
,
 postController.destroy);

module.exports = router

