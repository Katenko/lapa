'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$window', '$state', '$stateParams', '$http', 'Diagrammservice',
	function($scope, Authentication, $window, $state, $stateParams, $http, Diagrammservice) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		//получить дерево категорий
		var categories = {
			items: {
				'1': {name: 'Россия', parent: null},
				'2': {name: 'Хабаровский край', parent: '1'}
			}
		};

		//получить дашборды для категории
		var dashboards = {
			items: {
				'1': {name: 'Диаграммы', category: '2', visible: true},
				'2': {name: 'Уровень безработицы', category: '2', visible: false},
				'3': {name: 'Что-то еще', category: '2', visible: false},
				'4': {name: 'Что-то еще', category: '2', visible: false},
				'5': {name: 'Что-то еще', category: '2', visible: false}
			}
		};

		var dashboard = dashboards.items['1'];

		//получить диаграммы дашборда
		if ($stateParams.dashboardOptions == null) {
			var charts = {items: {}};
			if ($stateParams.dashboard == null) {
				var promiseGetDiagramMeta = Diagrammservice.getJson('diagrams.json');
			} else {
				if ($stateParams.dashboard == 2) {

				}
				if ($stateParams.dashboard == 3) {

				}
			}

			promiseGetDiagramMeta.then(function (data) {
				charts.items = data.data;

				var defaultWidgets = [];
				var widgetDefinitions = [];

				for (var chart_id in charts.items) {
					defaultWidgets.push(
						{
							name: charts.items[chart_id].name
						}
					);

					widgetDefinitions.push(
						{
							name: charts.items[chart_id].name,
							templateUrl: 'modules/core/views/templates/resizable.html',
							title: charts.items[chart_id].title,
							attrs: {
								chart_id: chart_id
							}
						}
					);
				}

				$scope.dashboardOptions = {
					widgetButtons: true,
					hideToolbar: true,
					widgetDefinitions: widgetDefinitions,
					defaultWidgets: defaultWidgets,
					storage: $scope.store,
					storageId: 'a',
					hideWidgetSettings: true,
					stringifyStorage: true,
					hideWidgetClose: true,
					hideWidgetName: true
				};

				$state.go($state.current, {dashboardOptions: $scope.dashboardOptions, charts: charts, dashboard_id: dashboard.id}, {reload: true});
			});

			$scope.dashboardOptions = {
				widgetButtons: true,
				hideToolbar: true,
				widgetDefinitions: [],
				defaultWidgets: [],
				storage: $scope.store,
				storageId: 'a',
				hideWidgetSettings: true,
				stringifyStorage: true,
				hideWidgetClose: true,
				hideWidgetName: true
			};
		} else {
			$scope.charts = $stateParams.charts;
			$scope.dashboardOptions = $stateParams.dashboardOptions;
			$scope.dashboard_container_id = 'dashboard_container_' + $stateParams.dashboard_id;
		}
	}
]);
