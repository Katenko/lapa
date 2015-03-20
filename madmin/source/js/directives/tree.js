App.directive('tree', function(){
	return {
		restrict: 'EA',
		replace: true,
        link: {
            post: function preLink(scope, element, attrs, controller) {
                scope.$watch('tree', function(tree, old) {
                    if (tree) {
                        var html = [];
                        html.push("<li><a href=\"javascript:void(0);\"><i class=\"fa fa-sitemap fa-fw\"><div class=\"icon-bg bg-dark\"></div></i><span class=\"menu-title\">Категории</span></a>");
                        var previousLevel = 0;
                        var previousDashboards = [];
                        _.forEach(tree, function(category) {
                            //отобразим категорию, потом дочерние категории, потом дочерние дашборды, потом параллельные категории
                            if (category.level>previousLevel) {
                                html[html.length-1] = html[html.length-1].replace('</span></a>', '</span><span class="fa arrow"></span></a>');

                                //отображаем дашборды предыдущего левела
                                addDashboards(previousDashboards, previousLevel, html);

                                //создадим новый левел
                                html.push("<ul class=\"nav "+getUlClass(category.level)+"\">");
                            } else if (category.level<previousLevel) {
                                //закроем левел
                                var endLevelString = "</ul></li>".repeat(previousLevel-category.level);
                                html.push(endLevelString);
                            } else {
                                //ничего не делаем...
                            }

                            html.push("<li><a href=\"javascript:void(0);\"><i class=\"fa "+getLiClass(category.level)+"\"></i><span class=\"submenu-title\">"+category.name+"</span></a>");
                            if (category.hasChilds === 0) {
                                html.push("</li>");
                            }

                            previousDashboards = _.clone(category.dashboards);
                            previousLevel = category.level;
                        });

                        addDashboards(previousDashboards, previousLevel, html);
                        html.push("</li>");

                        element.replaceWith(html.join(''));
                        scope.categoriesRendered = true;
                    }
                }, true);
            }

        }
	};
});

function addDashboards(previousDashboards, previousLevel, html) {
    if (previousDashboards.length > 0) {
        html.push("<ul class=\"nav " + getUlClass(previousLevel) + "\">");
        _.forEach(previousDashboards, function (dashboard) {
            html.push("<li><a style=\"padding-left:50px\" ui-sref=\"main({dashboardId:"+dashboard.id+"})\"><i class=\"fa fa-bar-chart-o\"></i><span class=\"dashboard-item submenu-title\">" + dashboard.name + "</span></a></li>");
        });
        html.push("</ul>");
    }
}

function getUlClass(level) {
    return (level==1?"nav-second-level":level==2?"nav-third-level":level==3?"nav-fourth-level":level==4?"nav-fifth-level":"");
}

function getLiClass(level) {
    return (level==1?"fa-angle-right":level==2?"fa-angle-double-right":level==3?"fa-angle-triple-right":level==4?"fa-angle-four-right":"");
}
