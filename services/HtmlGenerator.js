var Handlebars = require('handlebars');
var fs = require('fs');

function HtmlGenerator(template, data) {
	return new Promise((resolve, reject) => {
		fs.readFile('emailTemplates/' + template + '.html', 'utf8', function (err, html) {
			if (err) {
				return reject(err);
			}

			var source = html
			var template = Handlebars.compile(source);
			return resolve(template(data))
		})
	})
}

module.exports = HtmlGenerator