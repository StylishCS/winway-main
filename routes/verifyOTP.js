/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: User Verification API
 *   version: 1.0.0
 *   description: API for verifying user details
 * paths:
 *   /verify:
 *     post:
 *       summary: Verify user details
 *       tags: [Verification]
 *       security:
 *         - JWT: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email of the user to be verified
 *                 otp:
 *                   type: number
 *                   description: The OTP
 *               required:
 *                 - otp
 *                 - email
 *       responses:
 *         '200':
 *           description: OK
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal Server Error
 */

const router = require("express").Router();
const {verifyUser} = require('../controllers/verifyController');
const {protect} = require('../middleware/protect');

router.post('/', protect, verifyUser);

module.exports = router;