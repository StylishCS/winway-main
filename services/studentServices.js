const util = require("util");
const { connection } = require("../db/dbConnection");


async function showcourses(studentId){
  const query = util.promisify(connection.query).bind(connection);
  const result = await query(`
    SELECT
    courses.id,
      courses.image,
      courses.price,
      courses.description,
      courses.name,
      AVG(reviews.rating) AS avg_rating,
      COUNT(DISTINCT videos.id) AS num_of_videos
    FROM courses
    JOIN cart ON courses.id = cart.courseId
    LEFT JOIN reviews ON courses.id = reviews.courseId
    LEFT JOIN videos ON courses.id = videos.course_id
    WHERE cart.studentId = ?
    GROUP BY
      courses.image,
      courses.price,
      courses.description,
      courses.name
  `, [studentId]);

  return result;
}
module.exports = {showcourses}