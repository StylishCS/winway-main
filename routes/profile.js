/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Profile API
 *   version: 1.0.0
 *   description: API for managing user profiles
 * paths:
 *   /profile/update/{id}:
 *     put:
 *       summary: Update a user's profile
 *       tags: [Profile]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the user whose profile to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   description: The user's first name
 *                 lastName:
 *                   type: string
 *                   description: The user's last name
 *                 password:
 *                   type: string
 *                   description: The user's password
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The user's email
 *                 phone:
 *                   type: string
 *                   description: The user's phone number
 *                 country:
 *                   type: string
 *                   description: The user's country
 *                 gender:
 *                   type: string
 *                   description: The user's gender
 *                 birthday:
 *                   type: string
 *                   description: The user's password
 *         description: The user's updated profile information
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Profile'
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Internal Server Error
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's ID
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         bio:
 *           type: string
 *           description: The user's bio
 *         imageUrl:
 *           type: string
 *           description: The user's profile image URL
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the profile was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the profile was last updated
 */ 

var express = require("express");
var router = express.Router();
const {protect} = require('../middleware/protect');
const upload = require("../middleware/uploadFiles");
const {update}= require('../controllers/profileController')
const {validate} = require('../validation/profileValid')

router.put(
    "/update/:id",
    protect,
    upload.single('image'),
    validate(),
    update
  );

module.exports = router;