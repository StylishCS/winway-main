const util = require("util");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");

const {
  getVideoById,
  updateVideo,
  createVideo,
  deleteVideo,
  showvideos,
  checkCourse,
  getModule,
} = require("../services/videosServices");
const e = require("express");
const { log } = require("util");

async function update(req, res) {
  try {
    const errors = req.validationErrors();
    if (!errors) {
      return res.status(400).json({ errors: "error" });
    }

    const video = await getVideoById(req.params.id);
    if (!video[0]) {
      return res.status(404).json({ errors: ["Video not found"] });
    }
    if (req.file) {
      if (video && video.image) {
        fs.unlinkSync("../upload/" + video[0].image);
      }

      if (video && video.fileName) {
        fs.unlinkSync("../upload/" + video[0].fileName);
      }
    }

    const videoObj = {
      name_of_video: req.body.name_of_video,
      time_of_video: new Date().toISOString(),
      fileName: req.files.fileName[0].filename,
    };

    await updateVideo(video[0].id, videoObj);

    res.status(200).json({
      msg: "Video updated",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function create(req, res) {
  try {
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ errors: "error" });
    }
    if (await checkCourse(req.params.course_id)) {
      if (!req.files || !req.files.image) {
        // Check if image file exists
        return res.status(400).json({
          errors: [{ msg: "Image is Required" }],
        });
      }

      if (!req.files.fileName) {
        // Check if video or txt file exists
        return res.status(400).json({
          errors: [{ msg: "Video or txt is Required" }],
        });
      }
      
      const currentDate = new Date();
      const videoData = {
        name_of_video: req.body.name_of_video,
        time_of_video: req.body.time_of_video,
        image: req.files.image[0].filename, // Use the filename of the uploaded image
        fileName: req.files.fileName[0].filename, // Use the filename of the uploaded video or txt file
        course_id: req.params.course_id,
        time_of_upload: currentDate,
        module_id: req.params.module_id
      };
      
      const module = await getModule(
        req.params.module_id,
        req.params.course_id
      );
      
      if (module.length > 0) {
        const result = await createVideo(videoData, videoData.module_id);
        res.status(200).json({
          msg: result,
        });
      } else {
        res.status(200).json({
          msg: "Module not found",
        });
      }
    } else {
      res.status(200).json({
        msg: "Course not found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function deleteV(req, res) {
  try {
    const errors = req.validationErrors();
    if (!errors) {
      return res.status(400).json({ errors: "error" });
    }

    const video = await getVideoById(req.params.id);
    if (!video[0]) {
      return res.status(404).json({ errors: ["Video not found"] });
    }

    fs.unlinkSync("./upload/" + video[0].image);
    fs.unlinkSync("./upload/" + video[0].fileName);

    await deleteVideo(video[0].id);

    res.status(200).json({
      msg: "Video Deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function shows(req, res) {
  try {
    const videos = await showvideos();
    if (videos) {
      videos.map((video) => {
        video.image = "https://winway.onrender.com/" + video.image;
      });

      videos.map((video) => {
        video.fileName = "https://winway.onrender.com/" + video.fileName;
      });

      res.status(200).json(videos);
    } else {
      res.status(404).json({ errors: ["No Videos found"] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

async function show(req, res) {
  try {
    const video = await getVideoById(req.params.id);
    if (!video[0]) {
      return res.status(404).json({ errors: ["Video not found"] });
    }

    if (video) {
      video[0].image = "https://winway.onrender.com/" + video[0].image;
      video[0].fileName = "https://winway.onrender.com/" + video[0].fileName;
      res.status(200).json(video);
    } else {
      res.status(404).json({ errors: ["No Videos found"] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: ["Internal server error"] });
  }
}

module.exports = {
  update,
  create,
  deleteV,
  shows,
  show,
};
