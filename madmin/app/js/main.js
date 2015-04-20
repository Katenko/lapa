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
    } else if (chart.type == 'map') {
        $scope.chartConfig = getMapOption(chart);
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

function getMapOption(chart) {
    return {
        options: {
            chart: {
                height: chart.height-10,
                width: getWinPx(chart.width, chart.dashboard)
            },

            legend: {
                layout: 'horizontal',
                borderWidth: 0,
                backgroundColor: 'rgba(255,255,255,0.45)',
                floating: true,
                verticalAlign: 'top',
                y: 15,
                align: 'left',
                x: 30

            },
            exporting: {
                filename: "map_" + chart.id
            },
            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                min: 1,
                type: 'logarithmic',
                minColor: '#EEEEFF',
                maxColor: '#000022',
                stops: [
                    [0, '#EFEFFF'],
                    [0.67, '#4444FF'],
                    [1, '#000022']
                ]
            }
        },
        chartType: 'map',
        title: {
            text: ''
        },
        series: [{
            animation: {
                duration: 1000
            },
            data: chart.x.data,
            mapData: Highcharts.maps[chart.mapName],
            joinBy: ['ID', 'code'],
            dataLabels: {
                enabled: chart.dataLabels,
                color: 'white',
                formatter: function () {
                    return this.point.options.name ? this.point.options.name : this.point.properties.shortName;
                }
            },
            name: chart.x.name,
            tooltip: {
                valueSuffix: '/км²'
            }
        }]
    };

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

/**
 * @license Highmaps JS v1.1.5 (2015-04-13)
 * Highmaps as a plugin for Highcharts 4.0.x or Highstock 2.0.x (x being the patch version of this file)
 *
 * (c) 2011-2014 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */

/*global HighchartsAdapter*/
(function (Highcharts) {


var UNDEFINED,
	Axis = Highcharts.Axis,
	Chart = Highcharts.Chart,
	Color = Highcharts.Color,
	Point = Highcharts.Point,
	Pointer = Highcharts.Pointer,
	Legend = Highcharts.Legend,
	LegendSymbolMixin = Highcharts.LegendSymbolMixin,
	Renderer = Highcharts.Renderer,
	Series = Highcharts.Series,
	SVGRenderer = Highcharts.SVGRenderer,
	VMLRenderer = Highcharts.VMLRenderer,
	
	addEvent = Highcharts.addEvent,
	each = Highcharts.each,
	error = Highcharts.error,
	extend = Highcharts.extend,
	extendClass = Highcharts.extendClass,
	merge = Highcharts.merge,
	pick = Highcharts.pick,
	defaultOptions = Highcharts.getOptions(),
	seriesTypes = Highcharts.seriesTypes,
	defaultPlotOptions = defaultOptions.plotOptions,
	wrap = Highcharts.wrap,
	noop = function () {};

	/**
 * Override to use the extreme coordinates from the SVG shape, not the
 * data values
 */
wrap(Axis.prototype, 'getSeriesExtremes', function (proceed) {
	var isXAxis = this.isXAxis,
		dataMin,
		dataMax,
		xData = [],
		useMapGeometry;

	// Remove the xData array and cache it locally so that the proceed method doesn't use it
	if (isXAxis) {
		each(this.series, function (series, i) {
			if (series.useMapGeometry) {
				xData[i] = series.xData;
				series.xData = [];
			}
		});
	}

	// Call base to reach normal cartesian series (like mappoint)
	proceed.call(this);

	// Run extremes logic for map and mapline
	if (isXAxis) {
		dataMin = pick(this.dataMin, Number.MAX_VALUE);
		dataMax = pick(this.dataMax, -Number.MAX_VALUE);
		each(this.series, function (series, i) {
			if (series.useMapGeometry) {
				dataMin = Math.min(dataMin, pick(series.minX, dataMin));
				dataMax = Math.max(dataMax, pick(series.maxX, dataMin));
				series.xData = xData[i]; // Reset xData array
				useMapGeometry = true;
			}
		});
		if (useMapGeometry) {
			this.dataMin = dataMin;
			this.dataMax = dataMax;
		}
	}
});

/**
 * Override axis translation to make sure the aspect ratio is always kept
 */
wrap(Axis.prototype, 'setAxisTranslation', function (proceed) {
	var chart = this.chart,
		mapRatio,
		plotRatio = chart.plotWidth / chart.plotHeight,
		adjustedAxisLength,
		xAxis = chart.xAxis[0],
		padAxis,
		fixTo,
		fixDiff,
		preserveAspectRatio;

	
	// Run the parent method
	proceed.call(this);

	// Check for map-like series
	if (this.coll === 'yAxis' && xAxis.transA !== UNDEFINED) {
		each(this.series, function (series) {
			if (series.preserveAspectRatio) {
				preserveAspectRatio = true;
			}
		});
	}
	
	// On Y axis, handle both
	if (preserveAspectRatio) {
		
		// Use the same translation for both axes
		this.transA = xAxis.transA = Math.min(this.transA, xAxis.transA);
		
		mapRatio = plotRatio / ((xAxis.max - xAxis.min) / (this.max - this.min));
		
		// What axis to pad to put the map in the middle
		padAxis = mapRatio < 1 ? this : xAxis;

		// Pad it
		adjustedAxisLength = (padAxis.max - padAxis.min) * padAxis.transA;
		padAxis.pixelPadding = padAxis.len - adjustedAxisLength;
		padAxis.minPixelPadding = padAxis.pixelPadding / 2;

		fixTo = padAxis.fixTo;
		if (fixTo) {
			fixDiff = fixTo[1] - padAxis.toValue(fixTo[0], true);
			fixDiff *= padAxis.transA;
			if (Math.abs(fixDiff) > padAxis.minPixelPadding || (padAxis.min === padAxis.dataMin && padAxis.max === padAxis.dataMax)) { // zooming out again, keep within restricted area
				fixDiff = 0;
			}
			padAxis.minPixelPadding -= fixDiff;
		}
	}
});

/**
 * Override Axis.render in order to delete the fixTo prop
 */
wrap(Axis.prototype, 'render', function (proceed) {
	proceed.call(this);
	this.fixTo = null;
});


/**
 * The ColorAxis object for inclusion in gradient legends
 */
var ColorAxis = Highcharts.ColorAxis = function () {
	this.isColorAxis = true;
	this.init.apply(this, arguments);
};
extend(ColorAxis.prototype, Axis.prototype);
extend(ColorAxis.prototype, {
	defaultColorAxisOptions: {
		lineWidth: 0,
		gridLineWidth: 1,
		tickPixelInterval: 72,
		startOnTick: true,
		endOnTick: true,
		offset: 0,
		marker: {
			animation: {
				duration: 50
			},
			color: 'gray',
			width: 0.01
		},
		labels: {
			overflow: 'justify'
		},
		minColor: '#EFEFFF',
		maxColor: '#003875',
		tickLength: 5
	},
	init: function (chart, userOptions) {
		var horiz = chart.options.legend.layout !== 'vertical',
			options;

		// Build the options
		options = merge(this.defaultColorAxisOptions, {
			side: horiz ? 2 : 1,
			reversed: !horiz
		}, userOptions, {
			isX: horiz,
			opposite: !horiz,
			showEmpty: false,
			title: null,
			isColor: true
		});

		Axis.prototype.init.call(this, chart, options);

		// Base init() pushes it to the xAxis array, now pop it again
		//chart[this.isXAxis ? 'xAxis' : 'yAxis'].pop();

		// Prepare data classes
		if (userOptions.dataClasses) {
			this.initDataClasses(userOptions);
		}
		this.initStops(userOptions);

		// Override original axis properties
		this.isXAxis = true;
		this.horiz = horiz;
		this.zoomEnabled = false;
	},

	/*
	 * Return an intermediate color between two colors, according to pos where 0
	 * is the from color and 1 is the to color. 
	 * NOTE: Changes here should be copied
	 * to the same function in drilldown.src.js and solid-gauge-src.js.
	 */
	tweenColors: function (from, to, pos) {
		// Check for has alpha, because rgba colors perform worse due to lack of
		// support in WebKit.
		var hasAlpha,
			ret;

		// Unsupported color, return to-color (#3920)
		if (!to.rgba.length || !from.rgba.length) {
			ret = to.raw || 'none';

		// Interpolate
		} else {
			from = from.rgba;
			to = to.rgba;
			hasAlpha = (to[3] !== 1 || from[3] !== 1);
			ret = (hasAlpha ? 'rgba(' : 'rgb(') + 
				Math.round(to[0] + (from[0] - to[0]) * (1 - pos)) + ',' + 
				Math.round(to[1] + (from[1] - to[1]) * (1 - pos)) + ',' + 
				Math.round(to[2] + (from[2] - to[2]) * (1 - pos)) + 
				(hasAlpha ? (',' + (to[3] + (from[3] - to[3]) * (1 - pos))) : '') + ')';
		}
		return ret;
	},

	initDataClasses: function (userOptions) {
		var axis = this,
			chart = this.chart,
			dataClasses,
			colorCounter = 0,
			options = this.options,
			len = userOptions.dataClasses.length;
		this.dataClasses = dataClasses = [];
		this.legendItems = [];

		each(userOptions.dataClasses, function (dataClass, i) {
			var colors;

			dataClass = merge(dataClass);
			dataClasses.push(dataClass);
			if (!dataClass.color) {
				if (options.dataClassColor === 'category') {
					colors = chart.options.colors;
					dataClass.color = colors[colorCounter++];
					// loop back to zero
					if (colorCounter === colors.length) {
						colorCounter = 0;
					}
				} else {
					dataClass.color = axis.tweenColors(
						Color(options.minColor), 
						Color(options.maxColor), 
						len < 2 ? 0.5 : i / (len - 1) // #3219
					);
				}
			}
		});
	},

	initStops: function (userOptions) {
		this.stops = userOptions.stops || [
			[0, this.options.minColor],
			[1, this.options.maxColor]
		];
		each(this.stops, function (stop) {
			stop.color = Color(stop[1]);
		});
	},

	/**
	 * Extend the setOptions method to process extreme colors and color
	 * stops.
	 */
	setOptions: function (userOptions) {
		Axis.prototype.setOptions.call(this, userOptions);

		this.options.crosshair = this.options.marker;
		this.coll = 'colorAxis';
	},

	setAxisSize: function () {
		var symbol = this.legendSymbol,
			chart = this.chart,
			x,
			y,
			width,
			height;

		if (symbol) {
			this.left = x = symbol.attr('x');
			this.top = y = symbol.attr('y');
			this.width = width = symbol.attr('width');
			this.height = height = symbol.attr('height');
			this.right = chart.chartWidth - x - width;
			this.bottom = chart.chartHeight - y - height;

			this.len = this.horiz ? width : height;
			this.pos = this.horiz ? x : y;
		}
	},

	/** 
	 * Translate from a value to a color
	 */
	toColor: function (value, point) {
		var pos,
			stops = this.stops,
			from,
			to,
			color,
			dataClasses = this.dataClasses,
			dataClass,
			i;

		if (dataClasses) {
			i = dataClasses.length;
			while (i--) {
				dataClass = dataClasses[i];
				from = dataClass.from;
				to = dataClass.to;
				if ((from === UNDEFINED || value >= from) && (to === UNDEFINED || value <= to)) {
					color = dataClass.color;
					if (point) {
						point.dataClass = i;
					}
					break;
				}	
			}

		} else {

			if (this.isLog) {
				value = this.val2lin(value);
			}
			pos = 1 - ((this.max - value) / ((this.max - this.min) || 1));
			i = stops.length;
			while (i--) {
				if (pos > stops[i][0]) {
					break;
				}
			}
			from = stops[i] || stops[i + 1];
			to = stops[i + 1] || from;

			// The position within the gradient
			pos = 1 - (to[0] - pos) / ((to[0] - from[0]) || 1);

			color = this.tweenColors(
				from.color, 
				to.color,
				pos
			);
		}
		return color;
	},

	getOffset: function () {
		var group = this.legendGroup,
			sideOffset = this.chart.axisOffset[this.side];
		
		if (group) {

			Axis.prototype.getOffset.call(this);
			
			if (!this.axisGroup.parentGroup) {

				// Move the axis elements inside the legend group
				this.axisGroup.add(group);
				this.gridGroup.add(group);
				this.labelGroup.add(group);

				this.added = true;

				this.labelLeft = 0;
				this.labelRight = this.width;
			}
			// Reset it to avoid color axis reserving space
			this.chart.axisOffset[this.side] = sideOffset;
		}
	},

	/**
	 * Create the color gradient
	 */
	setLegendColor: function () {
		var grad,
			horiz = this.horiz,
			options = this.options,
			reversed = this.reversed;

		grad = horiz ? [+reversed, 0, +!reversed, 0] : [0, +!reversed, 0, +reversed]; // #3190
		this.legendColor = {
			linearGradient: { x1: grad[0], y1: grad[1], x2: grad[2], y2: grad[3] },
			stops: options.stops || [
				[0, options.minColor],
				[1, options.maxColor]
			]
		};
	},

	/**
	 * The color axis appears inside the legend and has its own legend symbol
	 */
	drawLegendSymbol: function (legend, item) {
		var padding = legend.padding,
			legendOptions = legend.options,
			horiz = this.horiz,
			box,
			width = pick(legendOptions.symbolWidth, horiz ? 200 : 12),
			height = pick(legendOptions.symbolHeight, horiz ? 12 : 200),
			labelPadding = pick(legendOptions.labelPadding, horiz ? 16 : 30),
			itemDistance = pick(legendOptions.itemDistance, 10);

		this.setLegendColor();

		// Create the gradient
		item.legendSymbol = this.chart.renderer.rect(
			0,
			legend.baseline - 11,
			width,
			height
		).attr({
			zIndex: 1
		}).add(item.legendGroup);
		box = item.legendSymbol.getBBox();

		// Set how much space this legend item takes up
		this.legendItemWidth = width + padding + (horiz ? itemDistance : labelPadding);
		this.legendItemHeight = height + padding + (horiz ? labelPadding : 0);
	},
	/**
	 * Fool the legend
	 */
	setState: noop,
	visible: true,
	setVisible: noop,
	getSeriesExtremes: function () {
		var series;
		if (this.series.length) {
			series = this.series[0];
			this.dataMin = series.valueMin;
			this.dataMax = series.valueMax;
		}
	},
	drawCrosshair: function (e, point) {
		var plotX = point && point.plotX,
			plotY = point && point.plotY,
			crossPos,
			axisPos = this.pos,
			axisLen = this.len;
		
		if (point) {
			crossPos = this.toPixels(point[point.series.colorKey]);
			if (crossPos < axisPos) {
				crossPos = axisPos - 2;
			} else if (crossPos > axisPos + axisLen) {
				crossPos = axisPos + axisLen + 2;
			}
			
			point.plotX = crossPos;
			point.plotY = this.len - crossPos;
			Axis.prototype.drawCrosshair.call(this, e, point);
			point.plotX = plotX;
			point.plotY = plotY;
			
			if (this.cross) {
				this.cross
					.attr({
						fill: this.crosshair.color
					})
					.add(this.legendGroup);
			}
		}
	},
	getPlotLinePath: function (a, b, c, d, pos) {
		if (typeof pos === 'number') { // crosshairs only // #3969 pos can be 0 !!
			return this.horiz ? 
				['M', pos - 4, this.top - 6, 'L', pos + 4, this.top - 6, pos, this.top, 'Z'] : 
				['M', this.left, pos, 'L', this.left - 6, pos + 6, this.left - 6, pos - 6, 'Z'];
		} else {
			return Axis.prototype.getPlotLinePath.call(this, a, b, c, d);
		}
	},

	update: function (newOptions, redraw) {
		each(this.series, function (series) {
			series.isDirtyData = true; // Needed for Axis.update when choropleth colors change
		});
		Axis.prototype.update.call(this, newOptions, redraw);
		if (this.legendItem) {
			this.setLegendColor();
			this.chart.legend.colorizeItem(this, true);
		}
	},

	/**
	 * Get the legend item symbols for data classes
	 */
	getDataClassLegendSymbols: function () {
		var axis = this,
			chart = this.chart,
			legendItems = this.legendItems,
			legendOptions = chart.options.legend,
			valueDecimals = legendOptions.valueDecimals,
			valueSuffix = legendOptions.valueSuffix || '',
			name;

		if (!legendItems.length) {
			each(this.dataClasses, function (dataClass, i) {
				var vis = true,
					from = dataClass.from,
					to = dataClass.to;
				
				// Assemble the default name. This can be overridden by legend.options.labelFormatter
				name = '';
				if (from === UNDEFINED) {
					name = '< ';
				} else if (to === UNDEFINED) {
					name = '> ';
				}
				if (from !== UNDEFINED) {
					name += Highcharts.numberFormat(from, valueDecimals) + valueSuffix;
				}
				if (from !== UNDEFINED && to !== UNDEFINED) {
					name += ' - ';
				}
				if (to !== UNDEFINED) {
					name += Highcharts.numberFormat(to, valueDecimals) + valueSuffix;
				}
				
				// Add a mock object to the legend items
				legendItems.push(extend({
					chart: chart,
					name: name,
					options: {},
					drawLegendSymbol: LegendSymbolMixin.drawRectangle,
					visible: true,
					setState: noop,
					setVisible: function () {
						vis = this.visible = !vis;
						each(axis.series, function (series) {
							each(series.points, function (point) {
								if (point.dataClass === i) {
									point.setVisible(vis);
								}
							});
						});
						
						chart.legend.colorizeItem(this, vis);
					}
				}, dataClass));
			});
		}
		return legendItems;
	},
	name: '' // Prevents 'undefined' in legend in IE8
});

/**
 * Handle animation of the color attributes directly
 */
each(['fill', 'stroke'], function (prop) {
	HighchartsAdapter.addAnimSetter(prop, function (fx) {
		fx.elem.attr(prop, ColorAxis.prototype.tweenColors(Color(fx.start), Color(fx.end), fx.pos));
	});
});

/**
 * Extend the chart getAxes method to also get the color axis
 */
wrap(Chart.prototype, 'getAxes', function (proceed) {

	var options = this.options,
		colorAxisOptions = options.colorAxis;

	proceed.call(this);

	this.colorAxis = [];
	if (colorAxisOptions) {
		proceed = new ColorAxis(this, colorAxisOptions); // Fake assignment for jsLint
	}
});


/**
 * Wrap the legend getAllItems method to add the color axis. This also removes the 
 * axis' own series to prevent them from showing up individually.
 */
wrap(Legend.prototype, 'getAllItems', function (proceed) {
	var allItems = [],
		colorAxis = this.chart.colorAxis[0];

	if (colorAxis) {

		// Data classes
		if (colorAxis.options.dataClasses) {
			allItems = allItems.concat(colorAxis.getDataClassLegendSymbols());
		// Gradient legend
		} else {
			// Add this axis on top
			allItems.push(colorAxis);
		}

		// Don't add the color axis' series
		each(colorAxis.series, function (series) {
			series.options.showInLegend = false;
		});
	}

	return allItems.concat(proceed.call(this));
});/**
 * Mixin for maps and heatmaps
 */
var colorSeriesMixin = {

	pointAttrToOptions: { // mapping between SVG attributes and the corresponding options
		stroke: 'borderColor',
		'stroke-width': 'borderWidth',
		fill: 'color',
		dashstyle: 'dashStyle'
	},
	pointArrayMap: ['value'],
	axisTypes: ['xAxis', 'yAxis', 'colorAxis'],
	optionalAxis: 'colorAxis',
	trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
	getSymbol: noop,
	parallelArrays: ['x', 'y', 'value'],
	colorKey: 'value',
	
	/**
	 * In choropleth maps, the color is a result of the value, so this needs translation too
	 */
	translateColors: function () {
		var series = this,
			nullColor = this.options.nullColor,
			colorAxis = this.colorAxis,
			colorKey = this.colorKey;

		each(this.data, function (point) {
			var value = point[colorKey],
				color;

			color = value === null ? nullColor : (colorAxis && value !== undefined) ? colorAxis.toColor(value, point) : point.color || series.color;

			if (color) {
				point.color = color;
			}
		});
	}
};
// Add events to the Chart object itself
extend(Chart.prototype, {
	renderMapNavigation: function () {
		var chart = this,
			options = this.options.mapNavigation,
			buttons = options.buttons,
			n,
			button,
			buttonOptions,
			attr,
			states,
			outerHandler = function () { 
				this.handler.call(chart); 
			};

		if (pick(options.enableButtons, options.enabled) && !chart.renderer.forExport) {
			for (n in buttons) {
				if (buttons.hasOwnProperty(n)) {
					buttonOptions = merge(options.buttonOptions, buttons[n]);
					attr = buttonOptions.theme;
					attr.style = merge(buttonOptions.theme.style, buttonOptions.style); // #3203
					states = attr.states;
					button = chart.renderer.button(
							buttonOptions.text, 
							0, 
							0, 
							outerHandler, 
							attr, 
							states && states.hover,
							states && states.select, 
							0, 
							n === 'zoomIn' ? 'topbutton' : 'bottombutton'
						)
						.attr({
							width: buttonOptions.width,
							height: buttonOptions.height,
							title: chart.options.lang[n],
							zIndex: 5
						})					
						.add();
					button.handler = buttonOptions.onclick;
					button.align(extend(buttonOptions, { width: button.width, height: 2 * button.height }), null, buttonOptions.alignTo);
				}
			}
		}
	},

	/**
	 * Fit an inner box to an outer. If the inner box overflows left or right, align it to the sides of the
	 * outer. If it overflows both sides, fit it within the outer. This is a pattern that occurs more places
	 * in Highcharts, perhaps it should be elevated to a common utility function.
	 */
	fitToBox: function (inner, outer) {
		each([['x', 'width'], ['y', 'height']], function (dim) {
			var pos = dim[0],
				size = dim[1];

			if (inner[pos] + inner[size] > outer[pos] + outer[size]) { // right overflow
				if (inner[size] > outer[size]) { // the general size is greater, fit fully to outer
					inner[size] = outer[size];
					inner[pos] = outer[pos];
				} else { // align right
					inner[pos] = outer[pos] + outer[size] - inner[size];
				}
			}
			if (inner[size] > outer[size]) {
				inner[size] = outer[size];
			}
			if (inner[pos] < outer[pos]) {
				inner[pos] = outer[pos];
			}
		});
		

		return inner;
	},

	/**
	 * Zoom the map in or out by a certain amount. Less than 1 zooms in, greater than 1 zooms out.
	 */
	mapZoom: function (howMuch, centerXArg, centerYArg, mouseX, mouseY) {
		/*if (this.isMapZooming) {
			this.mapZoomQueue = arguments;
			return;
		}*/

		var chart = this,
			xAxis = chart.xAxis[0],
			xRange = xAxis.max - xAxis.min,
			centerX = pick(centerXArg, xAxis.min + xRange / 2),
			newXRange = xRange * howMuch,
			yAxis = chart.yAxis[0],
			yRange = yAxis.max - yAxis.min,
			centerY = pick(centerYArg, yAxis.min + yRange / 2),
			newYRange = yRange * howMuch,
			fixToX = mouseX ? ((mouseX - xAxis.pos) / xAxis.len) : 0.5,
			fixToY = mouseY ? ((mouseY - yAxis.pos) / yAxis.len) : 0.5,
			newXMin = centerX - newXRange * fixToX,
			newYMin = centerY - newYRange * fixToY,
			newExt = chart.fitToBox({
				x: newXMin,
				y: newYMin,
				width: newXRange,
				height: newYRange
			}, {
				x: xAxis.dataMin,
				y: yAxis.dataMin,
				width: xAxis.dataMax - xAxis.dataMin,
				height: yAxis.dataMax - yAxis.dataMin
			});

		// When mousewheel zooming, fix the point under the mouse
		if (mouseX) {
			xAxis.fixTo = [mouseX - xAxis.pos, centerXArg];
		}
		if (mouseY) {
			yAxis.fixTo = [mouseY - yAxis.pos, centerYArg];
		}

		// Zoom
		if (howMuch !== undefined) {
			xAxis.setExtremes(newExt.x, newExt.x + newExt.width, false);
			yAxis.setExtremes(newExt.y, newExt.y + newExt.height, false);

		// Reset zoom
		} else {
			xAxis.setExtremes(undefined, undefined, false);
			yAxis.setExtremes(undefined, undefined, false);
		}
		
		// Prevent zooming until this one is finished animating
		/*chart.holdMapZoom = true;
		setTimeout(function () {
			chart.holdMapZoom = false;
		}, 200);*/
		/*delay = animation ? animation.duration || 500 : 0;
		if (delay) {
			chart.isMapZooming = true;
			setTimeout(function () {
				chart.isMapZooming = false;
				if (chart.mapZoomQueue) {
					chart.mapZoom.apply(chart, chart.mapZoomQueue);
				}
				chart.mapZoomQueue = null;
			}, delay);
		}*/

		chart.redraw();
	}
});

/**
 * Extend the Chart.render method to add zooming and panning
 */
wrap(Chart.prototype, 'render', function (proceed) {
	var chart = this,
		mapNavigation = chart.options.mapNavigation;

	// Render the plus and minus buttons. Doing this before the shapes makes getBBox much quicker, at least in Chrome.
	chart.renderMapNavigation();

	proceed.call(chart);

	// Add the double click event
	if (pick(mapNavigation.enableDoubleClickZoom, mapNavigation.enabled) || mapNavigation.enableDoubleClickZoomTo) {
		addEvent(chart.container, 'dblclick', function (e) {
			chart.pointer.onContainerDblClick(e);
		});
	}

	// Add the mousewheel event
	if (pick(mapNavigation.enableMouseWheelZoom, mapNavigation.enabled)) {
		addEvent(chart.container, document.onmousewheel === undefined ? 'DOMMouseScroll' : 'mousewheel', function (e) {
			chart.pointer.onContainerMouseWheel(e);
			return false;
		});
	}
});

// Extend the Pointer
extend(Pointer.prototype, {

	/**
	 * The event handler for the doubleclick event
	 */
	onContainerDblClick: function (e) {
		var chart = this.chart;

		e = this.normalize(e);

		if (chart.options.mapNavigation.enableDoubleClickZoomTo) {
			if (chart.pointer.inClass(e.target, 'highcharts-tracker')) {
				chart.hoverPoint.zoomTo();
			}
		} else if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
			chart.mapZoom(
				0.5,
				chart.xAxis[0].toValue(e.chartX),
				chart.yAxis[0].toValue(e.chartY),
				e.chartX, 
				e.chartY
			);
		}
	},

	/**
	 * The event handler for the mouse scroll event
	 */
	onContainerMouseWheel: function (e) {
		var chart = this.chart,
			delta;

		e = this.normalize(e);

		// Firefox uses e.detail, WebKit and IE uses wheelDelta
		delta = e.detail || -(e.wheelDelta / 120);
		if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
			chart.mapZoom(
				//delta > 0 ? 2 : 0.5,
				Math.pow(2, delta),
				chart.xAxis[0].toValue(e.chartX),
				chart.yAxis[0].toValue(e.chartY),
				e.chartX,
				e.chartY
			);
		}
	}
});

// Implement the pinchType option
wrap(Pointer.prototype, 'init', function (proceed, chart, options) {

	proceed.call(this, chart, options);

	// Pinch status
	if (pick(options.mapNavigation.enableTouchZoom, options.mapNavigation.enabled)) {
		this.pinchX = this.pinchHor = this.pinchY = this.pinchVert = this.hasZoom = true;
	}
});

// Extend the pinchTranslate method to preserve fixed ratio when zooming
wrap(Pointer.prototype, 'pinchTranslate', function (proceed, pinchDown, touches, transform, selectionMarker, clip, lastValidTouch) {
	var xBigger;
	proceed.call(this, pinchDown, touches, transform, selectionMarker, clip, lastValidTouch);

	// Keep ratio
	if (this.chart.options.chart.type === 'map' && this.hasZoom) {
		xBigger = transform.scaleX > transform.scaleY;
		this.pinchTranslateDirection(
			!xBigger, 
			pinchDown, 
			touches, 
			transform, 
			selectionMarker, 
			clip, 
			lastValidTouch, 
			xBigger ? transform.scaleX : transform.scaleY
		);
	}
});


// The vector-effect attribute is not supported in IE <= 11 (at least), so we need 
// diffent logic (#3218)
var supportsVectorEffect = document.documentElement.style.vectorEffect !== undefined;

/**
 * Extend the default options with map options
 */
defaultPlotOptions.map = merge(defaultPlotOptions.scatter, {
	allAreas: true,

	animation: false, // makes the complex shapes slow
	nullColor: '#F8F8F8',
	borderColor: 'silver',
	borderWidth: 1,
	marker: null,
	stickyTracking: false,
	dataLabels: {
		formatter: function () { // #2945
			return this.point.value;
		},
		inside: true, // for the color
		verticalAlign: 'middle',
		crop: false,
		overflow: false,
		padding: 0
	},
	turboThreshold: 0,
	tooltip: {
		followPointer: true,
		pointFormat: '{point.name}: {point.value}<br/>'
	},
	states: {
		normal: {
			animation: true
		},
		hover: {
			brightness: 0.2,
			halo: null
		}
	}
});

/**
 * The MapAreaPoint object
 */
var MapAreaPoint = extendClass(Point, {
	/**
	 * Extend the Point object to split paths
	 */
	applyOptions: function (options, x) {

		var point = Point.prototype.applyOptions.call(this, options, x),
			series = this.series,
			joinBy = series.joinBy,
			mapPoint;

		if (series.mapData) {
			mapPoint = point[joinBy[1]] !== undefined && series.mapMap[point[joinBy[1]]];
			if (mapPoint) {
				// This applies only to bubbles
				if (series.xyFromShape) {
					point.x = mapPoint._midX;
					point.y = mapPoint._midY;
				}
				extend(point, mapPoint); // copy over properties
			} else {
				point.value = point.value || null;
			}
		}
		
		return point;
	},

	/**
	 * Set the visibility of a single map area
	 */
	setVisible: function (vis) {
		var point = this,
			method = vis ? 'show' : 'hide';

		// Show and hide associated elements
		each(['graphic', 'dataLabel'], function (key) {
			if (point[key]) {
				point[key][method]();
			}
		});
	},

	/**
	 * Stop the fade-out 
	 */
	onMouseOver: function (e) {
		clearTimeout(this.colorInterval);
		if (this.value !== null) {
			Point.prototype.onMouseOver.call(this, e);
		} else { //#3401 Tooltip doesn't hide when hovering over null points
			this.series.onMouseOut(e);
		}
	},
	/**
	 * Custom animation for tweening out the colors. Animation reduces blinking when hovering
	 * over islands and coast lines. We run a custom implementation of animation becuase we
	 * need to be able to run this independently from other animations like zoom redraw. Also,
	 * adding color animation to the adapters would introduce almost the same amount of code.
	 */
	onMouseOut: function () {
		var point = this,
			start = +new Date(),
			normalColor = Color(point.color),
			hoverColor = Color(point.pointAttr.hover.fill),
			animation = point.series.options.states.normal.animation,
			duration = animation && (animation.duration || 500),
			fill;

		if (duration && normalColor.rgba.length === 4 && hoverColor.rgba.length === 4 && point.state !== 'select') {
			fill = point.pointAttr[''].fill;
			delete point.pointAttr[''].fill; // avoid resetting it in Point.setState

			clearTimeout(point.colorInterval);
			point.colorInterval = setInterval(function () {
				var pos = (new Date() - start) / duration,
					graphic = point.graphic;
				if (pos > 1) {
					pos = 1;
				}
				if (graphic) {
					graphic.attr('fill', ColorAxis.prototype.tweenColors.call(0, hoverColor, normalColor, pos));
				}
				if (pos >= 1) {
					clearTimeout(point.colorInterval);
				}
			}, 13);
		}
		Point.prototype.onMouseOut.call(point);

		if (fill) {
			point.pointAttr[''].fill = fill;
		}
	},

	/**
	 * Zoom the chart to view a specific area point
	 */
	zoomTo: function () {
		var point = this,
			series = point.series;

		series.xAxis.setExtremes(
			point._minX,
			point._maxX,
			false
		);
		series.yAxis.setExtremes(
			point._minY,
			point._maxY,
			false
		);
		series.chart.redraw();
	}
});

/**
 * Add the series type
 */
seriesTypes.map = extendClass(seriesTypes.scatter, merge(colorSeriesMixin, {
	type: 'map',
	pointClass: MapAreaPoint,
	supportsDrilldown: true,
	getExtremesFromAll: true,
	useMapGeometry: true, // get axis extremes from paths, not values
	forceDL: true,
	searchPoint: noop,
	preserveAspectRatio: true, // X axis and Y axis must have same translation slope
	/**
	 * Get the bounding box of all paths in the map combined.
	 */
	getBox: function (paths) {
		var MAX_VALUE = Number.MAX_VALUE,
			maxX = -MAX_VALUE, 
			minX =  MAX_VALUE, 
			maxY = -MAX_VALUE, 
			minY =  MAX_VALUE,
			minRange = MAX_VALUE,
			xAxis = this.xAxis,
			yAxis = this.yAxis,
			hasBox;
		
		// Find the bounding box
		each(paths || [], function (point) {

			if (point.path) {
				if (typeof point.path === 'string') {
					point.path = Highcharts.splitPath(point.path);
				}

				var path = point.path || [],
					i = path.length,
					even = false, // while loop reads from the end
					pointMaxX = -MAX_VALUE, 
					pointMinX =  MAX_VALUE, 
					pointMaxY = -MAX_VALUE, 
					pointMinY =  MAX_VALUE,
					properties = point.properties;

				// The first time a map point is used, analyze its box
				if (!point._foundBox) {
					while (i--) {
						if (typeof path[i] === 'number' && !isNaN(path[i])) {
							if (even) { // even = x
								pointMaxX = Math.max(pointMaxX, path[i]);
								pointMinX = Math.min(pointMinX, path[i]);
							} else { // odd = Y
								pointMaxY = Math.max(pointMaxY, path[i]);
								pointMinY = Math.min(pointMinY, path[i]);
							}
							even = !even;
						}
					}
					// Cache point bounding box for use to position data labels, bubbles etc
					point._midX = pointMinX + (pointMaxX - pointMinX) * 
						(point.middleX || (properties && properties['hc-middle-x']) || 0.5); // pick is slower and very marginally needed
					point._midY = pointMinY + (pointMaxY - pointMinY) * 
						(point.middleY || (properties && properties['hc-middle-y']) || 0.5);
					point._maxX = pointMaxX;
					point._minX = pointMinX;
					point._maxY = pointMaxY;
					point._minY = pointMinY;
					point.labelrank = pick(point.labelrank, (pointMaxX - pointMinX) * (pointMaxY - pointMinY));
					point._foundBox = true;
				}

				maxX = Math.max(maxX, point._maxX);
				minX = Math.min(minX, point._minX);
				maxY = Math.max(maxY, point._maxY);
				minY = Math.min(minY, point._minY);
				minRange = Math.min(point._maxX - point._minX, point._maxY - point._minY, minRange);
				hasBox = true;
			}
		});

		// Set the box for the whole series
		if (hasBox) {
			this.minY = Math.min(minY, pick(this.minY, MAX_VALUE));
			this.maxY = Math.max(maxY, pick(this.maxY, -MAX_VALUE));
			this.minX = Math.min(minX, pick(this.minX, MAX_VALUE));
			this.maxX = Math.max(maxX, pick(this.maxX, -MAX_VALUE));

			// If no minRange option is set, set the default minimum zooming range to 5 times the 
			// size of the smallest element
			if (xAxis && xAxis.options.minRange === undefined) {
				xAxis.minRange = Math.min(5 * minRange, (this.maxX - this.minX) / 5, xAxis.minRange || MAX_VALUE);
			}
			if (yAxis && yAxis.options.minRange === undefined) {
				yAxis.minRange = Math.min(5 * minRange, (this.maxY - this.minY) / 5, yAxis.minRange || MAX_VALUE);
			}
		}
	},
	
	getExtremes: function () {
		// Get the actual value extremes for colors
		Series.prototype.getExtremes.call(this, this.valueData);

		// Recalculate box on updated data
		if (this.chart.hasRendered && this.isDirtyData) {
			this.getBox(this.options.data);
		}

		this.valueMin = this.dataMin;
		this.valueMax = this.dataMax;

		// Extremes for the mock Y axis
		this.dataMin = this.minY;
		this.dataMax = this.maxY;
	},
	
	/**
	 * Translate the path so that it automatically fits into the plot area box
	 * @param {Object} path
	 */
	translatePath: function (path) {
		
		var series = this,
			even = false, // while loop reads from the end
			xAxis = series.xAxis,
			yAxis = series.yAxis,
			xMin = xAxis.min,
			xTransA = xAxis.transA,
			xMinPixelPadding = xAxis.minPixelPadding,
			yMin = yAxis.min,
			yTransA = yAxis.transA,
			yMinPixelPadding = yAxis.minPixelPadding,
			i,
			ret = []; // Preserve the original

		// Do the translation
		if (path) {
			i = path.length;
			while (i--) {
				if (typeof path[i] === 'number') {
					ret[i] = even ? 
						(path[i] - xMin) * xTransA + xMinPixelPadding :
						(path[i] - yMin) * yTransA + yMinPixelPadding;
					even = !even;
				} else {
					ret[i] = path[i];
				}
			}
		}

		return ret;
	},
	
	/**
	 * Extend setData to join in mapData. If the allAreas option is true, all areas 
	 * from the mapData are used, and those that don't correspond to a data value
	 * are given null values.
	 */
	setData: function (data, redraw) {
		var options = this.options,
			mapData = options.mapData,
			joinBy = options.joinBy,
			joinByNull = joinBy === null,
			dataUsed = [],
			mapPoint,
			transform,
			mapTransforms,
			props,
			i;

		if (joinByNull) {
			joinBy = '_i';
		}
		joinBy = this.joinBy = Highcharts.splat(joinBy);
		if (!joinBy[1]) {
			joinBy[1] = joinBy[0];
		}

		// Pick up numeric values, add index
		if (data) {
			each(data, function (val, i) {
				if (typeof val === 'number') {
					data[i] = {
						value: val
					};
				}
				if (joinByNull) {
					data[i]._i = i;
				}
			});
		}

		this.getBox(data);
		if (mapData) {
			if (mapData.type === 'FeatureCollection') {
				if (mapData['hc-transform']) {
					this.chart.mapTransforms = mapTransforms = mapData['hc-transform'];
					// Cache cos/sin of transform rotation angle
					for (transform in mapTransforms) {
						if (mapTransforms.hasOwnProperty(transform) && transform.rotation) {							
							transform.cosAngle = Math.cos(transform.rotation);
							transform.sinAngle = Math.sin(transform.rotation);							
						}
					}
				}
				mapData = Highcharts.geojson(mapData, this.type, this);
			}

			this.getBox(mapData);
			this.mapData = mapData;
			this.mapMap = {};
			
			for (i = 0; i < mapData.length; i++) {
				mapPoint = mapData[i];
				props = mapPoint.properties;

				mapPoint._i = i;
				// Copy the property over to root for faster access
				if (joinBy[0] && props && props[joinBy[0]]) {
					mapPoint[joinBy[0]] = props[joinBy[0]];
				}
				this.mapMap[mapPoint[joinBy[0]]] = mapPoint;
			}

			if (options.allAreas) {

				data = data || [];

				// Registered the point codes that actually hold data
				if (joinBy[1]) {
					each(data, function (point) {
						dataUsed.push(point[joinBy[1]]);
					});
				}

				// Add those map points that don't correspond to data, which will be drawn as null points
				dataUsed = '|' + dataUsed.join('|') + '|'; // String search is faster than array.indexOf 

				each(mapData, function (mapPoint) {
					if (!joinBy[0] || dataUsed.indexOf('|' + mapPoint[joinBy[0]] + '|') === -1) {
						data.push(merge(mapPoint, { value: null }));
					}
				});
			}
		}
		Series.prototype.setData.call(this, data, redraw);
	},

	
	/**
	 * No graph for the map series
	 */
	drawGraph: noop,
	
	/**
	 * We need the points' bounding boxes in order to draw the data labels, so 
	 * we skip it now and call it from drawPoints instead.
	 */
	drawDataLabels: noop,

	/**
	 * Allow a quick redraw by just translating the area group. Used for zooming and panning
	 * in capable browsers.
	 */
	doFullTranslate: function () {
		return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans;
	},
	
	/**
	 * Add the path option for data points. Find the max value for color calculation.
	 */
	translate: function () {
		var series = this,
			xAxis = series.xAxis,
			yAxis = series.yAxis,
			doFullTranslate = series.doFullTranslate();

		series.generatePoints();
		
		each(series.data, function (point) {
		
			// Record the middle point (loosely based on centroid), determined
			// by the middleX and middleY options.
			point.plotX = xAxis.toPixels(point._midX, true);
			point.plotY = yAxis.toPixels(point._midY, true);

			if (doFullTranslate) {
		
				point.shapeType = 'path';
				point.shapeArgs = {
					d: series.translatePath(point.path)
				};
				if (supportsVectorEffect) {
					point.shapeArgs['vector-effect'] = 'non-scaling-stroke';
				}
			}
		});
		
		series.translateColors();
	},
	
	/** 
	 * Use the drawPoints method of column, that is able to handle simple shapeArgs.
	 * Extend it by assigning the tooltip position.
	 */
	drawPoints: function () {
		var series = this,
			xAxis = series.xAxis,
			yAxis = series.yAxis,
			group = series.group,
			chart = series.chart,
			renderer = chart.renderer,
			scaleX,
			scaleY,
			translateX,
			translateY,
			baseTrans = this.baseTrans;

		// Set a group that handles transform during zooming and panning in order to preserve clipping
		// on series.group
		if (!series.transformGroup) {
			series.transformGroup = renderer.g()
				.attr({
					scaleX: 1,
					scaleY: 1
				})
				.add(group);
			series.transformGroup.survive = true;
		}
		
		// Draw the shapes again
		if (series.doFullTranslate()) {

			// Individual point actions	
			if (chart.hasRendered && series.pointAttrToOptions.fill === 'color') {
				each(series.points, function (point) {

					// Reset color on update/redraw
					if (point.graphic) {
						point.graphic.attr('fill', point.color);
					}

				});
			}

			// If vector-effect is not supported, we set the stroke-width on the group element
			// and let all point graphics inherit. That way we don't have to iterate over all 
			// points to update the stroke-width on zooming.
			if (!supportsVectorEffect) {
				each(series.points, function (point) {
					var attr = point.pointAttr[''];
					if (attr['stroke-width'] === series.pointAttr['']['stroke-width']) {
						attr['stroke-width'] = 'inherit';
					}
				});
			}

			// Draw them in transformGroup
			series.group = series.transformGroup;
			seriesTypes.column.prototype.drawPoints.apply(series);
			series.group = group; // Reset

			// Add class names
			each(series.points, function (point) {
				if (point.graphic) {
					if (point.name) {
						point.graphic.addClass('highcharts-name-' + point.name.replace(' ', '-').toLowerCase());
					}
					if (point.properties && point.properties['hc-key']) {
						point.graphic.addClass('highcharts-key-' + point.properties['hc-key'].toLowerCase());
					}

					if (!supportsVectorEffect) {
						point.graphic['stroke-widthSetter'] = noop;
					}
				}
			});

			// Set the base for later scale-zooming. The originX and originY properties are the 
			// axis values in the plot area's upper left corner.
			this.baseTrans = {
				originX: xAxis.min - xAxis.minPixelPadding / xAxis.transA,
				originY: yAxis.min - yAxis.minPixelPadding / yAxis.transA + (yAxis.reversed ? 0 : yAxis.len / yAxis.transA), 
				transAX: xAxis.transA,
				transAY: yAxis.transA
			};

			// Reset transformation in case we're doing a full translate (#3789)
			this.transformGroup.animate({
				translateX: 0,
				translateY: 0,
				scaleX: 1,
				scaleY: 1
			});

		// Just update the scale and transform for better performance
		} else {
			scaleX = xAxis.transA / baseTrans.transAX;
			scaleY = yAxis.transA / baseTrans.transAY;
			translateX = xAxis.toPixels(baseTrans.originX, true);
			translateY = yAxis.toPixels(baseTrans.originY, true);

			// Handle rounding errors in normal view (#3789)
			if (scaleX > 0.99 && scaleX < 1.01 && scaleY > 0.99 && scaleY < 1.01) {
				scaleX = 1;
				scaleY = 1;
				translateX = Math.round(translateX);
				translateY = Math.round(translateY);
			}

			this.transformGroup.animate({
				translateX: translateX,
				translateY: translateY,
				scaleX: scaleX,
				scaleY: scaleY
			});

		}

		// Set the stroke-width directly on the group element so the children inherit it. We need to use 
		// setAttribute directly, because the stroke-widthSetter method expects a stroke color also to be 
		// set.
		if (!supportsVectorEffect) {
			series.group.element.setAttribute('stroke-width', series.options.borderWidth / (scaleX || 1));
		}

		this.drawMapDataLabels();
		
		
	},

	/**
	 * Draw the data labels. Special for maps is the time that the data labels are drawn (after points),
	 * and the clipping of the dataLabelsGroup.
	 */		
	drawMapDataLabels: function () {

		Series.prototype.drawDataLabels.call(this);
		if (this.dataLabelsGroup) {
			this.dataLabelsGroup.clip(this.chart.clipRect);
		}
	},

	/**
	 * Override render to throw in an async call in IE8. Otherwise it chokes on the US counties demo.
	 */
	render: function () {
		var series = this,
			render = Series.prototype.render;

		// Give IE8 some time to breathe.
		if (series.chart.renderer.isVML && series.data.length > 3000) {
			setTimeout(function () {
				render.call(series);
			});
		} else {
			render.call(series);
		}
	},

	/**
	 * The initial animation for the map series. By default, animation is disabled. 
	 * Animation of map shapes is not at all supported in VML browsers.
	 */
	animate: function (init) {
		var chart = this.chart,
			animation = this.options.animation,
			group = this.group,
			xAxis = this.xAxis,
			yAxis = this.yAxis,
			left = xAxis.pos,
			top = yAxis.pos;

		if (chart.renderer.isSVG) {

			if (animation === true) {
				animation = {
					duration: 1000
				};
			}

			// Initialize the animation
			if (init) {
			
				// Scale down the group and place it in the center
				group.attr({
					translateX: left + xAxis.len / 2,
					translateY: top + yAxis.len / 2,
					scaleX: 0.001, // #1499
					scaleY: 0.001
				});
			
			// Run the animation
			} else {
				group.animate({
					translateX: left,
					translateY: top,
					scaleX: 1,
					scaleY: 1
				}, animation);
			
				// Delete this function to allow it only once
				this.animate = null;
			}
		}
	},

	/**
	 * Animate in the new series from the clicked point in the old series.
	 * Depends on the drilldown.js module
	 */
	animateDrilldown: function (init) {
		var toBox = this.chart.plotBox,
			level = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
			fromBox = level.bBox,
			animationOptions = this.chart.options.drilldown.animation,
			scale;
			
		if (!init) {

			scale = Math.min(fromBox.width / toBox.width, fromBox.height / toBox.height);
			level.shapeArgs = {
				scaleX: scale,
				scaleY: scale,
				translateX: fromBox.x,
				translateY: fromBox.y
			};
			
			// TODO: Animate this.group instead
			each(this.points, function (point) {

				point.graphic
					.attr(level.shapeArgs)
					.animate({
						scaleX: 1,
						scaleY: 1,
						translateX: 0,
						translateY: 0
					}, animationOptions);

			});

			this.animate = null;
		}
		
	},

	drawLegendSymbol: LegendSymbolMixin.drawRectangle,

	/**
	 * When drilling up, pull out the individual point graphics from the lower series
	 * and animate them into the origin point in the upper series.
	 */
	animateDrillupFrom: function (level) {
		seriesTypes.column.prototype.animateDrillupFrom.call(this, level);
	},


	/**
	 * When drilling up, keep the upper series invisible until the lower series has
	 * moved into place
	 */
	animateDrillupTo: function (init) {
		seriesTypes.column.prototype.animateDrillupTo.call(this, init);
	}
}));


// The mapline series type
defaultPlotOptions.mapline = merge(defaultPlotOptions.map, {
	lineWidth: 1,
	fillColor: 'none'
});
seriesTypes.mapline = extendClass(seriesTypes.map, {
	type: 'mapline',
	pointAttrToOptions: { // mapping between SVG attributes and the corresponding options
		stroke: 'color',
		'stroke-width': 'lineWidth',
		fill: 'fillColor',
		dashstyle: 'dashStyle'
	},
	drawLegendSymbol: seriesTypes.line.prototype.drawLegendSymbol
});

// The mappoint series type
defaultPlotOptions.mappoint = merge(defaultPlotOptions.scatter, {
	dataLabels: {
		enabled: true,
		formatter: function () { // #2945
			return this.point.name; 
		},
		crop: false,
		defer: false,
		overflow: false,
		style: {
			color: '#000000'
		}
	}
});
seriesTypes.mappoint = extendClass(seriesTypes.scatter, {
	type: 'mappoint',
	forceDL: true,
	pointClass: extendClass(Point, {
		applyOptions: function (options, x) {
			var point = Point.prototype.applyOptions.call(this, options, x);
			if (options.lat !== undefined && options.lon !== undefined) {
				point = extend(point, this.series.chart.fromLatLonToPoint(point));
			}
			return point;
		}
	})
});

// The mapbubble series type
if (seriesTypes.bubble) {

	defaultPlotOptions.mapbubble = merge(defaultPlotOptions.bubble, {
		animationLimit: 500,
		tooltip: {
			pointFormat: '{point.name}: {point.z}'
		}
	});
	seriesTypes.mapbubble = extendClass(seriesTypes.bubble, {
		pointClass: extendClass(Point, {
			applyOptions: function (options, x) {
				var point;
				if (options.lat !== undefined && options.lon !== undefined) {
					point = Point.prototype.applyOptions.call(this, options, x);
					point = extend(point, this.series.chart.fromLatLonToPoint(point));
				} else {
					point = MapAreaPoint.prototype.applyOptions.call(this, options, x);
				}
				return point;
			},
			ttBelow: false
		}),
		xyFromShape: true,
		type: 'mapbubble',
		pointArrayMap: ['z'], // If one single value is passed, it is interpreted as z
		/**
		 * Return the map area identified by the dataJoinBy option
		 */
		getMapData: seriesTypes.map.prototype.getMapData,
		getBox: seriesTypes.map.prototype.getBox,
		setData: seriesTypes.map.prototype.setData
	});
}

/**
 * Extend the default options with map options
 */
defaultOptions.plotOptions.heatmap = merge(defaultOptions.plotOptions.scatter, {
	animation: false,
	borderWidth: 0,
	nullColor: '#F8F8F8',
	dataLabels: {
		formatter: function () { // #2945
			return this.point.value;
		},
		inside: true,
		verticalAlign: 'middle',
		crop: false,
		overflow: false,
		padding: 0 // #3837
	},
	marker: null,
	pointRange: null, // dynamically set to colsize by default
	tooltip: {
		pointFormat: '{point.x}, {point.y}: {point.value}<br/>'
	},
	states: {
		normal: {
			animation: true
		},
		hover: {
			halo: false,  // #3406, halo is not required on heatmaps
			brightness: 0.2
		}
	}
});

// The Heatmap series type
seriesTypes.heatmap = extendClass(seriesTypes.scatter, merge(colorSeriesMixin, {
	type: 'heatmap',
	pointArrayMap: ['y', 'value'],
	hasPointSpecificOptions: true,
	supportsDrilldown: true,
	getExtremesFromAll: true,

	/**
	 * Override the init method to add point ranges on both axes.
	 */
	init: function () {
		var options;
		seriesTypes.scatter.prototype.init.apply(this, arguments);

		options = this.options;
		this.pointRange = options.pointRange = pick(options.pointRange, options.colsize || 1); // #3758, prevent resetting in setData
		this.yAxis.axisPointRange = options.rowsize || 1; // general point range
	},
	translate: function () {
		var series = this,
			options = series.options,
			xAxis = series.xAxis,
			yAxis = series.yAxis;

		series.generatePoints();

		each(series.points, function (point) {
			var xPad = (options.colsize || 1) / 2,
				yPad = (options.rowsize || 1) / 2,
				x1 = Math.round(xAxis.len - xAxis.translate(point.x - xPad, 0, 1, 0, 1)),
				x2 = Math.round(xAxis.len - xAxis.translate(point.x + xPad, 0, 1, 0, 1)),
				y1 = Math.round(yAxis.translate(point.y - yPad, 0, 1, 0, 1)),
				y2 = Math.round(yAxis.translate(point.y + yPad, 0, 1, 0, 1));

			// Set plotX and plotY for use in K-D-Tree and more
			point.plotX = point.clientX = (x1 + x2) / 2;
			point.plotY = (y1 + y2) / 2;

			point.shapeType = 'rect';
			point.shapeArgs = {
				x: Math.min(x1, x2),
				y: Math.min(y1, y2),
				width: Math.abs(x2 - x1),
				height: Math.abs(y2 - y1)
			};
		});
		
		series.translateColors();

		// Make sure colors are updated on colorAxis update (#2893)
		if (this.chart.hasRendered) {
			each(series.points, function (point) {
				point.shapeArgs.fill = point.options.color || point.color; // #3311
			});
		}
	},
	drawPoints: seriesTypes.column.prototype.drawPoints,
	animate: noop,
	getBox: noop,
	drawLegendSymbol: LegendSymbolMixin.drawRectangle,

	getExtremes: function () {
		// Get the extremes from the value data
		Series.prototype.getExtremes.call(this, this.valueData);
		this.valueMin = this.dataMin;
		this.valueMax = this.dataMax;

		// Get the extremes from the y data
		Series.prototype.getExtremes.call(this);
	}
		
}));


/** 
 * Test for point in polygon. Polygon defined as array of [x,y] points.
 */
function pointInPolygon(point, polygon) {
	var i, j, rel1, rel2, c = false,
		x = point.x,
		y = point.y;

	for (i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		rel1 = polygon[i][1] > y;
		rel2 = polygon[j][1] > y;
		if (rel1 !== rel2 && (x < (polygon[j][0] - polygon[i][0]) * (y - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0])) {
			c = !c;
		}
	}

	return c;
}

/**
 * Get point from latLon using specified transform definition
 */
Chart.prototype.transformFromLatLon = function (latLon, transform) {
	if (window.proj4 === undefined) {
		error(21);
		return {
			x: 0,
			y: null
		};
	}

	var projected = window.proj4(transform.crs, [latLon.lon, latLon.lat]),
		cosAngle = transform.cosAngle || (transform.rotation && Math.cos(transform.rotation)),
		sinAngle = transform.sinAngle || (transform.rotation && Math.sin(transform.rotation)),
		rotated = transform.rotation ? [projected[0] * cosAngle + projected[1] * sinAngle, -projected[0] * sinAngle + projected[1] * cosAngle] : projected;
	
	return {
		x: ((rotated[0] - (transform.xoffset || 0)) * (transform.scale || 1) + (transform.xpan || 0)) * (transform.jsonres || 1) + (transform.jsonmarginX || 0),
		y: (((transform.yoffset || 0) - rotated[1]) * (transform.scale || 1) + (transform.ypan || 0)) * (transform.jsonres || 1) - (transform.jsonmarginY || 0)
	};
};

/**
 * Get latLon from point using specified transform definition
 */
Chart.prototype.transformToLatLon = function (point, transform) {
	if (window.proj4 === undefined) {
		error(21);
		return;
	}

	var normalized = {
			x: ((point.x - (transform.jsonmarginX || 0)) / (transform.jsonres || 1) - (transform.xpan || 0)) / (transform.scale || 1) + (transform.xoffset || 0),
			y: ((-point.y - (transform.jsonmarginY || 0)) / (transform.jsonres || 1) + (transform.ypan || 0)) / (transform.scale || 1) + (transform.yoffset || 0)
		},
		cosAngle = transform.cosAngle || (transform.rotation && Math.cos(transform.rotation)),
		sinAngle = transform.sinAngle || (transform.rotation && Math.sin(transform.rotation)),
		// Note: Inverted sinAngle to reverse rotation direction
		projected = window.proj4(transform.crs, 'WGS84', transform.rotation ? {
			x: normalized.x * cosAngle + normalized.y * -sinAngle,
			y: normalized.x * sinAngle + normalized.y * cosAngle
		} : normalized);

	return {lat: projected.y, lon: projected.x};
};

Chart.prototype.fromPointToLatLon = function (point) {
	var transforms = this.mapTransforms,
		transform;

	if (!transforms) {
		error(22);
		return;
	}

	for (transform in transforms) {
		if (transforms.hasOwnProperty(transform) && transforms[transform].hitZone && pointInPolygon({x: point.x, y: -point.y}, transforms[transform].hitZone.coordinates[0])) {
			return this.transformToLatLon(point, transforms[transform]);
		}
	}

	return this.transformToLatLon(point, transforms['default']);
};

Chart.prototype.fromLatLonToPoint = function (latLon) {
	var transforms = this.mapTransforms,
		transform,
		coords;

	if (!transforms) {
		error(22);
		return {
			x: 0,
			y: null
		};
	}

	for (transform in transforms) {
		if (transforms.hasOwnProperty(transform) && transforms[transform].hitZone) {
			coords = this.transformFromLatLon(latLon, transforms[transform]);
			if (pointInPolygon({x: coords.x, y: -coords.y}, transforms[transform].hitZone.coordinates[0])) {
				return coords;
			}
		}
	}

	return this.transformFromLatLon(latLon, transforms['default']);
};

/**
 * Convert a geojson object to map data of a given Highcharts type (map, mappoint or mapline).
 */
Highcharts.geojson = function (geojson, hType, series) {
	var mapData = [],
		path = [],
		polygonToPath = function (polygon) {
			var i = 0,
				len = polygon.length;
			path.push('M');
			for (; i < len; i++) {
				if (i === 1) {
					path.push('L');
				}
				path.push(polygon[i][0], -polygon[i][1]);
			}
		};

	hType = hType || 'map';
	
	each(geojson.features, function (feature) {

		var geometry = feature.geometry,
			type = geometry.type,
			coordinates = geometry.coordinates,
			properties = feature.properties,
			point;
		
		path = [];

		if (hType === 'map' || hType === 'mapbubble') {
			if (type === 'Polygon') {
				each(coordinates, polygonToPath);
				path.push('Z');

			} else if (type === 'MultiPolygon') {
				each(coordinates, function (items) {
					each(items, polygonToPath);
				});
				path.push('Z');
			}

			if (path.length) {
				point = { path: path };
			}
		
		} else if (hType === 'mapline') {
			if (type === 'LineString') {
				polygonToPath(coordinates);
			} else if (type === 'MultiLineString') {
				each(coordinates, polygonToPath);
			}

			if (path.length) {
				point = { path: path };
			}
		
		} else if (hType === 'mappoint') {
			if (type === 'Point') {
				point = {
					x: coordinates[0],
					y: -coordinates[1]
				};
			}
		}
		if (point) {
			mapData.push(extend(point, {
				name: properties.name || properties.NAME, 
				properties: properties
			}));
		}

	});

	// Create a credits text that includes map source, to be picked up in Chart.showCredits
	if (series && geojson.copyrightShort) {
		series.chart.mapCredits = '<a href="http://www.highcharts.com">Highcharts</a> \u00A9 ' +
			'<a href="' + geojson.copyrightUrl + '">' + geojson.copyrightShort + '</a>';
		series.chart.mapCreditsFull = geojson.copyright;
	}

	return mapData;
};

/**
 * Override showCredits to include map source by default
 */
wrap(Chart.prototype, 'showCredits', function (proceed, credits) {

	if (defaultOptions.credits.text === this.options.credits.text && this.mapCredits) { // default text and mapCredits is set
		credits.text = this.mapCredits;
		credits.href = null;
	}

	proceed.call(this, credits);

	if (this.credits) { 
		this.credits.attr({ 
			title: this.mapCreditsFull
		});
	}
});

// Add language
extend(defaultOptions.lang, {
	zoomIn: 'Zoom in',
	zoomOut: 'Zoom out'
});


// Set the default map navigation options
defaultOptions.mapNavigation = {
	buttonOptions: {
		alignTo: 'plotBox',
		align: 'left',
		verticalAlign: 'top',
		x: 0,
		width: 18,
		height: 18,
		style: {
			fontSize: '15px',
			fontWeight: 'bold',
			textAlign: 'center'
		},
		theme: {
			'stroke-width': 1
		}
	},
	buttons: {
		zoomIn: {
			onclick: function () {
				this.mapZoom(0.5);
			},
			text: '+',
			y: 0
		},
		zoomOut: {
			onclick: function () {
				this.mapZoom(2);
			},
			text: '-',
			y: 28
		}
	}
	// enabled: false,
	// enableButtons: null, // inherit from enabled
	// enableTouchZoom: null, // inherit from enabled
	// enableDoubleClickZoom: null, // inherit from enabled
	// enableDoubleClickZoomTo: false
	// enableMouseWheelZoom: null, // inherit from enabled
};

/**
 * Utility for reading SVG paths directly.
 */
Highcharts.splitPath = function (path) {
	var i;

	// Move letters apart
	path = path.replace(/([A-Za-z])/g, ' $1 ');
	// Trim
	path = path.replace(/^\s*/, "").replace(/\s*$/, "");
	
	// Split on spaces and commas
	path = path.split(/[ ,]+/);
	
	// Parse numbers
	for (i = 0; i < path.length; i++) {
		if (!/[a-zA-Z]/.test(path[i])) {
			path[i] = parseFloat(path[i]);
		}
	}
	return path;
};

// A placeholder for map definitions
Highcharts.maps = {};





// Create symbols for the zoom buttons
function selectiveRoundedRect(attr, x, y, w, h, rTopLeft, rTopRight, rBottomRight, rBottomLeft) {
	var normalize = (attr['stroke-width'] % 2 / 2);
		
	x -= normalize;
	y -= normalize;

	return ['M', x + rTopLeft, y,
        // top side
        'L', x + w - rTopRight, y,
        // top right corner
        'C', x + w - rTopRight / 2, y, x + w, y + rTopRight / 2, x + w, y + rTopRight,
        // right side
        'L', x + w, y + h - rBottomRight,
        // bottom right corner
        'C', x + w, y + h - rBottomRight / 2, x + w - rBottomRight / 2, y + h, x + w - rBottomRight, y + h,
        // bottom side
        'L', x + rBottomLeft, y + h,
        // bottom left corner
        'C', x + rBottomLeft / 2, y + h, x, y + h - rBottomLeft / 2, x, y + h - rBottomLeft,
        // left side
        'L', x, y + rTopLeft,
        // top left corner
        'C', x, y + rTopLeft / 2, x + rTopLeft / 2, y, x + rTopLeft, y,
        'Z'
    ];
}
SVGRenderer.prototype.symbols.topbutton = function (x, y, w, h, attr) {
	return selectiveRoundedRect(attr, x, y, w, h, attr.r, attr.r, 0, 0);
};
SVGRenderer.prototype.symbols.bottombutton = function (x, y, w, h, attr) {
	return selectiveRoundedRect(attr, x, y, w, h, 0, 0, attr.r, attr.r);
};
// The symbol callbacks are generated on the SVGRenderer object in all browsers. Even
// VML browsers need this in order to generate shapes in export. Now share
// them with the VMLRenderer.
if (Renderer === VMLRenderer) {
	each(['topbutton', 'bottombutton'], function (shape) {
		VMLRenderer.prototype.symbols[shape] = SVGRenderer.prototype.symbols[shape];
	});
}


/**
 * A wrapper for Chart with all the default values for a Map
 */
Highcharts.Map = function (options, callback) {
	
	var hiddenAxis = {
			endOnTick: false,
			gridLineWidth: 0,
			lineWidth: 0,
			minPadding: 0,
			maxPadding: 0,
			startOnTick: false,
			title: null,
			tickPositions: []
		},
		seriesOptions;

	/* For visual testing
	hiddenAxis.gridLineWidth = 1;
	hiddenAxis.gridZIndex = 10;
	hiddenAxis.tickPositions = undefined;
	// */
	
	// Don't merge the data
	seriesOptions = options.series;
	options.series = null;
	
	options = merge({
		chart: {
			panning: 'xy',
			type: 'map'
		},
		xAxis: hiddenAxis,
		yAxis: merge(hiddenAxis, { reversed: true })	
	},
	options, // user's options

	{ // forced options
		chart: {
			inverted: false,
			alignTicks: false
		}
	});

	options.series = seriesOptions;


	return new Chart(options, callback);
};

}(Highcharts));

Highcharts.maps["countries/ru/hk-all"] ={
//var hkmapgeo = {
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } },

    "features": [
        { "type": "Feature", "properties": { "NAME": "Тугуро-Чумиканский район", "ID": "TC", "shortName": "Туг Ч р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14514586, 7156451 ], [ 14519671, 7163907 ], [ 14526779, 7167755 ], [ 14528438, 7193375 ], [ 14535307, 7202332 ], [ 14542297, 7205577 ], [ 14541468, 7207813 ], [ 14545579, 7212222 ], [ 14545963, 7218906 ], [ 14551932, 7220779 ], [ 14551263, 7224412 ], [ 14553463, 7226955 ], [ 14562254, 7224238 ], [ 14566889, 7230163 ], [ 14576081, 7234671 ], [ 14579755, 7232366 ], [ 14579928, 7228027 ], [ 14586715, 7225519 ], [ 14592193, 7232870 ], [ 14596300, 7234008 ], [ 14594745, 7237567 ], [ 14597788, 7240059 ], [ 14599448, 7250334 ], [ 14602346, 7253763 ], [ 14601446, 7259807 ], [ 14604491, 7267448 ], [ 14606795, 7266815 ], [ 14606308, 7270812 ], [ 14608796, 7275628 ], [ 14604062, 7278470 ], [ 14601918, 7291620 ], [ 14614763, 7295928 ], [ 14618425, 7303462 ], [ 14626812, 7311044 ], [ 14644212, 7312138 ], [ 14645121, 7317944 ], [ 14651694, 7321948 ], [ 14653487, 7317817 ], [ 14657609, 7318406 ], [ 14658065, 7323188 ], [ 14664844, 7325705 ], [ 14666897, 7330991 ], [ 14672808, 7334550 ], [ 14674266, 7340554 ], [ 14680172, 7337816 ], [ 14682121, 7341372 ], [ 14687362, 7340923 ], [ 14695428, 7348941 ], [ 14695474, 7354033 ], [ 14700984, 7356123 ], [ 14701027, 7359466 ], [ 14704065, 7362056 ], [ 14690957, 7365535 ], [ 14703778, 7373828 ], [ 14723298, 7373158 ], [ 14741572, 7378432 ], [ 14742612, 7379619 ], [ 14740423, 7381833 ], [ 14742995, 7384832 ], [ 14738737, 7388735 ], [ 14739928, 7390878 ], [ 14735823, 7392294 ], [ 14739092, 7393410 ], [ 14733161, 7396341 ], [ 14734353, 7399473 ], [ 14737938, 7398463 ], [ 14736189, 7400810 ], [ 14737204, 7402420 ], [ 14734339, 7401109 ], [ 14734584, 7404752 ], [ 14731707, 7405135 ], [ 14734384, 7409499 ], [ 14747761, 7407470 ], [ 14754110, 7410182 ], [ 14762243, 7407661 ], [ 14766607, 7416437 ], [ 14771278, 7420528 ], [ 14769805, 7431326 ], [ 14780292, 7429669 ], [ 14786368, 7436198 ], [ 14802382, 7440253 ], [ 14801634, 7443877 ], [ 14798341, 7445756 ], [ 14779138, 7450932 ], [ 14773038, 7461766 ], [ 14767775, 7463742 ], [ 14765347, 7470657 ], [ 14770620, 7475812 ], [ 14769498, 7477805 ], [ 14785669, 7481613 ], [ 14802545, 7475372 ], [ 14808958, 7478518 ], [ 14812981, 7488234 ], [ 14843392, 7495889 ], [ 14860495, 7494619 ], [ 14866381, 7489480 ], [ 14881986, 7490903 ], [ 14892711, 7496734 ], [ 14889985, 7503628 ], [ 14889603, 7507397 ], [ 14891218, 7509290 ], [ 14903790, 7503316 ], [ 14905475, 7507119 ], [ 14911779, 7509828 ], [ 14919732, 7503455 ], [ 14930671, 7509701 ], [ 14942723, 7509753 ], [ 14953241, 7504916 ], [ 14956253, 7496152 ], [ 14960703, 7491593 ], [ 14963660, 7492570 ], [ 14971447, 7486184 ], [ 14978583, 7486618 ], [ 14991380, 7469194 ], [ 14996521, 7473032 ], [ 14996781, 7481906 ], [ 15011334, 7478798 ], [ 15007809, 7484754 ], [ 15019444, 7489638 ], [ 15024810, 7487051 ], [ 15036549, 7493980 ], [ 15044329, 7491618 ], [ 15045996, 7487519 ], [ 15060429, 7488768 ], [ 15066785, 7497954 ], [ 15073853, 7500333 ], [ 15089048, 7492710 ], [ 15088839, 7487535 ], [ 15085453, 7483836 ], [ 15085088, 7473486 ], [ 15094949, 7468872 ], [ 15093698, 7461908 ], [ 15107365, 7461891 ], [ 15113565, 7453364 ], [ 15128467, 7449916 ], [ 15133069, 7452295 ], [ 15137515, 7459259 ], [ 15145781, 7459745 ], [ 15150453, 7463791 ], [ 15161307, 7459068 ], [ 15178481, 7466414 ], [ 15215044, 7434647 ], [ 15181420, 7390248 ], [ 15145008, 7362701 ], [ 15185183, 7364977 ], [ 15211367, 7372381 ], [ 15220696, 7391509 ], [ 15219929, 7382038 ], [ 15240222, 7386328 ], [ 15271625, 7400293 ], [ 15279139, 7416949 ], [ 15285845, 7425245 ], [ 15296188, 7432356 ], [ 15315743, 7438760 ], [ 15327629, 7438576 ], [ 15365964, 7426592 ], [ 15424427, 7415067 ], [ 15439958, 7402948 ], [ 15447757, 7385810 ], [ 15448696, 7376922 ], [ 15446994, 7364366 ], [ 15427735, 7302185 ], [ 15449602, 7265821 ], [ 15461203, 7262668 ], [ 15481918, 7249968 ], [ 15501090, 7242935 ], [ 15511858, 7244967 ], [ 15517762, 7250714 ], [ 15546727, 7217711 ], [ 15545778, 7212111 ], [ 15540262, 7207127 ], [ 15537008, 7200009 ], [ 15530631, 7196323 ], [ 15532441, 7189082 ], [ 15526989, 7176623 ], [ 15514922, 7176602 ], [ 15513585, 7168988 ], [ 15517077, 7166857 ], [ 15516969, 7160968 ], [ 15506710, 7151089 ], [ 15492248, 7148462 ], [ 15484792, 7155383 ], [ 15479534, 7157576 ], [ 15476733, 7155578 ], [ 15459193, 7163356 ], [ 15454689, 7150525 ], [ 15448719, 7146751 ], [ 15449667, 7141699 ], [ 15445939, 7138061 ], [ 15445012, 7132538 ], [ 15445098, 7124729 ], [ 15453101, 7122198 ], [ 15446218, 7111031 ], [ 15447813, 7107147 ], [ 15446282, 7096603 ], [ 15448152, 7088502 ], [ 15440648, 7085405 ], [ 15429852, 7087239 ], [ 15425291, 7075332 ], [ 15427513, 7069894 ], [ 15425349, 7054603 ], [ 15423390, 7051971 ], [ 15419852, 7054369 ], [ 15413356, 7043377 ], [ 15406165, 7043922 ], [ 15402912, 7040304 ], [ 15393508, 7037865 ], [ 15388339, 7033562 ], [ 15386959, 7029094 ], [ 15376597, 7021680 ], [ 15377696, 7016136 ], [ 15369416, 7012534 ], [ 15363779, 7007038 ], [ 15363013, 7003166 ], [ 15352097, 6996917 ], [ 15346484, 6990339 ], [ 15334467, 6992269 ], [ 15331777, 6985661 ], [ 15326488, 6984951 ], [ 15315611, 7001406 ], [ 15301694, 6998739 ], [ 15299659, 7003090 ], [ 15297016, 7002622 ], [ 15293765, 7018925 ], [ 15283754, 7019346 ], [ 15278819, 7027064 ], [ 15266726, 7020118 ], [ 15261604, 7013030 ], [ 15248084, 7026550 ], [ 15245839, 7021310 ], [ 15242588, 7023041 ], [ 15231220, 7017287 ], [ 15220648, 7018387 ], [ 15211596, 7014691 ], [ 15210988, 7010574 ], [ 15216672, 7006481 ], [ 15213608, 7002762 ], [ 15193563, 6995558 ], [ 15185213, 6997897 ], [ 15152350, 6974110 ], [ 15124231, 6943923 ], [ 15104788, 6929231 ], [ 15090535, 6951378 ], [ 15091668, 6956714 ], [ 15089841, 6965010 ], [ 15084286, 6972319 ], [ 15071860, 6973599 ], [ 15066378, 6969542 ], [ 15059946, 6970017 ], [ 15056474, 6978679 ], [ 15044596, 6976595 ], [ 15031476, 6983503 ], [ 15024365, 6982651 ], [ 15018171, 6994009 ], [ 15008937, 6995811 ], [ 15012892, 7001088 ], [ 15006950, 7010378 ], [ 15011167, 7015152 ], [ 15008639, 7018932 ], [ 15015614, 7021866 ], [ 15019327, 7031370 ], [ 15012971, 7034613 ], [ 15012434, 7037230 ], [ 15014628, 7039955 ], [ 15013514, 7042022 ], [ 15004019, 7045942 ], [ 15005215, 7049764 ], [ 15003823, 7053644 ], [ 15005901, 7057520 ], [ 15011987, 7058288 ], [ 15014436, 7054495 ], [ 15018745, 7058584 ], [ 15014629, 7064911 ], [ 15006042, 7067711 ], [ 15008356, 7072242 ], [ 15007096, 7073682 ], [ 14998052, 7074408 ], [ 14997182, 7081846 ], [ 14986460, 7087781 ], [ 14986196, 7092903 ], [ 14979757, 7098450 ], [ 14967608, 7096270 ], [ 14966405, 7086974 ], [ 14962278, 7091252 ], [ 14952586, 7086138 ], [ 14951393, 7082681 ], [ 14945678, 7083921 ], [ 14943023, 7079736 ], [ 14939741, 7080023 ], [ 14940641, 7076981 ], [ 14938551, 7072701 ], [ 14929421, 7075826 ], [ 14927567, 7067776 ], [ 14910854, 7064606 ], [ 14902130, 7071241 ], [ 14895836, 7069310 ], [ 14893179, 7074722 ], [ 14884173, 7069914 ], [ 14875458, 7082751 ], [ 14868619, 7085357 ], [ 14860018, 7077214 ], [ 14851417, 7079179 ], [ 14845691, 7070970 ], [ 14827574, 7063285 ], [ 14823073, 7057804 ], [ 14823606, 7050021 ], [ 14819122, 7046188 ], [ 14821541, 7044772 ], [ 14820506, 7039321 ], [ 14808990, 7040004 ], [ 14801844, 7035632 ], [ 14799966, 7038440 ], [ 14793096, 7038375 ], [ 14791824, 7036516 ], [ 14794169, 7033708 ], [ 14794139, 7029922 ], [ 14790118, 7026633 ], [ 14779950, 7029324 ], [ 14777526, 7025645 ], [ 14772426, 7024551 ], [ 14767807, 7028541 ], [ 14750890, 7022865 ], [ 14748848, 7025153 ], [ 14738499, 7023352 ], [ 14737905, 7026179 ], [ 14734479, 7025844 ], [ 14733049, 7028788 ], [ 14728947, 7026988 ], [ 14725306, 7030388 ], [ 14721889, 7024934 ], [ 14709886, 7023968 ], [ 14705928, 7027615 ], [ 14701228, 7024035 ], [ 14700974, 7020176 ], [ 14698719, 7018990 ], [ 14698411, 7012253 ], [ 14695633, 7008794 ], [ 14691818, 7008842 ], [ 14689529, 7012879 ], [ 14682684, 7008158 ], [ 14680416, 7012291 ], [ 14675097, 7013166 ], [ 14676641, 7019037 ], [ 14675667, 7021729 ], [ 14677997, 7025949 ], [ 14673872, 7027120 ], [ 14672624, 7030776 ], [ 14663256, 7026282 ], [ 14641607, 7024126 ], [ 14639509, 7021569 ], [ 14632006, 7024041 ], [ 14635832, 7031653 ], [ 14640059, 7033464 ], [ 14642236, 7044956 ], [ 14639748, 7048770 ], [ 14641016, 7052720 ], [ 14638018, 7057210 ], [ 14639482, 7059802 ], [ 14639068, 7066340 ], [ 14637006, 7066656 ], [ 14636769, 7072915 ], [ 14633089, 7077917 ], [ 14635835, 7081218 ], [ 14634730, 7083318 ], [ 14636339, 7088678 ], [ 14633528, 7090381 ], [ 14637592, 7094935 ], [ 14630451, 7106503 ], [ 14629414, 7110419 ], [ 14632127, 7114407 ], [ 14632295, 7120913 ], [ 14629579, 7123794 ], [ 14618086, 7128669 ], [ 14617641, 7131126 ], [ 14610936, 7129807 ], [ 14594827, 7136581 ], [ 14592219, 7134270 ], [ 14584795, 7137120 ], [ 14571771, 7127530 ], [ 14565989, 7132064 ], [ 14566361, 7141642 ], [ 14554516, 7141606 ], [ 14551637, 7143360 ], [ 14550701, 7149142 ], [ 14548007, 7151274 ], [ 14536965, 7147172 ], [ 14529091, 7152972 ], [ 14520692, 7149003 ], [ 14514586, 7156451 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Верхнебуреинский район", "ID": "VB", "shortName": "ВерБ р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14543292, 6563615 ], [ 14549883, 6567480 ], [ 14550764, 6572207 ], [ 14547483, 6573360 ], [ 14546582, 6576415 ], [ 14557880, 6591014 ], [ 14559185, 6597433 ], [ 14569863, 6602121 ], [ 14565468, 6601791 ], [ 14561015, 6611965 ], [ 14555842, 6613089 ], [ 14556741, 6620019 ], [ 14560420, 6625822 ], [ 14564696, 6624621 ], [ 14576899, 6628329 ], [ 14579255, 6638700 ], [ 14578418, 6642836 ], [ 14579686, 6646569 ], [ 14583126, 6648038 ], [ 14582886, 6651603 ], [ 14586080, 6652445 ], [ 14587624, 6663701 ], [ 14595110, 6668695 ], [ 14601807, 6666340 ], [ 14605026, 6672023 ], [ 14607834, 6672320 ], [ 14607673, 6679242 ], [ 14611029, 6685810 ], [ 14618327, 6689454 ], [ 14622995, 6690461 ], [ 14631246, 6681398 ], [ 14637449, 6682854 ], [ 14638084, 6690331 ], [ 14634979, 6699983 ], [ 14635222, 6707203 ], [ 14630744, 6711650 ], [ 14630472, 6718493 ], [ 14626283, 6727165 ], [ 14626427, 6737112 ], [ 14631862, 6740476 ], [ 14627483, 6744616 ], [ 14650126, 6739951 ], [ 14652105, 6743169 ], [ 14669669, 6746138 ], [ 14678420, 6756534 ], [ 14689307, 6754205 ], [ 14694301, 6760313 ], [ 14701487, 6764135 ], [ 14705037, 6758674 ], [ 14707300, 6760183 ], [ 14708649, 6765982 ], [ 14718538, 6771208 ], [ 14721832, 6770022 ], [ 14723585, 6764061 ], [ 14726068, 6764859 ], [ 14732322, 6772654 ], [ 14738550, 6773212 ], [ 14744333, 6779482 ], [ 14740819, 6783051 ], [ 14740683, 6790661 ], [ 14738111, 6796200 ], [ 14746661, 6796461 ], [ 14749683, 6792156 ], [ 14752222, 6792559 ], [ 14753761, 6796892 ], [ 14752177, 6803592 ], [ 14757942, 6814747 ], [ 14765823, 6815637 ], [ 14763301, 6817014 ], [ 14772373, 6823274 ], [ 14778701, 6822224 ], [ 14785255, 6829619 ], [ 14784118, 6831958 ], [ 14785247, 6833357 ], [ 14798420, 6826883 ], [ 14800956, 6830340 ], [ 14807820, 6829022 ], [ 14810182, 6831795 ], [ 14815811, 6827860 ], [ 14820870, 6832529 ], [ 14824567, 6829551 ], [ 14828428, 6834459 ], [ 14833542, 6831599 ], [ 14841599, 6834642 ], [ 14841860, 6837923 ], [ 14847276, 6842268 ], [ 14852297, 6842492 ], [ 14853518, 6846940 ], [ 14850116, 6854577 ], [ 14843081, 6858536 ], [ 14839666, 6865684 ], [ 14839408, 6874836 ], [ 14831519, 6881439 ], [ 14832095, 6885126 ], [ 14837465, 6889226 ], [ 14836332, 6891156 ], [ 14838920, 6894116 ], [ 14837209, 6899643 ], [ 14832801, 6901631 ], [ 14833025, 6909931 ], [ 14831016, 6912405 ], [ 14834674, 6924434 ], [ 14861275, 6917009 ], [ 14862578, 6912954 ], [ 14870782, 6912205 ], [ 14884360, 6901773 ], [ 14896679, 6903256 ], [ 14900371, 6899628 ], [ 14902307, 6893692 ], [ 14910245, 6893346 ], [ 14911733, 6896674 ], [ 14916646, 6898425 ], [ 14922209, 6890947 ], [ 14925748, 6891242 ], [ 14928017, 6887555 ], [ 14935423, 6893524 ], [ 14950845, 6883302 ], [ 14955503, 6885992 ], [ 14968907, 6884559 ], [ 14974938, 6877291 ], [ 14981936, 6878065 ], [ 14983198, 6870653 ], [ 14978085, 6869128 ], [ 14971490, 6856719 ], [ 14972074, 6850221 ], [ 14974911, 6847686 ], [ 14975235, 6838542 ], [ 14980876, 6832944 ], [ 14977934, 6823482 ], [ 14981581, 6816090 ], [ 14987771, 6810269 ], [ 15000647, 6814635 ], [ 14996941, 6818887 ], [ 15001926, 6820936 ], [ 15001199, 6825571 ], [ 15004313, 6825207 ], [ 15007732, 6828846 ], [ 15016825, 6825016 ], [ 15025269, 6825149 ], [ 15031307, 6820782 ], [ 15031688, 6811474 ], [ 15039100, 6807279 ], [ 15037192, 6801917 ], [ 15039389, 6798929 ], [ 15034270, 6794102 ], [ 15032800, 6786901 ], [ 15034730, 6783913 ], [ 15031539, 6778301 ], [ 15032361, 6774605 ], [ 15029382, 6770124 ], [ 15028962, 6765374 ], [ 15025313, 6765432 ], [ 15025352, 6762425 ], [ 15023003, 6761506 ], [ 15023461, 6754380 ], [ 15027701, 6745453 ], [ 15026078, 6744113 ], [ 15028652, 6734114 ], [ 15026210, 6728598 ], [ 15018018, 6724990 ], [ 15014636, 6726408 ], [ 15010014, 6722903 ], [ 15008334, 6717675 ], [ 15005088, 6718214 ], [ 15004649, 6711775 ], [ 14984990, 6702577 ], [ 14982629, 6696091 ], [ 14972743, 6687622 ], [ 14958607, 6684663 ], [ 14951586, 6679657 ], [ 14960087, 6671944 ], [ 14967045, 6643124 ], [ 14963619, 6634535 ], [ 14943243, 6619246 ], [ 14941178, 6613403 ], [ 14943369, 6607308 ], [ 14947575, 6603958 ], [ 14957020, 6608945 ], [ 14961705, 6595243 ], [ 14960068, 6574767 ], [ 14969362, 6576101 ], [ 14985093, 6569740 ], [ 14995978, 6569010 ], [ 14994281, 6559122 ], [ 14998465, 6554669 ], [ 14999297, 6549055 ], [ 14997363, 6545070 ], [ 14992116, 6542027 ], [ 14984597, 6542531 ], [ 14979638, 6535516 ], [ 14972830, 6534168 ], [ 14971527, 6529096 ], [ 14973515, 6523818 ], [ 14970362, 6518517 ], [ 14971299, 6516346 ], [ 14959120, 6511685 ], [ 14953069, 6501584 ], [ 14947422, 6499507 ], [ 14947331, 6502454 ], [ 14942578, 6503254 ], [ 14937209, 6499644 ], [ 14925853, 6499301 ], [ 14919090, 6495051 ], [ 14915388, 6496582 ], [ 14914200, 6492698 ], [ 14918839, 6486917 ], [ 14914429, 6481754 ], [ 14905335, 6483284 ], [ 14900857, 6477984 ], [ 14894071, 6481182 ], [ 14885982, 6477367 ], [ 14882190, 6472157 ], [ 14870331, 6467839 ], [ 14867407, 6480908 ], [ 14857559, 6483513 ], [ 14853172, 6481137 ], [ 14851558, 6477091 ], [ 14846401, 6474438 ], [ 14846001, 6464851 ], [ 14841196, 6463776 ], [ 14841165, 6457174 ], [ 14836083, 6458556 ], [ 14823187, 6449129 ], [ 14822296, 6446489 ], [ 14824077, 6444140 ], [ 14822818, 6441131 ], [ 14828437, 6436617 ], [ 14827946, 6431136 ], [ 14822987, 6428634 ], [ 14818289, 6430476 ], [ 14816570, 6425456 ], [ 14813776, 6427006 ], [ 14810997, 6418194 ], [ 14806606, 6417488 ], [ 14799682, 6405712 ], [ 14800081, 6399034 ], [ 14793172, 6397084 ], [ 14785957, 6400738 ], [ 14781151, 6392463 ], [ 14781335, 6388962 ], [ 14786325, 6385754 ], [ 14787113, 6380606 ], [ 14789675, 6378261 ], [ 14790500, 6369229 ], [ 14781005, 6356303 ], [ 14782824, 6353809 ], [ 14783248, 6344217 ], [ 14778211, 6340613 ], [ 14778124, 6337399 ], [ 14780983, 6331985 ], [ 14773404, 6330485 ], [ 14773535, 6325888 ], [ 14769946, 6326689 ], [ 14767525, 6322933 ], [ 14760494, 6327877 ], [ 14756923, 6327561 ], [ 14748470, 6319933 ], [ 14746137, 6323129 ], [ 14737032, 6325235 ], [ 14734974, 6331769 ], [ 14738716, 6333932 ], [ 14739559, 6337929 ], [ 14736990, 6345387 ], [ 14730221, 6345498 ], [ 14725058, 6348956 ], [ 14724652, 6353898 ], [ 14721489, 6358081 ], [ 14715444, 6355575 ], [ 14713139, 6358300 ], [ 14706571, 6359120 ], [ 14701348, 6353217 ], [ 14702494, 6350016 ], [ 14701214, 6344879 ], [ 14704740, 6340410 ], [ 14693414, 6339050 ], [ 14696795, 6332395 ], [ 14691302, 6327333 ], [ 14692145, 6323766 ], [ 14694524, 6323328 ], [ 14693238, 6318570 ], [ 14687538, 6322257 ], [ 14681308, 6321350 ], [ 14672081, 6332551 ], [ 14665814, 6327313 ], [ 14656854, 6328039 ], [ 14649798, 6320038 ], [ 14640106, 6317224 ], [ 14637138, 6310557 ], [ 14635534, 6310763 ], [ 14633933, 6316304 ], [ 14629118, 6319259 ], [ 14637338, 6341494 ], [ 14641617, 6347775 ], [ 14638938, 6353346 ], [ 14640615, 6362192 ], [ 14639133, 6368427 ], [ 14641179, 6372984 ], [ 14639665, 6379841 ], [ 14634109, 6383574 ], [ 14632471, 6389367 ], [ 14624654, 6387797 ], [ 14622084, 6394276 ], [ 14624034, 6397840 ], [ 14632584, 6400619 ], [ 14637333, 6398679 ], [ 14640786, 6404437 ], [ 14634675, 6412026 ], [ 14639013, 6417528 ], [ 14638789, 6423731 ], [ 14641171, 6429346 ], [ 14636190, 6435655 ], [ 14632732, 6435645 ], [ 14625898, 6441818 ], [ 14630059, 6444722 ], [ 14630728, 6455227 ], [ 14626928, 6457362 ], [ 14627656, 6460476 ], [ 14624660, 6463370 ], [ 14626896, 6469227 ], [ 14626302, 6474817 ], [ 14633872, 6477042 ], [ 14628809, 6483809 ], [ 14629972, 6490699 ], [ 14618914, 6496535 ], [ 14619767, 6499048 ], [ 14617368, 6502369 ], [ 14618904, 6508527 ], [ 14616788, 6511729 ], [ 14609909, 6506863 ], [ 14601928, 6508274 ], [ 14596778, 6521877 ], [ 14592791, 6519121 ], [ 14585077, 6521737 ], [ 14583521, 6515553 ], [ 14576411, 6509264 ], [ 14574757, 6515788 ], [ 14575805, 6519045 ], [ 14569043, 6524667 ], [ 14569356, 6529674 ], [ 14575417, 6532464 ], [ 14585930, 6547166 ], [ 14582656, 6550719 ], [ 14581161, 6557460 ], [ 14573223, 6563028 ], [ 14562460, 6559717 ], [ 14557819, 6561198 ], [ 14555685, 6559526 ], [ 14554355, 6552562 ], [ 14552070, 6551885 ], [ 14543292, 6563615 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Аяно-Майский район", "ID": "AM", "shortName": "Аян М р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14567261, 7541874 ], [ 14575722, 7550607 ], [ 14571187, 7561287 ], [ 14579683, 7574401 ], [ 14579590, 7585483 ], [ 14581883, 7591850 ], [ 14591581, 7599638 ], [ 14596300, 7607591 ], [ 14595560, 7610007 ], [ 14598483, 7616520 ], [ 14596765, 7621249 ], [ 14598179, 7624107 ], [ 14594081, 7631148 ], [ 14595559, 7632439 ], [ 14594058, 7634291 ], [ 14595441, 7635374 ], [ 14593693, 7635251 ], [ 14595220, 7637802 ], [ 14594389, 7640459 ], [ 14600033, 7642477 ], [ 14598741, 7645494 ], [ 14601507, 7645613 ], [ 14600566, 7649418 ], [ 14603425, 7649398 ], [ 14602567, 7651064 ], [ 14604139, 7651607 ], [ 14602510, 7652295 ], [ 14607953, 7657741 ], [ 14607312, 7662445 ], [ 14619599, 7661121 ], [ 14620759, 7664304 ], [ 14626069, 7658550 ], [ 14624507, 7654330 ], [ 14625962, 7653964 ], [ 14625587, 7650636 ], [ 14630494, 7649180 ], [ 14632946, 7653322 ], [ 14628303, 7660467 ], [ 14637945, 7671893 ], [ 14646259, 7668911 ], [ 14646373, 7664711 ], [ 14653402, 7663970 ], [ 14651557, 7654352 ], [ 14655034, 7649620 ], [ 14658826, 7657830 ], [ 14660257, 7653161 ], [ 14663561, 7652698 ], [ 14666755, 7656582 ], [ 14654467, 7666886 ], [ 14661138, 7673131 ], [ 14660133, 7678108 ], [ 14661800, 7680805 ], [ 14656826, 7682833 ], [ 14659935, 7684713 ], [ 14657656, 7688458 ], [ 14663047, 7692072 ], [ 14658573, 7695497 ], [ 14667934, 7700261 ], [ 14666107, 7703516 ], [ 14672097, 7703111 ], [ 14669330, 7708978 ], [ 14675549, 7708135 ], [ 14676040, 7713156 ], [ 14672189, 7714583 ], [ 14671226, 7721512 ], [ 14673205, 7723322 ], [ 14668991, 7726439 ], [ 14668904, 7732632 ], [ 14663400, 7731728 ], [ 14662154, 7738318 ], [ 14656997, 7739898 ], [ 14656535, 7745902 ], [ 14653570, 7747601 ], [ 14654119, 7750225 ], [ 14650467, 7749862 ], [ 14650935, 7755337 ], [ 14647408, 7756035 ], [ 14643455, 7765066 ], [ 14638560, 7765120 ], [ 14639365, 7770272 ], [ 14635889, 7771504 ], [ 14635069, 7777258 ], [ 14639238, 7778460 ], [ 14638277, 7782506 ], [ 14621065, 7791297 ], [ 14619762, 7792655 ], [ 14620293, 7797971 ], [ 14617725, 7799469 ], [ 14610553, 7799712 ], [ 14608752, 7793689 ], [ 14604259, 7794500 ], [ 14605236, 7802570 ], [ 14596342, 7812648 ], [ 14598660, 7815511 ], [ 14605972, 7813902 ], [ 14614093, 7829217 ], [ 14621524, 7816898 ], [ 14634723, 7816899 ], [ 14637167, 7814295 ], [ 14639495, 7815125 ], [ 14639648, 7820497 ], [ 14642953, 7824269 ], [ 14650619, 7823614 ], [ 14652675, 7830346 ], [ 14649955, 7834824 ], [ 14650255, 7847971 ], [ 14656267, 7857989 ], [ 14669769, 7871013 ], [ 14663454, 7879199 ], [ 14667525, 7879605 ], [ 14677376, 7888507 ], [ 14688685, 7887468 ], [ 14692698, 7897107 ], [ 14702001, 7901293 ], [ 14699422, 7906915 ], [ 14699847, 7911072 ], [ 14696800, 7915390 ], [ 14680740, 7928656 ], [ 14680565, 7935422 ], [ 14666888, 7940823 ], [ 14666093, 7943922 ], [ 14671516, 7946722 ], [ 14671754, 7953512 ], [ 14660560, 7956725 ], [ 14660269, 7961402 ], [ 14646898, 7972404 ], [ 14647494, 7975422 ], [ 14653305, 7977015 ], [ 14654623, 7983925 ], [ 14641662, 7990569 ], [ 14638195, 8002916 ], [ 14632373, 8004769 ], [ 14633315, 8008787 ], [ 14644828, 8011886 ], [ 14648881, 8009102 ], [ 14661388, 8009701 ], [ 14668351, 7999395 ], [ 14674502, 8002486 ], [ 14678922, 7998742 ], [ 14683033, 7994532 ], [ 14681577, 7992472 ], [ 14691945, 7984090 ], [ 14692483, 7978184 ], [ 14701550, 7977683 ], [ 14709450, 7984190 ], [ 14710229, 7988818 ], [ 14705561, 7993329 ], [ 14692472, 8000464 ], [ 14698004, 8006494 ], [ 14695782, 8009698 ], [ 14706578, 8026036 ], [ 14716259, 8020998 ], [ 14717082, 8032045 ], [ 14719618, 8037316 ], [ 14717844, 8043934 ], [ 14719365, 8048893 ], [ 14714157, 8055016 ], [ 14713159, 8058954 ], [ 14715079, 8061311 ], [ 14714767, 8066673 ], [ 14709750, 8076261 ], [ 14728062, 8080961 ], [ 14729689, 8076667 ], [ 14742142, 8075407 ], [ 14741779, 8081260 ], [ 14737495, 8082425 ], [ 14737199, 8086155 ], [ 14754993, 8106977 ], [ 14750018, 8111691 ], [ 14754827, 8122300 ], [ 14752851, 8127226 ], [ 14753884, 8133439 ], [ 14748611, 8136448 ], [ 14753576, 8141448 ], [ 14752669, 8144610 ], [ 14756354, 8147840 ], [ 14756602, 8153312 ], [ 14760025, 8157238 ], [ 14764919, 8156927 ], [ 14768123, 8161074 ], [ 14772443, 8155909 ], [ 14780323, 8155305 ], [ 14783399, 8169053 ], [ 14788325, 8178273 ], [ 14777531, 8184450 ], [ 14785668, 8190222 ], [ 14787546, 8195687 ], [ 14785108, 8200332 ], [ 14786288, 8205949 ], [ 14798133, 8203130 ], [ 14801036, 8206621 ], [ 14801415, 8211081 ], [ 14811925, 8223409 ], [ 14817540, 8227305 ], [ 14823196, 8224750 ], [ 14824525, 8232749 ], [ 14837060, 8229734 ], [ 14842494, 8235381 ], [ 14845935, 8233565 ], [ 14847438, 8239735 ], [ 14859582, 8247779 ], [ 14869013, 8244583 ], [ 14869221, 8234840 ], [ 14876083, 8230148 ], [ 14888336, 8229795 ], [ 14902234, 8236588 ], [ 14920343, 8237202 ], [ 14925424, 8235929 ], [ 14928275, 8231338 ], [ 14936839, 8230660 ], [ 14937261, 8227770 ], [ 14957520, 8224232 ], [ 14959974, 8222408 ], [ 14958765, 8220718 ], [ 14960106, 8217801 ], [ 14965358, 8216660 ], [ 14970931, 8210489 ], [ 14975587, 8220860 ], [ 14979686, 8224633 ], [ 14989710, 8223452 ], [ 14997104, 8227814 ], [ 14996563, 8224763 ], [ 14998782, 8221040 ], [ 14997195, 8218323 ], [ 15000151, 8213536 ], [ 15011114, 8210036 ], [ 15022857, 8216966 ], [ 15047919, 8204447 ], [ 15051397, 8210468 ], [ 15055746, 8210504 ], [ 15054658, 8219447 ], [ 15061966, 8222877 ], [ 15057218, 8231554 ], [ 15061115, 8234240 ], [ 15062098, 8240355 ], [ 15068483, 8247989 ], [ 15066997, 8253233 ], [ 15074737, 8259466 ], [ 15076870, 8266684 ], [ 15084686, 8275945 ], [ 15104667, 8291153 ], [ 15107143, 8289068 ], [ 15120935, 8294773 ], [ 15127268, 8292331 ], [ 15127152, 8288540 ], [ 15133614, 8280222 ], [ 15137988, 8283451 ], [ 15146101, 8277688 ], [ 15148953, 8271790 ], [ 15166152, 8269994 ], [ 15168610, 8273029 ], [ 15174778, 8272558 ], [ 15178059, 8266021 ], [ 15182860, 8263688 ], [ 15188505, 8265789 ], [ 15201447, 8260465 ], [ 15206814, 8263284 ], [ 15212973, 8256046 ], [ 15220305, 8256664 ], [ 15223814, 8253666 ], [ 15230863, 8264820 ], [ 15263808, 8278541 ], [ 15269597, 8257813 ], [ 15266502, 8246593 ], [ 15266376, 8231437 ], [ 15263882, 8225648 ], [ 15275615, 8226284 ], [ 15279367, 8220969 ], [ 15286523, 8220342 ], [ 15288726, 8215697 ], [ 15302493, 8210644 ], [ 15305283, 8217880 ], [ 15315527, 8227687 ], [ 15321847, 8222631 ], [ 15324376, 8215024 ], [ 15337671, 8209968 ], [ 15355717, 8216092 ], [ 15363607, 8222108 ], [ 15364348, 8228145 ], [ 15367225, 8231371 ], [ 15382531, 8222348 ], [ 15391837, 8222587 ], [ 15393799, 8212540 ], [ 15389352, 8201032 ], [ 15382007, 8190919 ], [ 15373404, 8162008 ], [ 15378607, 8157812 ], [ 15378063, 8150483 ], [ 15380487, 8146370 ], [ 15376019, 8133619 ], [ 15383325, 8113631 ], [ 15397553, 8103884 ], [ 15401999, 8096631 ], [ 15400378, 8076527 ], [ 15403865, 8072342 ], [ 15415599, 8068628 ], [ 15426950, 8057504 ], [ 15429773, 8049792 ], [ 15452879, 8050226 ], [ 15462490, 8041940 ], [ 15471487, 8039234 ], [ 15471096, 8034575 ], [ 15491392, 8032817 ], [ 15496818, 8022551 ], [ 15497125, 8013470 ], [ 15512050, 8011335 ], [ 15518051, 8004183 ], [ 15537592, 7994543 ], [ 15545329, 7984626 ], [ 15545482, 7975146 ], [ 15548075, 7973969 ], [ 15550887, 7959475 ], [ 15561371, 7955573 ], [ 15564702, 7946494 ], [ 15576018, 7951707 ], [ 15578477, 7962326 ], [ 15586794, 7960774 ], [ 15590420, 7974653 ], [ 15595825, 7975350 ], [ 15604090, 7968202 ], [ 15603585, 7964034 ], [ 15605189, 7961454 ], [ 15614901, 7966702 ], [ 15623844, 7966009 ], [ 15625997, 7958462 ], [ 15629811, 7955411 ], [ 15637158, 7969633 ], [ 15642279, 7972729 ], [ 15687591, 7957767 ], [ 15682082, 7941212 ], [ 15679764, 7923989 ], [ 15669894, 7906385 ], [ 15641323, 7879457 ], [ 15607227, 7863191 ], [ 15602506, 7848661 ], [ 15591578, 7831727 ], [ 15545440, 7789855 ], [ 15529783, 7781699 ], [ 15507156, 7761181 ], [ 15457973, 7690812 ], [ 15433518, 7673448 ], [ 15432003, 7670856 ], [ 15428793, 7638832 ], [ 15422771, 7624075 ], [ 15415827, 7614774 ], [ 15389598, 7600484 ], [ 15381764, 7592573 ], [ 15362368, 7560612 ], [ 15329894, 7529758 ], [ 15320880, 7518162 ], [ 15297981, 7506598 ], [ 15282334, 7486474 ], [ 15246479, 7455847 ], [ 15222153, 7443438 ], [ 15215044, 7434647 ], [ 15178481, 7466414 ], [ 15161307, 7459068 ], [ 15150453, 7463791 ], [ 15145781, 7459745 ], [ 15137515, 7459259 ], [ 15133069, 7452295 ], [ 15128467, 7449916 ], [ 15113565, 7453364 ], [ 15107365, 7461891 ], [ 15093698, 7461908 ], [ 15094949, 7468872 ], [ 15085088, 7473486 ], [ 15085453, 7483836 ], [ 15088839, 7487535 ], [ 15089048, 7492710 ], [ 15073853, 7500333 ], [ 15066785, 7497954 ], [ 15060429, 7488768 ], [ 15045996, 7487519 ], [ 15044329, 7491618 ], [ 15036549, 7493980 ], [ 15024810, 7487051 ], [ 15019444, 7489638 ], [ 15007809, 7484754 ], [ 15011334, 7478798 ], [ 14996781, 7481906 ], [ 14996521, 7473032 ], [ 14991380, 7469194 ], [ 14978583, 7486618 ], [ 14971447, 7486184 ], [ 14963660, 7492570 ], [ 14960703, 7491593 ], [ 14956253, 7496152 ], [ 14953241, 7504916 ], [ 14942723, 7509753 ], [ 14930671, 7509701 ], [ 14919732, 7503455 ], [ 14911779, 7509828 ], [ 14905475, 7507119 ], [ 14903790, 7503316 ], [ 14891218, 7509290 ], [ 14889603, 7507397 ], [ 14889985, 7503628 ], [ 14892711, 7496734 ], [ 14881986, 7490903 ], [ 14866381, 7489480 ], [ 14860495, 7494619 ], [ 14845371, 7495900 ], [ 14833209, 7494014 ], [ 14812981, 7488234 ], [ 14808958, 7478518 ], [ 14802545, 7475372 ], [ 14785669, 7481613 ], [ 14769498, 7477805 ], [ 14767433, 7480106 ], [ 14767811, 7484400 ], [ 14757003, 7493676 ], [ 14756306, 7500889 ], [ 14749993, 7501035 ], [ 14740383, 7508076 ], [ 14728261, 7505420 ], [ 14723519, 7507362 ], [ 14718772, 7500426 ], [ 14711952, 7501023 ], [ 14712985, 7498462 ], [ 14711507, 7494842 ], [ 14690958, 7501618 ], [ 14687659, 7499856 ], [ 14687500, 7490834 ], [ 14682724, 7492842 ], [ 14674963, 7488623 ], [ 14672039, 7490138 ], [ 14671628, 7495036 ], [ 14668588, 7498130 ], [ 14662640, 7496769 ], [ 14653839, 7500739 ], [ 14649014, 7495848 ], [ 14647217, 7490058 ], [ 14637764, 7498370 ], [ 14632218, 7496278 ], [ 14633595, 7493811 ], [ 14630138, 7491410 ], [ 14624126, 7492252 ], [ 14620173, 7489254 ], [ 14608100, 7497868 ], [ 14598721, 7487814 ], [ 14588729, 7490638 ], [ 14577595, 7501330 ], [ 14578678, 7503673 ], [ 14576531, 7509500 ], [ 14578779, 7520713 ], [ 14570824, 7527140 ], [ 14570201, 7538836 ], [ 14567261, 7541874 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Нанайский район", "ID": "NN", "shortName": "Нан" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 15044401, 6243319 ], [ 15050452, 6266596 ], [ 15049365, 6272238 ], [ 15053531, 6274994 ], [ 15054002, 6279451 ], [ 15057522, 6282333 ], [ 15066748, 6283821 ], [ 15069098, 6288178 ], [ 15066714, 6290359 ], [ 15070882, 6294916 ], [ 15069425, 6297343 ], [ 15077414, 6307232 ], [ 15077036, 6313349 ], [ 15085565, 6318468 ], [ 15092319, 6317572 ], [ 15095238, 6322062 ], [ 15095487, 6319346 ], [ 15102748, 6319368 ], [ 15103822, 6316183 ], [ 15108385, 6317962 ], [ 15105640, 6321022 ], [ 15107553, 6325143 ], [ 15106323, 6327424 ], [ 15109580, 6329992 ], [ 15108777, 6332800 ], [ 15110420, 6332652 ], [ 15110252, 6339047 ], [ 15118136, 6340772 ], [ 15119674, 6345081 ], [ 15128875, 6344871 ], [ 15133746, 6350180 ], [ 15137523, 6348571 ], [ 15137156, 6353032 ], [ 15141324, 6355705 ], [ 15141094, 6361533 ], [ 15144045, 6363546 ], [ 15142647, 6368087 ], [ 15146485, 6367891 ], [ 15146529, 6373519 ], [ 15159365, 6379214 ], [ 15165440, 6384779 ], [ 15173655, 6400595 ], [ 15171763, 6408407 ], [ 15181110, 6417740 ], [ 15197818, 6424211 ], [ 15209950, 6421203 ], [ 15219765, 6422869 ], [ 15226037, 6428723 ], [ 15229898, 6427782 ], [ 15234332, 6434163 ], [ 15261832, 6445633 ], [ 15288670, 6443377 ], [ 15302168, 6434756 ], [ 15298315, 6431022 ], [ 15298154, 6428257 ], [ 15301655, 6423311 ], [ 15297702, 6415928 ], [ 15300098, 6407824 ], [ 15298660, 6401091 ], [ 15306094, 6380263 ], [ 15309091, 6384649 ], [ 15312938, 6381536 ], [ 15311589, 6378038 ], [ 15315588, 6378151 ], [ 15317108, 6383366 ], [ 15316329, 6388458 ], [ 15330633, 6405714 ], [ 15335059, 6395037 ], [ 15342126, 6392507 ], [ 15351472, 6395512 ], [ 15368378, 6394370 ], [ 15370202, 6397795 ], [ 15375236, 6397090 ], [ 15375995, 6393800 ], [ 15384050, 6388077 ], [ 15384516, 6384573 ], [ 15380361, 6380586 ], [ 15376823, 6367777 ], [ 15373633, 6364699 ], [ 15379542, 6356548 ], [ 15390803, 6349523 ], [ 15392367, 6350705 ], [ 15400718, 6341019 ], [ 15407226, 6346812 ], [ 15415132, 6347928 ], [ 15431112, 6361978 ], [ 15439199, 6360436 ], [ 15440811, 6363306 ], [ 15449304, 6365675 ], [ 15452612, 6364915 ], [ 15453193, 6361741 ], [ 15447472, 6350656 ], [ 15449394, 6343146 ], [ 15448142, 6338765 ], [ 15451271, 6331613 ], [ 15447561, 6329647 ], [ 15445199, 6323387 ], [ 15441194, 6322414 ], [ 15441938, 6312916 ], [ 15424229, 6304477 ], [ 15416934, 6293548 ], [ 15418622, 6281762 ], [ 15424630, 6279359 ], [ 15424086, 6272321 ], [ 15428749, 6266113 ], [ 15420838, 6258998 ], [ 15419869, 6242668 ], [ 15381262, 6215870 ], [ 15380202, 6205999 ], [ 15396836, 6188524 ], [ 15396664, 6184456 ], [ 15384154, 6177907 ], [ 15381233, 6171296 ], [ 15383165, 6164823 ], [ 15381720, 6162815 ], [ 15373127, 6161572 ], [ 15367912, 6156670 ], [ 15363464, 6158533 ], [ 15362040, 6152458 ], [ 15358109, 6151960 ], [ 15354443, 6145192 ], [ 15350445, 6144627 ], [ 15349044, 6142003 ], [ 15343401, 6141771 ], [ 15337884, 6145613 ], [ 15329195, 6142081 ], [ 15324666, 6149079 ], [ 15319850, 6145923 ], [ 15313832, 6148934 ], [ 15316889, 6158563 ], [ 15312792, 6162506 ], [ 15310928, 6169598 ], [ 15312059, 6173634 ], [ 15317928, 6175345 ], [ 15317408, 6181887 ], [ 15319120, 6183538 ], [ 15317806, 6189132 ], [ 15319304, 6194054 ], [ 15328902, 6199801 ], [ 15334130, 6215299 ], [ 15355895, 6236362 ], [ 15354917, 6238991 ], [ 15349598, 6240244 ], [ 15344523, 6236148 ], [ 15336942, 6239541 ], [ 15324776, 6235903 ], [ 15326946, 6244921 ], [ 15321016, 6248467 ], [ 15320863, 6257668 ], [ 15312089, 6255039 ], [ 15297538, 6260817 ], [ 15284669, 6259533 ], [ 15269445, 6266197 ], [ 15262139, 6264822 ], [ 15257444, 6248461 ], [ 15252736, 6243443 ], [ 15255667, 6239462 ], [ 15257756, 6227489 ], [ 15253468, 6225456 ], [ 15253598, 6220624 ], [ 15244865, 6216146 ], [ 15244433, 6209507 ], [ 15240692, 6205881 ], [ 15225963, 6206465 ], [ 15229225, 6201518 ], [ 15228292, 6193729 ], [ 15229695, 6189187 ], [ 15225292, 6181627 ], [ 15232304, 6178188 ], [ 15230238, 6173226 ], [ 15227502, 6172683 ], [ 15226994, 6169315 ], [ 15222583, 6170821 ], [ 15222346, 6165632 ], [ 15227046, 6157090 ], [ 15223083, 6153810 ], [ 15223170, 6149057 ], [ 15196387, 6146113 ], [ 15193826, 6139845 ], [ 15191704, 6139726 ], [ 15188048, 6144228 ], [ 15183776, 6143612 ], [ 15181957, 6148252 ], [ 15177335, 6148785 ], [ 15178871, 6160832 ], [ 15183942, 6167447 ], [ 15186505, 6180245 ], [ 15182399, 6186685 ], [ 15171475, 6184719 ], [ 15165412, 6190112 ], [ 15154874, 6213263 ], [ 15147580, 6212234 ], [ 15144600, 6217148 ], [ 15137423, 6221261 ], [ 15139452, 6226378 ], [ 15144989, 6227100 ], [ 15147363, 6233134 ], [ 15150315, 6234319 ], [ 15150127, 6237504 ], [ 15159137, 6240423 ], [ 15165225, 6247342 ], [ 15164432, 6251914 ], [ 15164095, 6249832 ], [ 15160046, 6250913 ], [ 15160556, 6255101 ], [ 15163744, 6257361 ], [ 15164643, 6262203 ], [ 15162187, 6263090 ], [ 15163857, 6266637 ], [ 15157578, 6264225 ], [ 15155671, 6265890 ], [ 15160262, 6270288 ], [ 15159243, 6271459 ], [ 15152560, 6268845 ], [ 15146443, 6270078 ], [ 15137808, 6266207 ], [ 15135323, 6261331 ], [ 15128020, 6257481 ], [ 15128153, 6251430 ], [ 15116167, 6252811 ], [ 15109417, 6246332 ], [ 15104652, 6247242 ], [ 15105292, 6250202 ], [ 15100879, 6251871 ], [ 15101241, 6249386 ], [ 15097868, 6246657 ], [ 15094925, 6248153 ], [ 15090725, 6245890 ], [ 15092476, 6244396 ], [ 15091493, 6242092 ], [ 15089318, 6244786 ], [ 15087459, 6242137 ], [ 15088751, 6240318 ], [ 15083116, 6238537 ], [ 15069744, 6241854 ], [ 15066228, 6241074 ], [ 15065000, 6237950 ], [ 15060345, 6239317 ], [ 15059227, 6236847 ], [ 15048292, 6236327 ], [ 15044401, 6243319 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Хабаровский район", "ID": "HA", "shortName": "Хаб р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14778124, 6337399 ], [ 14778211, 6340613 ], [ 14783248, 6344217 ], [ 14782824, 6353809 ], [ 14781005, 6356303 ], [ 14787417, 6363323 ], [ 14790977, 6373919 ], [ 14786325, 6385754 ], [ 14781335, 6388962 ], [ 14781151, 6392463 ], [ 14785957, 6400738 ], [ 14793172, 6397084 ], [ 14800081, 6399034 ], [ 14799682, 6405712 ], [ 14806606, 6417488 ], [ 14810997, 6418194 ], [ 14813776, 6427006 ], [ 14816570, 6425456 ], [ 14818289, 6430476 ], [ 14822987, 6428634 ], [ 14827946, 6431136 ], [ 14828437, 6436617 ], [ 14822818, 6441131 ], [ 14824077, 6444140 ], [ 14822296, 6446489 ], [ 14823187, 6449129 ], [ 14836083, 6458556 ], [ 14841165, 6457174 ], [ 14841196, 6463776 ], [ 14846001, 6464851 ], [ 14846401, 6474438 ], [ 14851558, 6477091 ], [ 14855708, 6483079 ], [ 14867407, 6480908 ], [ 14870331, 6467839 ], [ 14882190, 6472157 ], [ 14885982, 6477367 ], [ 14894071, 6481182 ], [ 14900857, 6477984 ], [ 14905335, 6483284 ], [ 14914429, 6481754 ], [ 14918839, 6486917 ], [ 14914200, 6492698 ], [ 14915388, 6496582 ], [ 14919090, 6495051 ], [ 14925853, 6499301 ], [ 14937209, 6499644 ], [ 14942578, 6503254 ], [ 14947331, 6502454 ], [ 14947422, 6499507 ], [ 14953069, 6501584 ], [ 14959120, 6511685 ], [ 14971299, 6516346 ], [ 14970362, 6518517 ], [ 14973515, 6523818 ], [ 14971527, 6529096 ], [ 14972830, 6534168 ], [ 14979638, 6535516 ], [ 14984597, 6542531 ], [ 14989143, 6543605 ], [ 15002807, 6535629 ], [ 15019596, 6542889 ], [ 15022960, 6536541 ], [ 15020988, 6534237 ], [ 15021949, 6527740 ], [ 15027502, 6525851 ], [ 15034728, 6512956 ], [ 15042713, 6510924 ], [ 15051928, 6519128 ], [ 15062440, 6520538 ], [ 15067713, 6530770 ], [ 15093544, 6527689 ], [ 15113470, 6538315 ], [ 15118704, 6546894 ], [ 15123151, 6545084 ], [ 15126325, 6536260 ], [ 15131517, 6536338 ], [ 15133657, 6531930 ], [ 15139449, 6535351 ], [ 15156813, 6536572 ], [ 15159509, 6533112 ], [ 15156470, 6526652 ], [ 15149096, 6527505 ], [ 15151810, 6519058 ], [ 15148892, 6515426 ], [ 15147631, 6508812 ], [ 15151426, 6505842 ], [ 15149966, 6498540 ], [ 15139115, 6490866 ], [ 15134455, 6491297 ], [ 15126072, 6484475 ], [ 15120691, 6488070 ], [ 15112332, 6488811 ], [ 15101151, 6481884 ], [ 15094425, 6486327 ], [ 15089417, 6485729 ], [ 15080277, 6478758 ], [ 15075821, 6479868 ], [ 15071881, 6475596 ], [ 15062285, 6474284 ], [ 15058670, 6469014 ], [ 15058562, 6465296 ], [ 15060700, 6463796 ], [ 15058466, 6460554 ], [ 15051716, 6460746 ], [ 15043429, 6451796 ], [ 15034890, 6450060 ], [ 15026446, 6443534 ], [ 15025678, 6440088 ], [ 15018952, 6439079 ], [ 15016622, 6434045 ], [ 15011421, 6434650 ], [ 15008371, 6430455 ], [ 15001020, 6429417 ], [ 14997922, 6424484 ], [ 14993958, 6424376 ], [ 14993802, 6420466 ], [ 14988013, 6413039 ], [ 14990943, 6408766 ], [ 14980579, 6394743 ], [ 14985058, 6388042 ], [ 14992944, 6384897 ], [ 14991559, 6374162 ], [ 15000638, 6369017 ], [ 15003034, 6364112 ], [ 15001356, 6359726 ], [ 15004364, 6356186 ], [ 15002546, 6355453 ], [ 15002758, 6347615 ], [ 15005310, 6344134 ], [ 15003805, 6342391 ], [ 15004280, 6337228 ], [ 15002277, 6336037 ], [ 15003818, 6330327 ], [ 15002328, 6327578 ], [ 15004658, 6324210 ], [ 15001475, 6318661 ], [ 15002466, 6309967 ], [ 14997223, 6305406 ], [ 14997034, 6293469 ], [ 14989996, 6282650 ], [ 14985865, 6281247 ], [ 14984675, 6275848 ], [ 14980268, 6272252 ], [ 14972393, 6272981 ], [ 14968230, 6269750 ], [ 14968304, 6257547 ], [ 14961976, 6244604 ], [ 14962954, 6232622 ], [ 14954645, 6228045 ], [ 14950893, 6227967 ], [ 14949077, 6230958 ], [ 14948313, 6228037 ], [ 14944960, 6226622 ], [ 14946417, 6218429 ], [ 14943591, 6221274 ], [ 14939594, 6216230 ], [ 14933994, 6217746 ], [ 14931061, 6216681 ], [ 14932059, 6214717 ], [ 14928971, 6215799 ], [ 14929553, 6212742 ], [ 14924462, 6215670 ], [ 14921990, 6213226 ], [ 14920863, 6213733 ], [ 14922086, 6215296 ], [ 14919403, 6215555 ], [ 14912628, 6213566 ], [ 14913558, 6215339 ], [ 14912495, 6217786 ], [ 14912601, 6215060 ], [ 14910519, 6216547 ], [ 14908502, 6213243 ], [ 14909127, 6214945 ], [ 14907152, 6214481 ], [ 14905979, 6217584 ], [ 14902489, 6219043 ], [ 14902956, 6217119 ], [ 14901904, 6216528 ], [ 14900829, 6220809 ], [ 14895794, 6221163 ], [ 14896833, 6223784 ], [ 14895058, 6225466 ], [ 14896409, 6227342 ], [ 14893339, 6226051 ], [ 14893801, 6228760 ], [ 14890407, 6232415 ], [ 14888587, 6229547 ], [ 14884733, 6234274 ], [ 14885236, 6229205 ], [ 14882504, 6227028 ], [ 14883100, 6231985 ], [ 14871090, 6229088 ], [ 14866851, 6232133 ], [ 14867459, 6234085 ], [ 14863619, 6235225 ], [ 14864363, 6238349 ], [ 14861846, 6238206 ], [ 14857083, 6245912 ], [ 14836812, 6249187 ], [ 14837250, 6253584 ], [ 14830383, 6268266 ], [ 14836061, 6272168 ], [ 14836696, 6280247 ], [ 14833979, 6285104 ], [ 14822910, 6295298 ], [ 14823168, 6300852 ], [ 14814310, 6304093 ], [ 14811640, 6311360 ], [ 14798372, 6313469 ], [ 14795310, 6318328 ], [ 14784438, 6315069 ], [ 14783991, 6320405 ], [ 14781040, 6323804 ], [ 14781077, 6333361 ], [ 14778124, 6337399 ] ] ], [ [ [ 14991059, 6146119 ], [ 14992747, 6150688 ], [ 14997298, 6152656 ], [ 15002208, 6168833 ], [ 15010510, 6172120 ], [ 15016654, 6180917 ], [ 15022840, 6179687 ], [ 15027222, 6174278 ], [ 15032526, 6175984 ], [ 15033512, 6174901 ], [ 15030154, 6169876 ], [ 15027531, 6168655 ], [ 15028457, 6166404 ], [ 15031671, 6164034 ], [ 15034798, 6165797 ], [ 15040453, 6161353 ], [ 15041984, 6162306 ], [ 15038532, 6164444 ], [ 15039732, 6168651 ], [ 15047391, 6173376 ], [ 15046598, 6180990 ], [ 15052793, 6182675 ], [ 15051841, 6185455 ], [ 15046920, 6186364 ], [ 15045693, 6190226 ], [ 15052102, 6198150 ], [ 15048108, 6196306 ], [ 15042131, 6198102 ], [ 15048121, 6201389 ], [ 15044249, 6202950 ], [ 15045223, 6206466 ], [ 15039595, 6202891 ], [ 15032267, 6207776 ], [ 15031643, 6205402 ], [ 15025713, 6203109 ], [ 15025568, 6207701 ], [ 15022634, 6211732 ], [ 15019671, 6210149 ], [ 15013518, 6213335 ], [ 15012296, 6209538 ], [ 15003425, 6205654 ], [ 15002031, 6214176 ], [ 15005277, 6216970 ], [ 15009569, 6216658 ], [ 15006370, 6220268 ], [ 15010047, 6226203 ], [ 15024362, 6239198 ], [ 15029133, 6237132 ], [ 15032387, 6240086 ], [ 15043458, 6236516 ], [ 15045652, 6238992 ], [ 15052468, 6236092 ], [ 15059227, 6236847 ], [ 15060345, 6239317 ], [ 15065000, 6237950 ], [ 15066228, 6241074 ], [ 15069744, 6241854 ], [ 15080495, 6237950 ], [ 15088751, 6240318 ], [ 15087459, 6242137 ], [ 15089318, 6244786 ], [ 15091493, 6242092 ], [ 15092476, 6244396 ], [ 15090405, 6245569 ], [ 15094925, 6248153 ], [ 15097868, 6246657 ], [ 15101241, 6249386 ], [ 15100879, 6251871 ], [ 15105292, 6250202 ], [ 15104652, 6247242 ], [ 15109417, 6246332 ], [ 15116167, 6252811 ], [ 15128153, 6251430 ], [ 15128020, 6257481 ], [ 15135323, 6261331 ], [ 15137808, 6266207 ], [ 15146443, 6270078 ], [ 15152560, 6268845 ], [ 15159243, 6271459 ], [ 15160262, 6270288 ], [ 15156110, 6267146 ], [ 15156200, 6264441 ], [ 15163857, 6266637 ], [ 15162187, 6263090 ], [ 15164643, 6262203 ], [ 15163744, 6257361 ], [ 15160556, 6255101 ], [ 15160046, 6250913 ], [ 15164095, 6249832 ], [ 15164432, 6251914 ], [ 15165225, 6247342 ], [ 15159137, 6240423 ], [ 15150127, 6237504 ], [ 15150315, 6234319 ], [ 15147363, 6233134 ], [ 15144989, 6227100 ], [ 15139452, 6226378 ], [ 15136114, 6220754 ], [ 15134009, 6211883 ], [ 15135061, 6210155 ], [ 15133686, 6209506 ], [ 15135498, 6209502 ], [ 15136919, 6205203 ], [ 15136686, 6197330 ], [ 15133579, 6191861 ], [ 15135702, 6186552 ], [ 15134176, 6179181 ], [ 15138379, 6169396 ], [ 15134578, 6160442 ], [ 15135363, 6153181 ], [ 15089931, 6150772 ], [ 15081349, 6156376 ], [ 15073066, 6152190 ], [ 15072701, 6147937 ], [ 15069839, 6147306 ], [ 15067359, 6142507 ], [ 15030858, 6126871 ], [ 15022871, 6119568 ], [ 15011558, 6122407 ], [ 15006306, 6127315 ], [ 14995965, 6130874 ], [ 14991965, 6137712 ], [ 14991059, 6146119 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Бикинский район", "ID": "BK", "shortName": "Бик. р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14917440, 5885930 ], [ 14919766, 5902116 ], [ 14922021, 5905288 ], [ 14918390, 5913352 ], [ 14924391, 5931124 ], [ 14923015, 5938003 ], [ 14927563, 5943507 ], [ 14932378, 5957189 ], [ 14941054, 5959673 ], [ 14941712, 5969245 ], [ 14939987, 5975348 ], [ 14943102, 5976054 ], [ 14949561, 5985694 ], [ 14957331, 5978760 ], [ 14963757, 5986652 ], [ 14971802, 5989632 ], [ 14974921, 5988291 ], [ 14983043, 5991196 ], [ 15003666, 5987663 ], [ 15007980, 5989779 ], [ 15007014, 5984520 ], [ 15011739, 5980802 ], [ 15013218, 5974085 ], [ 15008994, 5967049 ], [ 15002927, 5962327 ], [ 15001325, 5965905 ], [ 14990520, 5962385 ], [ 14987392, 5957804 ], [ 14988663, 5953389 ], [ 14982632, 5952338 ], [ 14979893, 5948739 ], [ 14981048, 5941048 ], [ 14977907, 5936405 ], [ 14970900, 5936746 ], [ 14969263, 5939408 ], [ 14964914, 5936641 ], [ 14967222, 5929065 ], [ 14962166, 5919415 ], [ 14966972, 5913711 ], [ 14969477, 5904914 ], [ 14966945, 5901296 ], [ 14967132, 5896661 ], [ 14963875, 5895173 ], [ 14964985, 5892837 ], [ 14959974, 5889250 ], [ 14945048, 5889341 ], [ 14940034, 5885508 ], [ 14924404, 5886368 ], [ 14919133, 5882693 ], [ 14917440, 5885930 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Вяземский район", "ID": "VZ", "shortName": "Вяз р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14933518, 5983462 ], [ 14935662, 5994198 ], [ 14945065, 6001726 ], [ 14945850, 6006840 ], [ 14951452, 6013086 ], [ 14972053, 6015113 ], [ 14979499, 6020521 ], [ 14980541, 6027123 ], [ 14991576, 6038410 ], [ 14992101, 6045438 ], [ 14999591, 6054396 ], [ 15003092, 6062250 ], [ 15001512, 6067603 ], [ 14994020, 6074879 ], [ 14995418, 6075624 ], [ 15007675, 6074769 ], [ 15007865, 6070677 ], [ 15011556, 6068960 ], [ 15015073, 6070264 ], [ 15012481, 6074955 ], [ 15020448, 6074381 ], [ 15020505, 6071433 ], [ 15030376, 6069947 ], [ 15029801, 6069170 ], [ 15030403, 6067999 ], [ 15033511, 6070094 ], [ 15034461, 6076149 ], [ 15059672, 6076028 ], [ 15064766, 6072184 ], [ 15067329, 6063683 ], [ 15076642, 6058808 ], [ 15079674, 6054057 ], [ 15076986, 6044619 ], [ 15079298, 6038587 ], [ 15071642, 6018773 ], [ 15064235, 6010398 ], [ 15066704, 6003960 ], [ 15066110, 5992709 ], [ 15063797, 5988146 ], [ 15072548, 5981708 ], [ 15069266, 5973989 ], [ 15066079, 5974520 ], [ 15060964, 5968672 ], [ 15056537, 5968694 ], [ 15054112, 5971853 ], [ 15052232, 5968444 ], [ 15038014, 5977121 ], [ 15029996, 5970195 ], [ 15029181, 5963892 ], [ 15019732, 5963221 ], [ 15010354, 5969616 ], [ 15013218, 5974085 ], [ 15012848, 5978255 ], [ 15007014, 5984520 ], [ 15007980, 5989779 ], [ 15006398, 5990025 ], [ 15003666, 5987663 ], [ 14983043, 5991196 ], [ 14974921, 5988291 ], [ 14971802, 5989632 ], [ 14963757, 5986652 ], [ 14957331, 5978760 ], [ 14949561, 5985694 ], [ 14943102, 5976054 ], [ 14939987, 5975348 ], [ 14933518, 5983462 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Солнечный район", "ID": "SL", "shortName": "Сол р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14941178, 6613403 ], [ 14943243, 6619246 ], [ 14963619, 6634535 ], [ 14967045, 6643124 ], [ 14960087, 6671944 ], [ 14951586, 6679657 ], [ 14958607, 6684663 ], [ 14972743, 6687622 ], [ 14982629, 6696091 ], [ 14984990, 6702577 ], [ 15004649, 6711775 ], [ 15005088, 6718214 ], [ 15008334, 6717675 ], [ 15010014, 6722903 ], [ 15014636, 6726408 ], [ 15018018, 6724990 ], [ 15026210, 6728598 ], [ 15028652, 6734114 ], [ 15028089, 6737171 ], [ 15049114, 6740272 ], [ 15048748, 6750679 ], [ 15057693, 6751410 ], [ 15063627, 6756585 ], [ 15073190, 6750791 ], [ 15086662, 6761226 ], [ 15103510, 6767554 ], [ 15112904, 6756979 ], [ 15123338, 6752198 ], [ 15147697, 6770806 ], [ 15153888, 6770370 ], [ 15157974, 6773877 ], [ 15169500, 6767540 ], [ 15174343, 6771558 ], [ 15183950, 6768981 ], [ 15200106, 6773509 ], [ 15207157, 6769550 ], [ 15216379, 6776892 ], [ 15216583, 6781871 ], [ 15234075, 6787265 ], [ 15230388, 6796023 ], [ 15238206, 6802926 ], [ 15229300, 6811535 ], [ 15228978, 6815246 ], [ 15245926, 6825167 ], [ 15259211, 6826058 ], [ 15273932, 6838997 ], [ 15279165, 6840734 ], [ 15281038, 6845315 ], [ 15287875, 6847882 ], [ 15291363, 6851848 ], [ 15292881, 6856151 ], [ 15291869, 6858851 ], [ 15303091, 6866726 ], [ 15314088, 6861017 ], [ 15315748, 6858148 ], [ 15314791, 6850076 ], [ 15332229, 6840935 ], [ 15314559, 6833058 ], [ 15311978, 6828511 ], [ 15312899, 6825868 ], [ 15305279, 6818678 ], [ 15301254, 6812410 ], [ 15301316, 6808631 ], [ 15305329, 6806952 ], [ 15311809, 6795098 ], [ 15324124, 6788806 ], [ 15328548, 6773296 ], [ 15336390, 6772583 ], [ 15342412, 6766905 ], [ 15355095, 6763758 ], [ 15363182, 6757613 ], [ 15369966, 6759211 ], [ 15375128, 6756876 ], [ 15372498, 6738613 ], [ 15373285, 6731484 ], [ 15367582, 6727797 ], [ 15363158, 6715286 ], [ 15354555, 6712656 ], [ 15354354, 6698290 ], [ 15350935, 6699294 ], [ 15343693, 6695753 ], [ 15333898, 6700375 ], [ 15326510, 6695084 ], [ 15302533, 6693509 ], [ 15305952, 6678779 ], [ 15302856, 6660100 ], [ 15296624, 6648281 ], [ 15294550, 6638801 ], [ 15292238, 6639971 ], [ 15278996, 6630465 ], [ 15282370, 6627010 ], [ 15282058, 6623788 ], [ 15285060, 6622545 ], [ 15285029, 6618988 ], [ 15287094, 6618786 ], [ 15285527, 6610914 ], [ 15279193, 6609941 ], [ 15284482, 6602593 ], [ 15284843, 6599055 ], [ 15272423, 6591416 ], [ 15267652, 6592122 ], [ 15267831, 6587000 ], [ 15261081, 6582980 ], [ 15261523, 6577939 ], [ 15245620, 6570942 ], [ 15240433, 6565052 ], [ 15234582, 6569884 ], [ 15230646, 6565245 ], [ 15231959, 6564657 ], [ 15230968, 6562942 ], [ 15226548, 6563989 ], [ 15220978, 6556584 ], [ 15207729, 6554543 ], [ 15204028, 6557178 ], [ 15192943, 6556604 ], [ 15189665, 6561029 ], [ 15185937, 6559956 ], [ 15180150, 6564790 ], [ 15171884, 6558212 ], [ 15164347, 6561797 ], [ 15159486, 6552763 ], [ 15162874, 6545704 ], [ 15155750, 6536341 ], [ 15139449, 6535351 ], [ 15133657, 6531930 ], [ 15131517, 6536338 ], [ 15126325, 6536260 ], [ 15123151, 6545084 ], [ 15118704, 6546894 ], [ 15113470, 6538315 ], [ 15093544, 6527689 ], [ 15067713, 6530770 ], [ 15062440, 6520538 ], [ 15051928, 6519128 ], [ 15040625, 6511069 ], [ 15034728, 6512956 ], [ 15027502, 6525851 ], [ 15021949, 6527740 ], [ 15020988, 6534237 ], [ 15022960, 6536541 ], [ 15019596, 6542889 ], [ 15004961, 6535745 ], [ 14992730, 6540784 ], [ 14999297, 6549055 ], [ 14998465, 6554669 ], [ 14994281, 6559122 ], [ 14995978, 6569010 ], [ 14985093, 6569740 ], [ 14969362, 6576101 ], [ 14960068, 6574767 ], [ 14961705, 6595243 ], [ 14957020, 6608945 ], [ 14947575, 6603958 ], [ 14943369, 6607308 ], [ 14941178, 6613403 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Амурский район", "ID": "AU", "shortName": "Амур р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14961918, 6235440 ], [ 14962090, 6245022 ], [ 14969207, 6261333 ], [ 14968141, 6269602 ], [ 14972393, 6272981 ], [ 14980268, 6272252 ], [ 14984675, 6275848 ], [ 14985865, 6281247 ], [ 14989996, 6282650 ], [ 14997034, 6293469 ], [ 14997223, 6305406 ], [ 15002466, 6309967 ], [ 15001475, 6318661 ], [ 15004658, 6324210 ], [ 15002328, 6327578 ], [ 15003818, 6330327 ], [ 15002277, 6336037 ], [ 15004280, 6337228 ], [ 15003805, 6342391 ], [ 15005310, 6344134 ], [ 15002758, 6347615 ], [ 15002546, 6355453 ], [ 15004364, 6356186 ], [ 15001356, 6359726 ], [ 15003034, 6364112 ], [ 15000638, 6369017 ], [ 14991559, 6374162 ], [ 14992944, 6384897 ], [ 14985058, 6388042 ], [ 14980579, 6394743 ], [ 14990943, 6408766 ], [ 14988013, 6413039 ], [ 14993802, 6420466 ], [ 14993958, 6424376 ], [ 14997922, 6424484 ], [ 15001020, 6429417 ], [ 15008371, 6430455 ], [ 15011421, 6434650 ], [ 15016622, 6434045 ], [ 15018952, 6439079 ], [ 15025678, 6440088 ], [ 15026446, 6443534 ], [ 15034890, 6450060 ], [ 15043429, 6451796 ], [ 15051716, 6460746 ], [ 15058466, 6460554 ], [ 15060700, 6463796 ], [ 15058562, 6465296 ], [ 15058670, 6469014 ], [ 15062285, 6474284 ], [ 15071881, 6475596 ], [ 15075821, 6479868 ], [ 15080277, 6478758 ], [ 15090317, 6485909 ], [ 15094425, 6486327 ], [ 15101151, 6481884 ], [ 15112825, 6488859 ], [ 15120691, 6488070 ], [ 15126072, 6484475 ], [ 15130888, 6489253 ], [ 15138286, 6490448 ], [ 15149966, 6498540 ], [ 15151426, 6505842 ], [ 15147631, 6508812 ], [ 15148892, 6515426 ], [ 15151810, 6519058 ], [ 15148976, 6527181 ], [ 15156470, 6526652 ], [ 15158440, 6529065 ], [ 15159281, 6533917 ], [ 15155750, 6536341 ], [ 15162475, 6545505 ], [ 15164489, 6544116 ], [ 15163359, 6541222 ], [ 15164639, 6538705 ], [ 15173358, 6532190 ], [ 15178724, 6521893 ], [ 15189932, 6513859 ], [ 15208965, 6504516 ], [ 15227984, 6508501 ], [ 15244372, 6505028 ], [ 15247673, 6501050 ], [ 15247466, 6488489 ], [ 15252792, 6473856 ], [ 15269581, 6481097 ], [ 15268425, 6474536 ], [ 15256821, 6466854 ], [ 15255195, 6463015 ], [ 15251840, 6462914 ], [ 15251354, 6459196 ], [ 15260981, 6454814 ], [ 15263075, 6457994 ], [ 15267055, 6456822 ], [ 15269867, 6452250 ], [ 15276368, 6451459 ], [ 15275019, 6449627 ], [ 15276097, 6448551 ], [ 15288548, 6451596 ], [ 15287781, 6449938 ], [ 15289330, 6449055 ], [ 15296680, 6448459 ], [ 15296397, 6445875 ], [ 15298149, 6445140 ], [ 15295640, 6440354 ], [ 15282271, 6444749 ], [ 15261832, 6445633 ], [ 15234332, 6434163 ], [ 15229898, 6427782 ], [ 15226037, 6428723 ], [ 15219765, 6422869 ], [ 15209950, 6421203 ], [ 15197818, 6424211 ], [ 15181110, 6417740 ], [ 15171763, 6408407 ], [ 15173655, 6400595 ], [ 15165440, 6384779 ], [ 15159365, 6379214 ], [ 15146529, 6373519 ], [ 15146485, 6367891 ], [ 15142647, 6368087 ], [ 15144045, 6363546 ], [ 15141094, 6361533 ], [ 15141324, 6355705 ], [ 15137156, 6353032 ], [ 15137523, 6348571 ], [ 15133746, 6350180 ], [ 15128875, 6344871 ], [ 15119674, 6345081 ], [ 15118136, 6340772 ], [ 15110252, 6339047 ], [ 15110420, 6332652 ], [ 15108777, 6332800 ], [ 15109580, 6329992 ], [ 15106323, 6327424 ], [ 15107553, 6325143 ], [ 15105640, 6321022 ], [ 15108385, 6317962 ], [ 15103822, 6316183 ], [ 15102748, 6319368 ], [ 15095487, 6319346 ], [ 15095774, 6319766 ], [ 15095443, 6319893 ], [ 15095708, 6320319 ], [ 15095513, 6321829 ], [ 15095238, 6322062 ], [ 15092319, 6317572 ], [ 15085565, 6318468 ], [ 15077036, 6313349 ], [ 15077414, 6307232 ], [ 15069425, 6297343 ], [ 15070882, 6294916 ], [ 15066714, 6290359 ], [ 15069098, 6288178 ], [ 15066748, 6283821 ], [ 15057522, 6282333 ], [ 15054002, 6279451 ], [ 15053531, 6274994 ], [ 15049365, 6272238 ], [ 15050452, 6266596 ], [ 15044415, 6243413 ], [ 15045823, 6238964 ], [ 15044658, 6236947 ], [ 15036600, 6237003 ], [ 15032387, 6240086 ], [ 15029133, 6237132 ], [ 15024324, 6239169 ], [ 15010047, 6226203 ], [ 15006370, 6220268 ], [ 15009569, 6216658 ], [ 15005277, 6216970 ], [ 15002031, 6214176 ], [ 15003630, 6207013 ], [ 15002401, 6202886 ], [ 14997018, 6203176 ], [ 14991326, 6211085 ], [ 14978734, 6207125 ], [ 14981032, 6212375 ], [ 14977819, 6213019 ], [ 14974534, 6217592 ], [ 14971769, 6215831 ], [ 14972725, 6218559 ], [ 14968221, 6220689 ], [ 14967528, 6228135 ], [ 14962738, 6227556 ], [ 14961918, 6235440 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "район имени Полины Осипенко", "ID": "PO", "shortName": "Пол Ос" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14971490, 6856719 ], [ 14978085, 6869128 ], [ 14983198, 6870653 ], [ 14982887, 6877046 ], [ 14988456, 6883515 ], [ 14987811, 6890552 ], [ 14983510, 6891237 ], [ 14985079, 6896615 ], [ 14983363, 6898165 ], [ 14986165, 6900780 ], [ 14986113, 6904721 ], [ 14990457, 6906975 ], [ 14991706, 6914418 ], [ 14999070, 6913592 ], [ 15000364, 6917114 ], [ 14999176, 6929970 ], [ 14988944, 6931430 ], [ 14987847, 6936234 ], [ 14990666, 6939023 ], [ 14990826, 6942998 ], [ 14984278, 6946638 ], [ 14984673, 6951290 ], [ 14982494, 6955487 ], [ 14987100, 6958792 ], [ 14988227, 6962547 ], [ 14983002, 6964683 ], [ 14994125, 6978739 ], [ 14994865, 6983682 ], [ 14998801, 6985350 ], [ 14998250, 6988909 ], [ 15004185, 6996502 ], [ 15018171, 6994009 ], [ 15024365, 6982651 ], [ 15031476, 6983503 ], [ 15044596, 6976595 ], [ 15056474, 6978679 ], [ 15059946, 6970017 ], [ 15066378, 6969542 ], [ 15071860, 6973599 ], [ 15084286, 6972319 ], [ 15089841, 6965010 ], [ 15091668, 6956714 ], [ 15090535, 6951378 ], [ 15104788, 6929231 ], [ 15124231, 6943923 ], [ 15152350, 6974110 ], [ 15185213, 6997897 ], [ 15193563, 6995558 ], [ 15213608, 7002762 ], [ 15216672, 7006481 ], [ 15210988, 7010574 ], [ 15211596, 7014691 ], [ 15220648, 7018387 ], [ 15231220, 7017287 ], [ 15242588, 7023041 ], [ 15245839, 7021310 ], [ 15248084, 7026550 ], [ 15261604, 7013030 ], [ 15266726, 7020118 ], [ 15278819, 7027064 ], [ 15283754, 7019346 ], [ 15293765, 7018925 ], [ 15297016, 7002622 ], [ 15299659, 7003090 ], [ 15301694, 6998739 ], [ 15315611, 7001406 ], [ 15326488, 6984951 ], [ 15328970, 6984784 ], [ 15331777, 6985661 ], [ 15334467, 6992269 ], [ 15346484, 6990339 ], [ 15352097, 6996917 ], [ 15363013, 7003166 ], [ 15363779, 7007038 ], [ 15369416, 7012534 ], [ 15377696, 7016136 ], [ 15376597, 7021680 ], [ 15386959, 7029094 ], [ 15388339, 7033562 ], [ 15393508, 7037865 ], [ 15415876, 7045393 ], [ 15417120, 7035853 ], [ 15421988, 7035553 ], [ 15424994, 7030804 ], [ 15421658, 7025154 ], [ 15428781, 7020706 ], [ 15438187, 7005589 ], [ 15460908, 6998767 ], [ 15467099, 6990202 ], [ 15470886, 6977369 ], [ 15477227, 6969615 ], [ 15481135, 6968984 ], [ 15485643, 6973792 ], [ 15497153, 6977338 ], [ 15498476, 6981907 ], [ 15508874, 6981877 ], [ 15520238, 6977160 ], [ 15520957, 6973278 ], [ 15524608, 6971927 ], [ 15525730, 6974601 ], [ 15532142, 6969885 ], [ 15531049, 6960540 ], [ 15538324, 6959332 ], [ 15539791, 6953553 ], [ 15552874, 6954444 ], [ 15558050, 6948578 ], [ 15564635, 6948118 ], [ 15579644, 6937479 ], [ 15578839, 6924252 ], [ 15569954, 6900558 ], [ 15548733, 6898402 ], [ 15542062, 6905964 ], [ 15527714, 6902197 ], [ 15508851, 6912003 ], [ 15477767, 6911456 ], [ 15473857, 6910076 ], [ 15468882, 6897740 ], [ 15461521, 6893053 ], [ 15446138, 6903405 ], [ 15438891, 6903693 ], [ 15440444, 6896935 ], [ 15431099, 6883191 ], [ 15427045, 6880517 ], [ 15409159, 6885606 ], [ 15406054, 6880632 ], [ 15404818, 6873443 ], [ 15378881, 6863379 ], [ 15372699, 6851475 ], [ 15364590, 6844487 ], [ 15339976, 6837874 ], [ 15335519, 6841296 ], [ 15327054, 6842060 ], [ 15324382, 6846279 ], [ 15314791, 6850076 ], [ 15315748, 6858148 ], [ 15314088, 6861017 ], [ 15303091, 6866726 ], [ 15291869, 6858851 ], [ 15292881, 6856151 ], [ 15291363, 6851848 ], [ 15287875, 6847882 ], [ 15281038, 6845315 ], [ 15279165, 6840734 ], [ 15273932, 6838997 ], [ 15259211, 6826058 ], [ 15245926, 6825167 ], [ 15228978, 6815246 ], [ 15229300, 6811535 ], [ 15238206, 6802926 ], [ 15230388, 6796023 ], [ 15234075, 6787265 ], [ 15216583, 6781871 ], [ 15216379, 6776892 ], [ 15207157, 6769550 ], [ 15200106, 6773509 ], [ 15183950, 6768981 ], [ 15174343, 6771558 ], [ 15169500, 6767540 ], [ 15157974, 6773877 ], [ 15153888, 6770370 ], [ 15147697, 6770806 ], [ 15123338, 6752198 ], [ 15112904, 6756979 ], [ 15103510, 6767554 ], [ 15086662, 6761226 ], [ 15073190, 6750791 ], [ 15063627, 6756585 ], [ 15057693, 6751410 ], [ 15048748, 6750679 ], [ 15049114, 6740272 ], [ 15037667, 6737572 ], [ 15028089, 6737171 ], [ 15026078, 6744113 ], [ 15027701, 6745453 ], [ 15023461, 6754380 ], [ 15023003, 6761506 ], [ 15025352, 6762425 ], [ 15025313, 6765432 ], [ 15028962, 6765374 ], [ 15029382, 6770124 ], [ 15032361, 6774605 ], [ 15031539, 6778301 ], [ 15034730, 6783913 ], [ 15032800, 6786901 ], [ 15034270, 6794102 ], [ 15039389, 6798929 ], [ 15037192, 6801917 ], [ 15039100, 6807279 ], [ 15031688, 6811474 ], [ 15031307, 6820782 ], [ 15025269, 6825149 ], [ 15016825, 6825016 ], [ 15007732, 6828846 ], [ 15004313, 6825207 ], [ 15001199, 6825571 ], [ 15001926, 6820936 ], [ 14996941, 6818887 ], [ 15000647, 6814635 ], [ 14987771, 6810269 ], [ 14978297, 6821433 ], [ 14980876, 6832944 ], [ 14975235, 6838542 ], [ 14974911, 6847686 ], [ 14972074, 6850221 ], [ 14971490, 6856719 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "район имени Лазо", "ID": "LZ", "shortName": "Лазо" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14977328, 6104984 ], [ 14977443, 6112250 ], [ 14986692, 6122982 ], [ 14991965, 6137712 ], [ 14996640, 6130445 ], [ 15006306, 6127315 ], [ 15011558, 6122407 ], [ 15022871, 6119568 ], [ 15030858, 6126871 ], [ 15067359, 6142507 ], [ 15069839, 6147306 ], [ 15072701, 6147937 ], [ 15073066, 6152190 ], [ 15081349, 6156376 ], [ 15089931, 6150772 ], [ 15135363, 6153181 ], [ 15134578, 6160442 ], [ 15138379, 6169396 ], [ 15134176, 6179181 ], [ 15135702, 6186552 ], [ 15133579, 6191861 ], [ 15136686, 6197330 ], [ 15136919, 6205203 ], [ 15135498, 6209502 ], [ 15133686, 6209506 ], [ 15135061, 6210155 ], [ 15134009, 6211883 ], [ 15136505, 6221077 ], [ 15144600, 6217148 ], [ 15147580, 6212234 ], [ 15154874, 6213263 ], [ 15165412, 6190112 ], [ 15171475, 6184719 ], [ 15182399, 6186685 ], [ 15186211, 6180879 ], [ 15183942, 6167447 ], [ 15178871, 6160832 ], [ 15177335, 6148785 ], [ 15181957, 6148252 ], [ 15183776, 6143612 ], [ 15188048, 6144228 ], [ 15191134, 6139735 ], [ 15193826, 6139845 ], [ 15196387, 6146113 ], [ 15201770, 6145034 ], [ 15207313, 6148432 ], [ 15208901, 6146336 ], [ 15219943, 6147111 ], [ 15223170, 6149057 ], [ 15223083, 6153810 ], [ 15227046, 6157090 ], [ 15222346, 6165632 ], [ 15222583, 6170821 ], [ 15226994, 6169315 ], [ 15227502, 6172683 ], [ 15230238, 6173226 ], [ 15232304, 6178188 ], [ 15225292, 6181627 ], [ 15229695, 6189187 ], [ 15228292, 6193729 ], [ 15229225, 6201518 ], [ 15225963, 6206465 ], [ 15240692, 6205881 ], [ 15244433, 6209507 ], [ 15244865, 6216146 ], [ 15253598, 6220624 ], [ 15253468, 6225456 ], [ 15257756, 6227489 ], [ 15255667, 6239462 ], [ 15252736, 6243443 ], [ 15257444, 6248461 ], [ 15262139, 6264822 ], [ 15269445, 6266197 ], [ 15284669, 6259533 ], [ 15297538, 6260817 ], [ 15312089, 6255039 ], [ 15320863, 6257668 ], [ 15321016, 6248467 ], [ 15326946, 6244921 ], [ 15324776, 6235903 ], [ 15336942, 6239541 ], [ 15344523, 6236148 ], [ 15349598, 6240244 ], [ 15354917, 6238991 ], [ 15355895, 6236362 ], [ 15334130, 6215299 ], [ 15328902, 6199801 ], [ 15319304, 6194054 ], [ 15317806, 6189132 ], [ 15319120, 6183538 ], [ 15317408, 6181887 ], [ 15317928, 6175345 ], [ 15312059, 6173634 ], [ 15310928, 6169598 ], [ 15312792, 6162506 ], [ 15316889, 6158563 ], [ 15313832, 6148934 ], [ 15315732, 6147262 ], [ 15313005, 6142247 ], [ 15301011, 6140687 ], [ 15294786, 6132501 ], [ 15291917, 6132966 ], [ 15289925, 6126666 ], [ 15285086, 6124236 ], [ 15287218, 6120083 ], [ 15286488, 6117986 ], [ 15297357, 6110447 ], [ 15298098, 6104878 ], [ 15308185, 6102891 ], [ 15311028, 6098230 ], [ 15318145, 6094225 ], [ 15317644, 6088037 ], [ 15307755, 6085960 ], [ 15296799, 6074608 ], [ 15301202, 6071064 ], [ 15309475, 6073411 ], [ 15312835, 6071597 ], [ 15317429, 6074465 ], [ 15330820, 6066906 ], [ 15337954, 6057483 ], [ 15339873, 6061151 ], [ 15345192, 6061921 ], [ 15348567, 6065638 ], [ 15357198, 6063353 ], [ 15361402, 6060559 ], [ 15361362, 6055176 ], [ 15368846, 6055673 ], [ 15367724, 6051676 ], [ 15359037, 6043085 ], [ 15365972, 6038445 ], [ 15367787, 6040818 ], [ 15371712, 6035010 ], [ 15368233, 6032768 ], [ 15370956, 6029489 ], [ 15370757, 6026047 ], [ 15365988, 6025175 ], [ 15361728, 6017564 ], [ 15357739, 6015550 ], [ 15353225, 6016822 ], [ 15350979, 6014291 ], [ 15352938, 6008760 ], [ 15348145, 6003550 ], [ 15346425, 6004491 ], [ 15333009, 5995923 ], [ 15329299, 6000271 ], [ 15316440, 5993257 ], [ 15312330, 5985199 ], [ 15303932, 5979974 ], [ 15302555, 5976328 ], [ 15288128, 5976797 ], [ 15287769, 5979576 ], [ 15282634, 5984255 ], [ 15281981, 5988092 ], [ 15278327, 5989113 ], [ 15275620, 5987576 ], [ 15275986, 5985006 ], [ 15271495, 5984818 ], [ 15267714, 5989477 ], [ 15261631, 5991978 ], [ 15256002, 5989407 ], [ 15251638, 5980983 ], [ 15250595, 5974700 ], [ 15245070, 5969511 ], [ 15244918, 5958427 ], [ 15242458, 5955059 ], [ 15248334, 5946143 ], [ 15243835, 5940562 ], [ 15239759, 5940095 ], [ 15238031, 5932990 ], [ 15231040, 5934460 ], [ 15227919, 5926007 ], [ 15224289, 5922710 ], [ 15221128, 5923328 ], [ 15221621, 5918786 ], [ 15210881, 5915099 ], [ 15208349, 5908674 ], [ 15202919, 5907313 ], [ 15201032, 5911116 ], [ 15195578, 5909755 ], [ 15189455, 5914200 ], [ 15182154, 5911710 ], [ 15182799, 5907441 ], [ 15179535, 5903535 ], [ 15168412, 5907430 ], [ 15165522, 5905500 ], [ 15155816, 5910628 ], [ 15152424, 5917843 ], [ 15146493, 5920906 ], [ 15139139, 5909852 ], [ 15133823, 5909041 ], [ 15121269, 5914141 ], [ 15115998, 5925448 ], [ 15106558, 5928592 ], [ 15107059, 5930846 ], [ 15111891, 5932641 ], [ 15111909, 5936325 ], [ 15095587, 5933886 ], [ 15092088, 5938817 ], [ 15081359, 5933179 ], [ 15077135, 5933913 ], [ 15075748, 5930099 ], [ 15066469, 5930623 ], [ 15068312, 5938791 ], [ 15072617, 5937859 ], [ 15071641, 5944603 ], [ 15076107, 5950038 ], [ 15069386, 5952508 ], [ 15060492, 5964496 ], [ 15061933, 5966838 ], [ 15060964, 5968672 ], [ 15066079, 5974520 ], [ 15069266, 5973989 ], [ 15072548, 5981708 ], [ 15063797, 5988146 ], [ 15066110, 5992709 ], [ 15066704, 6003960 ], [ 15064235, 6010398 ], [ 15071642, 6018773 ], [ 15079298, 6038587 ], [ 15076986, 6044619 ], [ 15079674, 6054057 ], [ 15076642, 6058808 ], [ 15067329, 6063683 ], [ 15064766, 6072184 ], [ 15059672, 6076028 ], [ 15034461, 6076149 ], [ 15033511, 6070094 ], [ 15030403, 6067999 ], [ 15030376, 6069947 ], [ 15020505, 6071433 ], [ 15020448, 6074381 ], [ 15012481, 6074955 ], [ 15015073, 6070264 ], [ 15011556, 6068960 ], [ 15007865, 6070677 ], [ 15007675, 6074769 ], [ 14993109, 6075187 ], [ 14990573, 6077975 ], [ 14991376, 6087202 ], [ 14988891, 6090155 ], [ 14983744, 6090827 ], [ 14982801, 6098156 ], [ 14977328, 6104984 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "городской округ Хабаровск", "ID": "HO", "shortName": "" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 15016654, 6180917 ], [ 15021029, 6192784 ], [ 15027410, 6195265 ], [ 15025713, 6203109 ], [ 15031643, 6205402 ], [ 15032267, 6207776 ], [ 15039595, 6202891 ], [ 15045223, 6206466 ], [ 15044249, 6202950 ], [ 15045945, 6202877 ], [ 15048121, 6201389 ], [ 15042372, 6197781 ], [ 15052147, 6197941 ], [ 15045693, 6190226 ], [ 15046920, 6186364 ], [ 15051841, 6185455 ], [ 15052793, 6182675 ], [ 15046598, 6180990 ], [ 15047391, 6173376 ], [ 15039732, 6168651 ], [ 15038532, 6164444 ], [ 15041984, 6162306 ], [ 15040453, 6161353 ], [ 15034798, 6165797 ], [ 15031671, 6164034 ], [ 15028457, 6166404 ], [ 15027531, 6168655 ], [ 15030154, 6169876 ], [ 15033512, 6174901 ], [ 15032526, 6175984 ], [ 15027222, 6174278 ], [ 15022840, 6179687 ], [ 15016654, 6180917 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Комсомольский район", "ID": "KM", "shortName": "Комс р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 15159486, 6552763 ], [ 15164347, 6561797 ], [ 15171884, 6558212 ], [ 15180150, 6564790 ], [ 15185937, 6559956 ], [ 15189665, 6561029 ], [ 15192943, 6556604 ], [ 15204028, 6557178 ], [ 15207729, 6554543 ], [ 15220978, 6556584 ], [ 15226548, 6563989 ], [ 15230968, 6562942 ], [ 15231959, 6564657 ], [ 15230646, 6565245 ], [ 15234582, 6569884 ], [ 15235982, 6568503 ], [ 15234810, 6566079 ], [ 15243001, 6557140 ], [ 15240753, 6550101 ], [ 15238052, 6549433 ], [ 15239086, 6542900 ], [ 15237226, 6537731 ], [ 15239422, 6529107 ], [ 15235725, 6530651 ], [ 15236287, 6525138 ], [ 15240095, 6526009 ], [ 15238834, 6519327 ], [ 15240627, 6524599 ], [ 15253138, 6527905 ], [ 15253368, 6536928 ], [ 15267512, 6548795 ], [ 15274846, 6558359 ], [ 15274492, 6560361 ], [ 15270685, 6559282 ], [ 15268612, 6565061 ], [ 15264236, 6560481 ], [ 15256158, 6559792 ], [ 15254209, 6554034 ], [ 15250542, 6553799 ], [ 15243029, 6567377 ], [ 15245620, 6570942 ], [ 15261523, 6577939 ], [ 15261081, 6582980 ], [ 15267831, 6587000 ], [ 15267652, 6592122 ], [ 15272423, 6591416 ], [ 15284867, 6599098 ], [ 15279193, 6609941 ], [ 15285527, 6610914 ], [ 15287094, 6618786 ], [ 15285029, 6618988 ], [ 15285060, 6622545 ], [ 15282058, 6623788 ], [ 15282370, 6627010 ], [ 15278996, 6630465 ], [ 15292238, 6639971 ], [ 15294550, 6638801 ], [ 15296624, 6648281 ], [ 15302856, 6660100 ], [ 15305952, 6678779 ], [ 15302951, 6693869 ], [ 15326510, 6695084 ], [ 15333898, 6700375 ], [ 15343693, 6695753 ], [ 15350935, 6699294 ], [ 15357572, 6698557 ], [ 15360837, 6696247 ], [ 15361326, 6692231 ], [ 15373845, 6685681 ], [ 15382111, 6683103 ], [ 15382755, 6686132 ], [ 15393743, 6688987 ], [ 15400659, 6684158 ], [ 15406197, 6685445 ], [ 15406932, 6681758 ], [ 15415974, 6675848 ], [ 15419368, 6678737 ], [ 15423326, 6677952 ], [ 15433432, 6693192 ], [ 15441600, 6691463 ], [ 15444552, 6680411 ], [ 15452769, 6670928 ], [ 15449733, 6665694 ], [ 15461235, 6669915 ], [ 15472621, 6665265 ], [ 15476663, 6666540 ], [ 15482574, 6661493 ], [ 15485911, 6642353 ], [ 15484414, 6638456 ], [ 15486690, 6635726 ], [ 15482497, 6631523 ], [ 15482449, 6621657 ], [ 15469486, 6614853 ], [ 15464313, 6618237 ], [ 15447201, 6608243 ], [ 15444184, 6603063 ], [ 15445698, 6599717 ], [ 15442685, 6596159 ], [ 15443228, 6590071 ], [ 15437398, 6587496 ], [ 15439076, 6583395 ], [ 15436627, 6580549 ], [ 15437674, 6574847 ], [ 15441046, 6572175 ], [ 15445315, 6561034 ], [ 15451918, 6557435 ], [ 15457735, 6550149 ], [ 15456829, 6544363 ], [ 15464836, 6538861 ], [ 15469920, 6541674 ], [ 15473731, 6536959 ], [ 15474185, 6531317 ], [ 15470907, 6530373 ], [ 15469769, 6526414 ], [ 15466950, 6524000 ], [ 15459478, 6524809 ], [ 15456473, 6516127 ], [ 15449264, 6511997 ], [ 15453459, 6502233 ], [ 15456520, 6500620 ], [ 15456001, 6497749 ], [ 15459406, 6488740 ], [ 15457657, 6483717 ], [ 15453853, 6482057 ], [ 15455142, 6476536 ], [ 15459722, 6472073 ], [ 15460264, 6468615 ], [ 15471028, 6463418 ], [ 15470607, 6458943 ], [ 15474402, 6450537 ], [ 15483595, 6443402 ], [ 15488457, 6444319 ], [ 15491228, 6441137 ], [ 15496489, 6442762 ], [ 15499214, 6438245 ], [ 15505139, 6435092 ], [ 15520734, 6443027 ], [ 15519102, 6430442 ], [ 15517343, 6428200 ], [ 15521328, 6423918 ], [ 15520412, 6414498 ], [ 15510974, 6409403 ], [ 15520434, 6399210 ], [ 15514773, 6393172 ], [ 15512455, 6384826 ], [ 15513841, 6383871 ], [ 15509402, 6379976 ], [ 15509815, 6378102 ], [ 15503534, 6378228 ], [ 15501753, 6385020 ], [ 15498174, 6387488 ], [ 15496927, 6391560 ], [ 15491732, 6393995 ], [ 15491680, 6399495 ], [ 15487700, 6401309 ], [ 15487226, 6404913 ], [ 15478850, 6405885 ], [ 15471427, 6401936 ], [ 15464664, 6407576 ], [ 15450001, 6404890 ], [ 15445594, 6409895 ], [ 15439524, 6411683 ], [ 15440359, 6413394 ], [ 15437869, 6416590 ], [ 15431757, 6419070 ], [ 15428280, 6413021 ], [ 15421418, 6410285 ], [ 15422794, 6407155 ], [ 15421692, 6404513 ], [ 15416167, 6404721 ], [ 15412042, 6400759 ], [ 15416097, 6393080 ], [ 15412307, 6387147 ], [ 15418415, 6385757 ], [ 15420063, 6382632 ], [ 15420408, 6376339 ], [ 15417065, 6372634 ], [ 15424006, 6369442 ], [ 15431079, 6360078 ], [ 15425811, 6358335 ], [ 15424202, 6354641 ], [ 15420302, 6353792 ], [ 15414774, 6347691 ], [ 15407226, 6346812 ], [ 15400718, 6341019 ], [ 15392367, 6350705 ], [ 15386293, 6351598 ], [ 15375462, 6360742 ], [ 15373633, 6364699 ], [ 15376823, 6367777 ], [ 15378453, 6376379 ], [ 15380615, 6377366 ], [ 15380361, 6380586 ], [ 15383091, 6382053 ], [ 15384506, 6387393 ], [ 15374248, 6397566 ], [ 15369119, 6397357 ], [ 15368378, 6394370 ], [ 15351472, 6395512 ], [ 15342126, 6392507 ], [ 15335059, 6395037 ], [ 15332096, 6404800 ], [ 15330196, 6405619 ], [ 15316329, 6388458 ], [ 15317108, 6383366 ], [ 15315588, 6378151 ], [ 15311589, 6378038 ], [ 15312938, 6381536 ], [ 15309091, 6384649 ], [ 15306094, 6380263 ], [ 15298660, 6401091 ], [ 15300098, 6407824 ], [ 15297702, 6415928 ], [ 15301655, 6423311 ], [ 15298154, 6428257 ], [ 15298315, 6431022 ], [ 15302199, 6434663 ], [ 15295640, 6440354 ], [ 15297769, 6442340 ], [ 15296758, 6448400 ], [ 15289330, 6449055 ], [ 15287123, 6451639 ], [ 15275873, 6448603 ], [ 15276368, 6451459 ], [ 15269867, 6452250 ], [ 15267055, 6456822 ], [ 15263075, 6457994 ], [ 15260981, 6454814 ], [ 15251127, 6459552 ], [ 15251840, 6462914 ], [ 15255195, 6463015 ], [ 15256821, 6466854 ], [ 15268425, 6474536 ], [ 15269581, 6481097 ], [ 15252792, 6473856 ], [ 15247466, 6488489 ], [ 15247673, 6501050 ], [ 15244372, 6505028 ], [ 15227984, 6508501 ], [ 15208965, 6504516 ], [ 15188326, 6514798 ], [ 15178724, 6521893 ], [ 15173358, 6532190 ], [ 15165882, 6537034 ], [ 15163359, 6541222 ], [ 15164489, 6544116 ], [ 15159486, 6552763 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "городской округ Комсомольск-на-Амуре", "ID": "KO", "shortName": "о Комс" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 15234810, 6566079 ], [ 15235982, 6568503 ], [ 15240407, 6565053 ], [ 15243475, 6567268 ], [ 15250542, 6553799 ], [ 15254209, 6554034 ], [ 15256158, 6559792 ], [ 15264236, 6560481 ], [ 15268612, 6565061 ], [ 15270685, 6559282 ], [ 15274492, 6560361 ], [ 15274846, 6558359 ], [ 15267512, 6548795 ], [ 15253368, 6536928 ], [ 15252556, 6534391 ], [ 15253385, 6528582 ], [ 15253138, 6527905 ], [ 15240627, 6524599 ], [ 15238834, 6519327 ], [ 15240095, 6526009 ], [ 15236287, 6525138 ], [ 15235725, 6530651 ], [ 15239422, 6529107 ], [ 15237226, 6537731 ], [ 15239086, 6542900 ], [ 15238052, 6549433 ], [ 15240753, 6550101 ], [ 15243001, 6557140 ], [ 15234810, 6566079 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Охотский район", "ID": "OH", "shortName": "Охот. р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 15263882, 8225648 ], [ 15266376, 8231437 ], [ 15266502, 8246593 ], [ 15269597, 8257813 ], [ 15265572, 8276435 ], [ 15270654, 8276147 ], [ 15275121, 8284733 ], [ 15283982, 8288288 ], [ 15290258, 8298396 ], [ 15300343, 8297391 ], [ 15306379, 8301343 ], [ 15304691, 8308146 ], [ 15300752, 8309573 ], [ 15302338, 8311161 ], [ 15300843, 8321250 ], [ 15304714, 8324130 ], [ 15305449, 8329020 ], [ 15312462, 8333498 ], [ 15314225, 8341511 ], [ 15341888, 8346110 ], [ 15350821, 8342257 ], [ 15353225, 8346853 ], [ 15358774, 8348051 ], [ 15359717, 8356489 ], [ 15365560, 8360826 ], [ 15367312, 8356159 ], [ 15365876, 8351451 ], [ 15371095, 8344009 ], [ 15365287, 8333109 ], [ 15364394, 8326438 ], [ 15367374, 8321246 ], [ 15385297, 8320766 ], [ 15385490, 8329626 ], [ 15392379, 8334521 ], [ 15391824, 8338144 ], [ 15386582, 8340002 ], [ 15387988, 8344398 ], [ 15386552, 8358576 ], [ 15381649, 8361275 ], [ 15383729, 8369802 ], [ 15383725, 8380658 ], [ 15391299, 8384341 ], [ 15392004, 8387661 ], [ 15387110, 8393890 ], [ 15388506, 8409073 ], [ 15391302, 8415073 ], [ 15385651, 8422475 ], [ 15387490, 8432454 ], [ 15386234, 8434736 ], [ 15388748, 8438363 ], [ 15381915, 8446243 ], [ 15386429, 8457019 ], [ 15385825, 8461851 ], [ 15397630, 8471134 ], [ 15396443, 8472464 ], [ 15398119, 8481024 ], [ 15396317, 8482921 ], [ 15399452, 8489686 ], [ 15395947, 8492074 ], [ 15397351, 8495247 ], [ 15391862, 8507652 ], [ 15397493, 8510325 ], [ 15402156, 8525742 ], [ 15398636, 8528170 ], [ 15400251, 8531645 ], [ 15399047, 8535506 ], [ 15406266, 8539235 ], [ 15407075, 8546548 ], [ 15405711, 8550537 ], [ 15409841, 8558093 ], [ 15404346, 8563871 ], [ 15396910, 8565930 ], [ 15396076, 8574600 ], [ 15392347, 8578515 ], [ 15393592, 8584191 ], [ 15388160, 8586131 ], [ 15385124, 8593070 ], [ 15390687, 8605414 ], [ 15389824, 8609105 ], [ 15392045, 8615478 ], [ 15401744, 8623946 ], [ 15400663, 8631247 ], [ 15402224, 8636154 ], [ 15398230, 8640008 ], [ 15399544, 8650533 ], [ 15406298, 8648678 ], [ 15415785, 8658454 ], [ 15423967, 8660631 ], [ 15435527, 8672936 ], [ 15440376, 8673528 ], [ 15434569, 8678130 ], [ 15435668, 8682070 ], [ 15432888, 8690360 ], [ 15443733, 8703545 ], [ 15447861, 8698204 ], [ 15458705, 8702560 ], [ 15470080, 8698648 ], [ 15477812, 8705624 ], [ 15477796, 8710044 ], [ 15480389, 8710048 ], [ 15481870, 8716768 ], [ 15479958, 8719308 ], [ 15479721, 8725715 ], [ 15492988, 8722675 ], [ 15498641, 8726545 ], [ 15506967, 8725348 ], [ 15517575, 8733434 ], [ 15516747, 8738398 ], [ 15523030, 8740371 ], [ 15528744, 8733432 ], [ 15535053, 8735391 ], [ 15545120, 8754672 ], [ 15550475, 8779495 ], [ 15555135, 8778640 ], [ 15555291, 8772744 ], [ 15559766, 8774173 ], [ 15560392, 8788112 ], [ 15577778, 8812822 ], [ 15582511, 8826365 ], [ 15579395, 8843436 ], [ 15583353, 8853600 ], [ 15589237, 8856316 ], [ 15597789, 8851710 ], [ 15604243, 8862735 ], [ 15615452, 8868113 ], [ 15614306, 8874328 ], [ 15611593, 8875355 ], [ 15613271, 8880722 ], [ 15619897, 8885334 ], [ 15620414, 8899895 ], [ 15621963, 8903387 ], [ 15619760, 8905217 ], [ 15619762, 8909038 ], [ 15622113, 8911218 ], [ 15616111, 8917856 ], [ 15620191, 8926689 ], [ 15618852, 8929621 ], [ 15620317, 8935488 ], [ 15619464, 8941073 ], [ 15622322, 8943535 ], [ 15622731, 8948324 ], [ 15628307, 8949407 ], [ 15628705, 8955591 ], [ 15631716, 8958515 ], [ 15656351, 8956384 ], [ 15661738, 8962016 ], [ 15661955, 8966269 ], [ 15665334, 8967507 ], [ 15665982, 8971106 ], [ 15663087, 8974324 ], [ 15666845, 8976228 ], [ 15667630, 8981940 ], [ 15677552, 8986306 ], [ 15682630, 8982652 ], [ 15684041, 8977503 ], [ 15691218, 8978884 ], [ 15695474, 8972878 ], [ 15702875, 8976236 ], [ 15704778, 8970273 ], [ 15704498, 8962602 ], [ 15710234, 8953852 ], [ 15715479, 8958633 ], [ 15720340, 8954471 ], [ 15731045, 8958539 ], [ 15734042, 8946123 ], [ 15739589, 8940428 ], [ 15739668, 8936288 ], [ 15742903, 8935123 ], [ 15742916, 8931239 ], [ 15752545, 8925122 ], [ 15756145, 8915266 ], [ 15758307, 8896116 ], [ 15766498, 8892863 ], [ 15767390, 8887619 ], [ 15774887, 8883679 ], [ 15777553, 8877461 ], [ 15791107, 8879051 ], [ 15790926, 8873601 ], [ 15788638, 8872159 ], [ 15789972, 8861800 ], [ 15799708, 8868315 ], [ 15807558, 8863929 ], [ 15812476, 8869483 ], [ 15814386, 8866991 ], [ 15819463, 8875080 ], [ 15826671, 8876761 ], [ 15828501, 8868493 ], [ 15837086, 8863394 ], [ 15835710, 8860156 ], [ 15838811, 8856961 ], [ 15836978, 8851204 ], [ 15851618, 8849327 ], [ 15854685, 8841886 ], [ 15851245, 8836329 ], [ 15857525, 8828756 ], [ 15859861, 8834490 ], [ 15882373, 8846592 ], [ 15883179, 8850650 ], [ 15886777, 8852765 ], [ 15894555, 8849949 ], [ 15895134, 8845852 ], [ 15901714, 8846721 ], [ 15906718, 8837100 ], [ 15910528, 8838750 ], [ 15913581, 8834704 ], [ 15919408, 8838979 ], [ 15918713, 8843160 ], [ 15921471, 8846596 ], [ 15919961, 8852546 ], [ 15924493, 8853418 ], [ 15935766, 8873235 ], [ 15931696, 8875566 ], [ 15931409, 8880273 ], [ 15934577, 8884702 ], [ 15939383, 8883438 ], [ 15944257, 8887051 ], [ 15951652, 8879876 ], [ 15949831, 8877072 ], [ 15950467, 8870987 ], [ 15955706, 8867247 ], [ 15964699, 8864332 ], [ 15968499, 8870542 ], [ 15975042, 8871921 ], [ 15990576, 8863579 ], [ 15986710, 8860072 ], [ 15989514, 8853860 ], [ 15985256, 8845996 ], [ 15987472, 8845134 ], [ 15989807, 8837160 ], [ 15988037, 8831622 ], [ 15991077, 8830114 ], [ 15989409, 8828602 ], [ 15990412, 8825364 ], [ 15996186, 8827873 ], [ 15995169, 8830155 ], [ 15998220, 8832086 ], [ 15996491, 8836415 ], [ 16004380, 8836856 ], [ 16005963, 8840399 ], [ 16004141, 8845484 ], [ 16005193, 8848439 ], [ 16014232, 8850356 ], [ 16018386, 8858239 ], [ 16021352, 8857786 ], [ 16022857, 8852816 ], [ 16021101, 8847283 ], [ 16023876, 8846912 ], [ 16025454, 8842505 ], [ 16023487, 8839526 ], [ 16029950, 8834342 ], [ 16027809, 8830009 ], [ 16028225, 8826012 ], [ 16024489, 8821017 ], [ 16025532, 8813219 ], [ 16022519, 8808216 ], [ 16024836, 8805868 ], [ 16023183, 8804690 ], [ 16023849, 8801278 ], [ 16037653, 8800193 ], [ 16042573, 8796349 ], [ 16046049, 8801664 ], [ 16054914, 8794887 ], [ 16058433, 8798783 ], [ 16057459, 8804044 ], [ 16067451, 8810163 ], [ 16070450, 8808629 ], [ 16075865, 8819723 ], [ 16080552, 8816807 ], [ 16090681, 8822436 ], [ 16089821, 8826349 ], [ 16091136, 8828371 ], [ 16088674, 8830418 ], [ 16094337, 8836434 ], [ 16099004, 8836755 ], [ 16095115, 8839955 ], [ 16097922, 8844561 ], [ 16095276, 8847209 ], [ 16094904, 8852792 ], [ 16102978, 8856972 ], [ 16104828, 8863655 ], [ 16107610, 8863860 ], [ 16110433, 8869969 ], [ 16115953, 8867781 ], [ 16125622, 8873393 ], [ 16138115, 8874311 ], [ 16140692, 8864963 ], [ 16144000, 8860933 ], [ 16157431, 8859654 ], [ 16157855, 8854541 ], [ 16164793, 8850646 ], [ 16173677, 8860414 ], [ 16185580, 8853539 ], [ 16192747, 8856361 ], [ 16191890, 8847130 ], [ 16197752, 8850950 ], [ 16201282, 8847263 ], [ 16203812, 8854324 ], [ 16212691, 8855060 ], [ 16215152, 8867212 ], [ 16211539, 8870992 ], [ 16213754, 8872917 ], [ 16219099, 8867688 ], [ 16224402, 8869449 ], [ 16223911, 8866264 ], [ 16228134, 8866045 ], [ 16232672, 8859421 ], [ 16236432, 8862583 ], [ 16248796, 8860209 ], [ 16254732, 8846034 ], [ 16262835, 8849066 ], [ 16264798, 8846255 ], [ 16263724, 8844165 ], [ 16270169, 8843300 ], [ 16268261, 8837119 ], [ 16274693, 8838843 ], [ 16279164, 8835254 ], [ 16277808, 8828719 ], [ 16281619, 8827753 ], [ 16279764, 8825054 ], [ 16288019, 8824957 ], [ 16291351, 8821644 ], [ 16292398, 8815133 ], [ 16295910, 8813288 ], [ 16293119, 8806995 ], [ 16295872, 8798555 ], [ 16300783, 8797037 ], [ 16300470, 8792944 ], [ 16303986, 8793020 ], [ 16303514, 8785779 ], [ 16318934, 8773643 ], [ 16319866, 8768467 ], [ 16317732, 8766018 ], [ 16320155, 8759110 ], [ 16317090, 8749209 ], [ 16335063, 8734091 ], [ 16329094, 8719207 ], [ 16336307, 8718675 ], [ 16330315, 8696228 ], [ 16336518, 8680022 ], [ 16336968, 8674170 ], [ 16333789, 8661344 ], [ 16337669, 8648038 ], [ 16329379, 8647349 ], [ 16326282, 8639876 ], [ 16332106, 8634960 ], [ 16332818, 8628840 ], [ 16336794, 8626841 ], [ 16332995, 8624195 ], [ 16330900, 8614057 ], [ 16320058, 8615883 ], [ 16308115, 8612106 ], [ 16309606, 8610275 ], [ 16305997, 8606270 ], [ 16309356, 8603044 ], [ 16310805, 8595704 ], [ 16307796, 8592585 ], [ 16312223, 8590029 ], [ 16306182, 8582174 ], [ 16308424, 8580657 ], [ 16307772, 8576147 ], [ 16302880, 8575685 ], [ 16304462, 8573018 ], [ 16302338, 8569844 ], [ 16304889, 8565606 ], [ 16303254, 8563937 ], [ 16303851, 8558368 ], [ 16300693, 8554635 ], [ 16301777, 8550423 ], [ 16290061, 8546502 ], [ 16283820, 8549898 ], [ 16283957, 8553963 ], [ 16281967, 8555560 ], [ 16274587, 8557683 ], [ 16270230, 8566997 ], [ 16261743, 8565464 ], [ 16259517, 8563314 ], [ 16259963, 8559494 ], [ 16250689, 8547800 ], [ 16243774, 8547216 ], [ 16242693, 8544336 ], [ 16244689, 8538624 ], [ 16233753, 8534876 ], [ 16229533, 8537766 ], [ 16220862, 8533503 ], [ 16221188, 8529971 ], [ 16213159, 8524801 ], [ 16214250, 8518430 ], [ 16212651, 8515875 ], [ 16204986, 8515885 ], [ 16200387, 8511085 ], [ 16200331, 8494338 ], [ 16212776, 8492345 ], [ 16214874, 8483550 ], [ 16214403, 8480086 ], [ 16205267, 8474828 ], [ 16203381, 8470547 ], [ 16208159, 8469252 ], [ 16212233, 8458940 ], [ 16226673, 8445397 ], [ 16232912, 8444319 ], [ 16236773, 8437745 ], [ 16243229, 8440140 ], [ 16245786, 8444875 ], [ 16271924, 8444969 ], [ 16287548, 8454408 ], [ 16298094, 8453710 ], [ 16298345, 8448271 ], [ 16307839, 8441103 ], [ 16309627, 8435798 ], [ 16308355, 8427252 ], [ 16312054, 8427617 ], [ 16312476, 8421416 ], [ 16317166, 8420452 ], [ 16321210, 8425597 ], [ 16329357, 8419199 ], [ 16327484, 8408281 ], [ 16329663, 8405463 ], [ 16328758, 8400798 ], [ 16331133, 8397760 ], [ 16330290, 8395081 ], [ 16339299, 8386969 ], [ 16338763, 8382842 ], [ 16341787, 8378630 ], [ 16357534, 8389028 ], [ 16368337, 8388147 ], [ 16370982, 8384357 ], [ 16367095, 8380837 ], [ 16376881, 8375025 ], [ 16378063, 8367238 ], [ 16382406, 8363964 ], [ 16379866, 8361851 ], [ 16381497, 8357455 ], [ 16380270, 8354605 ], [ 16388098, 8341045 ], [ 16377997, 8332365 ], [ 16380147, 8328719 ], [ 16380121, 8323254 ], [ 16383649, 8320877 ], [ 16379928, 8312543 ], [ 16381268, 8310841 ], [ 16379754, 8304484 ], [ 16381027, 8302680 ], [ 16378916, 8296083 ], [ 16380491, 8290240 ], [ 16374389, 8279327 ], [ 16376447, 8275149 ], [ 16376177, 8269300 ], [ 16356921, 8264332 ], [ 16357917, 8250388 ], [ 16354222, 8212126 ], [ 16308472, 8182758 ], [ 16270762, 8169722 ], [ 16249624, 8167821 ], [ 16230463, 8173369 ], [ 16219868, 8181166 ], [ 16205711, 8199609 ], [ 16170601, 8220480 ], [ 16139124, 8216741 ], [ 16072539, 8217315 ], [ 16021980, 8224436 ], [ 15980924, 8207197 ], [ 15934119, 8208269 ], [ 15879916, 8186266 ], [ 15848325, 8158557 ], [ 15808819, 8091192 ], [ 15788551, 8066768 ], [ 15756702, 8040724 ], [ 15717507, 8018867 ], [ 15707580, 8007577 ], [ 15699141, 7994031 ], [ 15687591, 7957767 ], [ 15642279, 7972729 ], [ 15637158, 7969633 ], [ 15629811, 7955411 ], [ 15625997, 7958462 ], [ 15623844, 7966009 ], [ 15614901, 7966702 ], [ 15605189, 7961454 ], [ 15603585, 7964034 ], [ 15604090, 7968202 ], [ 15595825, 7975350 ], [ 15590420, 7974653 ], [ 15586794, 7960774 ], [ 15578477, 7962326 ], [ 15576018, 7951707 ], [ 15564702, 7946494 ], [ 15561371, 7955573 ], [ 15550887, 7959475 ], [ 15548075, 7973969 ], [ 15545482, 7975146 ], [ 15545329, 7984626 ], [ 15537592, 7994543 ], [ 15518051, 8004183 ], [ 15512050, 8011335 ], [ 15497125, 8013470 ], [ 15496818, 8022551 ], [ 15491392, 8032817 ], [ 15471096, 8034575 ], [ 15471487, 8039234 ], [ 15462490, 8041940 ], [ 15452879, 8050226 ], [ 15429773, 8049792 ], [ 15426950, 8057504 ], [ 15415599, 8068628 ], [ 15403865, 8072342 ], [ 15400378, 8076527 ], [ 15401999, 8096631 ], [ 15397553, 8103884 ], [ 15383325, 8113631 ], [ 15376019, 8133619 ], [ 15380487, 8146370 ], [ 15378063, 8150483 ], [ 15378607, 8157812 ], [ 15373404, 8162008 ], [ 15382007, 8190919 ], [ 15389352, 8201032 ], [ 15393799, 8212540 ], [ 15391837, 8222587 ], [ 15382531, 8222348 ], [ 15367225, 8231371 ], [ 15364348, 8228145 ], [ 15363607, 8222108 ], [ 15355717, 8216092 ], [ 15337671, 8209968 ], [ 15324376, 8215024 ], [ 15321847, 8222631 ], [ 15315527, 8227687 ], [ 15305283, 8217880 ], [ 15302493, 8210644 ], [ 15288726, 8215697 ], [ 15286523, 8220342 ], [ 15279367, 8220969 ], [ 15275615, 8226284 ], [ 15263882, 8225648 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Ульчский район", "ID": "UL", "shortName": "Ульч. р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 15301254, 6812410 ], [ 15312899, 6825868 ], [ 15311978, 6828511 ], [ 15314559, 6833058 ], [ 15332229, 6840935 ], [ 15339976, 6837874 ], [ 15364590, 6844487 ], [ 15372699, 6851475 ], [ 15378881, 6863379 ], [ 15404818, 6873443 ], [ 15406054, 6880632 ], [ 15409159, 6885606 ], [ 15427045, 6880517 ], [ 15431099, 6883191 ], [ 15440444, 6896935 ], [ 15438891, 6903693 ], [ 15446138, 6903405 ], [ 15461521, 6893053 ], [ 15468882, 6897740 ], [ 15473857, 6910076 ], [ 15477767, 6911456 ], [ 15508851, 6912003 ], [ 15527714, 6902197 ], [ 15542062, 6905964 ], [ 15548733, 6898402 ], [ 15569954, 6900558 ], [ 15578839, 6924252 ], [ 15579299, 6939060 ], [ 15564635, 6948118 ], [ 15558050, 6948578 ], [ 15552874, 6954444 ], [ 15539791, 6953553 ], [ 15538324, 6959332 ], [ 15531049, 6960540 ], [ 15532142, 6969885 ], [ 15525730, 6974601 ], [ 15524608, 6971927 ], [ 15520957, 6973278 ], [ 15520238, 6977160 ], [ 15508874, 6981877 ], [ 15498476, 6981907 ], [ 15497153, 6977338 ], [ 15485643, 6973792 ], [ 15481135, 6968984 ], [ 15477227, 6969615 ], [ 15470886, 6977369 ], [ 15467099, 6990202 ], [ 15460908, 6998767 ], [ 15438187, 7005589 ], [ 15428781, 7020706 ], [ 15421658, 7025154 ], [ 15424994, 7030804 ], [ 15423822, 7033840 ], [ 15417120, 7035853 ], [ 15416373, 7049925 ], [ 15419852, 7054369 ], [ 15423390, 7051971 ], [ 15425349, 7054603 ], [ 15427513, 7069894 ], [ 15425291, 7075332 ], [ 15429852, 7087239 ], [ 15440648, 7085405 ], [ 15443530, 7088474 ], [ 15452572, 7089848 ], [ 15458053, 7086475 ], [ 15458878, 7082539 ], [ 15466536, 7074586 ], [ 15472590, 7072212 ], [ 15489870, 7078627 ], [ 15491476, 7084223 ], [ 15496964, 7088808 ], [ 15505876, 7081991 ], [ 15510463, 7085369 ], [ 15513304, 7081458 ], [ 15518861, 7081672 ], [ 15523328, 7070706 ], [ 15521301, 7069135 ], [ 15525128, 7064083 ], [ 15524482, 7060663 ], [ 15526204, 7058137 ], [ 15523859, 7055290 ], [ 15524967, 7051914 ], [ 15536586, 7042880 ], [ 15535956, 7034707 ], [ 15534178, 7032311 ], [ 15546030, 7020229 ], [ 15550392, 7019876 ], [ 15556138, 7025627 ], [ 15563874, 7022074 ], [ 15569656, 7034399 ], [ 15572432, 7035958 ], [ 15574782, 7032154 ], [ 15584752, 7026787 ], [ 15579091, 7022809 ], [ 15584344, 7020694 ], [ 15590236, 7013384 ], [ 15581308, 7009977 ], [ 15580905, 6999407 ], [ 15579127, 6997368 ], [ 15585755, 6997165 ], [ 15593838, 6991661 ], [ 15606381, 6976078 ], [ 15609919, 6977473 ], [ 15614132, 6990482 ], [ 15620538, 6988677 ], [ 15625658, 6990676 ], [ 15637407, 6986553 ], [ 15637109, 6982463 ], [ 15645420, 6978662 ], [ 15652381, 6982024 ], [ 15657286, 6978887 ], [ 15656908, 6976020 ], [ 15659917, 6970818 ], [ 15668515, 6966904 ], [ 15668594, 6960695 ], [ 15670539, 6958239 ], [ 15666735, 6955541 ], [ 15668342, 6952792 ], [ 15665809, 6946054 ], [ 15657476, 6946003 ], [ 15644670, 6940960 ], [ 15645714, 6938826 ], [ 15637271, 6928811 ], [ 15637300, 6923157 ], [ 15641109, 6921478 ], [ 15643517, 6916708 ], [ 15649908, 6915931 ], [ 15649856, 6912967 ], [ 15656101, 6911086 ], [ 15655340, 6903327 ], [ 15648784, 6901628 ], [ 15647397, 6898261 ], [ 15640102, 6893797 ], [ 15647769, 6888351 ], [ 15648569, 6884431 ], [ 15659643, 6881358 ], [ 15671069, 6873028 ], [ 15670581, 6869378 ], [ 15675363, 6864405 ], [ 15674851, 6859209 ], [ 15676437, 6856733 ], [ 15671911, 6852251 ], [ 15675571, 6847519 ], [ 15675138, 6844479 ], [ 15670417, 6843748 ], [ 15669221, 6839723 ], [ 15672671, 6838035 ], [ 15675030, 6832647 ], [ 15678990, 6832082 ], [ 15682467, 6823527 ], [ 15678144, 6815194 ], [ 15680822, 6809990 ], [ 15680029, 6804788 ], [ 15676330, 6800949 ], [ 15677325, 6788596 ], [ 15690129, 6786012 ], [ 15695306, 6789246 ], [ 15697583, 6778959 ], [ 15703714, 6767515 ], [ 15702296, 6764392 ], [ 15708169, 6762335 ], [ 15707494, 6759796 ], [ 15709559, 6755441 ], [ 15712556, 6758483 ], [ 15712675, 6761580 ], [ 15715763, 6760988 ], [ 15742436, 6731996 ], [ 15742180, 6721194 ], [ 15727927, 6710989 ], [ 15719672, 6700987 ], [ 15718328, 6688203 ], [ 15712253, 6671541 ], [ 15695494, 6650330 ], [ 15694994, 6620894 ], [ 15690269, 6602335 ], [ 15683993, 6591169 ], [ 15648807, 6619127 ], [ 15644554, 6612392 ], [ 15637770, 6611852 ], [ 15632805, 6607550 ], [ 15631305, 6602462 ], [ 15626488, 6601774 ], [ 15613140, 6589434 ], [ 15595615, 6595039 ], [ 15590920, 6602167 ], [ 15591460, 6607870 ], [ 15581014, 6609861 ], [ 15577622, 6621118 ], [ 15571821, 6627362 ], [ 15550264, 6613597 ], [ 15542644, 6619127 ], [ 15542373, 6622544 ], [ 15536130, 6620823 ], [ 15520620, 6629721 ], [ 15511402, 6631172 ], [ 15500316, 6626772 ], [ 15493852, 6618193 ], [ 15487535, 6620553 ], [ 15482639, 6626261 ], [ 15482578, 6631747 ], [ 15486690, 6635726 ], [ 15484359, 6638855 ], [ 15485911, 6642353 ], [ 15483783, 6659767 ], [ 15476663, 6666540 ], [ 15472621, 6665265 ], [ 15461235, 6669915 ], [ 15449733, 6665694 ], [ 15452769, 6670928 ], [ 15444552, 6680411 ], [ 15441600, 6691463 ], [ 15433432, 6693192 ], [ 15423326, 6677952 ], [ 15419368, 6678737 ], [ 15415974, 6675848 ], [ 15406932, 6681758 ], [ 15405774, 6685574 ], [ 15400659, 6684158 ], [ 15393591, 6689007 ], [ 15382755, 6686132 ], [ 15382111, 6683103 ], [ 15361471, 6692123 ], [ 15360796, 6696292 ], [ 15354370, 6698252 ], [ 15353448, 6710689 ], [ 15363158, 6715286 ], [ 15367582, 6727797 ], [ 15373285, 6731484 ], [ 15372498, 6738613 ], [ 15375128, 6756876 ], [ 15369966, 6759211 ], [ 15363182, 6757613 ], [ 15355095, 6763758 ], [ 15342412, 6766905 ], [ 15336390, 6772583 ], [ 15328548, 6773296 ], [ 15324124, 6788806 ], [ 15311809, 6795098 ], [ 15305329, 6806952 ], [ 15301316, 6808631 ], [ 15301254, 6812410 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Ванинский район", "ID": "VN", "shortName": "Ван. р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 15412042, 6400759 ], [ 15416167, 6404721 ], [ 15421692, 6404513 ], [ 15422794, 6407155 ], [ 15421418, 6410285 ], [ 15428280, 6413021 ], [ 15430771, 6418350 ], [ 15433695, 6419585 ], [ 15440359, 6413394 ], [ 15439524, 6411683 ], [ 15445594, 6409895 ], [ 15450001, 6404890 ], [ 15464664, 6407576 ], [ 15471427, 6401936 ], [ 15478850, 6405885 ], [ 15487226, 6404913 ], [ 15487700, 6401309 ], [ 15491680, 6399495 ], [ 15491732, 6393995 ], [ 15496927, 6391560 ], [ 15498174, 6387488 ], [ 15501753, 6385020 ], [ 15502803, 6378552 ], [ 15508182, 6377838 ], [ 15513841, 6383871 ], [ 15512455, 6384826 ], [ 15514773, 6393172 ], [ 15520434, 6399210 ], [ 15510974, 6409403 ], [ 15520412, 6414498 ], [ 15521328, 6423918 ], [ 15517343, 6428200 ], [ 15519102, 6430442 ], [ 15520734, 6443027 ], [ 15505139, 6435092 ], [ 15499214, 6438245 ], [ 15496489, 6442762 ], [ 15491228, 6441137 ], [ 15488457, 6444319 ], [ 15483595, 6443402 ], [ 15474402, 6450537 ], [ 15470607, 6458943 ], [ 15471028, 6463418 ], [ 15460264, 6468615 ], [ 15459722, 6472073 ], [ 15455142, 6476536 ], [ 15453853, 6482057 ], [ 15457657, 6483717 ], [ 15459406, 6488740 ], [ 15456001, 6497749 ], [ 15456520, 6500620 ], [ 15453459, 6502233 ], [ 15449711, 6509210 ], [ 15449697, 6513371 ], [ 15454967, 6514354 ], [ 15459445, 6524785 ], [ 15467274, 6524053 ], [ 15474344, 6532341 ], [ 15473731, 6536959 ], [ 15469920, 6541674 ], [ 15464836, 6538861 ], [ 15456829, 6544363 ], [ 15457735, 6550149 ], [ 15451918, 6557435 ], [ 15445315, 6561034 ], [ 15441046, 6572175 ], [ 15437674, 6574847 ], [ 15436627, 6580549 ], [ 15439076, 6583395 ], [ 15437398, 6587496 ], [ 15443054, 6589767 ], [ 15442685, 6596159 ], [ 15445698, 6599717 ], [ 15444197, 6603103 ], [ 15451380, 6611808 ], [ 15464359, 6618253 ], [ 15466640, 6614894 ], [ 15471522, 6615439 ], [ 15483366, 6623524 ], [ 15493852, 6618193 ], [ 15500316, 6626772 ], [ 15511402, 6631172 ], [ 15520620, 6629721 ], [ 15536130, 6620823 ], [ 15542373, 6622544 ], [ 15542644, 6619127 ], [ 15550264, 6613597 ], [ 15571821, 6627362 ], [ 15577622, 6621118 ], [ 15581014, 6609861 ], [ 15591460, 6607870 ], [ 15590920, 6602167 ], [ 15595615, 6595039 ], [ 15613140, 6589434 ], [ 15626488, 6601774 ], [ 15631305, 6602462 ], [ 15632805, 6607550 ], [ 15637770, 6611852 ], [ 15644554, 6612392 ], [ 15648807, 6619127 ], [ 15683993, 6591169 ], [ 15674336, 6575831 ], [ 15673466, 6527558 ], [ 15694179, 6473086 ], [ 15695575, 6457862 ], [ 15693050, 6448390 ], [ 15686276, 6437109 ], [ 15677657, 6404418 ], [ 15679393, 6365924 ], [ 15673191, 6345215 ], [ 15666603, 6330727 ], [ 15665227, 6318132 ], [ 15658236, 6293457 ], [ 15621049, 6287724 ], [ 15609491, 6281035 ], [ 15595674, 6283968 ], [ 15594363, 6282073 ], [ 15581986, 6291690 ], [ 15564625, 6286378 ], [ 15558377, 6288625 ], [ 15544701, 6286349 ], [ 15538471, 6289245 ], [ 15530662, 6279417 ], [ 15526889, 6280880 ], [ 15524374, 6278569 ], [ 15526480, 6273743 ], [ 15527266, 6258280 ], [ 15522493, 6254031 ], [ 15520659, 6258504 ], [ 15513897, 6264522 ], [ 15497898, 6260428 ], [ 15496026, 6255514 ], [ 15497138, 6254081 ], [ 15494330, 6252531 ], [ 15480065, 6252944 ], [ 15457339, 6268123 ], [ 15455994, 6271341 ], [ 15452601, 6269381 ], [ 15438826, 6272657 ], [ 15428749, 6266113 ], [ 15424086, 6272321 ], [ 15424630, 6279359 ], [ 15418622, 6281762 ], [ 15416934, 6293548 ], [ 15424229, 6304477 ], [ 15441938, 6312916 ], [ 15441194, 6322414 ], [ 15445199, 6323387 ], [ 15447561, 6329647 ], [ 15451271, 6331613 ], [ 15448142, 6338765 ], [ 15449394, 6343146 ], [ 15447472, 6350656 ], [ 15453193, 6361741 ], [ 15452612, 6364915 ], [ 15449304, 6365675 ], [ 15440811, 6363306 ], [ 15439199, 6360436 ], [ 15430413, 6362032 ], [ 15424006, 6369442 ], [ 15417395, 6372122 ], [ 15416647, 6374103 ], [ 15420408, 6376339 ], [ 15420063, 6382632 ], [ 15418415, 6385757 ], [ 15412307, 6387147 ], [ 15416097, 6393080 ], [ 15412042, 6400759 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Советско-Гаванский район", "ID": "SG", "shortName": "Сов Г р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 15380202, 6205999 ], [ 15382907, 6217954 ], [ 15392047, 6222012 ], [ 15396946, 6227861 ], [ 15419869, 6242668 ], [ 15420838, 6258998 ], [ 15436749, 6272160 ], [ 15452601, 6269381 ], [ 15455994, 6271341 ], [ 15457339, 6268123 ], [ 15480065, 6252944 ], [ 15494330, 6252531 ], [ 15497138, 6254081 ], [ 15496026, 6255514 ], [ 15497898, 6260428 ], [ 15510036, 6264464 ], [ 15513897, 6264522 ], [ 15520659, 6258504 ], [ 15522493, 6254031 ], [ 15525507, 6255865 ], [ 15527266, 6258280 ], [ 15527285, 6263914 ], [ 15524374, 6278569 ], [ 15526889, 6280880 ], [ 15530662, 6279417 ], [ 15538471, 6289245 ], [ 15544701, 6286349 ], [ 15558377, 6288625 ], [ 15564625, 6286378 ], [ 15581986, 6291690 ], [ 15594363, 6282073 ], [ 15595674, 6283968 ], [ 15609491, 6281035 ], [ 15621049, 6287724 ], [ 15658236, 6293457 ], [ 15661860, 6274235 ], [ 15661373, 6264320 ], [ 15655535, 6247248 ], [ 15640120, 6223964 ], [ 15637492, 6179557 ], [ 15633480, 6165898 ], [ 15612057, 6138417 ], [ 15582446, 6114281 ], [ 15557182, 6078884 ], [ 15535078, 6060423 ], [ 15524716, 6034846 ], [ 15515602, 6018067 ], [ 15507851, 5992966 ], [ 15474913, 6007983 ], [ 15472951, 6006088 ], [ 15465981, 6015070 ], [ 15460928, 6015801 ], [ 15457934, 6019150 ], [ 15442835, 6014285 ], [ 15442451, 6016706 ], [ 15431299, 6014972 ], [ 15428467, 6018048 ], [ 15428518, 6021442 ], [ 15422359, 6020165 ], [ 15424336, 6024925 ], [ 15428614, 6027535 ], [ 15427117, 6029850 ], [ 15427855, 6034353 ], [ 15432384, 6041001 ], [ 15426114, 6048553 ], [ 15422773, 6048563 ], [ 15418495, 6053295 ], [ 15423289, 6056647 ], [ 15423776, 6059925 ], [ 15448368, 6068612 ], [ 15446494, 6073025 ], [ 15451790, 6076363 ], [ 15454733, 6084770 ], [ 15445440, 6088872 ], [ 15446310, 6092206 ], [ 15441826, 6095365 ], [ 15439598, 6100628 ], [ 15432259, 6107439 ], [ 15428660, 6107736 ], [ 15426314, 6112136 ], [ 15431448, 6125813 ], [ 15433285, 6127272 ], [ 15438116, 6124863 ], [ 15442637, 6130333 ], [ 15440403, 6141880 ], [ 15432437, 6136636 ], [ 15420235, 6142521 ], [ 15422804, 6149754 ], [ 15413591, 6160052 ], [ 15417788, 6170129 ], [ 15414322, 6171851 ], [ 15414867, 6176084 ], [ 15412398, 6175499 ], [ 15405338, 6181453 ], [ 15401945, 6179252 ], [ 15399658, 6180608 ], [ 15396664, 6184456 ], [ 15396836, 6188524 ], [ 15380202, 6205999 ] ] ] ] } },
        { "type": "Feature", "properties": { "NAME": "Николаевский район", "ID": "NK", "shortName": "Ник р." }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 15444839, 7125443 ], [ 15445939, 7138061 ], [ 15449667, 7141699 ], [ 15448719, 7146751 ], [ 15454689, 7150525 ], [ 15459687, 7163724 ], [ 15476733, 7155578 ], [ 15479534, 7157576 ], [ 15484792, 7155383 ], [ 15493369, 7148332 ], [ 15505029, 7150264 ], [ 15513435, 7159253 ], [ 15516064, 7158709 ], [ 15517228, 7166444 ], [ 15513585, 7168988 ], [ 15514922, 7176602 ], [ 15526989, 7176623 ], [ 15532441, 7189082 ], [ 15530631, 7196323 ], [ 15537008, 7200009 ], [ 15540262, 7207127 ], [ 15545778, 7212111 ], [ 15546727, 7217711 ], [ 15517762, 7250714 ], [ 15539185, 7270574 ], [ 15552518, 7275734 ], [ 15563865, 7276379 ], [ 15581441, 7271079 ], [ 15592975, 7261568 ], [ 15598714, 7251905 ], [ 15605587, 7228668 ], [ 15632255, 7208570 ], [ 15651396, 7184595 ], [ 15669685, 7141800 ], [ 15686250, 7120216 ], [ 15739360, 7093631 ], [ 15748174, 7093089 ], [ 15761917, 7045819 ], [ 15774904, 7027197 ], [ 15766926, 7013259 ], [ 15754310, 6877939 ], [ 15761917, 6838480 ], [ 15761731, 6823052 ], [ 15742436, 6731996 ], [ 15715763, 6760988 ], [ 15712675, 6761580 ], [ 15712556, 6758483 ], [ 15709559, 6755441 ], [ 15707494, 6759796 ], [ 15708169, 6762335 ], [ 15702296, 6764392 ], [ 15703714, 6767515 ], [ 15697583, 6778959 ], [ 15695306, 6789246 ], [ 15690129, 6786012 ], [ 15677325, 6788596 ], [ 15676330, 6800949 ], [ 15680029, 6804788 ], [ 15680822, 6809990 ], [ 15678144, 6815194 ], [ 15682467, 6823527 ], [ 15678990, 6832082 ], [ 15675030, 6832647 ], [ 15672671, 6838035 ], [ 15669221, 6839723 ], [ 15670417, 6843748 ], [ 15675138, 6844479 ], [ 15675571, 6847519 ], [ 15671911, 6852251 ], [ 15676437, 6856733 ], [ 15674851, 6859209 ], [ 15675363, 6864405 ], [ 15670581, 6869378 ], [ 15671069, 6873028 ], [ 15659643, 6881358 ], [ 15648569, 6884431 ], [ 15647769, 6888351 ], [ 15640102, 6893797 ], [ 15647397, 6898261 ], [ 15648784, 6901628 ], [ 15655340, 6903327 ], [ 15656101, 6911086 ], [ 15649856, 6912967 ], [ 15649908, 6915931 ], [ 15643517, 6916708 ], [ 15641109, 6921478 ], [ 15637300, 6923157 ], [ 15637271, 6928811 ], [ 15645714, 6938826 ], [ 15644670, 6940960 ], [ 15657476, 6946003 ], [ 15665809, 6946054 ], [ 15668342, 6952792 ], [ 15666735, 6955541 ], [ 15670539, 6958239 ], [ 15668594, 6960695 ], [ 15668515, 6966904 ], [ 15659917, 6970818 ], [ 15656908, 6976020 ], [ 15657286, 6978887 ], [ 15652381, 6982024 ], [ 15645420, 6978662 ], [ 15637109, 6982463 ], [ 15637407, 6986553 ], [ 15625658, 6990676 ], [ 15620538, 6988677 ], [ 15614132, 6990482 ], [ 15609919, 6977473 ], [ 15606381, 6976078 ], [ 15593838, 6991661 ], [ 15585755, 6997165 ], [ 15579127, 6997368 ], [ 15580905, 6999407 ], [ 15581308, 7009977 ], [ 15590236, 7013384 ], [ 15584344, 7020694 ], [ 15579091, 7022809 ], [ 15584752, 7026787 ], [ 15574782, 7032154 ], [ 15573218, 7035842 ], [ 15569656, 7034399 ], [ 15563874, 7022074 ], [ 15556138, 7025627 ], [ 15550392, 7019876 ], [ 15546030, 7020229 ], [ 15534178, 7032311 ], [ 15535956, 7034707 ], [ 15536586, 7042880 ], [ 15524967, 7051914 ], [ 15523859, 7055290 ], [ 15526204, 7058137 ], [ 15524482, 7060663 ], [ 15525128, 7064083 ], [ 15521301, 7069135 ], [ 15523328, 7070706 ], [ 15517589, 7082726 ], [ 15513304, 7081458 ], [ 15510463, 7085369 ], [ 15505876, 7081991 ], [ 15496964, 7088808 ], [ 15485865, 7075915 ], [ 15473903, 7072291 ], [ 15466536, 7074586 ], [ 15455166, 7088747 ], [ 15448152, 7088502 ], [ 15446282, 7096603 ], [ 15447813, 7107147 ], [ 15446218, 7111031 ], [ 15453101, 7122198 ], [ 15444839, 7125443 ] ] ] ] } }
    ]
};

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
