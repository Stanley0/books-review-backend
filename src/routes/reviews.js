const express = require("express");
const ReviewModel = require("../models/review");
const router = express.Router();
const { ObjectId } = require("bson");
const checkAuth = require("../middleware/check-auth");


router.post("/:bookId", checkAuth, async (req, res, next) => {
    
    const review = new ReviewModel({
        content: req.body.content,
        rate: req.body.rate,
        bookId: new ObjectId(req.params.bookId),
        userNickname: req.locals.userData.nickname,
        userId: new ObjectId(req.locals.userData.userId),
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
