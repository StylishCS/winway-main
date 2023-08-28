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

module.exports = {
  getCourseById,
  updateCourse,
  deleteCourse,
  createCourse,
  showcourses,
  getCollectionname,
  searchCourses,
};
