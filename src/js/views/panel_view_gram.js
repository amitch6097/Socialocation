"use strict";
define('PanelViewGram', [
    'backbone',
    'InstagramView',
    'tpl!views/templates/panel_view_gram.tpl'
], function (Backbone, InstagramView, PanelViewGramTemplate) {
    var PanelViewGram = Backbone.View.extend({
        initialize: function (data) {
            this.model = data.model;
            InstagramView.prototype.initialize.apply(this, [data]);
            this.el = data.el;
            this.visible = false;
            this.superTemplate = PanelViewGramTemplate;
            this.html = this.superTemplate({
                id_str: this.model.id_str,
                instagramHtml: this.html,
                latlng: JSON.stringify(this.model.get('latlng'))
            });
            this.elementId = `#instagram-${this.model.id_str}`;
            this.model.on("change:selected", this.selected.bind(this));
            this.model.on("change:update", this.updateView.bind(this));
            this.updateView();
        },
        selected: function () {
            $(this.elementId).removeClass("tweet-container-selected");
            if (this.model.get('selected')) {
                $(this.elementId).addClass("tweet-container-selected");
            }
        },
        updateView: function () {
            const modelVisible = this.model.get('visible');
            this.model.set('visible', false);
            if (this.visible === true && modelVisible === true) {
                this.model.set('visible', false);
                return;
            }
            if (modelVisible === true) {
                this.visible = true;
                $(this.el).append(this.html);
            }
            else {
                $(this.elementId).remove();
                this.visible = false;
            }
        },
    });
    return PanelViewGram;
});
