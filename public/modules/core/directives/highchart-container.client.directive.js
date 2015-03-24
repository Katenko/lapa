'use strict';

angular.module('core').directive('highchartContainer', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'modules/core/views/templates/chart-container.html',
		// Связующая функция добавит поведение к шаблону
		link: function(scope, element, attrs) {
			// Элемент заголовка
		}
	}
});
