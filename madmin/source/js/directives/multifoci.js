App.directive('multifoci', ['$window', '$state', '$stateParams', '$timeout', '$interpolate', function ($window, $state, $stateParams, $timeout, $interpolate) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            config: '@'
        },
        templateUrl: "templates/directives/multifoci.html",
        link: function ($scope, $element, $attrs) {
            $timeout(function () {
                function tick(e) {
                    circle
                        .each(gravity(0.2 * e.alpha))
                        .each(collide(0.5))
                        .attr("cx", function (d) {
                            return d.x;
                        })
                        .attr("cy", function (d) {
                            return d.y;
                        });
                    text
                        .each(gravity(0.2 * e.alpha))
                        .each(collide(0.5))
                        .attr("x", function (d) {
                            return d.x-3;
                        })
                        .attr("y", function (d) {
                            return d.y+4;
                        });
                }

                // Move nodes toward cluster focus.
                function gravity(alpha) {
                    return function (d) {
                        d.y += (d.cy - d.y) * alpha;
                        d.x += (d.cx - d.x) * alpha;
                    };
                }

                // Resolve collisions between nodes.
                function collide(alpha) {
                    var quadtree = d3.geom.quadtree(nodes);
                    return function (d) {
                        var r = d.radius + maxRadius + padding,
                            nx1 = d.x - r,
                            nx2 = d.x + r,
                            ny1 = d.y - r,
                            ny2 = d.y + r;
                        quadtree.visit(function (quad, x1, y1, x2, y2) {
                            if (quad.point && (quad.point !== d)) {
                                var x = d.x - quad.point.x,
                                    y = d.y - quad.point.y,
                                    l = Math.sqrt(x * x + y * y),
                                    r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
                                if (l < r) {
                                    l = (l - r) / l * alpha;
                                    d.x -= x *= l;
                                    d.y -= y *= l;
                                    quad.point.x += x;
                                    quad.point.y += y;
                                }
                            }
                            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                        });
                    };
                }

                $scope.getx = function (index) {
                    return x1(index) - x1(0) / 2;
                };

                $scope.gety = function (index) {
                    return (index % 2 === 0) ? 25 : 50;
                };

                if ($scope.config) {
                    var config = angular.fromJson($scope.config);

                    var m = config.x.length; //number of distinct clusters
                    var width = getWinPx(config.width, 1),
                        height = config.height - 75,
                        padding = 10,
                        maxRadius = getWinPx(config.width, 1) / (4 * m); //todo виртуальный коэф-т

                    var color = d3.scale.category10()
                        .domain(d3.range(m));

                    var x1 = d3.scale.ordinal()
                        .domain(d3.range(m))
                        .rangePoints([0, width], 1);

                    $scope.colors = {};
                    $scope.names = {};
                    for (var i = 0; i < config.x.length; i++) {
                        $scope.colors[i] = color(i);
                        $scope.names[i] = config.x[i].name;
                    }
                    $scope.legendwidth = getWinPx(config.width, 1);

                    var nodes = [];
                    angular.forEach(config.x, function (value_x, key_x) {
                        angular.forEach(value_x.data, function (value_data, key_data) {
                            nodes.push({
                                radius: value_data.data * maxRadius / 100,
                                color: color(key_x),
                                cx: x1(key_x),
                                cy: height / 2,
                                name: value_data.name
                            });
                        });
                    });

                    var force = d3.layout.force()
                        .nodes(nodes)
                        .size([width, height])
                        .gravity(0)
                        .charge(0)
                        .on("tick", tick)
                        .start();

                    var svg = d3.select("#multifoci_" + config.id).append("svg")
                        .attr("width", width)
                        .attr("height", height);

                    var node = svg.selectAll(".node")
                        .data(nodes)
                        .enter().append("g")
                        .attr("class", "node")
                        .call(force.drag);

                    var circle = svg.selectAll("circle")
                        .data(nodes)
                        .enter()
                        .append("circle")
                        .attr("r", function (d) {
                            return d.radius;
                        })
                        .style("fill", function (d) {
                            return d.color;
                        })
                        .call(force.drag);

                    var text = svg.selectAll("text")
                        .data(nodes)
                        .enter()
                        .append("text")
                        .attr("x", function (d) {
                            return d.cx;
                        })
                        .attr("y", function (d) {
                            return d.cy;
                        })
                        .text(function (d) {
                            return d.name;
                        })
                        .style("font-size", "10px")
                        .style("font-weight", "bold")
                        .call(force.drag);
                }
            });
        }
    };
}]);
