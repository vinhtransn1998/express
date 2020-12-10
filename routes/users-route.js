const express = require('express');
var multer = require('multer')
const controller = require('../controller/user.controller');
const validate = require('../validate/user-validate');

var upload = multer({ dest: __dirname + '/public/uploads' })


const router = express.Router();
router.get('/cookie', (req, res, next) => {
    res.cookie('user-id', 12345);
    res.send('hello')
})
router.get('/', controller.index)
router.get('/search', controller.search)
router.get("/create", controller.create)
router.get("/:id", controller.get)
router.post("/create",
    upload.single('avatar'),
    validate.postCreate,
    controller.postCreate
)
module.exports = router;