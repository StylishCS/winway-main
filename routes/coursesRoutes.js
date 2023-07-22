var express = require("express");
var router = express.Router();
const {protect} = require('../middleware/protect');
const upload = require("../middleware/uploadFiles");
const {
  update,
  create,
  deleteC,
  showCourse,
  showCourses,
  getCollectioName
} = require("../controllers/coursesController");
const { validate } = require("../validation/coursesValidation");

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         id:
 *           type: number
 *         durations:
 *           type: number
 *         price:
 *           type: number
 *         mentor_id:
 *           type: number
 *         feature:
 *           type: string
 *         collectionName:
 *           type: string
 *         content:
 *           type: string
 *         language:
 *           type: string
 *         level:
 *           type: string
 *         
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       required:
 *         - message
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       required:
 *         - message
 * tags:
 *  name: Courses
 *  description: The Courses managing API, you need to be logged in to access this page
 * /courseRouter/createCourse:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               durations:
 *                 type: number
 *               price:
 *                 type: number
 *               mentor_id:
 *                 type: number
 *               features:
 *                 type: string
 *               image:
 *                 type: string
 *               collectionName:
 *                 type: string
 *               content:
 *                 type: string
 *               language:
 *                 type: string
 *               level:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /courseRouter/update/{id}:
 *   put:
 *     summary: Update an existing course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               durations:
 *                 type: number
 *               price:
 *                 type: number
 *               mentor_id:
 *                 type: number
 *               features:
 *                 type: string
 *               image:
 *                 type: string
 *               collectionName:
 *                 type: string
 *               content:
 *                 type: string
 *               language:
 *                 type: string
 *               level:
 *                 type: string
 *                
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /courseRouter/deleteCourse/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /courseRouter/getCourse/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                image:
 *                  type: string
 *                id:
 *                  type: number
 *                durations:
 *                  type: number
 *                price:
 *                  type: number
 *                mentor_id:
 *                  type: number
 *                feature:
 *                  type: string
 *                collectionName:
 *                  type: string
 *                content:
 *                  type: string
 *                language:
 *                  type: string
 *                level:
 *                  type: string
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /courseRouter/getCourses:
 *   get:
 *     summary: Get all courses or seacrch for related courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                image:
 *                  type: string
 *                id:
 *                  type: number
 *                durations:
 *                  type: number
 *                price:
 *                  type: number
 *                mentor_id:
 *                  type: number
 *                feature:
 *                  type: string
 *                collectionName:
 *                  type: string
 *                content:
 *                  type: string
 *                language:
 *                  type: string
 *                level:
 *                  type: string
 *               
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * /courseRouter/{collectionName}:
 *   get:
 *     summary: Get all courses from a specific collection
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: collectionName
 *         required: true
 *         schema:
 *           type: string
 *         description: Collection name
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               durations:
 *                 type: number
 *               price:
 *                 type: number
 *               mentor_id:
 *                 type: number
 *               features:
 *                 type: string
 *               image:
 *                 type: string
 *               collectionName:
 *                 type: string
 *               content:
 *                 type: string
 *               language:
 *                 type: string
 *               level:
 *                 type: string
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */



router.post(
  "/createCourse",
  protect,
  upload.single('image'),
  validate(),
  create
);

router.put(
  "/update/:id",
  protect,
  upload.single('image'),
  validate(),
  update
);

router.delete("/deleteCourse/:id", protect,validate(), deleteC);

router.get("/getCourse/:id", protect, validate(), showCourse);

router.get("/getCourses",protect, validate(), showCourses);

router.get("/:collectionName", protect, validate(), getCollectioName);

module.exports = router;


// upload.fields([
//   { name: "image", maxCount: 1 },
//   { name: "videos", maxCount: 1 },
// ]),