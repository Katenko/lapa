'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.getCategories, core.getDashboards, core.index);
	app.route('/getBackdata').get(core.getCategories, core.getDashboards, core.retreiveJson);
	app.route('/getCategories').get(core.getCategories, core.retreiveData);
	app.route('/getDashboards').get(core.getDashboards, core.retreiveData);
};
