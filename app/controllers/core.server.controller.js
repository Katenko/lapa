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

exports.getCategories = function(req, res, next) {
	res.locals.categories = JSON.parse(fs.readFileSync('app/resources/categories.json', 'utf8'));
	next();
};

exports.getDashboards = function(req, res, next) {
	res.locals.dashboards = JSON.parse(fs.readFileSync('app/resources/dashboards.json', 'utf8'));
	next();
};

exports.retreiveData = function(req, res) {
	if (req.route.path=="/getCategories") res.json(res.locals.categories);
		else if (req.route.path=="/getDashboards") res.json(res.locals.dashboards);
			else res.status(500).json({error: 'Internal Server Error'});
};

exports.retreiveJson = function(req, res) {
	var backdata = {};
	backdata.categories = res.locals.categories;
	backdata.dashboards = res.locals.dashboards;
	res.json(backdata);
};
