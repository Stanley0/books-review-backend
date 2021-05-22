const express = require("express");
const BookModel = require("../models/book");
const router = express.Router();
const multer = require('multer');
const { ObjectId } = require("bson");
const upload = multer({});




router.get("/", async (req, res, next) => {

    const filter = {};


    let categories = [];
    const categoryParam = req.query.category;

    if (categoryParam) {
        categories = categoryParam.split(",");
        filter.category = { $elemMatch: { $in: categories } };
    }

    

    const books = await BookModel.find(filter);
    res.status(201).json(books);
});

router.get("/:id", (req, res, next) => {
    const id = new ObjectId(req.params.id)
    BookModel.findById(id).then(book => {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not Found" });
    }
  });
});

router.post("/", upload.single("image"), async (req, res, next) => {

    const book = new BookModel({
        title: req.body.title,
        description: req.body.description,
        category: JSON.parse(req.body.category),
        image: { buffer: req.file.buffer, mimetype: req.file.mimetype },
        author: req.body.author,
    });

    try {
        const result = await book.save();

        res.status(201).json(result);
        console.log(result);
    } catch (err) {
        console.error(JSON.stringify(err));
        res.status(500).send(err.message || "Ooops, error");
    }
});

module.exports = router;