'use strict';

module.exports = function (grunt) {
    // Unified Watch Object
    //var watchFiles = {
    //    serverViews: ['madmin/app/views/**/*.*'],
    //    serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'madmin/app/**/*.js'],
    //    mochaTests: ['madmin/app/tests/**/*.js']
    //};

    // Project Configuration
    grunt.initConfig({
        project: {
            javascript: {
                ours: ['madmin/source/js/app.js', 'madmin/source/js/**/*.js', 'madmin/source/js/functions.js']
            },
            secret: grunt.file.readJSON('./secret.json'),
            pkg: grunt.file.readJSON('./package.json')
        },
        less: {
            build: {
                files: {
                    "madmin/app/css/themes/style1/blue-grey.css": "madmin/source/less/themes/style1/blue-grey.less",
                    "madmin/app/css/themes/style1/green-blue.css": "madmin/source/less/themes/style1/green-blue.less",
                    "madmin/app/css/themes/style1/green-dark.css": "madmin/source/less/themes/style1/green-dark.less",
                    "madmin/app/css/themes/style1/green-grey.css": "madmin/source/less/themes/style1/green-grey.less",
                    "madmin/app/css/themes/style1/orange-blue.css": "madmin/source/less/themes/style1/orange-blue.less",
                    "madmin/app/css/themes/style1/orange-grey.css": "madmin/source/less/themes/style1/orange-grey.less",
                    "madmin/app/css/themes/style1/orange-violet.css": "madmin/source/less/themes/style1/orange-violet.less",
                    "madmin/app/css/themes/style1/pink-blue.css": "madmin/source/less/themes/style1/pink-blue.less",
                    "madmin/app/css/themes/style1/pink-brown.css": "madmin/source/less/themes/style1/pink-brown.less",
                    "madmin/app/css/themes/style1/pink-dark.css": "madmin/source/less/themes/style1/pink-dark.less",
                    "madmin/app/css/themes/style1/pink-green.css": "madmin/source/less/themes/style1/pink-green.less",
                    "madmin/app/css/themes/style1/pink-grey.css": "madmin/source/less/themes/style1/pink-grey.less",
                    "madmin/app/css/themes/style1/pink-violet.css": "madmin/source/less/themes/style1/pink-violet.less",
                    "madmin/app/css/themes/style1/red-dark.css": "madmin/source/less/themes/style1/red-dark.less",
                    "madmin/app/css/themes/style1/red-grey.css": "madmin/source/less/themes/style1/red-grey.less",
                    "madmin/app/css/themes/style1/yellow-blue.css": "madmin/source/less/themes/style1/yellow-blue.less",
                    "madmin/app/css/themes/style1/yellow-dark.css": "madmin/source/less/themes/style1/yellow-dark.less",
                    "madmin/app/css/themes/style1/yellow-green.css": "madmin/source/less/themes/style1/yellow-green.less",
                    "madmin/app/css/themes/style1/yellow-grey.css": "madmin/source/less/themes/style1/yellow-grey.less",
                    "madmin/app/css/themes/style2/blue-dark.css": "madmin/source/less/themes/style2/blue-dark.less",
                    "madmin/app/css/themes/style2/blue-grey.css": "madmin/source/less/themes/style2/blue-grey.less",
                    "madmin/app/css/themes/style2/green-blue.css": "madmin/source/less/themes/style2/green-blue.less",
                    "madmin/app/css/themes/style2/green-dark.css": "madmin/source/less/themes/style2/green-dark.less",
                    "madmin/app/css/themes/style2/green-grey.css": "madmin/source/less/themes/style2/green-grey.less",
                    "madmin/app/css/themes/style2/orange-blue.css": "madmin/source/less/themes/style2/orange-blue.less",
                    "madmin/app/css/themes/style2/orange-grey.css": "madmin/source/less/themes/style2/orange-grey.less",
                    "madmin/app/css/themes/style2/orange-violet.css": "madmin/source/less/themes/style2/orange-violet.less",
                    "madmin/app/css/themes/style2/pink-blue.css": "madmin/source/less/themes/style2/pink-blue.less",
                    "madmin/app/css/themes/style2/pink-brown.css": "madmin/source/less/themes/style2/pink-brown.less",
                    "madmin/app/css/themes/style2/pink-dark.css": "madmin/source/less/themes/style2/pink-dark.less",
                    "madmin/app/css/themes/style2/pink-green.css": "madmin/source/less/themes/style2/pink-green.less",
                    "madmin/app/css/themes/style2/pink-grey.css": "madmin/source/less/themes/style2/pink-grey.less",
                    "madmin/app/css/themes/style2/pink-violet.css": "madmin/source/less/themes/style2/pink-violet.less",
                    "madmin/app/css/themes/style2/red-dark.css": "madmin/source/less/themes/style2/red-dark.less",
                    "madmin/app/css/themes/style2/red-grey.css": "madmin/source/less/themes/style2/red-grey.less",
                    "madmin/app/css/themes/style2/yellow-blue.css": "madmin/source/less/themes/style2/yellow-blue.less",
                    "madmin/app/css/themes/style2/yellow-dark.css": "madmin/source/less/themes/style2/yellow-dark.less",
                    "madmin/app/css/themes/style2/yellow-green.css": "madmin/source/less/themes/style2/yellow-green.less",
                    "madmin/app/css/themes/style2/yellow-grey.css": "madmin/source/less/themes/style2/yellow-grey.less",
                    "madmin/app/css/themes/style3/blue-dark.css": "madmin/source/less/themes/style3/blue-dark.less",
                    "madmin/app/css/themes/style3/blue-grey.css": "madmin/source/less/themes/style3/blue-grey.less",
                    "madmin/app/css/themes/style3/green-blue.css": "madmin/source/less/themes/style3/green-blue.less",
                    "madmin/app/css/themes/style3/green-dark.css": "madmin/source/less/themes/style3/green-dark.less",
                    "madmin/app/css/themes/style3/green-grey.css": "madmin/source/less/themes/style3/green-grey.less",
                    "madmin/app/css/themes/style3/orange-blue.css": "madmin/source/less/themes/style3/orange-blue.less",
                    "madmin/app/css/themes/style3/orange-grey.css": "madmin/source/less/themes/style3/orange-grey.less",
                    "madmin/app/css/themes/style3/orange-violet.css": "madmin/source/less/themes/style3/orange-violet.less",
                    "madmin/app/css/themes/style3/pink-blue.css": "madmin/source/less/themes/style3/pink-blue.less",
                    "madmin/app/css/themes/style3/pink-brown.css": "madmin/source/less/themes/style3/pink-brown.less",
                    "madmin/app/css/themes/style3/pink-dark.css": "madmin/source/less/themes/style3/pink-dark.less",
                    "madmin/app/css/themes/style3/pink-green.css": "madmin/source/less/themes/style3/pink-green.less",
                    "madmin/app/css/themes/style3/pink-grey.css": "madmin/source/less/themes/style3/pink-grey.less",
                    "madmin/app/css/themes/style3/pink-violet.css": "madmin/source/less/themes/style3/pink-violet.less",
                    "madmin/app/css/themes/style3/red-dark.css": "madmin/source/less/themes/style3/red-dark.less",
                    "madmin/app/css/themes/style3/red-grey.css": "madmin/source/less/themes/style3/red-grey.less",
                    "madmin/app/css/themes/style3/yellow-blue.css": "madmin/source/less/themes/style3/yellow-blue.less",
                    "madmin/app/css/themes/style3/yellow-dark.css": "madmin/source/less/themes/style3/yellow-dark.less",
                    "madmin/app/css/themes/style3/yellow-green.css": "madmin/source/less/themes/style3/yellow-green.less",
                    "madmin/app/css/themes/style3/yellow-grey.css": "madmin/source/less/themes/style3/yellow-grey.less",
                    "madmin/app/css/style-responsive.css": "madmin/source/less/style-responsive.less"
                }
            }
        },
        //jade: {
        //    compile: {
        //        options: {
        //            data: {
        //                debug: false
        //            },
        //            pretty: true
        //        },
        //        files: {
        //            "madmin/app/index.html": ["madmin/source/jade/index.jade"],
        //            "madmin/app/templates/states/header.html": ["madmin/source/jade/templates/states/header.jade"],
        //            "madmin/app/templates/states/sitebar.html": ["madmin/source/jade/templates/states/sitebar.jade"],
        //            "madmin/app/templates/states/footer.html": ["madmin/source/jade/templates/states/footer.jade"],
        //            "madmin/app/templates/states/breadcrumb.html": ["madmin/source/jade/templates/states/breadcrumb.jade"],
        //            "madmin/app/templates/states/main.html": ["madmin/source/jade/templates/states/main.jade"],
        //            "madmin/app/templates/states/extra-profile.html": ["madmin/source/jade/templates/states/extra-profile.jade"],
        //            "madmin/app/templates/states/email-inbox.html": ["madmin/source/jade/templates/states/email-inbox.jade"],
        //            "madmin/app/templates/states/extra-signin.html": ["madmin/source/jade/templates/states/extra-signin.jade"],
        //            "madmin/app/templates/states/layout-left-sidebar.html": ["madmin/source/jade/templates/states/layout-left-sidebar.jade"],
        //            "madmin/app/templates/states/layout-left-sidebar-collapsed.html": ["madmin/source/jade/templates/states/layout-left-sidebar-collapsed.jade"],
        //            "madmin/app/templates/states/layout-right-sidebar.html": ["madmin/source/jade/templates/states/layout-right-sidebar.jade"],
        //            "madmin/app/templates/states/layout-right-sidebar-collapsed.html": ["madmin/source/jade/templates/states/layout-right-sidebar-collapsed.jade"],
        //            "madmin/app/templates/states/layout-horizontal-menu.html": ["madmin/source/jade/templates/states/layout-horizontal-menu.jade"],
        //            "madmin/app/templates/states/layout-horizontal-menu-sidebar.html": ["madmin/source/jade/templates/states/layout-horizontal-menu-sidebar.jade"],
        //            "madmin/app/templates/states/layout-fixed-topbar.html": ["madmin/source/jade/templates/states/layout-fixed-topbar.jade"],
        //            "madmin/app/templates/states/layout-boxed.html": ["madmin/source/jade/templates/states/layout-boxed.jade"],
        //            "madmin/app/templates/states/layout-hidden-footer.html": ["madmin/source/jade/templates/states/layout-hidden-footer.jade"],
        //            "madmin/app/templates/states/layout-header-topbar.html": ["madmin/source/jade/templates/states/layout-header-topbar.jade"],
        //            "madmin/app/templates/states/layout-title-breadcrumb.html": ["madmin/source/jade/templates/states/layout-title-breadcrumb.jade"],
        //            "madmin/app/templates/states/ui-generals.html": ["madmin/source/jade/templates/states/ui-generals.jade"],
        //            "madmin/app/templates/states/ui-panels.html": ["madmin/source/jade/templates/states/ui-panels.jade"],
        //            "madmin/app/templates/states/ui-buttons.html": ["madmin/source/jade/templates/states/ui-buttons.jade"],
        //            "madmin/app/templates/states/ui-tabs.html": ["madmin/source/jade/templates/states/ui-tabs.jade"],
        //            "madmin/app/templates/states/ui-progressbars.html": ["madmin/source/jade/templates/states/ui-progressbars.jade"],
        //            "madmin/app/templates/states/ui-editors.html": ["madmin/source/jade/templates/states/ui-editors.jade"],
        //            "madmin/app/templates/states/ui-typography.html": ["madmin/source/jade/templates/states/ui-typography.jade"],
        //            "madmin/app/templates/states/ui-modals.html": ["madmin/source/jade/templates/states/ui-modals.jade"],
        //            "madmin/app/templates/states/ui-sliders.html": ["madmin/source/jade/templates/states/ui-sliders.jade"],
        //            "madmin/app/templates/states/ui-nestable-list.html": ["madmin/source/jade/templates/states/ui-nestable-list.jade"],
        //            "madmin/app/templates/states/ui-dropdown-select.html": ["madmin/source/jade/templates/states/ui-dropdown-select.jade"],
        //            "madmin/app/templates/states/ui-icons.html": ["madmin/source/jade/templates/states/ui-icons.jade"],
        //            "madmin/app/templates/states/ui-notific8-notifications.html": ["madmin/source/jade/templates/states/ui-notific8-notifications.jade"],
        //            "madmin/app/templates/states/ui-toastr-notifications.html": ["madmin/source/jade/templates/states/ui-toastr-notifications.jade"],
        //            "madmin/app/templates/states/ui-checkbox-radio.html": ["madmin/source/jade/templates/states/ui-checkbox-radio.jade"],
        //            "madmin/app/templates/states/ui-treeview.html": ["madmin/source/jade/templates/states/ui-treeview.jade"],
        //            "madmin/app/templates/states/ui-portlets.html": ["madmin/source/jade/templates/states/ui-portlets.jade"],
        //            "madmin/app/templates/states/form-layouts.html": ["madmin/source/jade/templates/states/form-layouts.jade"],
        //            "madmin/app/templates/states/form-basic.html": ["madmin/source/jade/templates/states/form-basic.jade"],
        //            "madmin/app/templates/states/form-components.html": ["madmin/source/jade/templates/states/form-components.jade"],
        //            "madmin/app/templates/states/form-wizard.html": ["madmin/source/jade/templates/states/form-wizard.jade"],
        //            "madmin/app/templates/states/form-xeditable.html": ["madmin/source/jade/templates/states/form-xeditable.jade"],
        //            "madmin/app/templates/states/form-validation.html": ["madmin/source/jade/templates/states/form-validation.jade"],
        //            //"madmin/app/templates/states/form-multiple-file-upload.html": ["madmin/source/jade/templates/states/form-multiple-file-upload.jade"],
        //            "madmin/app/templates/states/form-dropzone-file-upload.html": ["madmin/source/jade/templates/states/form-dropzone-file-upload.jade"],
        //            "madmin/app/templates/states/frontend-one-page.html": ["madmin/source/jade/templates/states/frontend-one-page.jade"],
        //            "madmin/app/templates/states/table-basic.html": ["madmin/source/jade/templates/states/table-basic.jade"],
        //            "madmin/app/templates/states/table-responsive.html": ["madmin/source/jade/templates/states/table-responsive.jade"],
        //            "madmin/app/templates/states/table-action.html": ["madmin/source/jade/templates/states/table-action.jade"],
        //            "madmin/app/templates/states/table-filter.html": ["madmin/source/jade/templates/states/table-filter.jade"],
        //            "madmin/app/templates/states/table-advanced.html": ["madmin/source/jade/templates/states/table-advanced.jade"],
        //            "madmin/app/templates/states/table-editable.html": ["madmin/source/jade/templates/states/table-editable.jade"],
        //            "madmin/app/templates/states/table-datatables.html": ["madmin/source/jade/templates/states/table-datatables.jade"],
        //            "madmin/app/templates/states/table-sample.html": ["madmin/source/jade/templates/states/table-sample.jade"],
        //            "madmin/app/templates/states/table-export.html": ["madmin/source/jade/templates/states/table-export.jade"],
        //            "madmin/app/templates/states/grid-layout-div.html": ["madmin/source/jade/templates/states/grid-layout-div.jade"],
        //            "madmin/app/templates/states/grid-layout-table-1.html": ["madmin/source/jade/templates/states/grid-layout-table-1.jade"],
        //            "madmin/app/templates/states/grid-layout-table-2.html": ["madmin/source/jade/templates/states/grid-layout-table-2.jade"],
        //            "madmin/app/templates/states/grid-layout-2-table.html": ["madmin/source/jade/templates/states/grid-layout-2-table.jade"],
        //            "madmin/app/templates/states/grid-layout-ul-li.html": ["madmin/source/jade/templates/states/grid-layout-ul-li.jade"],
        //            "madmin/app/templates/states/grid-filter-with-ul-li.html": ["madmin/source/jade/templates/states/grid-filter-with-ul-li.jade"],
        //            "madmin/app/templates/states/grid-filter-with-select.html": ["madmin/source/jade/templates/states/grid-filter-with-select.jade"],
        //            "madmin/app/templates/states/grid-double-sort.html": ["madmin/source/jade/templates/states/grid-double-sort.jade"],
        //            "madmin/app/templates/states/grid-deep-linking.html": ["madmin/source/jade/templates/states/grid-deep-linking.jade"],
        //            "madmin/app/templates/states/grid-pagination-only.html": ["madmin/source/jade/templates/states/grid-pagination-only.jade"],
        //            "madmin/app/templates/states/grid-without-item-per-page.html": ["madmin/source/jade/templates/states/grid-without-item-per-page.jade"],
        //            "madmin/app/templates/states/grid-hidden-sort.html": ["madmin/source/jade/templates/states/grid-hidden-sort.jade"],
        //            "madmin/app/templates/states/grid-range-slider.html": ["madmin/source/jade/templates/states/grid-range-slider.jade"],
        //            "madmin/app/templates/states/grid-datepicker.html": ["madmin/source/jade/templates/states/grid-datepicker.jade"],
        //            "madmin/app/templates/states/page-gallery.html": ["madmin/source/jade/templates/states/page-gallery.jade"],
        //            "madmin/app/templates/states/page-timeline.html": ["madmin/source/jade/templates/states/page-timeline.jade"],
        //            "madmin/app/templates/states/page-blog.html": ["madmin/source/jade/templates/states/page-blog.jade"],
        //            "madmin/app/templates/states/page-blog-item.html": ["madmin/source/jade/templates/states/page-blog-item.jade"],
        //            "madmin/app/templates/states/page-about.html": ["madmin/source/jade/templates/states/page-about.jade"],
        //            "madmin/app/templates/states/page-contact.html": ["madmin/source/jade/templates/states/page-contact.jade"],
        //            "madmin/app/templates/states/page-calendar.html": ["madmin/source/jade/templates/states/page-calendar.jade"],
        //            "madmin/app/templates/states/extra-signup.html": ["madmin/source/jade/templates/states/extra-signup.jade"],
        //            "madmin/app/templates/states/extra-lock-screen.html": ["madmin/source/jade/templates/states/extra-lock-screen.jade"],
        //            "madmin/app/templates/states/extra-user-list.html": ["madmin/source/jade/templates/states/extra-user-list.jade"],
        //            "madmin/app/templates/states/extra-invoice.html": ["madmin/source/jade/templates/states/extra-invoice.jade"],
        //            "madmin/app/templates/states/extra-faq.html": ["madmin/source/jade/templates/states/extra-faq.jade"],
        //            "madmin/app/templates/states/extra-pricing-table.html": ["madmin/source/jade/templates/states/extra-pricing-table.jade"],
        //            "madmin/app/templates/states/extra-blank.html": ["madmin/source/jade/templates/states/extra-blank.jade"],
        //            "madmin/app/templates/states/extra-404.html": ["madmin/source/jade/templates/states/extra-404.jade"],
        //            "madmin/app/templates/states/extra-500.html": ["madmin/source/jade/templates/states/extra-500.jade"],
        //            "madmin/app/templates/states/email-compose-mail.html": ["madmin/source/jade/templates/states/email-compose-mail.jade"],
        //            "madmin/app/templates/states/email-view-mail.html": ["madmin/source/jade/templates/states/email-view-mail.jade"],
        //            "madmin/app/templates/states/charts-flotchart.html": ["madmin/source/jade/templates/states/charts-flotchart.jade"],
        //            "madmin/app/templates/states/charts-chartjs.html": ["madmin/source/jade/templates/states/charts-chartjs.jade"],
        //            "madmin/app/templates/states/charts-highchart-line.html": ["madmin/source/jade/templates/states/charts-highchart-line.jade"],
        //            "madmin/app/templates/states/charts-highchart-area.html": ["madmin/source/jade/templates/states/charts-highchart-area.jade"],
        //            "madmin/app/templates/states/charts-highchart-column-bar.html": ["madmin/source/jade/templates/states/charts-highchart-column-bar.jade"],
        //            "madmin/app/templates/states/charts-highchart-pie.html": ["madmin/source/jade/templates/states/charts-highchart-pie.jade"],
        //            "madmin/app/templates/states/charts-highchart-scatter-bubble.html": ["madmin/source/jade/templates/states/charts-highchart-scatter-bubble.jade"],
        //            "madmin/app/templates/states/charts-highchart-dynamic.html": ["madmin/source/jade/templates/states/charts-highchart-dynamic.jade"],
        //            "madmin/app/templates/states/charts-highchart-combinations.html": ["madmin/source/jade/templates/states/charts-highchart-combinations.jade"],
        //            "madmin/app/templates/states/charts-highchart-more.html": ["madmin/source/jade/templates/states/charts-highchart-more.jade"],
        //            "madmin/app/templates/states/animations.html": ["madmin/source/jade/templates/states/animations.jade"],
        //            "madmin/app/templates/states/_layout-header-topbar/header-topbar-option1.html": ["madmin/source/jade/templates/states/_layout-header-topbar/header-topbar-option1.jade"],
        //            "madmin/app/templates/states/_layout-header-topbar/header-topbar-option2.html": ["madmin/source/jade/templates/states/_layout-header-topbar/header-topbar-option2.jade"],
        //            "madmin/app/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-left-with-label.html": ["madmin/source/jade/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-left-with-label.jade"],
        //            "madmin/app/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-left.html": ["madmin/source/jade/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-left.jade"],
        //            "madmin/app/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-right.html": ["madmin/source/jade/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-right.jade"],
        //            "madmin/app/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-with-toolbar.html": ["madmin/source/jade/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-with-toolbar.jade"],
        //            "madmin/app/templates/states/_layout-title-breadcrumb/title-subtitle-breadcrumb-inline-left.html": ["madmin/source/jade/templates/states/_layout-title-breadcrumb/title-subtitle-breadcrumb-inline-left.jade"],
        //            "madmin/app/templates/states/_layout-title-breadcrumb/title-subtitle-breadcrumb-inline-right.html": ["madmin/source/jade/templates/states/_layout-title-breadcrumb/title-subtitle-breadcrumb-inline-right.jade"],
        //            "madmin/app/templates/states/_layout-title-breadcrumb/title-subtitle-breadcrumb-left.html": ["madmin/source/jade/templates/states/_layout-title-breadcrumb/title-subtitle-breadcrumb-left.jade"],
        //            "madmin/app/templates/states/_page-gallery/page-gallery-2-columns-tab.html": ["madmin/source/jade/templates/states/_page-gallery/page-gallery-2-columns-tab.jade"],
        //            "madmin/app/templates/states/_page-gallery/page-gallery-3-columns-tab.html": ["madmin/source/jade/templates/states/_page-gallery/page-gallery-3-columns-tab.jade"],
        //            "madmin/app/templates/states/_page-gallery/page-gallery-4-columns-tab.html": ["madmin/source/jade/templates/states/_page-gallery/page-gallery-4-columns-tab.jade"],
        //            "madmin/app/templates/states/_table-action/table-action-panel-tab.html": ["madmin/source/jade/templates/states/_table-action/table-action-panel-tab.jade"],
        //            "madmin/app/templates/states/_table-action/table-action-row-tab.html": ["madmin/source/jade/templates/states/_table-action/table-action-row-tab.jade"],
        //            "madmin/app/templates/states/_table-action/table-action-table-tab.html": ["madmin/source/jade/templates/states/_table-action/table-action-table-tab.jade"],
        //            "madmin/app/templates/states/_table-advanced/table-advanced-color-tab.html": ["madmin/source/jade/templates/states/_table-advanced/table-advanced-color-tab.jade"],
        //            "madmin/app/templates/states/_table-advanced/table-advanced-size-tab.html": ["madmin/source/jade/templates/states/_table-advanced/table-advanced-size-tab.jade"],
        //            "madmin/app/templates/states/_table-advanced/table-advanced-sorter-tab.html": ["madmin/source/jade/templates/states/_table-advanced/table-advanced-sorter-tab.jade"],
        //            "madmin/app/templates/states/_table-advanced/table-advanced-sticky-tab.html": ["madmin/source/jade/templates/states/_table-advanced/table-advanced-sticky-tab.jade"],
        //            "madmin/app/templates/states/_ui-checkbox-radio/ui-checkbox-radio-icheck-tab.html": ["madmin/source/jade/templates/states/_ui-checkbox-radio/ui-checkbox-radio-icheck-tab.jade"],
        //            "madmin/app/templates/states/_ui-generals/ui-generals-alert-tab.html": ["madmin/source/jade/templates/states/_ui-generals/ui-generals-alert-tab.jade"],
        //            "madmin/app/templates/states/_ui-generals/ui-generals-input-group-tab.html": ["madmin/source/jade/templates/states/_ui-generals/ui-generals-input-group-tab.jade"],
        //            "madmin/app/templates/states/_ui-generals/ui-generals-label-badge-tab.html": ["madmin/source/jade/templates/states/_ui-generals/ui-generals-label-badge-tab.jade"],
        //            "madmin/app/templates/states/_ui-generals/ui-generals-list-group-tab.html": ["madmin/source/jade/templates/states/_ui-generals/ui-generals-list-group-tab.jade"],
        //            "madmin/app/templates/states/_ui-generals/ui-generals-navbar-tab.html": ["madmin/source/jade/templates/states/_ui-generals/ui-generals-navbar-tab.jade"],
        //            "madmin/app/templates/states/_ui-generals/ui-generals-note-tab.html": ["madmin/source/jade/templates/states/_ui-generals/ui-generals-note-tab.jade"],
        //            "madmin/app/templates/states/_ui-generals/ui-generals-other-tab.html": ["madmin/source/jade/templates/states/_ui-generals/ui-generals-other-tab.jade"],
        //            "madmin/app/templates/states/_ui-generals/ui-generals-pagination-tab.html": ["madmin/source/jade/templates/states/_ui-generals/ui-generals-pagination-tab.jade"],
        //            "madmin/app/templates/states/_ui-generals/ui-generals-thumbnail-tab.html": ["madmin/source/jade/templates/states/_ui-generals/ui-generals-thumbnail-tab.jade"],
        //            "madmin/app/templates/states/_ui-progressbars/ui-progressbars-horizontal-tab.html": ["madmin/source/jade/templates/states/_ui-progressbars/ui-progressbars-horizontal-tab.jade"],
        //            "madmin/app/templates/states/_ui-progressbars/ui-progressbars-miscellaneous-tab.html": ["madmin/source/jade/templates/states/_ui-progressbars/ui-progressbars-miscellaneous-tab.jade"],
        //            "madmin/app/templates/states/_ui-progressbars/ui-progressbars-vertical-tab.html": ["madmin/source/jade/templates/states/_ui-progressbars/ui-progressbars-vertical-tab.jade"],
        //            "madmin/app/templates/states/_ui-sliders/ui-sliders-ion-range-slider-tab.html": ["madmin/source/jade/templates/states/_ui-sliders/ui-sliders-ion-range-slider-tab.jade"],
        //            "madmin/app/templates/states/_ui-sliders/ui-sliders-noui-slider-tab.html": ["madmin/source/jade/templates/states/_ui-sliders/ui-sliders-noui-slider-tab.jade"],
        //            "madmin/app/templates/states/_ui-sliders/ui-sliders-ui-slider-tab.html": ["madmin/source/jade/templates/states/_ui-sliders/ui-sliders-ui-slider-tab.jade"],
        //            "madmin/app/templates/states/_ui-treeview/ui-treeview-family-treeview-tab.html": ["madmin/source/jade/templates/states/_ui-treeview/ui-treeview-family-treeview-tab.jade"],
        //            "madmin/app/templates/states/_ui-treeview/ui-treeview-jstree-tab.html": ["madmin/source/jade/templates/states/_ui-treeview/ui-treeview-jstree-tab.jade"],
        //            "madmin/app/templates/states/_ui-treeview/ui-treeview-treetable-tab.html": ["madmin/source/jade/templates/states/_ui-treeview/ui-treeview-treetable-tab.jade"],
        //            "madmin/app/templates/states/_includes/chat-form.html": ["madmin/source/jade/templates/states/_includes/chat-form.jade"],
        //            "madmin/app/templates/directives/chart-container.html": ["madmin/source/jade/templates/directives/chart-container.jade"],
        //            "madmin/app/templates/parts/chart.html": ["madmin/source/jade/templates/parts/chart.jade"],
        //
        //            "madmin/app/templates/states/start.html": ["madmin/source/jade/templates/states/start.jade"]
        //        }
        //    }
        //},
        watch: {
            file: '**/*.html',
            options: {
                livereload: true
            },
            styles: {
                files: ['**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            static: {
                files: ['**/*.html'],
                tasks: ['copy'],
                options: {
                    nospawn: true
                }
            },
            //jade: {
            //    files: ['**/*.jade'],
            //    tasks: ['jade'],
            //    options: {
            //        nospawn: true
            //    }
            //},
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['default']
            }
            ,
            javascript: {
                files: '<%= project.javascript.ours %>',
                tasks: ['jshint', 'ngtemplates', 'concat']
            }
        },
        concat: {
            javascript_ours: {
                options: {
                    banner: '"use strict";\n'
                },
                src: '<%= project.javascript.ours %>',
                dest: 'madmin/app/js/main.js'
            }
        },
        jshint: {
            options: {
                strict: false,
                eqnull: true,
                loopfunc: true,
                laxbreak: true,
                debug: true,
                globals: {
                    angular: true,
                    $: true,
                    _: true
                }
            },
            all: '<%= project.javascript.ours %>'
        },
        concurrent: {
            target: {
                tasks: ['watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        copy: {
            main: {
                nonull: true,
                files: [
                    // includes files within path
                    {
                        dest: 'madmin/app/js/libs/jquery.min.js',
                        src: 'madmin/source/bower_components/jquery/jquery.min.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/jquery-ui.min.js',
                        src: 'madmin/source/bower_components/jquery-ui/jquery-ui.min.js'
                    },
                    {dest: 'madmin/app/js/libs/angular.js', src: 'madmin/source/bower_components/angular/angular.js'},
                    {
                        dest: 'madmin/app/js/libs/angular-route.js',
                        src: 'madmin/source/bower_components/angular-route/angular-route.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/angular-ui-router.js',
                        src: 'madmin/source/bower_components/angular-ui-router.js'
                    },
                    {dest: 'madmin/app/js/libs/ocLazyLoad.js', src: 'madmin/source/bower_components/ocLazyLoad.js'},
                    {
                        dest: 'madmin/app/js/libs/ui-bootstrap.js',
                        src: 'madmin/source/bower_components/angular-bootstrap/ui-bootstrap.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/highcharts.js',
                        src: 'madmin/source/bower_components/highcharts/highcharts.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/highcharts-3d.js',
                        src: 'madmin/source/bower_components/highcharts/highcharts-3d.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/highcharts-drilldown.js',
                        src: 'madmin/source/bower_components/highcharts/modules/drilldown.js'
                    },

                    {dest: 'madmin/app/js/libs/lodash.js', src: 'madmin/source/bower_components/lodash/lodash.js'},
                    {
                        dest: 'madmin/app/js/libs/angular-ui-sortable.js',
                        src: 'madmin/source/bower_components/angular-ui-sortable/sortable.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/highcharts-ng.js',
                        src: 'madmin/source/bower_components/highcharts-ng/dist/highcharts-ng.js'
                    },
                    {
                        dest: 'madmin/app/js/libs/malhar-angular-dashboard.js',
                        src: 'madmin/source/bower_components/malhar-angular-dashboard/dist/malhar-angular-dashboard.js'
                    },
                    {
                        dest: 'madmin/app/css/malhar-angular-dashboard.css',
                        src: 'madmin/source/bower_components/malhar-angular-dashboard/dist/malhar-angular-dashboard.css'
                    },
                    {
                        expand: true,
                        flatten: true,
                        dest: 'madmin/app/resources/',
                        src: ['madmin/source/resources/**'],
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        dest: 'madmin/app/templates',
                        cwd: 'madmin/source/html/templates',
                        src: '**/*'
                    },
                    {
                        dest: 'madmin/app/index.html',
                        src: 'madmin/source/html/index.html'
                    }
                ]
            }
        }
        //watch: {
        //	serverViews: {
        //		files: watchFiles.serverViews,
        //		options: {
        //			livereload: true
        //		}
        //	},
        //	serverJS: {
        //		files: watchFiles.serverJS,
        //		tasks: ['jshint'],
        //		options: {
        //			livereload: true
        //		}
        //	},
        //	clientViews: {
        //		files: watchFiles.clientViews,
        //		options: {
        //			livereload: true,
        //		}
        //	},
        //	clientJS: {
        //		files: watchFiles.clientJS,
        //		tasks: ['jshint'],
        //		options: {
        //			livereload: true
        //		}
        //	},
        //	clientCSS: {
        //		files: watchFiles.clientCSS,
        //		tasks: ['csslint'],
        //		options: {
        //			livereload: true
        //		}
        //	}
        //},
        //jshint: {
        //	all: {
        //		src: watchFiles.clientJS.concat(watchFiles.serverJS),
        //		options: {
        //			jshintrc: true
        //		}
        //	}
        //},
        //csslint: {
        //	options: {
        //		csslintrc: '.csslintrc',
        //	},
        //	all: {
        //		src: watchFiles.clientCSS
        //	}
        //},
        //nodemon: {
        //	dev: {
        //		script: 'server.js',
        //		options: {
        //			nodeArgs: ['--debug'],
        //			ext: 'js,html',
        //			watch: watchFiles.serverViews.concat(watchFiles.serverJS)
        //		}
        //	}
        //},
        //'node-inspector': {
        //	custom: {
        //		options: {
        //			'web-port': 1337,
        //			'web-host': 'localhost',
        //			'debug-port': 5858,
        //			'save-live-edit': true,
        //			'no-preload': true,
        //			'stack-trace-limit': 50,
        //			'hidden': []
        //		}
        //	}
        //},
        //concurrent: {
        //	default: ['nodemon', 'watch'],
        //	debug: ['nodemon', 'watch', 'node-inspector'],
        //	options: {
        //		logConcurrentOutput: true,
        //		limit: 10
        //	}
        //},
        //env: {
        //	test: {
        //		NODE_ENV: 'test'
        //	},
        //	secure: {
        //		NODE_ENV: 'secure'
        //	}
        //},
        //mochaTest: {
        //	src: watchFiles.mochaTests,
        //	options: {
        //		reporter: 'spec',
        //		require: 'server.js'
        //	}
        //},
        //karma: {
        //	unit: {
        //		configFile: 'karma.conf.js'
        //	}
        //}
    });

    //// Load NPM tasks
    //require('load-grunt-tasks')(grunt);
    //
    //// Making grunt default to force in order not to break the project.
    //grunt.option('force', true);
    //
    //// A Task for loading the configuration object
    //grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function () {
    //    var init = require('./config/init')();
    //    var config = require('./config/config');
    //
    //    grunt.config.set('applicationJavaScriptFiles', config.assets.js);
    //    grunt.config.set('applicationCSSFiles', config.assets.css);
    //});

    //// Default task(s).
    //grunt.registerTask('default', ['lint', 'concurrent:default']);
    //
    //// Debug task.
    //grunt.registerTask('debug', ['lint', 'concurrent:debug']);
    //
    //// Secure task(s).
    //grunt.registerTask('secure', ['env:secure', 'lint', 'concurrent:default']);
    //
    //// Lint task(s).
    //grunt.registerTask('lint', ['jshint']);
    //
    //// Build task(s).
    //grunt.registerTask('build', ['lint']);
    //
    //// Test task.
    //grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    // Default task(s).
    grunt.registerTask('build', ['jshint', 'concat', 'copy', 'less', 'concurrent']);
    grunt.registerTask('js', ['jshint', 'concat']);
    grunt.registerTask('static', ['copy']);
    grunt.registerTask('css', ['less']);
};
