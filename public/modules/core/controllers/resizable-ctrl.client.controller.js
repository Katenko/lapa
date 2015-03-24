'use strict';

angular.module('core').controller('ResizableCtrl', function ($scope, $state, Diagrammservice) {
	$scope.$watch('charts', function(newValue, oldValue) {
		if (newValue!=null) {
			var chart_id = $scope.widget.attrs.chart_id;

			//получаем данные чарта и его настройки
			if (chart_id==1) {
				var promiseGetDiagramData = Diagrammservice.getJson('diagrams_data.json');
			}

			promiseGetDiagramData.then(function (data) {
				$scope.charts.items[chart_id]=_.extend($scope.charts.items[chart_id], data.data[chart_id]);

				var chart = $scope.charts.items[chart_id];
				$scope.chartConfig = {
					options: {
						chart: {
							type: chart.type,
							zoomType: chart.zoom,
							options3d: {
								enabled: true
							}
						},
						tooltip: {
							enabled: true,
							formatter: function () {
								return (chart.type == 'pie') ? '<b>' + this.series.name + '</b><br/>' + this.key + ': ' + this.y : '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + this.y;
							}
						}
					},
					title: {
						text: ''
					},
					yAxis: {
						title: {
							enabled: chart.y.enabled,
							text: chart.y.name
						}
					},
					highstocks: chart.stock,
					loading: false
				};

				$scope.chartConfig.series = [];
				for (var i in chart.x) {
					$scope.chartConfig.series[i] = {};
					$scope.chartConfig.series[i].name = chart.x[i].name;
					$scope.chartConfig.series[i].pointRange = 1;

					$scope.chartConfig.series[i].data = [];
					$scope.chartConfig.xAxis = {};
					$scope.chartConfig.xAxis.categories = [];

					$scope.chartConfig.xAxis.minRange = 1;

					if (chart.childDashboard) {
						$scope.chartConfig.drilldown = {};

						$scope.chartConfig.series[i].cursor = 'pointer';
						$scope.chartConfig.series[i].point = {};
						$scope.chartConfig.series[i].point.events = {};
						$scope.chartConfig.series[i].point.events.click = {};

						$scope.chartConfig.series[i].point.events.click = function () {
							var drilldown = $scope.chartConfig.drilldown;
							if (drilldown) {
								var options = {
									series: this.series.name,
									x: chart.type == 'pie' ? this.name : this.category,
									dashboard: chart.childDashboard,
									parent: chart.dashboard
								};
								$state.go($state.current, options, {reload: true});
							}
						};
					}

					for (var j in chart.x[i].data) {
						var point = {};
						point.name = chart.x[i].data[j].name;
						point.y = chart.x[i].data[j].data;
						point.dataLabels = {enabled: chart.dataLabels};
						$scope.chartConfig.series[i].data.push(point);
						$scope.chartConfig.xAxis.categories.push(chart.x[i].data[j].name);
					}
				}
			});
		}
	});

	$scope.$on('widgetResized', function (event, size) {
		var parentWidth = $('#'+$scope.dashboard_container_id).offsetParent().width();
		var width = parentWidth * size.width / 100 - 75;
		if (size.height) $scope.chartConfig.options.chart.height = size.height - 25;
		$scope.chartConfig.options.chart.width = width || $scope.chartConfig.options.chart.width;
		$scope.$apply();
	});
});
