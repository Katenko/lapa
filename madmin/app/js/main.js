"use strict";
var App = angular.module('MAdmin', ['ngRoute', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'highcharts-ng', 'ui.sortable', 'ui.dashboard', 'ui.bootstrap']);

App.run([
    function () {
        Highcharts.setOptions({
            lang: {
                resetZoom: 'Сбросить',
                resetZoomTitle: 'Вернуться к масштабу 1:1',
                rangeSelectorZoom: 'Масштаб',
                rangeSelectorFrom: "c",
                rangeSelectorTo: "по",
                printChart: "Распечатать",
                downloadJPEG: "Сохранить в формате JPEG",
                downloadPDF: "Сохранить в формате PDF",
                downloadPNG: "Сохранить в формате PNG",
                downloadSVG: "Сохранить в формате SVG"
            }
        });
    }
]);

App.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('index', {
            url: "/",
            templateUrl: 'templates/pages/page-start.html',
            controller: 'StartController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            'vendors/jquery-tablesorter/jquery.tablesorter.min.js',
                            'vendors/calendar/zabuto_calendar.min.js',
                            'vendors/flot-chart/jquery.flot.categories.js',
                            'vendors/flot-chart/jquery.flot.pie.js',
                            'vendors/flot-chart/jquery.flot.tooltip.js',
                            'vendors/flot-chart/jquery.flot.resize.js',
                            'vendors/flot-chart/jquery.flot.fillbetween.js',
                            'vendors/flot-chart/jquery.flot.stack.js',
                            'vendors/flot-chart/jquery.flot.spline.js',
                            'vendors/lightbox/css/lightbox.css',
                            'vendors/mixitup/src/jquery.mixitup.js',
                            'vendors/lightbox/js/lightbox.min.js'
                        ]
                    });
                }]
            }
        })
        .state('main', {
            url: "/main/:dashboardId?options",
            templateUrl: 'templates/pages/main.html',
            controller: 'MainController',
            resolve: {
                charts: function (DiagramService, $stateParams) {
                    //получим данные диаграмм для дашборда
                    return DiagramService.getJson('diagrams' + $stateParams.dashboardId + '.json');
                }
            },
            params: {
                charts: null,
                dashboardId: null,
                options: null
            }
        })
        .state('layout-left-sidebar', {
            url: "/layout-left-sidebar",
            templateUrl: 'templates/states/layout-left-sidebar.html'
        })
        .state('layout-left-sidebar-collapsed', {
            url: "/layout-left-sidebar-collapsed",
            templateUrl: 'templates/states/layout-left-sidebar-collapsed.html'
        })
        .state('layout-right-sidebar', {
            url: "/layout-right-sidebar",
            templateUrl: 'templates/states/layout-right-sidebar.html'
        })
        .state('layout-right-sidebar-collapsed', {
            url: "/layout-right-sidebar-collapsed",
            templateUrl: 'templates/states/layout-right-sidebar-collapsed.html'
        })
        .state('layout-horizontal-menu', {
            url: "/layout-horizontal-menu",
            templateUrl: 'templates/states/layout-horizontal-menu.html'
        })
        .state('layout-horizontal-menu-sidebar', {
            url: "/layout-horizontal-menu-sidebar",
            templateUrl: 'templates/states/layout-horizontal-menu-sidebar.html'
        })
        .state('layout-fixed-topbar', {
            url: "/layout-fixed-topbar",
            templateUrl: 'templates/states/layout-fixed-topbar.html'
        })
        .state('layout-boxed', {
            url: "/layout-boxed",
            templateUrl: 'templates/states/layout-boxed.html'
        })
        .state('layout-hidden-footer', {
            url: "/layout-hidden-footer",
            templateUrl: 'templates/states/layout-hidden-footer.html'
        })
        .state('layout-header-topbar', {
            url: "/layout-header-topbar",
            templateUrl: 'templates/states/layout-header-topbar.html',
            controller: 'LayoutHeaderTopbarController'
        })
        .state('layout-title-breadcrumb', {
            url: "/layout-title-breadcrumb",
            templateUrl: 'templates/states/layout-title-breadcrumb.html',
            controller: 'LayoutTitleBreadcrumbController'
        })
        // start ui-element
        .state('ui-generals', {
            url: "/ui-generals",
            templateUrl: 'templates/states/ui-generals.html',
            controller: 'UiGeneralsController'
        })
        .state('ui-buttons', {
            url: "/ui-buttons",
            templateUrl: 'templates/states/ui-buttons.html'
        })
        .state('ui-tabs', {
            url: "/ui-tabs",
            templateUrl: 'templates/states/ui-tabs.html',
            controller: 'UiTabsController'
        })
        .state('ui-panels', {
            url: "/ui-panels",
            templateUrl: 'templates/states/ui-panels.html'
        })
        .state('ui-progressbars', {
            url: "/ui-progressbars",
            templateUrl: 'templates/states/ui-progressbars.html',
            controller: 'UiProgressbarsController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.1.1.min.css',
                            'vendors/bootstrap-progressbar/bootstrap-progressbar.min.js']
                    });
                }]
            }
        })
        .state('ui-editors', {
            url: "/ui-editors",
            templateUrl: 'templates/states/ui-editors.html',
            controller: 'UiEditorsController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/bootstrap-markdown/css/bootstrap-markdown.min.css',
                            'vendors/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css',
                            'vendors/summernote/summernote.css',
                            'vendors/bootstrap-markdown/js/bootstrap-markdown.js',
                            'vendors/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js',
                            'vendors/ckeditor/ckeditor.js',
                            'vendors/summernote/summernote.js']
                    });
                }]
            }
        })
        .state('ui-typography', {
            url: "/ui-typography",
            templateUrl: 'templates/states/ui-typography.html'
        })
        .state('ui-modals', {
            url: "/ui-modals",
            templateUrl: 'templates/states/ui-modals.html',
            controller: 'UIModalsController'
        })
        .state('ui-sliders', {
            url: "/ui-sliders",
            templateUrl: 'templates/states/ui-sliders.html',
            controller: 'UiSlidersController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/ion.rangeSlider/css/ion.rangeSlider.css',
                            'vendors/nouislider/jquery.nouislider.css',
                            'vendors/ion.rangeSlider/js/ion.rangeSlider.min.js',
                            'vendors/nouislider/jquery.nouislider.min.js']
                    });
                }]
            }
        })
        .state('ui-nestable-list', {
            url: "/ui-nestable-list",
            templateUrl: 'templates/states/ui-nestable-list.html',
            controller: 'UiNestableListController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-nestable/nestable.css',
                            'vendors/jquery-nestable/jquery.nestable.js']
                    });
                }]
            }
        })
        .state('ui-dropdown-select', {
            url: "/ui-dropdown-select",
            templateUrl: 'templates/states/ui-dropdown-select.html',
            controller: 'UiDropdownSelectController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/select2/select2-madmin.css',
                            'vendors/bootstrap-select/bootstrap-select.min.css',
                            'vendors/multi-select/css/multi-select-madmin.css',
                            'vendors/select2/select2.min.js',
                            'vendors/bootstrap-select/bootstrap-select.min.js',
                            'vendors/multi-select/js/jquery.multi-select.js']
                    });
                }]
            }
        })
        .state('ui-icons', {
            url: "/ui-icons",
            templateUrl: 'templates/states/ui-icons.html'
        })
        .state('ui-notific8-notifications', {
            url: "/ui-notific8-notifications",
            templateUrl: 'templates/states/ui-notific8-notifications.html',
            controller: 'UINotific8NotificationsController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-notific8/jquery.notific8.min.css',
                            'vendors/sco.message/sco.message.css',
                            'vendors/jquery-notific8/jquery.notific8.min.js',
                            'vendors/sco.message/sco.message.js',
                            'vendors/jquery-notific8/notific8.js']
                    });
                }]
            }
        })
        .state('ui-toastr-notifications', {
            url: "/ui-toastr-notifications",
            templateUrl: 'templates/states/ui-toastr-notifications.html',
            controller: 'UiToastrNotificationsController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-toastr/toastr.min.css',
                            'vendors/jquery-toastr/toastr.min.js']
                    });
                }]
            }
        })
        .state('ui-checkbox-radio', {
            url: "/ui-checkbox-radio",
            templateUrl: 'templates/states/ui-checkbox-radio.html',
            controller: 'CheckboxRadioController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/iCheck/skins/all.css',
                            'vendors/iCheck/icheck.min.js',
                            'vendors/iCheck/custom.min.js']
                    });
                }]
            }
        })
        .state('ui-treeview', {
            url: "/ui-treeview",
            templateUrl: 'templates/states/ui-treeview.html',
            controller: 'UiTreeviewController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jstree/dist/themes/default/style.min.css',
                            'vendors/jquery-treetable/stylesheets/jquery.treetable.css',
                            'vendors/jquery-treetable/stylesheets/jquery.treetable.theme.custom.css',
                            'vendors/jstree/dist/jstree.min.js',
                            'vendors/jquery-treetable/javascripts/src/jquery.treetable.js']
                    });
                }]
            }
        })
        .state('ui-portlets', {
            url: "/ui-portlets",
            templateUrl: 'templates/states/ui-portlets.html',
            controller: 'UiPortletsController'
        })

        // start form
        .state('form-layouts', {
            url: "/form-layouts",
            templateUrl: 'templates/states/form-layouts.html',
            controller: 'FormLayoutsController'
        })
        .state('form-basic', {
            url: "/form-basic",
            templateUrl: 'templates/states/form-basic.html',
            controller: 'FormBasicController'
        })
        .state('form-components', {
            url: "/form-components",
            templateUrl: 'templates/states/form-components.html',
            controller: 'FormComponentsController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/bootstrap-colorpicker/css/colorpicker.css',
                            'vendors/bootstrap-datepicker/css/datepicker.css',
                            'vendors/bootstrap-daterangepicker/daterangepicker-bs3.css',
                            'vendors/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                            'vendors/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                            'vendors/bootstrap-clockface/css/clockface.css',
                            'vendors/bootstrap-switch/css/bootstrap-switch.css',
                            'vendors/bootstrap-datepicker/js/bootstrap-datepicker.js',
                            'vendors/bootstrap-daterangepicker/daterangepicker.js',
                            'vendors/moment/moment.js',
                            'vendors/bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                            'vendors/bootstrap-timepicker/js/bootstrap-timepicker.js',
                            'vendors/bootstrap-clockface/js/clockface.js',
                            'vendors/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                            'vendors/bootstrap-switch/js/bootstrap-switch.min.js',
                            'vendors/jquery-maskedinput/jquery-maskedinput.js',
                            'vendors/charCount.js']
                    });
                }]
            }
        })
        .state('form-wizard', {
            url: "/form-wizard",
            templateUrl: 'templates/states/form-wizard.html',
            controller: 'FormWizardController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-bootstrap-wizard/custom.css',
                            'vendors/jquery-steps/css/jquery.steps.css',
                            'vendors/jquery-validate/jquery.validate.min.js',
                            'vendors/jquery-steps/js/jquery.steps.min.js',
                            'vendors/jquery-bootstrap-wizard/jquery.bootstrap.wizard.min.js']
                    });
                }]
            }
        })
        .state('form-xeditable', {
            url: "/form-xeditable",
            templateUrl: 'templates/states/form-xeditable.html',
            controller: 'FormXeditableController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/x-editable/select2/lib/select2-madmin.css',
                            'vendors/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                            'vendors/x-editable/bootstrap3-editable/css/bootstrap-editable.css',
                            'vendors/x-editable/inputs-ext/address/address.css',
                            'vendors/bootstrap-switch/css/bootstrap-switch.css',
                            'vendors/x-editable/jquery.mockjax.js',
                            'vendors/moment/moment.js',
                            'vendors/x-editable/select2/lib/select2.js',
                            'vendors/bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                            'vendors/x-editable/bootstrap3-editable/js/bootstrap-editable.min.js',
                            'vendors/x-editable/inputs-ext/typeaheadjs/lib/typeahead.js',
                            'vendors/x-editable/inputs-ext/typeaheadjs/typeaheadjs.js',
                            'vendors/x-editable/inputs-ext/wysihtml5/wysihtml5.js',
                            'vendors/x-editable/inputs-ext/address/address.js',
                            'vendors/bootstrap-switch/js/bootstrap-switch.min.js',
                            'vendors/x-editable/demo-mock.js']
                    });
                }]
            }
        })
        .state('form-validation', {
            url: "/form-validation",
            templateUrl: 'templates/states/form-validation.html',
            controller: 'FormValidationController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-validate/jquery.validate.min.js']
                    });
                }]
            }
        })
        .state('form-multiple-file-upload', {
            url: "/form-multiple-file-upload",
            templateUrl: 'templates/states/form-multiple-file-upload.html',
            controller: 'FormMultipleFileUploadController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-file-upload/css/jquery.fileupload.css',
                            'vendors/jquery-file-upload/css/jquery.fileupload-ui.css',
                            'vendors/jquery-file-upload/css/blueimp-gallery.min.css',
                            'vendors/jquery-file-upload/js/vendor/jquery.ui.widget.js',
                            'vendors/jquery-file-upload/js/vendor/tmpl.min.js',
                            'vendors/jquery-file-upload/js/vendor/load-image.min.js',
                            'vendors/jquery-file-upload/js/vendor/canvas-to-blob.min.js',
                            'vendors/jquery-file-upload/js/vendor/jquery.blueimp-gallery.min.js',
                            'vendors/jquery-file-upload/js/jquery.iframe-transport.js',
                            'vendors/jquery-file-upload/js/jquery.fileupload.js',
                            'vendors/jquery-file-upload/js/jquery.fileupload-process.js',
                            'vendors/jquery-file-upload/js/jquery.fileupload-image.js',
                            'vendors/jquery-file-upload/js/jquery.fileupload-audio.js',
                            'vendors/jquery-file-upload/js/jquery.fileupload-video.js',
                            'vendors/jquery-file-upload/js/jquery.fileupload-validate.js',
                            'vendors/jquery-file-upload/js/jquery.fileupload-ui.js',
                            'vendors/jquery-file-upload/js/cors/jquery.xdr-transport.js']
                    });
                }]
            }
        })
        .state('form-dropzone-file-upload', {
            url: "/form-dropzone-file-upload",
            templateUrl: 'templates/states/form-dropzone-file-upload.html',
            controller: 'FormDropzoneFileUploadController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/dropzone/css/dropzone.css',
                            'vendors/dropzone/js/dropzone.js']
                    });
                }]
            }
        })

        // start front end
        .state('frontend-one-page', {
            url: "/frontend-one-page",
            templateUrl: 'templates/states/frontend-one-page.html'
        })

        // start table
        .state('table-basic', {
            url: "/table-basic",
            templateUrl: 'templates/states/table-basic.html'
        })
        .state('table-responsive', {
            url: "/table-responsive",
            templateUrl: 'templates/states/table-responsive.html'
        })
        .state('table-action', {
            url: "/table-action",
            templateUrl: 'templates/states/table-action.html',
            controller: 'TableActionController'
        })
        .state('table-filter', {
            url: "/table-filter",
            templateUrl: 'templates/states/table-filter.html',
            controller: 'TableFilterController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/bootstrap-datepicker/css/datepicker3.css',
                            'vendors/bootstrap-datepicker/js/bootstrap-datepicker.js']
                    });
                }]
            }
        })
        .state('table-advanced', {
            url: "/table-advanced",
            templateUrl: 'templates/states/table-advanced.html',
            controller: 'TableAdvancedController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-tablesorter/themes/blue/style-custom.css',
                            'vendors/jquery-tablesorter/jquery.tablesorter.js']
                    });
                }]
            }
        })
        .state('table-editable', {
            url: "/table-editable",
            templateUrl: 'templates/states/table-editable.html',
            controller: 'TableEditableController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/DataTables/media/css/jquery.dataTables.css',
                            'vendors/DataTables/media/css/dataTables.bootstrap.css',
                            'vendors/DataTables/media/js/jquery.dataTables.js',
                            'vendors/DataTables/media/js/dataTables.bootstrap.js',
                            'vendors/DataTables/jquery.jeditable.js']
                    });
                }]
            }
        })
        .state('table-datatables', {
            url: "/table-datatables",
            templateUrl: 'templates/states/table-datatables.html',
            controller: 'TableDatatablesController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/DataTables/media/css/jquery.dataTables.css',
                            'vendors/DataTables/extensions/TableTools/css/dataTables.tableTools.min.css',
                            'vendors/DataTables/media/css/dataTables.bootstrap.css',
                            'vendors/DataTables/media/js/jquery.dataTables.js',
                            'vendors/DataTables/media/js/dataTables.bootstrap.js',
                            'vendors/DataTables/extensions/TableTools/js/dataTables.tableTools.min.js']
                    });
                }]
            }
        })
        .state('table-sample', {
            url: "/table-sample",
            templateUrl: 'templates/states/table-sample.html',
            controller: 'TableSampleController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-tablesorter/themes/blue/style-custom.css',
                            'vendors/bootstrap-datepicker/css/datepicker.css',
                            'vendors/jquery-tablesorter/jquery.tablesorter.js',
                            'vendors/bootstrap-datepicker/js/bootstrap-datepicker.js']
                    });
                }]
            }
        })
        .state('table-export', {
            url: "/table-export",
            templateUrl: 'templates/states/table-export.html',
            controller: 'TableExportController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/tableExport/tableExport.js',
                            'vendors/tableExport/jquery.base64.js',
                            'vendors/tableExport/html2canvas.js',
                            'vendors/tableExport/jspdf/libs/sprintf.js',
                            'vendors/tableExport/jspdf/jspdf.js',
                            'vendors/tableExport/jspdf/libs/base64.js']
                    });
                }]
            }
        })

        // start data grid
        .state('grid-layout-div', {
            url: "/grid-layout-div",
            templateUrl: 'templates/states/grid-layout-div.html',
            controller: 'GridLayoutDivController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })
        .state('grid-layout-table-1', {
            url: "/grid-layout-table-1",
            templateUrl: 'templates/states/grid-layout-table-1.html',
            controller: 'GridLayoutTable1Controller',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })
        .state('grid-layout-table-2', {
            url: "/grid-layout-table-2",
            templateUrl: 'templates/states/grid-layout-table-2.html',
            controller: 'GridLayoutTable2Controller',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })
        .state('grid-layout-2-table', {
            url: "/grid-layout-2-table",
            templateUrl: 'templates/states/grid-layout-2-table.html',
            controller: 'GridLayout2TableController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })
        .state('grid-layout-ul-li', {
            url: "/grid-layout-ul-li",
            templateUrl: 'templates/states/grid-layout-ul-li.html',
            controller: 'GridLayoutUlLiController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })
        .state('grid-filter-with-ul-li', {
            url: "/grid-filter-with-ul-li",
            templateUrl: 'templates/states/grid-filter-with-ul-li.html',
            controller: 'GridFilterWithUiLiController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })
        .state('grid-filter-with-select', {
            url: "/grid-filter-with-select",
            templateUrl: 'templates/states/grid-filter-with-select.html',
            controller: 'GridFilterWithSelectController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })
        .state('grid-double-sort', {
            url: "/grid-double-sort",
            templateUrl: 'templates/states/grid-double-sort.html',
            controller: 'GridDoubleSortController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })
        .state('grid-deep-linking', {
            url: "/grid-deep-linking",
            templateUrl: 'templates/states/grid-deep-linking.html',
            controller: 'GridDeepLinkingController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })

        .state('grid-pagination-only', {
            url: "/grid-pagination-only",
            templateUrl: 'templates/states/grid-pagination-only.html',
            controller: 'GridPaginationOnlyController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })
        .state('grid-without-item-per-page', {
            url: "/grid-without-item-per-page",
            templateUrl: 'templates/states/grid-without-item-per-page.html',
            controller: 'GridWithoutItemPerPageController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })
        .state('grid-hidden-sort', {
            url: "/grid-hidden-sort",
            templateUrl: 'templates/states/grid-hidden-sort.html',
            controller: 'GridHiddenSortController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })
        .state('grid-range-slider', {
            url: "/grid-range-slider",
            templateUrl: 'templates/states/grid-range-slider.html',
            controller: 'GridRangeSliderController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })
        .state('grid-datepicker', {
            url: "/grid-datepicker",
            templateUrl: 'templates/states/grid-datepicker.html',
            controller: 'GridDatepickerController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jplist/html/css/jplist-custom.css',
                            'vendors/jplist/html/js/vendor/modernizr.min.js',
                            'vendors/jplist/html/js/jplist.min.js']
                    });
                }]
            }
        })

        // start page
        .state('page-gallery', {
            url: "/page-gallery",
            templateUrl: 'templates/states/page-gallery.html',
            controller: 'PageGalleryController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/lightbox/css/lightbox.css',
                            'vendors/mixitup/src/jquery.mixitup.js',
                            'vendors/lightbox/js/lightbox.min.js']
                    });
                }]
            }
        })
        .state('page-timeline', {
            url: "/page-timeline",
            templateUrl: 'templates/states/page-timeline.html'
        })
        .state('page-blog', {
            url: "/page-blog",
            templateUrl: 'templates/states/page-blog.html'
        })
        .state('page-blog-item', {
            url: "/page-blog-item",
            templateUrl: 'templates/states/page-blog-item.html'
        })
        .state('page-about', {
            url: "/page-about",
            templateUrl: 'templates/states/page-about.html'
        })
        .state('page-contact', {
            url: "/page-contact",
            templateUrl: 'templates/states/page-contact.html',
            controller: 'PageContactController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/gmaps/gmaps.js']
                    });
                }]
            }
        })
        .state('page-calendar', {
            url: "/page-calendar",
            templateUrl: 'templates/states/page-calendar.html',
            controller: 'PageCalendarController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/fullcalendar/fullcalendar.css',
                            'vendors/fullcalendar/fullcalendar.print.css',
                            'vendors/fullcalendar/fullcalendar.min.js']
                    });
                }]
            }
        })

        // start extra
        .state('extra-profile', {
            url: "/extra-profile",
            templateUrl: 'templates/states/extra-profile.html',
            controller: 'ExtraProfileController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/bootstrap-datepicker/css/datepicker.css',
                            'vendors/bootstrap-datepicker/js/bootstrap-datepicker.js']
                    });
                }]
            }
        })
        .state('extra-signin', {
            url: "/extra-signin",
            templateUrl: 'templates/states/extra-signin.html',
            controller: 'ExtraSigninController'
        })
        .state('extra-signup', {
            url: "/extra-signup",
            templateUrl: 'templates/states/extra-signup.html',
            controller: 'ExtraSignupController'
        })
        .state('extra-lock-screen', {
            url: "/extra-lock-screen",
            templateUrl: 'templates/states/extra-lock-screen.html',
            controller: 'ExtraLockScreenController'
        })
        .state('extra-user-list', {
            url: "/extra-user-list",
            templateUrl: 'templates/states/extra-user-list.html',
            controller: 'ExtraUserListController'
        })
        .state('extra-invoice', {
            url: "/extra-invoice",
            templateUrl: 'templates/states/extra-invoice.html'
        })
        .state('extra-faq', {
            url: "/extra-faq",
            templateUrl: 'templates/states/extra-faq.html'
        })
        .state('extra-pricing-table', {
            url: "/extra-pricing-table",
            templateUrl: 'templates/states/extra-pricing-table.html'
        })
        .state('extra-blank', {
            url: "/extra-blank",
            templateUrl: 'templates/states/extra-blank.html'
        })
        .state('extra-404', {
            url: "/extra-404",
            templateUrl: 'templates/states/extra-404.html',
            controller: 'Extra404Controller'
        })
        .state('extra-500', {
            url: "/extra-500",
            templateUrl: 'templates/states/extra-500.html',
            controller: 'Extra500Controller'
        })

        // start email
        .state('email-inbox', {
            url: "/email-inbox",
            templateUrl: 'templates/states/email-inbox.html',
            controller: 'EmailInboxController'
        })
        .state('email-compose-mail', {
            url: "/email-compose-mail",
            templateUrl: 'templates/states/email-compose-mail.html',
            controller: 'EmailComposeMailController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css',
                            'vendors/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js']
                    });
                }]
            }
        })
        .state('email-view-mail', {
            url: "/email-view-mail",
            templateUrl: 'templates/states/email-view-mail.html'
        })

        // start charts
        .state('charts-flotchart', {
            url: "/charts-flotchart",
            templateUrl: 'templates/states/charts-flotchart.html',
            controller: 'ChartsFlotChartController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/flot-chart/jquery.flot.js',
                            'vendors/flot-chart/jquery.flot.categories.js',
                            'vendors/flot-chart/jquery.flot.pie.js',
                            'vendors/flot-chart/jquery.flot.tooltip.js',
                            'vendors/flot-chart/jquery.flot.resize.js',
                            'vendors/flot-chart/jquery.flot.fillbetween.js',
                            'vendors/flot-chart/jquery.flot.stack.js',
                            'vendors/flot-chart/jquery.flot.spline.js']
                    });
                }]
            }
        })
        .state('charts-chartjs', {
            url: "/charts-chartjs",
            templateUrl: 'templates/states/charts-chartjs.html',
            controller: 'ChartsChartJsController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/chart.js/Chart.min.js']
                    });
                }]
            }
        })
        .state('charts-highchart-line', {
            url: "/charts-highchart-line",
            templateUrl: 'templates/states/charts-highchart-line.html',
            controller: 'ChartsHighchartLineController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-highcharts/highcharts.js',
                            'vendors/jquery-highcharts/exporting.js']
                    });
                }]
            }
        })
        .state('charts-highchart-area', {
            url: "/charts-highchart-area",
            templateUrl: 'templates/states/charts-highchart-area.html',
            controller: 'ChartsHighchartAreaController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-highcharts/highcharts.js',
                            'vendors/jquery-highcharts/highcharts-more.js',
                            'vendors/jquery-highcharts/exporting.js']
                    });
                }]
            }
        })
        .state('charts-highchart-column-bar', {
            url: "/charts-highchart-column-bar",
            templateUrl: 'templates/states/charts-highchart-column-bar.html',
            controller: 'ChartsHighchartColumnBarController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-highcharts/highcharts.js',
                            'vendors/jquery-highcharts/highcharts-more.js',
                            'vendors/jquery-highcharts/data.js',
                            'vendors/jquery-highcharts/drilldown.js',
                            'vendors/jquery-highcharts/exporting.js']
                    });
                }]
            }
        })
        .state('charts-highchart-pie', {
            url: "/charts-highchart-pie",
            templateUrl: 'templates/states/charts-highchart-pie.html',
            controller: 'ChartsHighchartPieController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-highcharts/highcharts.js',
                            'vendors/jquery-highcharts/data.js',
                            'vendors/jquery-highcharts/drilldown.js',
                            'vendors/jquery-highcharts/exporting.js']
                    });
                }]
            }
        })
        .state('charts-highchart-scatter-bubble', {
            url: "/charts-highchart-scatter-bubble",
            templateUrl: 'templates/states/charts-highchart-scatter-bubble.html',
            controller: 'ChartsHighchartScatterBubbleController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-highcharts/highcharts.js',
                            'vendors/jquery-highcharts/highcharts-more.js',
                            'vendors/jquery-highcharts/exporting.js']
                    });
                }]
            }
        })
        .state('charts-highchart-dynamic', {
            url: "/charts-highchart-dynamic",
            templateUrl: 'templates/states/charts-highchart-dynamic.html',
            controller: 'ChartsHighchartDynamicController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-highcharts/highcharts.js',
                            'vendors/jquery-highcharts/exporting.js']
                    });
                }]
            }
        })
        .state('charts-highchart-combinations', {
            url: "/charts-highchart-combinations",
            templateUrl: 'templates/states/charts-highchart-combinations.html',
            controller: 'ChartsHighchartCombinationController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-highcharts/highcharts.js',
                            'vendors/jquery-highcharts/exporting.js']
                    });
                }]
            }
        })
        .state('charts-highchart-more', {
            url: "/charts-highchart-more",
            templateUrl: 'templates/states/charts-highchart-more.html',
            controller: 'ChartsHighchartMoreController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: ['vendors/jquery-highcharts/highchart.js',
                            'vendors/jquery-highcharts/funnel.js',
                            'vendors/jquery-highcharts/highcharts-more.js',
                            'vendors/jquery-highcharts/data.js',
                            'vendors/jquery-highcharts/exporting.js']
                    });
                }]
            }
        })
        .state('animations', {
            url: "/animations",
            templateUrl: 'templates/states/animations.html'
        })
    ;
});

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
        $scope.$broadcast("backdata_done");
    });
    $scope.$watch('backdata', function (newValue, oldValue) {
        if (newValue) {
            //$scope.backdata = newValue; // в том числе там дерево категорий и диаграмм
            //var dashboard = newValue.dashboards.items[0];

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


App.controller('ChartController', ['$scope', '$state', '$stateParams', '$rootScope', function ($scope, $state, $stateParams, $rootScope) {
    var chart_id = $scope.widget.attrs.chart_id;

    var chart = _.find($scope.charts.items, {'id': chart_id});
    //chart = _.extend(chart, _.find(data.items, {'id': chart_id}));

    if (chart.type == "table") {
        $scope.tableConfig = chart;
    } else if (chart.type == 'multifoci') {
        $scope.multifociConfig = chart;
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

;(function($){
    $.fn.Data = function(){};
    var $this = $.fn.Data;

    $.fn.Data.pages = {
        '/': {title:'Главная страница', 'breadcrumb':['Главная страница']},
        '/main/:dashboardId?options': {title:'Панель диаграмм', 'breadcrumb':['Панель диаграмм']},
        '/layout-left-sidebar': {title:'Left Sidebar', 'breadcrumb':['Layouts', 'Left Sidebar']},
        '/layout-left-sidebar-collapsed': {title:'Left Sidebar Collapsed', 'breadcrumb':['Layouts', 'Left Sidebar Collapsed']},
        '/layout-right-sidebar': {title:'Right Sidebar', 'breadcrumb':['Layouts', 'Right Sidebar']},
        '/layout-right-sidebar-collapsed': {title:'Right Sidebar Collapsed', 'breadcrumb':['Layouts', 'Right Sidebar Collapsed']},
        '/layout-horizontal-menu': {title:'Horizontal Menu', 'breadcrumb':['Layouts', 'Horizontal Menu']},
        '/layout-horizontal-menu-sidebar': {title:'Horizontal Menu & Sidebar', 'breadcrumb':['Layouts', 'Horizontal Menu & Sidebar']},
        '/layout-boxed': {title:'Boxed Layout', 'breadcrumb':['Layouts', 'Boxed Layout']},
        '/layout-fixed-topbar': {title:'Fixed Topbar', 'breadcrumb':['Layouts', 'Fixed Topbar']},
        '/layout-hidden-footer': {title:'Hidden Footer', 'breadcrumb':['Layouts', 'Hidden Footer']},
        '/layout-header-topbar': {title:'Header Topbar', 'breadcrumb':['Layouts', 'Header Topbar']},
        '/layout-title-breadcrumb': {title:'Title & Breadcrumb', 'breadcrumb':['Layouts', 'Title & Breadcrumb']},
        '/ui-generals': {title:'Generals', 'breadcrumb':['UI', 'Generals']},
        '/ui-buttons': {title:'Buttons', 'breadcrumb':['UI', 'Buttons']},
        '/ui-panels': {title:'Panels', 'breadcrumb':['UI', 'Panels']},
        '/ui-tabs': {title:'Tabs', 'breadcrumb':['UI', 'Tabs']},
        '/ui-progressbars': {title:'Progress Bars', 'breadcrumb':['UI', 'Progress Bars']},
        '/ui-sliders': {title:'Sliders', 'breadcrumb':['UI', 'Sliders']},
        '/ui-editors': {title:'Editors', 'breadcrumb':['UI', 'Editors']},
        '/ui-modals': {title:'Modals', 'breadcrumb':['UI', 'Modals']},
        '/ui-icons': {title:'Icons', 'breadcrumb':['UI', 'Icons']},
        '/ui-typography': {title:'Typography', 'breadcrumb':['UI', 'Typography']},
        '/ui-notific8-notifications': {title:'Notific8 & Sco.message', 'breadcrumb':['UI', 'Notific8 & Sco.message']},
        '/ui-toastr-notifications': {title:'Toastr Notifications', 'breadcrumb':['UI', 'Toastr Notifications']},
        '/ui-checkbox-radio': {title:'Checkbox & Radio', 'breadcrumb':['UI', 'Checkbox & Radio']},
        '/ui-treeview': {title:'Tree View', 'breadcrumb':['UI', 'Tree View']},
        '/ui-portlets': {title:'Portlets', 'breadcrumb':['UI', 'Portlets']},
        '/ui-nestable-list': {title:'Nestable List', 'breadcrumb':['UI', 'Nestable List']},
        '/ui-dropdown-select': {title:'Dropdown Select', 'breadcrumb':['UI', 'Dropdown Select']},
        '/form-layouts': {title:'Form Layouts', 'breadcrumb':['Forms', 'Form Layouts']},
        '/form-basic': {title:'Basic Forms', 'breadcrumb':['Forms', 'Basic Forms']},
        '/form-components': {title:'Form Components', 'breadcrumb':['Forms', 'Form Components']},
        '/form-wizard': {title:'Form Wizard', 'breadcrumb':['Forms', 'Form Wizard']},
        '/form-xeditable': {title:'Form Xeditable', 'breadcrumb':['Forms', 'Form Xeditable']},
        '/form-validation': {title:'Form Validation', 'breadcrumb':['Forms', 'Form Validation']},
        '/form-multiple-file-upload': {title:'Multiple File Upload', 'breadcrumb':['Forms', 'Multiple File Upload']},
        '/form-dropzone-file-upload': {title:'Dropzone File Upload', 'breadcrumb':['Forms', 'Dropzone File Upload']},
        '/frontend-one-page': {title:'One Page', 'breadcrumb':['Frontend', 'One Page']},
        '/table-basic': {title:'Basic Tables', 'breadcrumb':['Tables', 'Basic Tables']},
        '/table-responsive': {title:'Responsive Tables', 'breadcrumb':['Tables', 'Responsive Tables']},
        '/table-action': {title:'Action Tables', 'breadcrumb':['Tables', 'Action Tables']},
        '/table-editable': {title:'Edit Tables', 'breadcrumb':['Tables', 'Edit Tables']},
        '/table-datatables': {title:'DataTables', 'breadcrumb':['Tables', 'DataTables']},
        '/table-filter': {title:'Filter Tables', 'breadcrumb':['Tables', 'Filter Tables']},
        '/table-advanced': {title:'Tables Advanced', 'breadcrumb':['Tables', 'Tables Advanced']},
        '/table-sample': {title:'Sample Tables', 'breadcrumb':['Tables', 'Sample Tables']},
        '/table-export': {title:'Export Tables', 'breadcrumb':['Tables', 'Export Tables']},
        '/grid-layout-div': {title:'DIVs Layout', 'breadcrumb':['Grids', 'DIVs Layout']},
        '/grid-layout-table-1': {title:'Table Demo 1', 'breadcrumb':['Grids', 'Table Demo 1']},
        '/grid-layout-table-2': {title:'Table Demo 2', 'breadcrumb':['Grids', 'Table Demo 2']},
        '/grid-layout-2-table': {title:'Two Tables', 'breadcrumb':['Grids', 'Two Tables']},
        '/grid-layout-ul-li': {title:'UL LI', 'breadcrumb':['Grids', 'UL LI']},
        '/grid-filter-with-ul-li': {title:'Dropdown Filters With UL/LI', 'breadcrumb':['Grids', 'Dropdown Filters With UL/LI']},
        '/grid-filter-with-select': {title:'Dropdown Filters With SELECT', 'breadcrumb':['Grids', 'Dropdown Filters With SELECT']},
        '/grid-double-sort': {title:'Double Sort', 'breadcrumb':['Grids', 'Double Sort']},
        '/grid-deep-linking': {title:'Deep Linking', 'breadcrumb':['Grids', 'Deep Linking']},
        '/grid-pagination-only': {title:'Pagination Only', 'breadcrumb':['Grids', 'Pagination Only']},
        '/grid-without-item-per-page': {title:'Pagination Without \'Items per Page\' Dropdown', 'breadcrumb':['Grids', 'Pagination Without \'Items per Page\' Dropdown']},
        '/grid-hidden-sort': {title:'Hidden Sort', 'breadcrumb':['Grids', 'Hidden Sort']},
        '/grid-range-slider': {title:'jQuery UI - Range Slider', 'breadcrumb':['Grids', 'jQuery UI - Range Slider']},
        '/grid-datepicker': {title:'jQuery UI - Date Picker Filter', 'breadcrumb':['Grids', 'jQuery UI - Date Picker Filter']},
        '/page-gallery': {title:'Gallery Page', 'breadcrumb':['Pages', 'Gallery Page']},
        '/page-timeline': {title:'TimeLine Page', 'breadcrumb':['Pages', 'TimeLine Page']},
        '/page-blog': {title:'Blog Page', 'breadcrumb':['Pages', 'Blog Page']},
        '/page-blog-item': {title:'Blog Item Page', 'breadcrumb':['Pages', 'Blog Item Page']},
        '/page-calendar': {title:'Calendar Page', 'breadcrumb':['Pages', 'Calendar Page']},
        '/page-about': {title:'About Us', 'breadcrumb':['Pages', 'About Us']},
        '/page-contact': {title:'Contact Us', 'breadcrumb':['Pages', 'Contact Us']},
        '/extra-profile': {title:'User Profile', 'breadcrumb':['Extra', 'User Profile']},
        '/extra-signin': {title:'Sign In', 'breadcrumb':['Extra', 'Sign In']},
        '/extra-signup': {title:'Sign Up', 'breadcrumb':['Extra', 'Sign Up']},
        '/extra-lock-screen': {title:'Lock Screen', 'breadcrumb':['Extra', 'Lock Screen']},
        '/extra-user-list': {title:'User List', 'breadcrumb':['Extra', 'User List']},
        '/extra-invoice': {title:'Invoice', 'breadcrumb':['Extras', 'Invoice']},
        '/extra-faq': {title:'FAQ', 'breadcrumb':['Extras', 'FAQ']},
        '/extra-pricing-table': {title:'Pricing Table', 'breadcrumb':['Extras', 'Pricing Table']},
        '/extra-404': {title:'404 Page', 'breadcrumb':['Extras', '404 Page']},
        '/extra-500': {title:'500 Page', 'breadcrumb':['Extras', '500 Page']},
        '/extra-blank': {title:'Page Blank', 'breadcrumb':['Extras', 'Page Blank']},
        '/email-inbox': {title:'MaiBox', 'breadcrumb':['Emails', 'MaiBox']},
        '/email-compose-mail': {title:'Compose mail', 'breadcrumb':['Emails', 'Compose mail']},
        '/email-view-mail': {title:'Mailbox', 'breadcrumb':['Emails', 'Mailbox']},
        '/charts-flotchart': {title:'Flot Charts', 'breadcrumb':['Charts', 'Flot Charts']},
        '/charts-chartjs': {title:'Chartjs', 'breadcrumb':['Charts', 'Chartjs']},
        '/charts-highchart-line': {title:'Line Charts', 'breadcrumb':['Charts', 'Line Charts']},
        '/charts-highchart-area': {title:'Area Charts', 'breadcrumb':['Charts', 'Area Charts']},
        '/charts-highchart-column-bar': {title:'Column & Bar Charts', 'breadcrumb':['Charts', 'Column & Bar Charts']},
        '/charts-highchart-pie': {title:'Pie Charts', 'breadcrumb':['Charts', 'Pie Charts']},
        '/charts-highchart-scatter-bubble': {title:'Scatter & Bubble Charts', 'breadcrumb':['Charts', 'Scatter & Bubble Charts']},
        '/charts-highchart-dynamic': {title:'Dynamic Charts', 'breadcrumb':['Charts', 'Dynamic Charts']},
        '/charts-highchart-combinations': {title:'Combinations', 'breadcrumb':['Charts', 'Combinations']},
        '/charts-highchart-more': {title:'More Chart Types', 'breadcrumb':['Charts', 'More Chart Types']},
        '/animations': {title:'Css Animations', 'breadcrumb':['Animations', 'Css Animations']}
    };

    $.fn.Data.get = function(id){
        if(id && $this.pages[id]){
            return $this.pages[id];
        }
    };

    $.fn.Data.checkbox = function(){
        if($('#demo-checkbox-radio').length <= 0){
            $('input[type="checkbox"]:not(".switch")').iCheck({
                checkboxClass: 'icheckbox_minimal-grey',
                increaseArea: '20%' // optional
            });
            $('input[type="radio"]:not(".switch")').iCheck({
                radioClass: 'iradio_minimal-grey',
                increaseArea: '20%' // optional
            });
        }
    };
})(jQuery);

App.controller('Extra404Controller', function ($scope, $routeParams){
    $('body').addClass('bounceInLeft');
    $("body>.default-page").hide();
    $("body>.extra-page").html($(".page-content").html()).show();
});
App.controller('Extra500Controller', function ($scope, $routeParams){
    $('body').addClass('bounceInLeft');
    $("body>.default-page").hide();
    $("body>.extra-page").html($(".page-content").html()).show();
});
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

App.controller('NoneController', function ($scope, $routeParams){

});
App.controller('StartController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.getTimes=function(n){
        return new Array(n);
    };
}]);

App.directive('highchartContainer', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'templates/directives/chart-container.html',
		// Связующая функция добавит поведение к шаблону
		link: function(scope, element, attrs) {
			// Элемент заголовка
		}
	};
});

App.directive('hightable', ['$window', '$state', '$stateParams', function ($window, $state, $stateParams) {
    return {
        restrict: 'E',
        scope: {
            config:"="
        },
        replace: true,
        templateUrl: "templates/directives/table.html",
        link: function (scope) {

        }
    };
}]);

App.directive('mixitup', ['$window', '$timeout', '$compile', function ($window, $timeout, $compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $timeout(function(){
                element.mixItUp();
            });
        }
    };
}]);

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

                if ($scope.config) {
                    var config = angular.fromJson($scope.config);
                    var width = getWinPx(config.width, 1),
                        height = 500,
                        padding = 6, // separation between nodes
                        maxRadius = 12;

                    var n = 100, // total number of nodes
                        m = 10; // number of distinct clusters

                    var color = d3.scale.category10()
                        .domain(d3.range(m));

                    var x1 = d3.scale.ordinal()
                        .domain(d3.range(m))
                        .rangePoints([0, width], 1);

                    var nodes = d3.range(n).map(function () {
                        var i = Math.floor(Math.random() * m),
                            v = (i + 1) / m * -Math.log(Math.random());
                        return {
                            radius: Math.sqrt(v) * maxRadius,
                            color: color(i),
                            cx: x1(i),
                            cy: height / 2
                        };
                    });

                    var force = d3.layout.force()
                        .nodes(nodes)
                        .size([width, height])
                        .gravity(0)
                        .charge(0)
                        .on("tick", tick)
                        .start();

                    var svg = d3.select("#multifoci_"+config.id).append("svg")
                        .attr("width", width)
                        .attr("height", height);

                    var circle = svg.selectAll("circle")
                        .data(nodes)
                        .enter().append("circle")
                        .attr("r", function (d) {
                            return d.radius;
                        })
                        .style("fill", function (d) {
                            return d.color;
                        })
                        .call(force.drag);


                }
            });
        }
    };
}]);

App.directive("ngAccordion", function($parse, $compile){
    return {
        link: function($scope, element, attributes){
            $scope._accordion = {status:[], collapse:{}};

            $scope._accordion.collapse = function(i){
                for(var j=0; j<$scope._accordion.status.length; j++){
                    if(i==j)
                        continue;
                    $scope._accordion.status[j] = true;
                }
                $scope._accordion.status[i] = !$scope._accordion.status[i];
            };

            $(">div", attributes.$$element).each(function(index, item){
                $scope._accordion.status[index] = true;
                $(">.panel-heading>a", item).attr({'ng-click': '_accordion.collapse('+index+')', 'index':index});
                $(">.panel-collapse", item).attr({'collapse': '_accordion.status['+index+']', 'index':index});
            });

            element.html($compile(element.html())($scope));
        }
    };
});
App.directive("ngAnimation", function($parse, $compile){
    return {
        link: function($scope, element, attributes){
            $scope._animation_change = function(v){
                $scope.header.effect = v;
            };

            attributes.$$element.find('button').each(function(index, value){
                $(this).attr({'ng-click': "_animation_change('"+$(this).attr('data-value')+"')"});
            });

            element.html($compile(element.html())($scope));
        }
    };
});
App.directive("ngAreachartspline", function(){
    return {
        link: function($scope, element, attributes){
            //BEGIN AREA CHART SPLINE
            var d6_1 = [["Jan", 67],["Feb", 91],["Mar", 36],["Apr", 150],["May", 28],["Jun", 123],["Jul", 38]];
            var d6_2 = [["Jan", 59],["Feb", 49],["Mar", 45],["Apr", 94],["May", 76],["Jun", 22],["Jul", 31]];
            $.plot("#area-chart-spline", [{
                data: d6_1,
                label: "Upload",
                color: "#ffce54"
            },{
                data: d6_2,
                label: "Download",
                color: "#01b6ad"
            }], {
                series: {
                    lines: {
                        show: !1
                    },
                    splines: {
                        show: !0,
                        tension: 0.4,
                        lineWidth: 2,
                        fill: 0.8
                    },
                    points: {
                        show: !0,
                        radius: 4
                    }
                },
                grid: {
                    borderColor: "#fafafa",
                    borderWidth: 1,
                    hoverable: !0
                },
                tooltip: !0,
                tooltipOpts: {
                    content: "%x : %y",
                    defaultTheme: true
                },
                xaxis: {
                    tickColor: "#fafafa",
                    mode: "categories"
                },
                yaxis: {
                    tickColor: "#fafafa"
                },
                shadowSize: 0
            });
            //END AREA CHART SPLINE
        }
    };
});
App.directive("ngDropzone", function($parse, $compile){
    return {
        link: function($scope, element, attributes){
            $(attributes.$$element).dropzone({
                url: "http://www.torrentplease.com/dropzone.php",
                maxFilesize: 100,
                paramName: "uploadfile",
                maxThumbnailFilesize: 5,
                init: function() {
                    //$scope.files.push({file: 'added'}); // here works
                    this.on('success', function(file, json) {
                    });

                    this.on('addedfile', function(file) {
                        $scope.$apply(function(){
                            //alert(file);
                            //$scope.files.push({file: 'added'});
                        });
                    });

                    this.on('drop', function(file) {
                        //alert('file');
                    });

                }

            });
        }
    };
});

App.directive("ngGeneraltab", function(){
    return {
        link: function (scope, element, attrs) {
            element.click(function(e) {
                e.preventDefault();
            });
        }
    };
});
App.directive("ngMenu", function($parse, $compile){
    return {
        link: {
            post: function ($scope, element, attributes) {
                $scope.$watch('categoriesRendered', function(tree, old) {
                    $scope._menu = {status: [], collapse: {}, hover: []};

                    $scope._menu.mouseleave = function () {
                        for (var j = 0; j < $scope._menu.hover.length; j++) {
                            $scope._menu.hover[j] = '';
                        }
                    };
                    $scope._menu.mouseover = function (i) {
                        for (var j = 0; j < $scope._menu.hover.length; j++) {
                            $scope._menu.hover[j] = '';
                        }
                        $scope._menu.hover[i] = 'nav-hover';
                    };
                    $scope._menu.collapse = function (i) {
                        $scope._menu.status[i] = !$scope._menu.status[i];

                        var current = attributes.$$element.find('a[index=' + i + ']');

                        current.parent('li').addClass('active').siblings().removeClass('active').children('ul').each(function () {
                            $scope._menu.status[$(this).attr('index')] = true;
                        });

                        if (current.hasClass('btn-fullscreen')) {
                            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                                if (document.documentElement.requestFullscreen) {
                                    document.documentElement.requestFullscreen();
                                } else if (document.documentElement.msRequestFullscreen) {
                                    document.documentElement.msRequestFullscreen();
                                } else if (document.documentElement.mozRequestFullScreen) {
                                    document.documentElement.mozRequestFullScreen();
                                } else if (document.documentElement.webkitRequestFullscreen) {
                                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                                }
                            } else {
                                if (document.exitFullscreen) {
                                    document.exitFullscreen();
                                } else if (document.msExitFullscreen) {
                                    document.msExitFullscreen();
                                } else if (document.mozCancelFullScreen) {
                                    document.mozCancelFullScreen();
                                } else if (document.webkitExitFullscreen) {
                                    document.webkitExitFullscreen();
                                }
                            }
                        }
                    };

                    attributes.$$element.find('li').children('a').each(function (index, value) {
                        $scope._menu.status[index] = true;
                        $(this).attr({'ng-click': '_menu.collapse(' + index + ')', 'index': index});
                        $('>ul', $(this).parent('li')).attr({'collapse': '_menu.status[' + index + ']', 'index': index});
                    });

                    $(">li", attributes.$$element).each(function (index, value) {
                        $scope._menu.hover[index] = '';
                        $(this).attr({
                            'ng-mouseleave': '_menu.mouseleave()',
                            'ng-mouseover': '_menu.mouseover(' + index + ')',
                            'ng-class': '_menu.hover[' + index + ']'
                        });
                    });

                    element.html($compile(element.html())($scope));
                });
            }
        }
    };
});

App.directive("ngTab", function($parse, $compile){
    return {
        link: function($scope, element, attributes){
            $("a", element).click(function(e){
                e.preventDefault();
            });
        }
    };
});
App.directive("ngTheme", function($parse, $compile){
    return {
        link: function($scope, element, attributes){
        }
    };
});
App.directive("ngZabutocalendar", function($parse, $compile){
    return {
        link: function($scope, element, attributes){
            //BEGIN CALENDAR
            $("#my-calendar").zabuto_calendar({
                language: "en"
            });
            //END CALENDAR
        }
    };
});
App.directive('resize', ['$window', '$state', '$stateParams', '$timeout', function ($window, $state, $stateParams, $timeout) {
    return {
        restrict: 'A',
        link: function (scope) {
            var w = angular.element($window);
            scope.getWindowDimensions = function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };

            w.bind('resize', function () {
                waitForFinalEvent(function(){
                    $state.go($state.current, $stateParams, {reload: true});
                }, 500, "unique");
            });
        }
    };
}]);

var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout (timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

App.directive("scrollSpy", function($window){
    return {
        restrict: 'A',
        controller: function ($scope) {
            $scope.spies = [];
            this.addSpy = function (spyObj) {
                $scope.spies.push(spyObj);
            };
        },
        link: function (scope, elem, attrs) {
            var spyElems;
            spyElems = [];

            scope.$watch('spies', function (spies) {
                var spy, _i, _len, _results;
                _results = [];

                for (_i = 0, _len = spies.length; _i < _len; _i++) {
                    spy = spies[_i];

                    if (spyElems[spy.id] === null) {
                        _results.push(spyElems[spy.id] = elem.find('#' + spy.id));
                    }
                }
                return _results;
            });

            $($window).scroll(function () {
                var highlightSpy, pos, spy, _i, _len, _ref;
                highlightSpy = null;
                _ref = scope.spies;

                // cycle through `spy` elements to find which to highlight
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    spy = _ref[_i];
                    spy.out();

                    // catch case where a `spy` does not have an associated `id` anchor
                    if (spyElems === null || spyElems[spy.id] === null || spyElems[spy.id].offset() === undefined) {
                        continue;
                    }

                    if ((pos = spyElems[spy.id].offset().top) - $window.scrollY <= 0) {
                        // the window has been scrolled past the top of a spy element
                        spy.pos = pos;

                        if (highlightSpy === null) {
                            highlightSpy = spy;
                        }
                        if (highlightSpy.pos < spy.pos) {
                            highlightSpy = spy;
                        }
                    }
                }

                // select the last `spy` if the scrollbar is at the bottom of the page
                if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                    spy.pos = pos;
                    highlightSpy = spy;
                }

                return highlightSpy !== null ? highlightSpy["in"]() : void 0;
            });
        }
    };
});

App.directive('spy', function ($location, $anchorScroll){
    return {
        restrict: "A",
        require: "^scrollSpy",
        link: function(scope, elem, attrs, affix) {
            elem.click(function () {
                $location.hash(attrs.spy);
                $anchorScroll();
            });

            affix.addSpy({
                id: attrs.spy,
                in: function() {
                    elem.addClass('active');
                },
                out: function() {
                    elem.removeClass('active');
                }
            });
        }
    };
});
App.directive('tree', function(){
	return {
		restrict: 'EA',
		replace: true,
        link: {
            post: function preLink(scope, element, attrs, controller) {
                scope.$watch('tree', function(tree, old) {
                    if (tree) {
                        var html = [];

                        var parentCategory = _.find(tree, {parent: null});
                        html.push("<li><a href=\"javascript:void(0);\"><i class=\"fa fa-sitemap fa-fw\"><div class=\"icon-bg bg-dark\"></div></i><span class=\"menu-title\">"+parentCategory.name+"</span></a>");

                        var previousLevel = parentCategory.level;
                        //var previousDashboards = [];
                        _.forEach(tree, function(category) {
                            if (category.parent != null) {
                                //отобразим категорию, потом дочерние категории, потом дочерние дашборды, потом параллельные категории
                                if (category.level > previousLevel) {
                                    html[html.length - 1] = html[html.length - 1].replace('</span></a>', '</span><span class="fa arrow"></span></a>');

                                    //отображаем дашборды предыдущего левела
                                    //addDashboards(previousDashboards, previousLevel, html);

                                    //создадим новый левел
                                    html.push("<ul class=\"nav " + getUlClass(category.level) + "\">");
                                } else if (category.level < previousLevel) {
                                    //закроем левел
                                    var endLevelString = "</ul></li>".repeat(previousLevel - category.level);
                                    html.push(endLevelString);
                                } else {
                                    //ничего не делаем...
                                }

                                html.push("<li><a href=\"javascript:void(0);\"><i class=\"fa " + getLiClass(category.level) + "\"></i><span class=\"submenu-title\">" + category.name + "</span></a>");
                                addDashboards(category.dashboards, category.level, html);
                                if (category.hasChilds === 0) {
                                    html.push("</li>");
                                }

                                //addDashboards(category.dashboards, category.level, html);

                                //previousDashboards = _.clone(category.dashboards);
                                previousLevel = category.level;
                            }
                        });

                        //addDashboards(previousDashboards, previousLevel, html);
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
        html[html.length - 1] = html[html.length - 1].replace('</span></a>', '</span><span class="fa arrow"></span></a>');
        html.push("<ul class=\"nav " + getUlClass(previousLevel) + "\">");
        _.forEach(previousDashboards, function (dashboard) {
            html.push("<li><a style=\"padding-left:50px\" ui-sref=\"main({dashboardId:"+dashboard.id+", options: null})\"><i class=\"fa fa-bar-chart-o\"></i><span class=\"dashboard-item submenu-title\">" + dashboard.name + "</span></a></li>");
        });
        html.push("</ul>");
    }
}

function getUlClass(level) {
    return (level==2?"nav-second-level":level==3?"nav-third-level":level==4?"nav-fourth-level":level==5?"nav-fifth-level":"");
}

function getLiClass(level) {
    return (level==2?"fa-angle-right":level==3?"fa-angle-double-right":level==4?"fa-angle-triple-right":level==5?"fa-angle-four-right":"");
}

App.factory('BackdataFactory', ['$http', '$q',
	function($http, $q) {
        var backdata = {resolved: false};
        return {
            loadBackdata: function() {
                var deferred = $q.defer();
                if (backdata.resolved) {
                    deferred.resolve(backdata);
                }
                var deferredCategories = $q.defer();
                var deferredDashboards = $q.defer();
                $http.get('/getCategories').then(function(data) {
                    backdata.categories = data.data;
                    deferredCategories.resolve(data.data);
                });
                $http.get('/getDashboards').then(function(data) {
                    backdata.dashboards = data.data;
                    deferredDashboards.resolve(data.data);
                });

                function getResult(values) {
                    backdata.resolved = true;
                    deferred.resolve(backdata);
                }
                $q.all([deferredCategories.promise, deferredDashboards.promise]).then(getResult);

                return deferred.promise;
            }
        };
	}
]);

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

String.prototype.repeat = function (num) {
    return new Array(num + 1).join(this);
};

function getUriParamsPathFromObject(obj) {
    return Object.keys(obj).map(function(key){
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}

App.service('DiagramService', ['$http', '$q',
	function($http, $q) {
        this.getJson = function(file) {
            var deferred = $q.defer();
            $http.get('resources/'+file).then(function(data) {
                deferred.resolve(data.data);
            });
            return deferred.promise;
        };
	}
]);
