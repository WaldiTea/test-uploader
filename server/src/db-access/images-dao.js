const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

async function findAllImages() {
  const db = await getDB();
  const allImages = await db.collection("images").find().toArray();
  return allImages;
}

async function addImage(newImage) {
  const db = await getDB();
  const Product = await db.collection("images").insertOne(newImage);
  return Product;
}

async function deleteImage(id) {
  const db = await getDB();
  const deleteImage = await db
    .collection("images")
    .deleteOne({ _id: new ObjectId(id) });
  return deleteImage;
}

module.exports = {
  findAllImages,
  addImage,
  deleteImage,
};
