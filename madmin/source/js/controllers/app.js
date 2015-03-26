App.controller('AppController', ['$scope', '$rootScope', '$state', 'BackdataFactory', function ($scope, $rootScope, $state, BackdataFactory) {
    $scope.isChildDashboard = false;
    $scope._from = "";
    $scope._fromParams = {};

    $scope.goToPrevious = function() {
        $state.go($scope._from, $scope._fromParams);
    };

    $rootScope.style = 'style1';
    $rootScope.theme = 'pink-blue';
    $scope.data = {};
    $scope.effect = '';
    $scope.header = {
        form: false,
        chat: false,
        theme: false,
        footer: true,
        history: false,
        animation: '',
        boxed: '',
        layout_menu: '',
        theme_style: 'style1',
        header_topbar: 'static',
        menu_style: 'sidebar-default',
        menu_collapse: '',
        layout_horizontal_menu: '',

        toggle: function (k) {
            switch (k) {
                case 'chat':
                    $scope.header.chat = !$scope.header.chat;
                    break;
                case 'form':
                    $scope.header.form = !$scope.header.form;
                    break;
                case 'sitebar':
                    $scope.header.menu_style = $scope.header.menu_style ? '' : (($scope.header.layout_menu === '') ? 'sidebar-collapsed' : 'right-side-collapsed');
                    break;
                case 'theme':
                    $scope.header.theme = !$scope.header.theme;
                    break;
                case 'history':
                    $scope.header.history = !$scope.header.history;
                    $scope.header.menu_style = $scope.header.history ? 'sidebar-collapsed' : 'sidebar-default';
                    break;
            }
        },

        collapse: function (c) {
            if (c === 'change') {
                $scope.header.menu_collapse = '';
            } else {
                if ($scope.header.menu_style) {
                    $scope.header.menu_style = '';
                    $scope.header.menu_collapse = $scope.header.menu_collapse ? '' : 'sidebar-collapsed';
                } else {
                    $scope.header.menu_collapse = $scope.header.menu_collapse ? '' : 'sidebar-collapsed';
                }
            }

        }
    };

    BackdataFactory.loadBackdata().then(function (backdata) {
        $scope.backdata = backdata;
    });
    $scope.$watch('backdata', function (newValue, oldValue) {
        if (newValue) {
            //$scope.backdata = backdata; // в том числе там дерево категорий и диаграмм
            var dashboard = newValue.dashboards.items[0];

            var list = []; //результат дерева категрий для формы
            var level = "1";
            var superParent = _.find(newValue.categories.items, {'parent': null});
            var element = _.assign(superParent, {type: 'category'});
            list.push(element);
            buildCategoriesTree(list, newValue.categories.items, superParent, level);

            _.forEach(list, function (category, categoryIndex) {
                category.dashboards = [];
                var childs = _.where(newValue.dashboards.items, {'category': category.id, 'visible': true});
                childs = _.sortBy(childs, 'name');
                _.forEach(childs, function (dashboard) {
                    var element = _.assign(dashboard, {type: 'dashboard'});
                    category.dashboards.push(element);
                });
            });

            $scope.tree = list;
        }
    });

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.isChildDashboard = !!toParams.options;
        $scope._from = fromState.name || 'index';
        $scope._fromParams = fromParams;
        $rootScope.dashboardName = '';
        $scope.header.animation = 'fadeInUp';
        setTimeout(function () {
            $scope.header.animation = '';
        }, 100);

        $('.sidebar-collapse').removeClass('in').addClass('collapse');

        $scope.data = $.fn.Data.get(toState.url);
        if (-1 == $.inArray(toState.url, ['/extra-500', '/extra-404', '/extra-lock-screen', '/extra-signup', '/extra-signin'])) {
            $('body').removeClass('bounceInLeft');
            $("body>.default-page").show();
            $("body>.extra-page").hide();
        }
        else {
            window.scrollTo(0, 0);
        }

        $scope.header.boxed = '';
        $scope.header.footer = true;

        $rootScope.style = 'style1';
        $rootScope.theme = 'pink-blue';

        if ('/layout-left-sidebar' === toState.url) {
            $scope.header.layout_menu = '';
            $scope.header.header_topbar = '';
            $scope.header.layout_horizontal_menu = '';
        }
        else if ('/layout-left-sidebar-collapsed' === toState.url) {
            $scope.header.layout_menu = '';
            $scope.header.header_topbar = 'sidebar-collapsed';
            $scope.header.layout_horizontal_menu = '';
        }
        else if ('/layout-right-sidebar' === toState.url) {
            $scope.header.layout_menu = 'right-sidebar';
            $scope.header.header_topbar = '';
            $scope.header.layout_horizontal_menu = '';
        }
        else if ('/layout-right-sidebar-collapsed' === toState.url) {
            $scope.header.layout_menu = 'right-sidebar';
            $scope.header.header_topbar = 'right-side-collapsed';
            $scope.header.layout_horizontal_menu = '';
        }
        else if ('/layout-horizontal-menu' === toState.url) {
            $scope.header.layout_menu = '';
            $scope.header.header_topbar = 'horizontal-menu-page';
            $scope.header.layout_horizontal_menu = 'horizontal-menu hidden-sm hidden-xs';
        }
        else if ('/layout-horizontal-menu-sidebar' === toState.url) {
            $scope.header.layout_horizontal_menu = 'horizontal-menu hidden-sm hidden-xs';
        }
        else if ('/layout-fixed-topbar' === toState.url) {
            $scope.header.layout_menu = '';
            $scope.header.header_topbar = 'fixed-topbar';
            $scope.header.layout_horizontal_menu = '';
        }
        else if ('/layout-boxed' === toState.url) {
            $scope.header.boxed = 'container';
        }
        else if ('/layout-hidden-footer' == toState.url) {
            $scope.header.footer = false;
        }
        else if ($.inArray(toState.url, ['/extra-500', '/extra-404']) >= 0) {
            $rootScope.style = 'style1';
            $rootScope.theme = 'pink-violet';
        }
    });

    $scope.style_change = function () {
        $rootScope.style = $scope.header.theme_style;
    };

    $scope.theme_change = function (t) {
        $rootScope.theme = t;
    };

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.quick-sidebar').css('top', '0');
        } else {
            $('.quick-sidebar').css('top', '50px');
        }
    });
    $('.quick-sidebar > .header-quick-sidebar').slimScroll({
        "height": $(window).height() - 50,
        'width': '280px',
        "wheelStep": 30
    });
    $('#news-ticker-close').click(function (e) {
        $('.news-ticker').remove();
    });
}]);

function buildCategoriesTree(list, categories, current, level) {
    var childs = _.where(categories, {'parent': current.id});
    childs = _.sortBy(childs, 'name');
    if (childs.length > 0) {
        level++;
        _.forEach(childs, function (value) {
            var element = _.assign(value, {type: 'category'});
            list.push(element);
            buildCategoriesTree(list, categories, element, level);
        });
        level--;
    }
    current.hasChilds = childs.length;
    current.level = level;
}

