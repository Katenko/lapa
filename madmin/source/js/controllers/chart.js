App.controller('ChartController', ['$scope', '$state', '$stateParams', '$location', function ($scope, $state, $stateParams, $location) {
    var chart_id = $scope.widget.attrs.chart_id;

    var chart = _.find($scope.charts.items, {'id': chart_id});
    //chart = _.extend(chart, _.find(data.items, {'id': chart_id}));

    //установим исходные данные для проваливаемых диаграмм
    if ($stateParams.options) {
        var options = JSON.parse($stateParams.options);
        var series = _.find(chart.x, {"name": options.series});
        var x = _.find(series.data, {"name": options.x});
        if (x) chart.x = x.subx;
    } else if (!($scope.dashboard.visible)) {
        $state.go("index");
    }

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
        size: {
            height: chart.height - 25
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
                        current: chart.childDashboard,
                        parent: chart.dashboard
                    };
                    $state.go("main", {"dashboardId": chart.childDashboard, "options": JSON.stringify(options)});
                };
            }
            $scope.chartConfig.series[i].data.push(point);
            $scope.chartConfig.xAxis.categories.push(chart.x[i].data[j].name);
        }
    }

    $scope.$on('widgetResized', function (event, size) {
        if (size.height) {
            if (typeof size.height === "string") size.height = size.height.replace('px', '');
            $scope.chartConfig.size.height = size.height - 25;
        }
        if (size.width) {
            var parentWidth = $('#dashboard_' + $scope.dashboard.id).offsetParent().width();
            if (typeof size.width === "string") size.width = size.width.replace('%', '');
            var width = parentWidth * size.width / 100 - 75;
            $scope.chartConfig.size.width = width || $scope.chartConfig.size.width;
        }
        $scope.$apply();
    });
}]);
