/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Review API
 *   version: 1.0.0
 *   description: API for managing course reviews
 * paths:
 *   /review/{studentId}/{courseId}:
 *     post:
 *       summary: Add a review for a course
 *       tags: [Review]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: studentId
 *           required: true
 *           description: ID of the student who is adding the review
 *           schema:
 *             type: string
 *         - in: path
 *           name: courseId
 *           required: true
 *           description: ID of the course being reviewed
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 body:
 *                   type: string
 *                   description: The review text
 *                 rating:
 *                   type: integer
 *                   description: The rating (1-5)
 *               required:
 *                 - body
 *                 - rating
 *         description: The review to add
 *       responses:
 *         '201':
 *           description: Created
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal Server Error
 *   /review/{courseId}:
 *     get:
 *       summary: Get all reviews for a course
 *       tags: [Review]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: courseId
 *           required: true
 *           description: ID of the course to get the reviews for
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Review'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Internal Server Error
 *   /review/one/{id}:
 *     get:
 *       summary: Get a specific review
 *       tags: [Review]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the review to get
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Review'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Internal Server Error
 *   /review/del/{id}:
 *     delete:
 *       summary: Delete a review
 *       tags: [Review]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the review to delete
 *           schema:
 *             type: string
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
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The review ID
 *         body:
 *           type: string
 *           description: The review text
 *         rating:
 *           type: integer
 *           description: The rating (1-5)
 *         studentId:
 *           type: string
 *           description: The ID of the student who added the review
 *         courseId:
 *           type: string
 *           description: The ID of the course being reviewed
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the review was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the review was last updated
 */

var express = require("express");
var router = express.Router();
const {protect} = require('../middleware/protect');
const{addReview,getReview ,getReviewOne ,delet}= require("../controllers/ReviewController")
const { validate, ValidationError, Joi } = require('express-validation')
const reviewValidation = {
    body: Joi.object({
      body: Joi.string().required(),
      rating: Joi.number().integer().min(1).max(5).required(),
    }),
  }


router.post('/:studentId/:courseId',protect,validate(reviewValidation, {}, {}),addReview)
router.get('/:courseId',protect,getReview )
router.get('/one/:id',protect, getReviewOne)
router.delete('/del/:id',protect, delet)

module.exports=router