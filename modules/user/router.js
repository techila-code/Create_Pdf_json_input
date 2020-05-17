/* global _ */
var router = _.ROUTER();
router.use(_.BODY_JSON());
//require controller file for further use
var item = require("./controller");

router.use(function (req, res, next) {
	return next();
});
//call question_asked method 
//this api generate pdf from user input.
router.post("/questions", item.questions_asked);
	
module.exports = router;





