const util = require("util");
const fs = require("fs");
const {
  getCourseById,
  updateCourse,
  createCourse,
  deleteCourse,
  showcourses,
  searchCourses,
  getCollectionname,
  playCourse
} = require("../services/coursesServices");
const { getRating, showvideos } = require("../services/studentServices");

async function update(req, res) {
  try {
    const errors = req.validationErrors();
    if (!errors) {
      return res.status(400).json({ errors: "error" });
    }

    const course = await getCourseById(req.params.id);
    if (!course[0]) {
      return res.status(404).json({ errors: ["Course not found"] });
    }

    const courseObj = {
      name: req.body.name,
      description: req.body.description,
      durations: req.body.durations,
      price: req.body.price,
      features: req.body.features,
    };

    if (req.file) {
      courseObj.image = req.file.filename;
      if (course && course.image) {
        fs.unlinkSync("../upload/" + course[0].image);
      }
    }

    await updateCourse(course[0].id, courseObj);

    res.status(200).json({
      msg: "Course updated",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function create(req, res) {
  try {
    const errors = req.validationErrors();
    if (!errors) {
      return res.status(400).json({ errors: "error" });
    }

    if (!req.file) {
      // Check if image file exists
      return res.status(400).json({
        errors: [{ msg: "Image is Required" }],
      });
    }

    // INSERT NEW COURSE
    const courseData = {
      name: req.body.name,
      description: req.body.description,
      durations: req.body.durations,
      price: req.body.price,
      features: req.body.features,
      image: req.file.filename, // Use the filename of the uploaded image
      mentor_id: req.body.mentor_id,
      collectionName: req.body.collectionName,
      content: req.body.content,
      language: req.body.language,
      level: req.body.level
    };

    await createCourse(courseData);

    res.status(200).json({
      msg: "Course created successfully",
    });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function deleteC(req, res) {
  try {
    const errors = req.validationErrors();
    if (!errors) {
      return res.status(400).json({ errors: "error" });
    }

    const course = await getCourseById(req.params.id);
    if (!course[0]) {
      return res.status(404).json({ errors: ["Course not found"] });
    }

    fs.unlinkSync("./upload/" + course[0].image);

    await deleteCourse(course[0].id);

    res.status(200).json({
      msg: "Course Deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function showCourses(req, res) {
  try {
    let courses = [];
    let search = "";
    if (req.query.search) {
      search = `where name like '%${req.query.search}%' or description like '%${req.query.description}%' or collectionName like '%${req.query.collectionName}%' or content like '%${req.query.content}%'`;
      courses = await searchCourses(search);
    } else {
      courses = await showcourses();
    }
    if (courses) {
      courses.map(
        (res) => (res.image = "https://winway.onrender.com/" + res.image)
      );
      res.status(200).json(courses);
    } else {
      res.status(404).json({ errors: ["No courses found"] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function showCourse(req, res) {
  try {
    const course = await getCourseById(req.params.id);
    if (!course[0]) {
      return res.status(404).json({ errors: ["Course not found"] });
    }

    if (course) {
      course[0].image = "https://winway.onrender.com/" + course[0].image;
      res.status(200).json(course);
    } else {
      res.status(404).json({ errors: ["No courses found"] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function getCollectioName(req, res) {
  try {
    const courses = await getCollectionname(req.params.collectionName);
    if (courses) {
      courses.map((course) => {
        course.image_url = "https://winway.onrender.com/" + course.image;
      });

      res.status(200).json(courses);
    } else {
      res.status(404).json({ errors: ["No courses found"] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function playcourse(req, res) {
  try {
    let courses = await playCourse(req.params.id);

    if (courses) {
      res.status(200).json(courses);
    } else {
      res.status(404).json({ errors: ["No courses found"] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}
module.exports = {
  update,
  create,
  deleteC,
  showCourses,
  showCourse,
  getCollectioName,
  playcourse
};
