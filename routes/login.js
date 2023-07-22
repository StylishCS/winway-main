var express = require('express');
var router = express.Router();
const {login, facebookLogin, gmailLogin} = require('../controllers/loginController');
const {validate} = require('../validation/login_validation');
const {protect} = require('../middleware/protect');

router.post('/', validate(), login);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *      type: object
 *      properties:
 *          id:
 *              type: string
 *          firstname:
 *              type: string
 *          lastname:
 *              type: string
 *          email:
 *              type: string
 *              format: email
 *          phone:
 *              type: integer
 *          country:
 *              type: string
 *          gender:
 *              type: string
 *          birthday:
 *              type: string
 *              format: date
 *          image:
 *              type: string
 *          verified:
 *              type: string
 *          
 * tags:
 *  name: Login page
 *  description: You can login with user individual user account, with facebook or with google account
 * /login:
 *  post:
 *     summary: Login with individual user account
 *     tags: [Login page]
 *     description: This endpoint logs a user into the system
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *          schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: User's email address
 *                      example: youssefshirf45@gmail.com
 *                  password:
 *                      type: string
 *                      description: User's password
 *                      example: Yusef1234
 *     responses:
 *       '200':
 *          description: Logged in successfully
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/User'
 *                  token:
 *                      type: string
 *          401:
 *              description: The user's credentials were invalid.
 *          400:
 *              description: The user's credentials were invalid.
 *          404:
 *              description: The user's credentials were invalid.
 *     
 * /login/facebook:
 *   get:
 *     summary: Login with Facebook
 *     tags: [Login page]
 *     responses:
 *       200:
 *         description: OK
 * /login/google:
 *   get:
 *     summary: Login with Google
 *     tags: [Login page]
 *     responses:
 *       200:
 *         description: OK
 * /login/login/failed:
 *   get:
 *     summary: Returns an error message when login fails
 *     tags: [Login page]
 *     responses:
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: log in failure
 */


router.get('/facebook', facebookLogin);


router.get('/google', gmailLogin);



router.get("/login/failed", (req,res)=>{
    res.status(401).json({
        error: true,
        message: "log in failure",
    })
});


module.exports = router;
