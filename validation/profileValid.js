const { body, validationResult } = require("express-validator");
const upload= require('../middleware/uploadFiles'); 

  function validate() {
    return [
      body("firstname")
        .isString()
        .withMessage("Please enter a valid course name"),
        body("lastname")
        .isString()
        .withMessage("Please enter a valid course name"),
      body("phone").isMobilePhone(),
      body("country"),
      body("gender"),
      (req, res, next) => {
        const errors = validationResult(req);
        req.validationErrors = () => errors.array();
        next();
      },
    ];
  }


module.exports = {validate};