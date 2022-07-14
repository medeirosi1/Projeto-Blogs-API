const { Router } = require('express');
const authController = require('../controlles/authController');

const postController = require('../controlles/postController');

const router = Router();

router.use(authController.validateToken);
router.post('/', postController.create);
router.get('/', postController.list);
router.get('/:id', postController.findById);

module.exports = router;