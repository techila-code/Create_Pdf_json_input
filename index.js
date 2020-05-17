var express = require("express");
var app = express();
var PATH = require("path");

//application listen to this port
var port = 8580;
global._ = {
	ROUTER: function () {
		return express.Router();
	},
	CWD: process.cwd(),
	BODY_PARSER: require("body-parser"),
	PATH: require("path"),
	FS: require("fs"),
	BODY_JSON: function() {
		return this.BODY_PARSER.json();
	},
	BODY_EXT: function() {
		return this.BODY_PARSER.urlencoded({ extended: true });
	}
};
//Start Listening
app.listen(port, function () {
    console.log("Application Listening on " + port);
});
var routes = [];
app.use("/", require("./modules/user/router"));
app._router.stack.forEach(function (middleware) {
    if (middleware.route) { // Routes registered directly on the app
        routes.push({
            path: middleware.route.path,
            method: Object.keys(middleware.route.methods).join(", ")
        });
    } else if (middleware.name === "router") { // Router middleware 
        middleware.handle.stack.forEach(function (handler) {
            var route = handler.route;
            route && routes.push({
                path: route.path,
                method: Object.keys(route.methods).join(", ")
            });
        });
    }
});
// Use Body Parser
app.use(_.BODY_EXT());
// Attach Module Routers to the Main Express App
var dirModules = _.PATH.join(_.CWD, "modules");
var moduleList = _.FS.readdirSync(dirModules);
// Load Custom Module Routers
moduleList.forEach(function (moduleName) {
    var moduleRouter = _.PATH.join(dirModules, moduleName, "router.js");
    try {
        _.FS.accessSync(moduleRouter, _.FS.constants.R_OK);
    } catch (err) {
        if (err.code != "ENOENT") {
            throw err;
        } else {
            return;
        }
    }
    app.use("/" + moduleName, require(moduleRouter));
});
module.exports = app;