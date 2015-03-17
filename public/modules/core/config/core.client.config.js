'use strict';

// Configuring the Articles module
angular.module('articles').run([
	function() {
		Highcharts.setOptions({
			lang: {
				resetZoom: 'Сбросить',
				resetZoomTitle: 'Вернуться к масштабу 1:1'
			}
		});
	}
]);
