const { Router } = require('express');
const router = Router();
const {UserLogIn, UserSignUp, UserLogout} = require('../controller/controller');
router.post('/add', UserSignUp);
router.post('/login', UserLogIn);
router.get('/logout', UserLogout);

module.exports = router;