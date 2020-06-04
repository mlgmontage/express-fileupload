const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyPaser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("uploads"));

app.post("/upload", (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No files uploaded",
      });
    }
    const data = [];
    _.forEach(_.keysIn(req.files.photo), (key) => {
      let photo = req.files.photo[key];
      photo.mv("./uploads/" + photo.name);
      data.push({
        name: photo.name,
        mimetype: photo.mimetype,
        size: photo.size,
      });
    });

    res.send({
      status: true,
      message: "Files has been uploaded",
      data,
    });
  } catch (err) {
    res.send(err);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listenning on port ${port}`);
});