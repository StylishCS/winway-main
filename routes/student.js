/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Student API
 *   version: 1.0.0
 *   description: API for managing courses of a student
 * paths:
 *   /student/{user_id}:
 *     post:
 *       summary: Create a course for a student
 *       tags: [Student]
 *       parameters:
 *         - in: path
 *           name: user_id
 *           required: true
 *           description: ID of the student to create a course for
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The course name
 *                 description:
 *                   type: string
 *                   description: The course description
 *                 teacher:
 *                   type: string
 *                   description: The name of the teacher who teaches the course
 *                 duration:
 *                   type: integer
 *                   description: The duration of the course in hours
 *               required:
 *                 - name
 *                 - description
 *                 - teacher
 *                 - duration
 *       responses:
 *         '201':
 *           description: Created
 *         '400':
 *           description: Bad Request
 *         '500':
 *           description: Internal Server Error
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The course ID
 *         name:
 *           type: string
 *           description: The course name
 *         description:
 *           type: string
 *           description: The course description
 *         teacher:
 *           type: string
 *           description: The name of the teacher who teaches the course
 *         duration:
 *           type: integer
 *           description: The duration of the course in hours
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the course was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the course was last updated
 */

var express = require("express");
var router = express.Router();
const {showCourses} = require('../controllers/studentController');
const { protect } = require("../middleware/protect");

router.get("/:student_id", protect,showCourses);

module.exports = router;