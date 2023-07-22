var express = require('express');
var router = express.Router();


/**
 * @swagger
 * tags:
 *  name: Home page
 * /:
 *   get:
 *     summary: Returns the home page
 *     tags: [Home page]
 *     responses:
 *       200:
 *         description: OK
 */



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
