const router = require("express").Router();
const passport = require('passport');

/**
 * @swagger
 * tags:
 *  name: Google Auth
 *  description: Google login or signup, just use the route /auth/google and don't mind any other route.
 * /auth/login/success:
 *   get:
 *     summary: Get the login success message and user details
 *     tags: [Google Auth]
 *     description: Returns a message indicating successful login and the user details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: successfully logged in
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '403':
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
 *                   example: not authenticated
 * 
 * /auth/login/failed:
 *   get:
 *     summary: Get the login failure message
 *     tags: [Google Auth]
 *     description: Returns a message indicating login failure
 *     responses:
 *       '401':
 *         description: Login failure
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
 * 
 * /auth/google/callback:
 *   get:
 *     summary: Callback for Google OAuth2 authentication
 *     tags: [Google Auth]
 *     description: Redirects to the appropriate URL based on authentication status
 *     responses:
 *       '302':
 *         description: Redirect
 * 
 * /auth/google:
 *   get:
 *     summary: Initiates Google OAuth2 authentication
 *     tags: [Google Auth]
 *     description: Redirects the user to the Google authentication page
 *     responses:
 *       '302':
 *         description: Redirect
 * 
 * /auth/logout:
 *   get:
 *     summary: Log out the user
 *     tags: [Google Auth]
 *     description: Logs out the user and redirects to the home page
 *     responses:
 *       '302':
 *         description: Redirect
 */



router.get("/login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            error: false,
            message: "successfully loged in",
            user: req.user,
        });
    }else{
        res.status(403).json({error: true, message: "not authed"});
    }
});


router.get("/login/failed", (req,res)=>{
    res.status(401).json({
        error: true,
        message: "log in failure",
    })
});


router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "/signup/gmail",
        failureRedirect: "/login/failed",
    })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router