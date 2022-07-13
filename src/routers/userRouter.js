const { Router } = require('express');
const authController = require('../controlles/authController');

const userController = require('../controlles/userController');

const router = Router();

router.post('/', userController.create);
router.use(authController.validateToken);
router.get('/', userController.list);
router.get('/:id', userController.findById);

module.exports = router;