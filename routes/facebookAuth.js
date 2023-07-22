const router = require("express").Router();
const passport = require('passport');

/**
 * @swagger
 * tags:
 *  name: Facebook Auth
 *  description: Facebook Auth Callbacks
 * /facebook:
 *   get:
 *     summary: Initiate Facebook OAuth2 authentication
 *     tags: [Facebook Auth]
 *     description: Redirects the user to the Facebook authentication page
 *     responses:
 *       '302':
 *         description: Redirect
 * 
 * /auth/login/failed:
 *   get:
 *     summary: Get the login failure message
 *     tags: [Facebook Auth]
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
 */


router.get('/', passport.authenticate('facebook', {
    successRedirect: "/signup/facebook",
    failureRedirect: "/login/failed",
})
);

router.get("/login/failed", (req,res)=>{
    res.status(401).json({
        error: true,
        message: "log in failure",
    })
});


module.exports = router;