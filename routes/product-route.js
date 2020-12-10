const express = require('express');
const controller = require('../controller/product.controller');
// const validate = require('../validate/product-validate');



const router = express.Router();
router.get('/', controller.index)

router.get('/search', controller.search)
module.exports = router;