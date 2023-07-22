/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Video Watched API
 *   version: 1.0.0
 *   description: API for managing watched videos
 * paths:
 *   /video-watched/{course_id}/{user_id}/{video_id}:
 *     post:
 *       summary: Add a video as watched
 *       tags: [Video Watched]
 *       security:
 *         - JWT: []
 *       parameters:
 *         - in: path
 *           name: course_id
 *           required: true
 *           description: ID of the course the video belongs to
 *           schema:
 *             type: string
 *         - in: path
 *           name: user_id
 *           required: true
 *           description: ID of the user who watched the video
 *           schema:
 *             type: string
 *         - in: path
 *           name: video_id
 *           required: true
 *           description: ID of the video that was watched
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
 */

var express = require("express");
var router = express.Router();
const { addVideoWatched }= require('../controllers/videoWatchedCont')
const { protect } = require('../middleware/protect');


router.post('/:course_id/:user_id/:video_id', protect, addVideoWatched);

module.exports = router;