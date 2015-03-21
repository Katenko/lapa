App.controller('ChartController', ['$scope', '$state', 'DiagramService', function ($scope, $state, DiagramService) {
    $scope.$watch('charts', function (newValue, oldValue) {
        if (newValue != null) {
            var chart_id = $scope.widget.attrs.chart_id;

            var chart = _.find($scope.charts.items, {'id': chart_id});
            //chart = _.extend(chart, _.find(data.items, {'id': chart_id}));

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

                for (var j in chart.x[i].data) {
                    var point = {};
                    point.events = {};
                    point.name = chart.x[i].data[j].name;
                    point.y = chart.x[i].data[j].data;
                    point.dataLabels = {enabled: chart.dataLabels};
                    if (chart.x[i].data[j].drilldown) {
                        point.drilldown = point.name;
                        point.cursor = 'pointer';
                        point.events.click = function () {
                            var options = {
                                series: this.series.name,
                                x: chart.type == 'pie' ? this.name : this.category,
                                dashboard: chart.childDashboard,
                                parent: chart.dashboard
                            };
                            $state.go("main", {"dashboardId": options.dashboard}, options);
                        };
                    }
                    $scope.chartConfig.series[i].data.push(point);
                    $scope.chartConfig.xAxis.categories.push(chart.x[i].data[j].name);
                }
            }
        }
    });

    var onClickDrillDown = function (chart) {
        if (this) {
            var options = {
                series: this.series.name,
                x: chart.type == 'pie' ? this.name : this.category,
                dashboard: chart.childDashboard,
                parent: chart.dashboard
            };
            $state.go($state.current, options, {reload: true});
        }
    };

    $scope.$on('widgetResized', function (event, size) {
        var parentWidth = $('#' + $scope.dashboard_container_id).offsetParent().width();
        var width = parentWidth * size.width / 100 - 75;
        if (size.height) $scope.chartConfig.options.chart.height = size.height - 25;
        $scope.chartConfig.options.chart.width = width || $scope.chartConfig.options.chart.width;
        $scope.$apply();
    });
}]);
