var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var methodOverride = require("method-override");
var morgan = require("morgan");
var errorhandler = require("errorhandler");
var responseTime = require("response-time");

var routes = require("./routes");

var app = express();

if ("development" === app.get("env")) {
    // Gets called in the absence of NODE_ENV too!
    app.use(function (req, res, next) {
        // you always log
        console.error(" %s %s ", req.method, req.url);
        next();
    });
    app.use(morgan({ format: "dev", immediate: true }));
    app.use(errorhandler({ dumpExceptions: true, showStack: true }));
}
else if ("production" === app.get("env")) {
    app.use(errorhandler());
}

// all environments
app.set("port", process.env.PORT || 8000);
app.set("ip", process.env.IP || "0.0.0.0");
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser("my secret string"));
app.use(session({
    secret: "my secret string",
    name: "sec",
    maxAge: 3600000
}));
// Add the responseTime middleware
app.use(responseTime());

app.use("/", routes);

var server = http.createServer(app).listen(app.get("port"), function(){
 console.log("Express Server listening on port", server.address().port);
});