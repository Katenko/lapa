App.controller('MainController', ['$scope', '$rootScope', '$state', '$stateParams', 'DiagramService', 'charts', function ($scope, $rootScope, $state, $stateParams, DiagramService, charts) {
    setTimeout(function () {
        $.fn.Data.checkbox();

        //BEGIN CALENDAR
        //$("#my-calendar").zabuto_calendar({
        //    language: "en"
        //});
        //END CALENDAR

        //BEGIN TO-DO-LIST
        $('.todo-list').slimScroll({
            "width": '100%',
            "height": '250px',
            "wheelStep": 30
        });
        $(".sortable").sortable();
        $(".sortable").disableSelection();
        //END TO-DO-LIST

        //BEGIN CHAT FORM
        $('.chat-scroller').slimScroll({
            "width": '100%',
            "height": '270px',
            "wheelStep": 30,
            "scrollTo": "100px"
        });

        $('.chat-form input#input-chat').on("keypress", function (e) {
            var $obj = $(this);
            var $me = $obj.parents('.portlet-body').find('ul.chats');

            if (e.which == 13) {
                var content = $obj.val();

                if (content !== "") {
                    $me.addClass(content);
                    var d = new Date();
                    var h = d.getHours();
                    var m = d.getMinutes();
                    if (m < 10) m = "0" + m;
                    $obj.val(""); // CLEAR TEXT ON TEXTAREA

                    var element = "";
                    element += "<li class='in'>";
                    element += "<img class='avatar' src='https://s3.amazonaws.com/uifaces/faces/twitter/kolage/48.jpg'>";
                    element += "<div class='message'>";
                    element += "<span class='chat-arrow'></span>";
                    element += "<a class='chat-name' href='#'>Admin &nbsp;</a>";
                    element += "<span class='chat-datetime'>at July 6, 2014" + h + ":" + m + "</span>";
                    element += "<span class='chat-body'>" + content + "</span>";
                    element += "</div>";
                    element += "</li>";

                    $me.append(element);
                    var height = 0;
                    $me.find('li').each(function (i, value) {
                        height += parseInt($(this).height());
                    });

                    height += '';
                    //alert(height);
                    $('.chat-scroller').slimScroll({
                        scrollTo: height,
                        "wheelStep": 30
                    });
                }
            }
        });
        $('.chat-form span#btn-chat').on("click", function (e) {
            e.preventDefault();
            var $obj = $(this).parents('.chat-form').find('input#input-chat');
            var $me = $obj.parents('.portlet-body').find('ul.chats');
            var content = $obj.val();

            if (content !== "") {
                $me.addClass(content);
                var d = new Date();
                var h = d.getHours();
                var m = d.getMinutes();
                if (m < 10) m = "0" + m;
                $obj.val(""); // CLEAR TEXT ON TEXTAREA

                var element = "";
                element += "<li class='in'>";
                element += "<img class='avatar' src='https://s3.amazonaws.com/uifaces/faces/twitter/kolage/48.jpg'>";
                element += "<div class='message'>";
                element += "<span class='chat-arrow'></span>";
                element += "<a class='chat-name' href='#'>Admin &nbsp;</a>";
                element += "<span class='chat-datetime'>at July 6, 2014" + h + ":" + m + "</span>";
                element += "<span class='chat-body'>" + content + "</span>";
                element += "</div>";
                element += "</li>";

                $me.append(element);
                var height = 0;
                $me.find('li').each(function (i, value) {
                    height += parseInt($(this).height());
                });
                height += '';

                $('.chat-scroller').slimScroll({
                    scrollTo: height,
                    "wheelStep": 30
                });
            }

        });
        //END CHAT FORM

        //BEGIN COUNTER FOR SUMMARY BOX
        counterNum($(".profit h4 span:first-child"), 189, 112, 1, 30);
        counterNum($(".income h4 span:first-child"), 636, 812, 1, 50);
        counterNum($(".task h4 span:first-child"), 103, 155, 1, 100);
        counterNum($(".visit h4 span:first-child"), 310, 376, 1, 500);
        function counterNum(obj, start, end, step, duration) {
            $(obj).html(start);
            setInterval(function () {
                var val = Number($(obj).html());
                if (val < end) {
                    $(obj).html(val + step);
                } else {
                    clearInterval();
                }
            }, duration);
        }

        //END COUNTER FOR SUMMARY BOX
        // MESSAGE ON TOP
        $('#message_trigger_ok').on('click', function (e) {
            e.preventDefault();
            $.scojs_message('This is an info message', $.scojs_message.TYPE_OK);
        });
        // NOTIFIC8
        // Get random message from array
        //var msg_list = ['<p class="fa fa-magic" style="font-size: 35px; float:left;margin-top: 10px;margin-right: 10px;"></p> Use theme setting <i class="fa fa-cog"></i> to create best theme for you',
        //    '<p class="fa fa-magic" style="font-size: 35px; float:left;margin-top: 10px;margin-right: 10px;"></p> When you choose your best theme, we will remember it in all pages for you'
        //];
        //var style_list = ['teal','amethyst','ruby','tangerine','lemon','lime'];
        //
        //var style_rand = style_list[Math.floor(Math.random() * (style_list.length))];
        //var msg_rand = msg_list[Math.floor(Math.random() * (msg_list.length))];
        //setTimeout(function(){
        //    $.notific8(msg_rand, {
        //        theme: style_rand,
        //        life: 4000
        //    });
        //}, 5000);

    }, 50);

    loadDashboard($scope, $rootScope, $stateParams, charts);
}]);

function loadDashboard($scope, $rootScope, $stateParams, charts) {
    //получить диаграммы дашборда
    var defaultWidgets = [];
    var widgetDefinitions = [];

    var dashboard_id = parseInt($stateParams.dashboardId);

    for (var chart_index in charts.items) {
        defaultWidgets.push(
            {
                name: charts.items[chart_index].name
            }
        );

        widgetDefinitions.push(
            {
                name: charts.items[chart_index].name,
                templateUrl: 'templates/parts/chart.html',
                title: charts.items[chart_index].title,
                size: {
                    width: charts.items[chart_index].width + '%',
                    height: charts.items[chart_index].height
                },
                attrs: {
                    chart_id: charts.items[chart_index].id,
                    chart_type: charts.items[chart_index].type
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
        storageId: 'lapa',
        hideWidgetSettings: true,
        stringifyStorage: true,
        hideWidgetClose: true,
        hideWidgetName: true
    };

    //инициализация
    $scope.dashboard = _.find($scope.backdata.dashboards.items, {"id": dashboard_id});
    $rootScope.dashboardName = $scope.dashboard.name;
    $scope.charts = charts;
}
