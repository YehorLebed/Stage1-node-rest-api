const { Router } = require('express');
const postController = require('../controllers/postController');
const router = Router();

/**
 * @swagger
 *
 * definitions:
 *   NewPost:
 *     type: object
 *     required:
 *       - title
 *       - content
 *       - author
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       author:
 *         type: string
 *   Post:
 *     type: object
 *     required:
 *       - id
 *       - title
 *       - content
 *       - author
 *       - creationDate
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       author:
 *         type: string
 *       creationDate:
 *         type: string
 *   HandledError:
 *     type: object
 *     required:
 *       - message
 *     properties:
 *       message:
 *         type: string
 */



/**
 * @swagger
 * /posts:
 *   get:
 *     description: Returns posts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: posts
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definition/Post'
 *       500:
 *          description: Server error
 *          schema:
 *            $ref: '#/definition/HandledError'
 *   parameters:
 *     - name: token
 *       in: header
 *       description: authentication token
 *       required: true
 */
router.get('/', postController.getAll);

/**
 * @swagger
 * /posts/{id}:
 *     get:
 *      description: Returns post
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: post
 *          schema:
 *            $ref: '#/definition/Post'
 *        500:
 *           description: Server error
 *           schema:
 *             $ref: '#/definition/HandledError'
 *     parameters:
 *      - name: token
 *        in: header
 *        description: authentication token
 *        required: true
 *      - name: id
 *        in: path
 *        description: post id
 */
router.get('/:id', postController.getById);

router.post('/', postController.create);

router.put('/:id', postController.update);

router.delete('/:id', postController.delete);

module.exports = router;
