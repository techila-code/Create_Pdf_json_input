var fs = require("fs");

var PDFDocument = require('pdfkit');
var request = {};

request.questions_asked = function(req, res, next){
var doc = new PDFDocument()
var filename = encodeURIComponent("question") + '.pdf'
// Setting response to 'attachment' (download).
// dynamically open the pdf file
res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
res.setHeader('Content-type', 'application/pdf')
var content = req.body.question;
doc.y = 300
doc.text(content, 50, 50)
doc.pipe(res)
doc.end()
};


module.exports = request;