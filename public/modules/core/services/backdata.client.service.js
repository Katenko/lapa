'use strict';

angular.module('core').factory('Backdata', [
	function() {
		var _this = this;

		_this._data = {
			categories: window.categories,
			dashboards: window.dashboards
		};

		return _this._data;
	}
]);
