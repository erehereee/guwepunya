const { Router } = require('express');
const router = Router();
const {UserLogIn, UserSignUp} = require('../controller/controller');
router.post('/add', UserSignUp);
router.post('/login', UserLogIn)

module.exports = router;