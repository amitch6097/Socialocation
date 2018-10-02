"use strict";
define('Router', [
    'backbone',
    'HomeView',
    'EventMediator',
], function (Backbone, HomeView, EventMediator) {
    var Router = Backbone.Router.extend({
        routes: {
            "location/:lat/:lng/:dist": "location",
        },
        initialize: function (options) {
            this.homeView;
            this.homeViewHasRendered = false;
            EventMediator.listen('map-bounds-changed', this.updateURL, this);
        },
        start: function () {
            if (!this.homeViewHasRendered) {
                this.homeView = new HomeView({ el: "#app-main", bounds: undefined });
            }
        },
        updateURL: function (data) {
            let bounds = data.bounds;
            let center = bounds.center;
            let URLoptions = `location/${center.lat}/${center.lng}/${bounds.dist}`;
            this.navigate(URLoptions, { trigger: false });
        },
        location: function (lat, lng, dist) {
            this.homeViewHasRendered = true;
            let bounds = {
                center: {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                },
                dist: parseFloat(dist),
            };
            this.homeView = new HomeView({ el: "#app-main", bounds: bounds });
        },
    });
    return Router;
});
//# sourceMappingURL=router.js.map