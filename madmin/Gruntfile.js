"use strict";

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Config stuff
    project: {
      javascript: {
        ours: ['source/js/app.js', 'source/js/**/*.js', 'source/js/functions.js']
      },
      secret: grunt.file.readJSON('./secret.json'),
      pkg: grunt.file.readJSON('./package.json')
    },
    less: {
      build: {
        files: {
            "app/css/themes/style1/blue-dark.css" : "source/less/themes/style1/blue-dark.less",
            "app/css/themes/style1/blue-grey.css" : "source/less/themes/style1/blue-grey.less",
            "app/css/themes/style1/green-blue.css" : "source/less/themes/style1/green-blue.less",
            "app/css/themes/style1/green-dark.css" : "source/less/themes/style1/green-dark.less",
            "app/css/themes/style1/green-grey.css" : "source/less/themes/style1/green-grey.less",
            "app/css/themes/style1/orange-blue.css" : "source/less/themes/style1/orange-blue.less",
            "app/css/themes/style1/orange-grey.css" : "source/less/themes/style1/orange-grey.less",
            "app/css/themes/style1/orange-violet.css" : "source/less/themes/style1/orange-violet.less",
            "app/css/themes/style1/pink-blue.css" : "source/less/themes/style1/pink-blue.less",
            "app/css/themes/style1/pink-brown.css" : "source/less/themes/style1/pink-brown.less",
            "app/css/themes/style1/pink-dark.css" : "source/less/themes/style1/pink-dark.less",
            "app/css/themes/style1/pink-green.css" : "source/less/themes/style1/pink-green.less",
            "app/css/themes/style1/pink-grey.css" : "source/less/themes/style1/pink-grey.less",
            "app/css/themes/style1/pink-violet.css" : "source/less/themes/style1/pink-violet.less",
            "app/css/themes/style1/red-dark.css" : "source/less/themes/style1/red-dark.less",
            "app/css/themes/style1/red-grey.css" : "source/less/themes/style1/red-grey.less",
            "app/css/themes/style1/yellow-blue.css" : "source/less/themes/style1/yellow-blue.less",
            "app/css/themes/style1/yellow-dark.css" : "source/less/themes/style1/yellow-dark.less",
            "app/css/themes/style1/yellow-green.css" : "source/less/themes/style1/yellow-green.less",
            "app/css/themes/style1/yellow-grey.css" : "source/less/themes/style1/yellow-grey.less",
            "app/css/themes/style2/blue-dark.css" : "source/less/themes/style2/blue-dark.less",
            "app/css/themes/style2/blue-grey.css" : "source/less/themes/style2/blue-grey.less",
            "app/css/themes/style2/green-blue.css" : "source/less/themes/style2/green-blue.less",
            "app/css/themes/style2/green-dark.css" : "source/less/themes/style2/green-dark.less",
            "app/css/themes/style2/green-grey.css" : "source/less/themes/style2/green-grey.less",
            "app/css/themes/style2/orange-blue.css" : "source/less/themes/style2/orange-blue.less",
            "app/css/themes/style2/orange-grey.css" : "source/less/themes/style2/orange-grey.less",
            "app/css/themes/style2/orange-violet.css" : "source/less/themes/style2/orange-violet.less",
            "app/css/themes/style2/pink-blue.css" : "source/less/themes/style2/pink-blue.less",
            "app/css/themes/style2/pink-brown.css" : "source/less/themes/style2/pink-brown.less",
            "app/css/themes/style2/pink-dark.css" : "source/less/themes/style2/pink-dark.less",
            "app/css/themes/style2/pink-green.css" : "source/less/themes/style2/pink-green.less",
            "app/css/themes/style2/pink-grey.css" : "source/less/themes/style2/pink-grey.less",
            "app/css/themes/style2/pink-violet.css" : "source/less/themes/style2/pink-violet.less",
            "app/css/themes/style2/red-dark.css" : "source/less/themes/style2/red-dark.less",
            "app/css/themes/style2/red-grey.css" : "source/less/themes/style2/red-grey.less",
            "app/css/themes/style2/yellow-blue.css" : "source/less/themes/style2/yellow-blue.less",
            "app/css/themes/style2/yellow-dark.css" : "source/less/themes/style2/yellow-dark.less",
            "app/css/themes/style2/yellow-green.css" : "source/less/themes/style2/yellow-green.less",
            "app/css/themes/style2/yellow-grey.css" : "source/less/themes/style2/yellow-grey.less",
            "app/css/themes/style3/blue-dark.css" : "source/less/themes/style3/blue-dark.less",
            "app/css/themes/style3/blue-grey.css" : "source/less/themes/style3/blue-grey.less",
            "app/css/themes/style3/green-blue.css" : "source/less/themes/style3/green-blue.less",
            "app/css/themes/style3/green-dark.css" : "source/less/themes/style3/green-dark.less",
            "app/css/themes/style3/green-grey.css" : "source/less/themes/style3/green-grey.less",
            "app/css/themes/style3/orange-blue.css" : "source/less/themes/style3/orange-blue.less",
            "app/css/themes/style3/orange-grey.css" : "source/less/themes/style3/orange-grey.less",
            "app/css/themes/style3/orange-violet.css" : "source/less/themes/style3/orange-violet.less",
            "app/css/themes/style3/pink-blue.css" : "source/less/themes/style3/pink-blue.less",
            "app/css/themes/style3/pink-brown.css" : "source/less/themes/style3/pink-brown.less",
            "app/css/themes/style3/pink-dark.css" : "source/less/themes/style3/pink-dark.less",
            "app/css/themes/style3/pink-green.css" : "source/less/themes/style3/pink-green.less",
            "app/css/themes/style3/pink-grey.css" : "source/less/themes/style3/pink-grey.less",
            "app/css/themes/style3/pink-violet.css" : "source/less/themes/style3/pink-violet.less",
            "app/css/themes/style3/red-dark.css" : "source/less/themes/style3/red-dark.less",
            "app/css/themes/style3/red-grey.css" : "source/less/themes/style3/red-grey.less",
            "app/css/themes/style3/yellow-blue.css" : "source/less/themes/style3/yellow-blue.less",
            "app/css/themes/style3/yellow-dark.css" : "source/less/themes/style3/yellow-dark.less",
            "app/css/themes/style3/yellow-green.css" : "source/less/themes/style3/yellow-green.less",
            "app/css/themes/style3/yellow-grey.css" : "source/less/themes/style3/yellow-grey.less",
            "app/css/style-responsive.css" : "source/less/style-responsive.less"
        }
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty:true
        },
        files: {
            "app/index.html": ["source/jade/index.jade"],
            "app/templates/states/header.html": ["source/jade/templates/states/header.jade"],
            "app/templates/states/sitebar.html": ["source/jade/templates/states/sitebar.jade"],
            "app/templates/states/footer.html": ["source/jade/templates/states/footer.jade"],
            "app/templates/states/breadcrumb.html": ["source/jade/templates/states/breadcrumb.jade"],
            "app/templates/states/main.html": ["source/jade/templates/states/main.jade"],
            "app/templates/states/extra-profile.html": ["source/jade/templates/states/extra-profile.jade"],
            "app/templates/states/email-inbox.html": ["source/jade/templates/states/email-inbox.jade"],
            "app/templates/states/extra-signin.html": ["source/jade/templates/states/extra-signin.jade"],
            "app/templates/states/layout-left-sidebar.html": ["source/jade/templates/states/layout-left-sidebar.jade"],
            "app/templates/states/layout-left-sidebar-collapsed.html": ["source/jade/templates/states/layout-left-sidebar-collapsed.jade"],
            "app/templates/states/layout-right-sidebar.html": ["source/jade/templates/states/layout-right-sidebar.jade"],
            "app/templates/states/layout-right-sidebar-collapsed.html": ["source/jade/templates/states/layout-right-sidebar-collapsed.jade"],
            "app/templates/states/layout-horizontal-menu.html": ["source/jade/templates/states/layout-horizontal-menu.jade"],
            "app/templates/states/layout-horizontal-menu-sidebar.html": ["source/jade/templates/states/layout-horizontal-menu-sidebar.jade"],
            "app/templates/states/layout-fixed-topbar.html": ["source/jade/templates/states/layout-fixed-topbar.jade"],
            "app/templates/states/layout-boxed.html": ["source/jade/templates/states/layout-boxed.jade"],
            "app/templates/states/layout-hidden-footer.html": ["source/jade/templates/states/layout-hidden-footer.jade"],
            "app/templates/states/layout-header-topbar.html": ["source/jade/templates/states/layout-header-topbar.jade"],
            "app/templates/states/layout-title-breadcrumb.html": ["source/jade/templates/states/layout-title-breadcrumb.jade"],
            "app/templates/states/ui-generals.html": ["source/jade/templates/states/ui-generals.jade"],
            "app/templates/states/ui-panels.html": ["source/jade/templates/states/ui-panels.jade"],
            "app/templates/states/ui-buttons.html": ["source/jade/templates/states/ui-buttons.jade"],
            "app/templates/states/ui-tabs.html": ["source/jade/templates/states/ui-tabs.jade"],
            "app/templates/states/ui-progressbars.html": ["source/jade/templates/states/ui-progressbars.jade"],
            "app/templates/states/ui-editors.html": ["source/jade/templates/states/ui-editors.jade"],
            "app/templates/states/ui-typography.html": ["source/jade/templates/states/ui-typography.jade"],
            "app/templates/states/ui-modals.html": ["source/jade/templates/states/ui-modals.jade"],
            "app/templates/states/ui-sliders.html": ["source/jade/templates/states/ui-sliders.jade"],
            "app/templates/states/ui-nestable-list.html": ["source/jade/templates/states/ui-nestable-list.jade"],
            "app/templates/states/ui-dropdown-select.html": ["source/jade/templates/states/ui-dropdown-select.jade"],
            "app/templates/states/ui-icons.html": ["source/jade/templates/states/ui-icons.jade"],
            "app/templates/states/ui-notific8-notifications.html": ["source/jade/templates/states/ui-notific8-notifications.jade"],
            "app/templates/states/ui-toastr-notifications.html": ["source/jade/templates/states/ui-toastr-notifications.jade"],
            "app/templates/states/ui-checkbox-radio.html": ["source/jade/templates/states/ui-checkbox-radio.jade"],
            "app/templates/states/ui-treeview.html": ["source/jade/templates/states/ui-treeview.jade"],
            "app/templates/states/ui-portlets.html": ["source/jade/templates/states/ui-portlets.jade"],
            "app/templates/states/form-layouts.html": ["source/jade/templates/states/form-layouts.jade"],
            "app/templates/states/form-basic.html": ["source/jade/templates/states/form-basic.jade"],
            "app/templates/states/form-components.html": ["source/jade/templates/states/form-components.jade"],
            "app/templates/states/form-wizard.html": ["source/jade/templates/states/form-wizard.jade"],
            "app/templates/states/form-xeditable.html": ["source/jade/templates/states/form-xeditable.jade"],
            "app/templates/states/form-validation.html": ["source/jade/templates/states/form-validation.jade"],
            //"app/templates/states/form-multiple-file-upload.html": ["source/jade/templates/states/form-multiple-file-upload.jade"],
            "app/templates/states/form-dropzone-file-upload.html": ["source/jade/templates/states/form-dropzone-file-upload.jade"],
            "app/templates/states/frontend-one-page.html": ["source/jade/templates/states/frontend-one-page.jade"],
            "app/templates/states/table-basic.html": ["source/jade/templates/states/table-basic.jade"],
            "app/templates/states/table-responsive.html": ["source/jade/templates/states/table-responsive.jade"],
            "app/templates/states/table-action.html": ["source/jade/templates/states/table-action.jade"],
            "app/templates/states/table-filter.html": ["source/jade/templates/states/table-filter.jade"],
            "app/templates/states/table-advanced.html": ["source/jade/templates/states/table-advanced.jade"],
            "app/templates/states/table-editable.html": ["source/jade/templates/states/table-editable.jade"],
            "app/templates/states/table-datatables.html": ["source/jade/templates/states/table-datatables.jade"],
            "app/templates/states/table-sample.html": ["source/jade/templates/states/table-sample.jade"],
            "app/templates/states/table-export.html": ["source/jade/templates/states/table-export.jade"],
            "app/templates/states/grid-layout-div.html": ["source/jade/templates/states/grid-layout-div.jade"],
            "app/templates/states/grid-layout-table-1.html": ["source/jade/templates/states/grid-layout-table-1.jade"],
            "app/templates/states/grid-layout-table-2.html": ["source/jade/templates/states/grid-layout-table-2.jade"],
            "app/templates/states/grid-layout-2-table.html": ["source/jade/templates/states/grid-layout-2-table.jade"],
            "app/templates/states/grid-layout-ul-li.html": ["source/jade/templates/states/grid-layout-ul-li.jade"],
            "app/templates/states/grid-filter-with-ul-li.html": ["source/jade/templates/states/grid-filter-with-ul-li.jade"],
            "app/templates/states/grid-filter-with-select.html": ["source/jade/templates/states/grid-filter-with-select.jade"],
            "app/templates/states/grid-double-sort.html": ["source/jade/templates/states/grid-double-sort.jade"],
            "app/templates/states/grid-deep-linking.html": ["source/jade/templates/states/grid-deep-linking.jade"],
            "app/templates/states/grid-pagination-only.html": ["source/jade/templates/states/grid-pagination-only.jade"],
            "app/templates/states/grid-without-item-per-page.html": ["source/jade/templates/states/grid-without-item-per-page.jade"],
            "app/templates/states/grid-hidden-sort.html": ["source/jade/templates/states/grid-hidden-sort.jade"],
            "app/templates/states/grid-range-slider.html": ["source/jade/templates/states/grid-range-slider.jade"],
            "app/templates/states/grid-datepicker.html": ["source/jade/templates/states/grid-datepicker.jade"],
            "app/templates/states/page-gallery.html": ["source/jade/templates/states/page-gallery.jade"],
            "app/templates/states/page-timeline.html": ["source/jade/templates/states/page-timeline.jade"],
            "app/templates/states/page-blog.html": ["source/jade/templates/states/page-blog.jade"],
            "app/templates/states/page-blog-item.html": ["source/jade/templates/states/page-blog-item.jade"],
            "app/templates/states/page-about.html": ["source/jade/templates/states/page-about.jade"],
            "app/templates/states/page-contact.html": ["source/jade/templates/states/page-contact.jade"],
            "app/templates/states/page-calendar.html": ["source/jade/templates/states/page-calendar.jade"],
            "app/templates/states/extra-signup.html": ["source/jade/templates/states/extra-signup.jade"],
            "app/templates/states/extra-lock-screen.html": ["source/jade/templates/states/extra-lock-screen.jade"],
            "app/templates/states/extra-user-list.html": ["source/jade/templates/states/extra-user-list.jade"],
            "app/templates/states/extra-invoice.html": ["source/jade/templates/states/extra-invoice.jade"],
            "app/templates/states/extra-faq.html": ["source/jade/templates/states/extra-faq.jade"],
            "app/templates/states/extra-pricing-table.html": ["source/jade/templates/states/extra-pricing-table.jade"],
            "app/templates/states/extra-blank.html": ["source/jade/templates/states/extra-blank.jade"],
            "app/templates/states/extra-404.html": ["source/jade/templates/states/extra-404.jade"],
            "app/templates/states/extra-500.html": ["source/jade/templates/states/extra-500.jade"],
            "app/templates/states/email-compose-mail.html": ["source/jade/templates/states/email-compose-mail.jade"],
            "app/templates/states/email-view-mail.html": ["source/jade/templates/states/email-view-mail.jade"],
            "app/templates/states/charts-flotchart.html": ["source/jade/templates/states/charts-flotchart.jade"],
            "app/templates/states/charts-chartjs.html": ["source/jade/templates/states/charts-chartjs.jade"],
            "app/templates/states/charts-highchart-line.html": ["source/jade/templates/states/charts-highchart-line.jade"],
            "app/templates/states/charts-highchart-area.html": ["source/jade/templates/states/charts-highchart-area.jade"],
            "app/templates/states/charts-highchart-column-bar.html": ["source/jade/templates/states/charts-highchart-column-bar.jade"],
            "app/templates/states/charts-highchart-pie.html": ["source/jade/templates/states/charts-highchart-pie.jade"],
            "app/templates/states/charts-highchart-scatter-bubble.html": ["source/jade/templates/states/charts-highchart-scatter-bubble.jade"],
            "app/templates/states/charts-highchart-dynamic.html": ["source/jade/templates/states/charts-highchart-dynamic.jade"],
            "app/templates/states/charts-highchart-combinations.html": ["source/jade/templates/states/charts-highchart-combinations.jade"],
            "app/templates/states/charts-highchart-more.html": ["source/jade/templates/states/charts-highchart-more.jade"],
            "app/templates/states/animations.html": ["source/jade/templates/states/animations.jade"],
            "app/templates/states/_layout-header-topbar/header-topbar-option1.html": ["source/jade/templates/states/_layout-header-topbar/header-topbar-option1.jade"],
            "app/templates/states/_layout-header-topbar/header-topbar-option2.html": ["source/jade/templates/states/_layout-header-topbar/header-topbar-option2.jade"],
            "app/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-left-with-label.html": ["source/jade/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-left-with-label.jade"],
            "app/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-left.html": ["source/jade/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-left.jade"],
            "app/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-right.html": ["source/jade/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-right.jade"],
            "app/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-with-toolbar.html": ["source/jade/templates/states/_layout-title-breadcrumb/title-breadcrumb-inline-with-toolbar.jade"],
            "app/templates/states/_layout-title-breadcrumb/title-subtitle-breadcrumb-inline-left.html": ["source/jade/templates/states/_layout-title-breadcrumb/title-subtitle-breadcrumb-inline-left.jade"],
            "app/templates/states/_layout-title-breadcrumb/title-subtitle-breadcrumb-inline-right.html": ["source/jade/templates/states/_layout-title-breadcrumb/title-subtitle-breadcrumb-inline-right.jade"],
            "app/templates/states/_layout-title-breadcrumb/title-subtitle-breadcrumb-left.html": ["source/jade/templates/states/_layout-title-breadcrumb/title-subtitle-breadcrumb-left.jade"],
            "app/templates/states/_page-gallery/page-gallery-2-columns-tab.html": ["source/jade/templates/states/_page-gallery/page-gallery-2-columns-tab.jade"],
            "app/templates/states/_page-gallery/page-gallery-3-columns-tab.html": ["source/jade/templates/states/_page-gallery/page-gallery-3-columns-tab.jade"],
            "app/templates/states/_page-gallery/page-gallery-4-columns-tab.html": ["source/jade/templates/states/_page-gallery/page-gallery-4-columns-tab.jade"],
            "app/templates/states/_table-action/table-action-panel-tab.html": ["source/jade/templates/states/_table-action/table-action-panel-tab.jade"],
            "app/templates/states/_table-action/table-action-row-tab.html": ["source/jade/templates/states/_table-action/table-action-row-tab.jade"],
            "app/templates/states/_table-action/table-action-table-tab.html": ["source/jade/templates/states/_table-action/table-action-table-tab.jade"],
            "app/templates/states/_table-advanced/table-advanced-color-tab.html": ["source/jade/templates/states/_table-advanced/table-advanced-color-tab.jade"],
            "app/templates/states/_table-advanced/table-advanced-size-tab.html": ["source/jade/templates/states/_table-advanced/table-advanced-size-tab.jade"],
            "app/templates/states/_table-advanced/table-advanced-sorter-tab.html": ["source/jade/templates/states/_table-advanced/table-advanced-sorter-tab.jade"],
            "app/templates/states/_table-advanced/table-advanced-sticky-tab.html": ["source/jade/templates/states/_table-advanced/table-advanced-sticky-tab.jade"],
            "app/templates/states/_ui-checkbox-radio/ui-checkbox-radio-icheck-tab.html": ["source/jade/templates/states/_ui-checkbox-radio/ui-checkbox-radio-icheck-tab.jade"],
            "app/templates/states/_ui-generals/ui-generals-alert-tab.html": ["source/jade/templates/states/_ui-generals/ui-generals-alert-tab.jade"],
            "app/templates/states/_ui-generals/ui-generals-input-group-tab.html": ["source/jade/templates/states/_ui-generals/ui-generals-input-group-tab.jade"],
            "app/templates/states/_ui-generals/ui-generals-label-badge-tab.html": ["source/jade/templates/states/_ui-generals/ui-generals-label-badge-tab.jade"],
            "app/templates/states/_ui-generals/ui-generals-list-group-tab.html": ["source/jade/templates/states/_ui-generals/ui-generals-list-group-tab.jade"],
            "app/templates/states/_ui-generals/ui-generals-navbar-tab.html": ["source/jade/templates/states/_ui-generals/ui-generals-navbar-tab.jade"],
            "app/templates/states/_ui-generals/ui-generals-note-tab.html": ["source/jade/templates/states/_ui-generals/ui-generals-note-tab.jade"],
            "app/templates/states/_ui-generals/ui-generals-other-tab.html": ["source/jade/templates/states/_ui-generals/ui-generals-other-tab.jade"],
            "app/templates/states/_ui-generals/ui-generals-pagination-tab.html": ["source/jade/templates/states/_ui-generals/ui-generals-pagination-tab.jade"],
            "app/templates/states/_ui-generals/ui-generals-thumbnail-tab.html": ["source/jade/templates/states/_ui-generals/ui-generals-thumbnail-tab.jade"],
            "app/templates/states/_ui-progressbars/ui-progressbars-horizontal-tab.html": ["source/jade/templates/states/_ui-progressbars/ui-progressbars-horizontal-tab.jade"],
            "app/templates/states/_ui-progressbars/ui-progressbars-miscellaneous-tab.html": ["source/jade/templates/states/_ui-progressbars/ui-progressbars-miscellaneous-tab.jade"],
            "app/templates/states/_ui-progressbars/ui-progressbars-vertical-tab.html": ["source/jade/templates/states/_ui-progressbars/ui-progressbars-vertical-tab.jade"],
            "app/templates/states/_ui-sliders/ui-sliders-ion-range-slider-tab.html": ["source/jade/templates/states/_ui-sliders/ui-sliders-ion-range-slider-tab.jade"],
            "app/templates/states/_ui-sliders/ui-sliders-noui-slider-tab.html": ["source/jade/templates/states/_ui-sliders/ui-sliders-noui-slider-tab.jade"],
            "app/templates/states/_ui-sliders/ui-sliders-ui-slider-tab.html": ["source/jade/templates/states/_ui-sliders/ui-sliders-ui-slider-tab.jade"],
            "app/templates/states/_ui-treeview/ui-treeview-family-treeview-tab.html": ["source/jade/templates/states/_ui-treeview/ui-treeview-family-treeview-tab.jade"],
            "app/templates/states/_ui-treeview/ui-treeview-jstree-tab.html": ["source/jade/templates/states/_ui-treeview/ui-treeview-jstree-tab.jade"],
            "app/templates/states/_ui-treeview/ui-treeview-treetable-tab.html": ["source/jade/templates/states/_ui-treeview/ui-treeview-treetable-tab.jade"],
            "app/templates/states/_includes/chat-form.html": ["source/jade/templates/states/_includes/chat-form.jade"],
            "app/templates/directives/chart-container.html": ["source/jade/templates/directives/chart-container.jade"],
            "app/templates/parts/chart.html": ["source/jade/templates/parts/chart.jade"],

            "app/templates/states/start.html": ["source/jade/templates/states/start.jade"]
        }
      }
    },
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
      jade: {
        files: ['**/*.jade'],
        tasks: ['jade'],
        options: {
          nospawn: true
        }
      },
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
        dest: 'app/js/main.js'
      }
    },
    jshint: {
      options: {
        strict: false,
        eqnull:true,
        loopfunc:true,
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
            {dest: 'app/js/libs/jquery.min.js', src:'source/bower_components/jquery/jquery.min.js'},
            {dest: 'app/js/libs/jquery-ui.min.js', src:'source/bower_components/jquery-ui/jquery-ui.min.js'},
            {dest: 'app/js/libs/angular.js', src:'source/bower_components/angular/angular.js'},
            {dest: 'app/js/libs/angular-route.js', src:'source/bower_components/angular-route/angular-route.js'},
            {dest: 'app/js/libs/angular-ui-router.js', src:'source/bower_components/angular-ui-router.js'},
            {dest: 'app/js/libs/ocLazyLoad.js', src:'source/bower_components/ocLazyLoad.js'},
            {dest: 'app/js/libs/ui-bootstrap.js', src:'source/bower_components/angular-bootstrap/ui-bootstrap.js'},
            {dest: 'app/js/libs/highcharts.js', src:'source/bower_components/highcharts/highcharts.js'},
            {dest: 'app/js/libs/highcharts-3d.js', src:'source/bower_components/highcharts/highcharts-3d.js'},

            {dest: 'app/js/libs/lodash.js', src:'source/bower_components/lodash/lodash.js'},
            {dest: 'app/js/libs/angular-ui-sortable.js', src:'source/bower_components/angular-ui-sortable/sortable.js'},
            {dest: 'app/js/libs/highcharts-ng.js', src:'source/bower_components/highcharts-ng/dist/highcharts-ng.js'},
            {dest: 'app/js/libs/malhar-angular-dashboard.js', src:'source/bower_components/malhar-angular-dashboard/dist/malhar-angular-dashboard.js'},

            {dest: 'app/css/malhar-angular-dashboard.css', src:'source/bower_components/malhar-angular-dashboard/dist/malhar-angular-dashboard.css'},

            {expand: true, flatten: true, dest: 'app/resources/', src:['source/resources/**'], filter: 'isFile'}
        ],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'jade','less', 'jshint', 'concat', 'concurrent' ]);
  // Work with js only
  grunt.registerTask('js', ['jshint', 'concat' ]);
};
