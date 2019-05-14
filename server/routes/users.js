var express = require('express');
var router = express.Router();
const userCont = require('../controllers/userController')

/* GET users listing. */
router.get('/', userCont.getAllUsers);
router.post('/signup', userCont.signup)
router.post('/signin', userCont.signin)

module.exports = router;
