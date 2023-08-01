/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Videos API
 *   version: 1.0.0
 *   description: API for managing videos
 * paths:
 *   /videos/create/{course_id}:
 *     post:
 *       summary: Create a new video for a course
 *       tags: [Videos]
 *       security:
 *         - JWT: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   format: binary
 *                   description: The name of the video
 *                 time_of_video:
 *                   type: string
 *                   description: The time of video
 *                 fileName:
 *                   type: string
 *                   description: The file name
 *                 image:
 *                   type: string
 *                   description: The image of the course
 *               required:
 *                 - image
 *                 - fileName
 *                 - name
 *                 - time_of_video
 *       parameters:
 *         - in: path
 *           name: course_id
 *           required: true
 *           description: ID of the course to add a video to
 *           schema:
 *             type: string
 *       responses:
 *         '201':
 *           description: Created
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal Server Error
 *   /videos/update/{id}:
 *     put:
 *       summary: Update a video
 *       tags: [Videos]
 *       security:
 *         - JWT: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The updated name of the video
 *                 time_of_video:
 *                   type: string
 *                   description: The updated time of the video
 *                 fileName:
 *                   type: string
 *                   format: binary
 *                   description: The updated video file
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the video to update
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Internal Server Error
 *   /videos/delete/{id}:
 *     delete:
 *       summary: Delete a video
 *       tags: [Videos]
 *       security:
 *         - JWT: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the video to delete
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Internal Server Error
 *   /videos/show/{id}:
 *     get:
 *       summary: Get a video by ID
 *       tags: [Videos]
 *       security:
 *         - JWT: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the video to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Internal Server Error
 *   /videos/shows:
 *     get:
 *       summary: Get all videos
 *       tags: [Videos]
 *       security:
 *         - JWT: []
 *       responses:
 *         '200':
 *           description: OK
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal Server Error
 */


var express = require("express");
var router = express.Router();
const {protect} = require('../middleware/protect');
const upload = require("../middleware/uploadFiles");
const {
  update,
  create,
  deleteV,
  shows,
  show,
} = require("../controllers/videosController");
const { validate } = require("../validation/videosValidation");

router.post(
  "/create/:course_id/:module_id",
  // protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "fileName", maxCount: 1 },
  ]),
  validate(),
  create
);

router.put(
  "/update/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "fileName", maxCount: 1 },
  ]),
  validate(),
  update
);

router.delete("/delete/:id",protect, validate(), deleteV);

router.get("/show/:id",protect, validate(), show);

router.get("/shows", protect,validate(), shows);

module.exports = router;