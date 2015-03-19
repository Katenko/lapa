App.directive('highchartContainer', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'templates/directives/chart-container.html',
		// Связующая функция добавит поведение к шаблону
		link: function(scope, element, attrs) {
			// Элемент заголовка
		}
	};
});
