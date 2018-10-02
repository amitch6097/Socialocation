"use strict";
define([
    'backbone',
    'HomeView',
    'Router'
], function (Backbone, HomeView, Router) {
    var App = Backbone.View.extend({
        initialize: function () {
            var router = new Router();
            Backbone.history.start();
            router.start();
        }
    });
    return App;
});
//# sourceMappingURL=app.js.map