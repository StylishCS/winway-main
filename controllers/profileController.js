const bcrypt = require("bcrypt");
const util = require("util");
const fs = require("fs");
var passwordValidator = require("password-validator");
const { updateProfile } = require("../services/profileServics");
const { getEmail, getUser } = require("../services/signupService");
var schema = new passwordValidator();

schema
  .is()
  .min(8)
  .is()
  .max(255)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces();

async function update(req, res) {
  try {
    const errors = req.validationErrors();
    if (!errors) {
      return res.status(400).json({ errors: "error" });
    }
    if (await getUser(req.params.id)) {
      const profile = await getUser(req.params.id);
      if (!profile) {
        return res.status(404).json({ errors: ["User not found"] });
      }

      const profileObj = {
        firstname: req.body.firstname || profile[0].firstname,
        lastname: req.body.lastname || profile[0].lastname,
        phone: req.body.phone || profile[0].phone,
        country: req.body.country || profile[0].country,
        gender: req.body.gender || profile[0].gender,
        birthday: req.body.birthday || profile[0].birthday,
      };

      if (req.file) {
        profileObj.image = req.file.filename;
        if (profile && profile.image) {
          fs.unlinkSync("../upload/" + profile[0].image);
        }
      }
      await updateProfile(profile[0].id, profileObj);

      res.status(200).json({
        msg: "Profile updated",
      });
    } else {
      return res.status(400).json({ msg: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

module.exports = { update };
