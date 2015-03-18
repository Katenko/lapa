'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.getBackdata = function(req, res, next) {
	res.locals.categories = JSON.parse(fs.readFileSync('app/resources/categories.json', 'utf8'));
	res.locals.dashboards = JSON.parse(fs.readFileSync('app/resources/dashboards.json', 'utf8'));
	next();
};
