App.directive('hightable', ['$window', '$state', '$stateParams', '$timeout', function ($window, $state, $stateParams, $timeout) {
    return {
        restrict: 'E',
        scope: {
            config: "="
        },
        replace: true,
        templateUrl: "templates/directives/table.html",
        link: function (scope) {
            $timeout(function () {
                var spinner = $(".spinner").spinner();
                var table = $('#table_id').dataTable({
                    "language": {
                        "processing": "Подождите...",
                        "search": "Поиск:",
                        "lengthMenu": "Показать _MENU_ записей",
                        "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
                        "infoEmpty": "Записи с 0 до 0 из 0 записей",
                        "infoFiltered": "(отфильтровано из _MAX_ записей)",
                        "infoPostFix": "",
                        "loadingRecords": "Загрузка записей...",
                        "zeroRecords": "Записи отсутствуют.",
                        "emptyTable": "В таблице отсутствуют данные",
                        "paginate": {
                            "first": "Первая",
                            "previous": "Предыдущая",
                            "next": "Следующая",
                            "last": "Последняя"
                        },
                        "aria": {
                            "sortAscending": ": активировать для сортировки столбца по возрастанию",
                            "sortDescending": ": активировать для сортировки столбца по убыванию"
                        }
                    },
                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Все"]]
                });
            });
            $(".DTTT_container").css("float", "right");
        }
    };
}]);
