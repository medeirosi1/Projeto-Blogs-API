const { Router } = require('express');

const authController = require('../controlles/authController');

const router = Router();

router.post('/', authController.login);

module.exports = router;