const express = require("express");
const cors = require("cors");
const multer = require("multer");

const imagesDAO = require("./db-access/images-dao");

const upload = multer().single("picture");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("It works!");
});

app.get("/images/all", (_, res) => {
  imagesDAO
    .findAllImages()
    .then((allImages) => res.json(allImages))
    .catch((_) =>
      res.status(500).json({ err: "Unknown error while reading images." })
    );
});

app.post("/images/new", upload, (req, res) => {
  console.log(req.body);
  const pictureBas64 = imageBufferToBase64(req.file.buffer, req.file.mimetype);
  const newImage = {
    image: pictureBas64,
  };

  imagesDAO
    .addImage(newImage)
    .then(() => TodosDAO.findAllImages())
    .then((allImages) => res.json(allImages))
    .catch((_) =>
      res
        .status(500)
        .json({ err: "Unknown error while saving your new image." })
    );
});

app.delete("/images/delete/:id", (req, res) => {
  const targetId = req.params.id;

  imagesDAO
    .deleteImage(targetId)
    .then(() => TodosDAO.findAllImages())
    .then((allImages) => res.json(allImages))
    .catch((_) =>
      res.status(500).json({ err: "Unknown error while deleting this todo." })
    );
});

function imageBufferToBase64(imgBuffer, mimeType) {
  return "data:" + mimeType + ";base64," + imgBuffer.toString("base64");
}

app.listen(PORT, () => console.log("listening on Port", PORT));
