var express = require("express");
var router = express.Router();

function secure (req, res, next) {
    console.log("is Logged in???");
    if (!req.session.logged_in) {
        console.log("NA!!!!");
        return res.send(403);
    }
    console.log("YEP!!!!");
    next();
}

router.get("/login/:token", function (req, res) {
    console.log("token:" + req.params.token);
    if ("toki" === req.params.token) {
        console.log("Login Success");
        req.session.logged_in = true;
        res.send("Login Success");
        return;
    }

    console.log("Login Error");
    res.end("Login Error");
});

router.get("/finance", secure, function (req, res) {
    // secure!
    res.send("100 SHEKEL");
});

router.get("*", function (req, res) {
    res.send("Hello Express");
});

module.exports = router;