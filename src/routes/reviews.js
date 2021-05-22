const express = require("express");
const ReviewModel = require("../models/review");
const router = express.Router();






router.post("/", async (req, res, next) => {

    const review = new ReviewModel({
        content: req.body.content,
        rate: req.body.rate,
        
    });
    try {
        const result = await review.save();

        res.status(201).json(result);
        console.log(result);
    } catch (err) {
        console.error(JSON.stringify(err));
        res.status(500).send(err.message || "Ooops, error");
    }
});

module.exports = router;
