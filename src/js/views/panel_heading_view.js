"use strict";
define('PanelHeadingView', [
    'backbone',
    'tpl!views/templates/panel_heading_view.tpl'
], function (Backbone, PanelHeadingViewTemplate) {
    var PanelHeadingView = Backbone.View.extend({
        initialize: function (data) {
            this.el = data.el;
            this.template = PanelHeadingViewTemplate;
            $(this.el).html(this.template({ heading: data.heading, uniqueName: data.uniqueName }));
        },
        render: function () {
            return this;
        }
    });
    return PanelHeadingView;
});
