const express = require("express");
const BookModel = require("../models/book");
const router = express.Router();
const multer = require('multer');
const upload = multer({});

router.get("/", async (req, res, next) => {

    const filter = {};

    let categories = [];
    const categoryParam = req.query.category;

    if (categoryParam) {
        categories = categoryParam.split(",");
        filter.category = { $elemMatch: { $in: categories } };
    }

    console.log(JSON.stringify(filter));

    const books = await BookModel.find(filter);
    res.status(201).json(books);
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
    } catch (err) {
        console.error(JSON.stringify(err));
        res.status(500).send(err.message || "Ooops, error");
    }
});

module.exports = router;