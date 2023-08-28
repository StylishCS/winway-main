const util = require("util");
const { connection } = require("../db/dbConnection");

async function getCourseById(id) {
  const query = util.promisify(connection.query).bind(connection);
  const courses = await query("SELECT * FROM courses WHERE id = ?", [id]);
  return courses;
}

async function updateCourse(id, courseObj) {
  const query = util.promisify(connection.query).bind(connection);
  await query("UPDATE courses SET ? WHERE id = ?", [courseObj, id]);
}

async function createCourse(courseObj) {
  const query = util.promisify(connection.query).bind(connection);
  await query("insert into courses set ? ", [courseObj]);
}

async function deleteCourse(id) {
  const query = util.promisify(connection.query).bind(connection);
  await query("delete from courses  where id =?", [id]);
}

async function showcourses() {
  const query = util.promisify(connection.query).bind(connection);
  const result = await query(`
  SELECT
    courses.id,
    courses.name,
    courses.price,
    courses.description,
    courses.image,
    COUNT(DISTINCT videos.id) AS num_of_videos,
    AVG(reviews.rating) AS avg_rating,
    COUNT(DISTINCT reviews.id) AS num_of_reviews
  FROM courses
  JOIN videos ON courses.id = videos.course_id
  JOIN reviews ON courses.id = reviews.courseId
  GROUP BY courses.id, courses.name, courses.price, courses.description, courses.image
`);
  return result;
}

async function searchCourses(search) {
  const query = util.promisify(connection.query).bind(connection);
  return await query(
    `select id, name, price, description, image from courses ${search}`
  );
}

async function getCollectionname(collectionName) {
  const query = util.promisify(connection.query).bind(connection);
  return await query("select * from courses where collectionName = ?", [
    collectionName,
  ]);
}

async function playCourse(courseId) {
  const query = util.promisify(connection.query).bind(connection);
  const result = await query(`
    SELECT
      courses.image,
      courses.price,
      courses.description,
      courses.name,
      AVG(reviews.rating) AS avg_rating,
      COUNT(DISTINCT cart.studentId) AS num_of_students,
      modulecourses.name_of_module,
      videos.name_of_video,
      videos.time_of_video,
      videos.id AS video_id
    FROM courses
    LEFT JOIN reviews ON courses.id = reviews.courseId 
    LEFT JOIN cart ON courses.id = cart.courseId
    LEFT JOIN modulecourses ON courses.id = modulecourses.course_id
    LEFT JOIN videos ON modulecourses.id = videos.module_id
    WHERE courses.id = ?
    GROUP BY
      courses.image,
      courses.price,
      courses.description,
      courses.name,
      modulecourses.name_of_module,
      videos.name_of_video,
      videos.time_of_video,
      videos.id
  `, [courseId]);

  const course = {
    image: "https://winway.onrender.com/" + result[0].image,
    price: result[0].price,
    description: result[0].description,
    name: result[0].name,
    avg_rating: result[0].avg_rating,
    num_of_students: result[0].num_of_students,
    modules: []
  };

  result.forEach(row => {
    const moduleIndex = course.modules.findIndex(module => module.name_of_module === row.name_of_module);
    if (moduleIndex === -1) {
      course.modules.push({
        name_of_module: row.name_of_module,
        videos: [{video_id: row.video_id ,name_of_video: row.name_of_video, time_of_video: row.time_of_video }]
      });
    } else {
      course.modules[moduleIndex].videos.push({video_id: row.video_id ,name_of_video: row.name_of_video, time_of_video: row.time_of_video });
    }
  });

  return [course];
}
module.exports = {
  getCourseById,
  updateCourse,
  deleteCourse,
  createCourse,
  showcourses,
  getCollectionname,
  searchCourses,
  playCourse
};
