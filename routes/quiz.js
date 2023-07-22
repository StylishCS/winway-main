var express = require("express");
var router = express.Router();
const {protect} = require('../middleware/protect');
const {
  update,
  create,
  deleteQ,
  showQuiz,
  showQuizs,
} = require("../controllers/quizController");
const { validate } = require("../validation/quizValid");

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Quiz API
 *   version: 1.0.0
 *   description: API for managing quizzes
 * paths:
 *   /quizs/createQuiz/{course_id}:
 *     post:
 *       summary: Create a quiz for a course
 *       tags: [Quiz]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: course_id
 *           required: true
 *           description: ID of the course to create the quiz for
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The quiz name
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                         description: The question
 *                       options:
 *                         type: array
 *                         items:
 *                           type: string
 *                           description: The answer option
 *                       answer:
 *                         type: string
 *                         description: The correct answer
 *               required:
 *                 - name
 *                 - questions
 *         description: The quiz to create
 *       responses:
 *         '201':
 *           description: Created
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal Server Error
 *   /quizs/update/{id}:
 *     put:
 *       summary: Update a quiz
 *       tags: [Quiz]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the quiz to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The quiz name
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                         description: The question
 *                       options:
 *                         type: array
 *                         items:
 *                           type: string
 *                           description: The answer option
 *                       answer:
 *                         type: string
 *                         description: The correct answer
 *               required:
 *                 - name
 *                 - questions
 *         description: The updated quiz
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Quiz'
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Internal Server Error
 *   /quizs/deleteQuiz/{id}:
 *     delete:
 *       summary: Delete a quiz
 *       tags: [Quiz]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the quiz to delete
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
 *   /quizs/getQuiz/{id}:
 *     get:
 *       summary: Get a specific quiz
 *       tags: [Quiz]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the quiz to get
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Quiz'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Internal Server Error
 *   /quizs/getQuizs:
 *     get:
 *       summary: Get all quizzes
 *       tags: [Quiz]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Quiz'
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal Server Error
 * components:
 *   schemas:
 *     Quiz:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The quiz ID
 *         name:
 *           type: string
 *           description: The quiz name
 *         questions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The answer option
 *               answer:
 *                 type: string
 *                 description: The correct answer
 *         course_id:
 *           type: string
 *           description: The ID of the course the quiz belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the quiz was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the quiz was last updated
 */


router.post("/createQuiz/:course_id", protect, validate(), create);

router.put("/update/:id", protect,validate(), update);

router.delete("/deleteQuiz/:id", protect,validate(), deleteQ);

router.get("/getQuiz/:id", protect,validate(), showQuiz);

router.get("/getQuizs", protect,validate(), showQuizs);

module.exports = router;

