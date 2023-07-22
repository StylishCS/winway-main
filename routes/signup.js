/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Signup API
 *   version: 1.0.0
 *   description: API for user sign up
 * paths:
 *   /signup:
 *     post:
 *       summary: Sign up a user
 *       tags: [Signup]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstname:
 *                   type: string
 *                   description: The user's First Name
 *                 lastname:
 *                   type: string
 *                   description: The user's Last Name
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *                   format: email
 *                 password:
 *                   type: string
 *                   description: The user's password
 *               required:
 *                 - firstname
 *                 - lastname
 *                 - email
 *                 - password
 *       responses:
 *         '200':
 *           description: OK
 *         '400':
 *           description: Email already exist
 *         '500':
 *           description: Internal Server Error
 *   /signup/signupGmail:
 *     get:
 *       summary: Sign up a user using Google authentication
 *       tags: [Signup]
 *       responses:
 *         '200':
 *           description: OK
 *         '400':
 *           description: Bad Request
 *         '500':
 *           description: Internal Server Error
 *   /signup/facebook:
 *     get:
 *       summary: Sign up a user using Facebook authentication
 *       tags: [Signup]
 *       responses:
 *         '200':
 *           description: OK
 *         '400':
 *           description: Bad Request
 *         '500':
 *           description: Internal Server Error
 *   /signup/resendOTP:
 *     post:
 *       summary: resend OTP
 *       tags: [Signup]
 *       responses:
 *          '200':
 *              description: OK
 *          '400':
 *              description: Bad Request
 *          '500':
 *              description: Internal Server Error
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: The user's First Name
 *         lastname:
 *           type: string
 *           description: The user's Last Name
 *         email:
 *           type: string
 *           description: The user's email address
 *           format: email
 *         password:
 *           type: number
 *           description: The user's Password
 */

var express = require('express');
var router = express.Router();
const {validate} = require('../validation/signup_validation');
const {postSignup, postSignupGmail, postSignupFacebook, resendOTP, signUpGmail} = require('../controllers/signupController');


router.post('/', validate(), postSignup);
router.post('/resendOTP', resendOTP);
router.get('/signupGmail',signUpGmail);     
router.get('/gmail', postSignupGmail);
router.get('/facebook', postSignupFacebook);

module.exports = router;