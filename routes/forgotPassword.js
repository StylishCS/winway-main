const router = require("express").Router();
const {resetPass, changePass} = require('../controllers/forgotPasswordController');

/**
 * @swagger
 * tags:
 *  name: Forgot Password
 *  description: Reset Password route, it sends an OTP to the requested account
 * /resetPassword:
 *   post:
 *     summary: Reset user password
 *     tags: [Forgot Password]
 *     description: Sends a password reset email to the user's email address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: john@example.com
 *     responses:
 *       '200':
 *         description: Password reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset email sent
 *       '404':
 *         description: User not found
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
 *                   example: User not found
 * 
 * /resetPassword/verify:
 *   post:
 *     summary: Change user password
 *     tags: [Forgot Password]
 *     description: Changes the user's password with the provided token and new password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Desired email
 *                 example: youssefshirf45@gmail.com
 *               otp:
 *                 type: number
 *                 description: Sent OTP
 *                 example: youssefshirf45@gmail.com
 *               newPass:
 *                 type: string
 *                 description: User's new password
 *                 example: newpassword123
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *       '400':
 *         description: Invalid token or password
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
 *                   example: Invalid token or password
 */



router.post('/', resetPass);
router.post('/verify', changePass);

module.exports = router;