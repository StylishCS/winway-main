var express = require("express");
var router = express.Router();
const {addToCart , removeFromCart, getCart}= require('../controllers/cartController')
const {protect} = require('../middleware/protect');

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Cart API
 *   version: 1.0.0
 *   description: API for managing course carts
 * paths:
 *   /cart/{studentId}:
 *     post:
 *       summary: Get a student's cart
 *       tags: [Cart]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *        - in: path
 *          name: studentId
 *          required: true
 *          schema:
 *            type: string
 *            description: Student ID
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Course2'
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Internal Server Error
 *   /cart/addCourse/{courseId}/{studentId}:
 *     post:
 *       summary: Add a course to a student's cart
 *       tags: [Cart]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *          - in: path
 *            name: courseId
 *            required: true
 *          - in: path
 *            name: studentId
 *            required: true
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courseId:
 *                   type: string
 *                   description: ID of the course to add to the cart
 *                 studentId:
 *                   type: string
 *                   description: ID of the student whose cart to add the course to
 *       responses:
 *         '201':
 *           description: Created
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal Server Error
 *   /cart/removeCourse/{courseId}/{studentId}:
 *     post:
 *       summary: Remove a course from a student's cart
 *       tags: [Cart]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *          - in: path
 *            name: courseId
 *            required: true
 *          - in: path
 *            name: studentId
 *            required: true
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courseId:
 *                   type: string
 *                   description: ID of the course to remove from the cart
 *                 studentId:
 *                   type: string
 *                   description: ID of the student whose cart to remove the course from
 *       responses:
 *         '204':
 *           description: No Content
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Internal Server Error
 * components:
 *   schemas:
 *     Course2:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The course's ID
 *         courseId:
 *           type: number
 *           description: The course's ID
 *         studentId:
 *           type: string
 *           description: The student's ID
 *         num_of_videos_watched:
 *           type: number
 *           description: Number of videos watched from the course
*/ 


router.post('/:studentId',protect,getCart);
router.post('/addCourse/:courseId/:studentId',protect,addToCart)
router.post('/removeCourse/:courseId/:studentId',protect,removeFromCart)

module.exports = router