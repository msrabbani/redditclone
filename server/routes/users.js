var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', userCont.getAllUsers);
router.post('/', userCont.createUser)

module.exports = router;
