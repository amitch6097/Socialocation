"use strict";
define('ItemModel', [
    'backbone'
], function (Backbone) {
    var ItemModel = Backbone.Model.extend({
        show: function () {
            this.changeVisible(true);
            this.updateView();
        },
        hide: function () {
            this.changeVisible(false);
            this.updateView();
        },
        changeVisible: function (value) {
            this.set('visible', value);
        },
        updateView: function () {
            this.trigger('change:update');
        },
        getLink: function () {
            throw "NEED TO IMPLMENT GET LINK";
        }
    });
    return ItemModel;
});
