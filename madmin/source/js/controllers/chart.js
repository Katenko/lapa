App.controller('ChartController', ['$scope', '$state', '$stateParams', '$location', function ($scope, $state, $stateParams, $location) {
    var chart_id = $scope.widget.attrs.chart_id;

    var chart = _.find($scope.charts.items, {'id': chart_id});
    //chart = _.extend(chart, _.find(data.items, {'id': chart_id}));

    if (chart.type == "table") {
        $scope.tableConfig = chart;
    } else {
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
                        var tooltip = (chart.type == 'pie') ? '<b>' + this.series.name + '</b><br/>' + this.key + ': ' + this.y :
                            (chart.stock) ? '<b>' + moment(this.x).format("DD.MM.YYYY") + '</b><br/>' + this.series.name + ': ' + this.y :
                            '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + this.y;
                        if (this.point.tooltip) {
                            tooltip = tooltip + '<br/>' + '<i>' + this.point.tooltip + '</i>';
                        }
                        return tooltip;
                    }
                },
                exporting: {
                    filename: "chart_" + chart.id
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
                height: chart.height - 25,
                width: getWinPx(chart.width, $scope.dashboard.id)
            },
            loading: false
        };

        $scope.chartConfig.series = [];
        for (var i in chart.x) {
            $scope.chartConfig.series[i] = {};
            $scope.chartConfig.series[i].name = chart.x[i].name;
            $scope.chartConfig.series[i].pointRange = 1;
            $scope.chartConfig.series[i].data = [];
            if (chart.type == 'pie') {
                $scope.chartConfig.series[i].showInLegend = true;
            }

            var j;
            var point;
            if (chart.stock) {
                var dateTimeLabelFormats = {
                    second: '%d.%m.%Y<br/>%H:%M:%S',
                    minute: '%d.%m.%Y<br/>%H:%M',
                    hour: '%d.%m.%Y<br/>%H:%M',
                    day: '%d.%m.%Y',
                    week: '%d.%m.%Y',
                    month: '%m.%Y',
                    year: '%Y'
                };
                $scope.chartConfig.xAxis = {};
                $scope.chartConfig.xAxis.type = "datetime";
                $scope.chartConfig.xAxis.dateTimeLabelFormats = dateTimeLabelFormats;

                var dateArray = [];
                for (j in chart.x[i].data) {
                    var pointDate = moment.utc(chart.x[i].data[j].name, "DD.MM.YYYY");
                    point = {};
                    point.x = pointDate.valueOf();
                    point.y = chart.x[i].data[j].data;
                    point.tooltip = chart.x[i].data[j].tooltip;
                    $scope.chartConfig.series[i].data.push(point);
                    dateArray.push(point.x);
                }
                $scope.chartConfig.options.rangeSelector = {
                    enabled: true,
                    buttons: [{
                        type: 'week',
                        count: 1,
                        text: '1 нед'
                    }, {
                        type: 'month',
                        count: 1,
                        text: '1 мес'
                    }, {
                        type: 'month',
                        count: 3,
                        text: '3 мес'
                    }, {
                        type: 'month',
                        count: 6,
                        text: '6 мес'
                    }, {
                        type: 'year',
                        count: 1,
                        text: '1 год'
                    }, {
                        type: 'all',
                        text: 'Все'
                    }],
                    buttonSpacing: 10,
                    inputEditDateFormat: "%d.%m.%Y",
                    inputDateFormat: "%d.%m.%Y"
                };
                $scope.chartConfig.func = function (chartObj) {
                    chartObj.xAxis[0].setExtremes(
                        new Date(Math.min.apply(null, dateArray)),
                        new Date(Math.max.apply(null, dateArray))
                    );
                };
                $scope.chartConfig.options.navigator = {
                    enabled: true,
                    series: {data: []},
                    xAxis: {
                        dateTimeLabelFormats: dateTimeLabelFormats
                    }
                };
            } else {
                $scope.chartConfig.xAxis = {};
                $scope.chartConfig.xAxis.categories = [];
                $scope.chartConfig.xAxis.minRange = 1;

                for (j in chart.x[i].data) {
                    point = {};
                    point.events = {};
                    point.name = chart.x[i].data[j].name;
                    point.y = chart.x[i].data[j].data;
                    point.dataLabels = {enabled: chart.dataLabels};
                    point.tooltip = chart.x[i].data[j].tooltip;
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
                            $state.go("main", {
                                "dashboardId": chart.childDashboard,
                                "options": JSON.stringify(options)
                            });
                        };
                    }
                    $scope.chartConfig.series[i].data.push(point);
                    $scope.chartConfig.xAxis.categories.push(chart.x[i].data[j].name);
                }
            }
        }

        $scope.$on('widgetResized', function (event, size) {
            if (size.height) {
                if (typeof size.height === "string") size.height = size.height.replace('px', '');
                $scope.chartConfig.size.height = size.height - 25;
            }
            if (size.width) {
                var width = getWinPx(size.width, $scope.dashboard.id);
                $scope.chartConfig.size.width = width || $scope.chartConfig.size.width;
            }
            $scope.$apply();
        });
    }
}]);

function getWinPx(perc, dashboard_id) {
    var parentWidth = $('#dashboard_' + dashboard_id).offsetParent().width();
    if (typeof perc === "string") perc = perc.replace('%', '');
    return parentWidth * perc / 100 - 75;
}
