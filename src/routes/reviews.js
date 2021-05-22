const express = require("express");
const ReviewModel = require("../models/review");
const router = express.Router();
const { ObjectId } = require("bson");


router.post("/", async (req, res, next) => {

    const review = new ReviewModel({
        content: req.body.content,
        rate: req.body.rate,
        bookId: new ObjectId("60a91dd7bd37ee4f4ca6e949"),
        userNickname: "Jan Matejko",
        userId: new ObjectId("60a402301e12ce3e649fa38b"),
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
