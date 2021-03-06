const { Router } = require('express');
const { body, param, validationResult } = require('express-validator');
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
 *     parameters:
 *       - name: token
 *         in: header
 *         description: authentication token
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: posts
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definition/Post'
 *         examples:
 *           'application/json': {
 *             "posts": [
 *               {
 *                 "id": 12,
 *                 "title": "My super new post",
 *                 "content": "Lorem lorem ipsum ipsum",
 *                 "author": "Yehor Lebid",
 *                 "creationDate": "2020-08-19T12:14:49.000Z"
 *               },
 *               {
 *                 "id": 13,
 *                 "title": "The ohter post",
 *                 "content": "Lorem lorem ipsum ipsum",
 *                 "author": "Artimiy",
 *                 "creationDate": "2020-08-19T12:17:19.000Z"
 *               }
 *             ]
 *           }
 *       500:
 *          description: Server error
 *          schema:
 *            $ref: '#/definition/HandledError'
 *          examples:
 *            'application/json': { "message": "Server error" }
 */
router.get('/', postController.getAll);

/**
 * @swagger
 * /posts/{id}:
 *     get:
 *      description: Returns post
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: token
 *          in: header
 *          description: authentication token
 *          required: false
 *          type: string
 *        - name: id
 *          in: path
 *          description: post id
 *      responses:
 *        200:
 *          description: post
 *          schema:
 *            $ref: '#/definition/Post'
 *          examples:
 *            'application/json': {
 *              "id": 12,
 *              "title": "My super new post",
 *              "content": "Lorem lorem ipsum ipsum",
 *              "author": "Yehor Lebid",
 *              "creationDate": "2020-08-19T12:14:49.000Z"
 *            }
 *        500:
 *           description: Server error
 *           schema:
 *             $ref: '#/definition/HandledError'
 *           examples:
 *             'application/json': { "message": "Server error" }
 */
router.get(
    '/:id',
    [
        param('id').toInt().isInt({ min: 1 })
    ],
    postController.getById
);

/**
 * @swagger
 * /posts:
 *     post:
 *      description: Create post instance
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: token
 *         in: header
 *         description: authentication token
 *         required: false
 *         type: string
 *       - name: post
 *         in: body
 *         description: New post object
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definition/NewPost'
 *         examples:
 *           'application/json': {
 *             "title": "My super new post",
 *             "content": "Lorem lorem ipsum ipsum",
 *             "author": "Yehor Lebid"
 *           }
 *      responses:
 *        201:
 *          description: post was created
 *          examples:
 *            'application/json': { "id": 2 }
 *        409:
 *           description: Already exists
 *           schema:
 *             $ref: '#/definition/HandledError'
 *           examples:
 *             'application/json': { "message": "Post does not exist" }
 *        500:
 *           description: Server error
 *           schema:
 *             $ref: '#/definition/HandledError'
 *           examples:
 *             'application/json': { "message": "Server error" }
 */
router.post(
    '/',
    [
        body('title').exists().isLength({ max: 80 }),
        body('content').exists(),
        body('author').exists().isLength({ max: 40 })
    ],
    postController.create
);

/**
 * @swagger
 * /posts/{id}:
 *     put:
 *      description: Update post instance
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: token
 *         in: header
 *         description: authentication token
 *         required: false
 *         type: string
 *       - name: id
 *         in: path
 *         description: post id
 *         required: true
 *       - name: post
 *         in: body
 *         description: New post object
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definition/NewPost'
 *         examples:
 *           'application/json': {
 *             "title": "My super new post",
 *             "content": "Lorem lorem ipsum ipsum",
 *             "author": "Yehor Lebid"
 *           }
 *      responses:
 *        200:
 *          description: post was updated
 *          examples:
 *            'application/json': { "id": 2 }
 *        404:
 *           description: Post does not exist
 *           schema:
 *             $ref: '#/definition/HandledError'
 *           examples:
 *             'application/json': { "message": "Post does not exist" }
 *        500:
 *           description: Server error
 *           schema:
 *             $ref: '#/definition/HandledError'
 *           examples:
 *             'application/json': { "message": "Server error" }
 */
router.put(
    '/:id',
    [
        param('id').toInt().isInt().if(id => id > 0),
        body('title').exists().isLength({ max: 80 }),
        body('content').exists(),
        body('author').exists().isLength({ max: 40 })
    ],
    postController.update
);

/**
 * @swagger
 * /posts/{id}:
 *     delete:
 *      description: Delete post instance
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: token
 *         in: header
 *         description: authentication token
 *         required: false
 *         type: string
 *       - name: id
 *         in: path
 *         description: post id
 *         required: true
 *      responses:
 *        200:
 *          description: post was deleted
 *          examples:
 *            'application/json': { "id": 2 }
 *        404:
 *           description: Post does not exist
 *           schema:
 *             $ref: '#/definition/HandledError'
 *           examples:
 *             'application/json': { "message": "Post does not exist" }
 *        500:
 *           description: Server error
 *           schema:
 *             $ref: '#/definition/HandledError'
 *           examples:
 *             'application/json': { "message": "Server error" }
 */
router.delete(
    '/:id',
    [
        param('id').toInt().isInt().if(id => id > 0)
    ],
    postController.delete
);

module.exports = router;
