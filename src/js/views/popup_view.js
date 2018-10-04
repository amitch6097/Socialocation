"use strict";
define('PopupView', [
    'backbone',
    'tpl!views/templates/popup_view.tpl',
    'PopupModel',
    'TweetView',
    'InstagramView',
], function (Backbone, PopupViewTemplate, PopupModel, TweetView, InstagramView) {
    var VIEW_TYPES = {
        "twitter": TweetView,
        "instagram": InstagramView
    };
    var PopupView = Backbone.View.extend({
        events: {
            "click #holder-title-previous": "previous",
            "click #holder-title-next": "next"
        },
        initialize: function (data) {
            this.subElement = '#holder-map-items';
            this.model = new PopupModel({});
            this.model.on('change:marker', this.render, this);
        },
        render: function () {
            this.$el.html(PopupViewTemplate());
            $(this.subElement).empty();
            const point = this.model.get('point');
            const previous = this.model.get('previous');
            const next = this.model.get('next');
            const hidden = !previous && !next;
            if (hidden === true) {
                $("#holder-map-title").empty();
            }
            $("#holder-title-previous").prop("disabled", !previous);
            $("#holder-title-next").prop("disabled", !next);
            this.$el.css({ left: point.x, top: point.y });
            this.addItem();
            this.$el.css({ visibility: "visible" });
            this.$el.css({ 'max-height': 'calc(100% - ' + point.y + 'px)' });
            $(this.subElement).css({ 'max-height': 'calc(100% - ' + point.y + 'px)' });
        },
        addItem: function (model) {
            const itemModel = this.model.get('marker').model;
            let modelType = itemModel.get('modelType');
            let viewObject = VIEW_TYPES[modelType];
            let item = new viewObject({
                el: this.subElement,
                model: itemModel,
            });
            item.render();
        },
        empty: function () {
            this.$el.css({ visibility: "hidden" });
            $(this.subElement).empty();
        },
        populate: function (cluster) {
            this.model.populate(cluster);
        },
        next: function () {
            this.model.next();
        },
        previous: function () {
            this.model.previous();
        },
    });
    return PopupView;
});
