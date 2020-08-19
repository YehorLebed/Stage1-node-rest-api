const { Router } = require('express');
const postController = require('../controllers/postController');
const router = Router();

router.get('/', postController.getAll);

router.get('/:id', postController.getById);

router.post('/', postController.create);

router.put('/:id', postController.update);

router.delete('/:id', postController.delete);

module.exports = router;
