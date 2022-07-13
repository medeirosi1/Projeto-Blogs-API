const { Router } = require('express');
const authController = require('../controlles/authController');

const categorieController = require('../controlles/categorieController');

const router = Router();

router.use(authController.validateToken);
router.post('/', categorieController.create);
// router.get('/', userController.list);
// router.get('/:id', userController.findById);

module.exports = router;