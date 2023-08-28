const util = require("util");
const fs = require("fs");
const {
  showcourses,
} = require("../services/studentServices");

async function showCourses(req, res) {
  try {
    let courses = await showcourses(req.params.student_id);
    if (courses) {
      courses.map(
        (res) => (res.image = "https://winway.onrender.com/" + res.image)
      );
      res.status(200).json(courses);
    } else {
      res.status(404).json({ errors: ["No Courses found"] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

module.exports = { showCourses };
