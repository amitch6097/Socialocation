"use strict";
define('TweetCollection', [
    'backbone',
    'ItemModelTweet',
    'ItemCollection',
    'EventMediator'
], function (Backbone, ItemModelTweet, ItemCollection, EventMediator) {
    var LAT_LNG_TO_MILES = function (miles) { return miles * 69; };
    var TweetCollection = ItemCollection.extend({
        model: ItemModelTweet,
        url: '/api/tweets',
        boundsQueryToString: function (bounds) {
            return `${bounds.center.lat},${bounds.center.lng},${LAT_LNG_TO_MILES(bounds.dist)}mi`;
        },
        initialize: function (models, options) {
            this.attributeSet({
                bounds: options.bounds,
                timeout: false,
                scrollTo: undefined,
                clusters: [],
                allModels: {},
                params: {
                    geocode: this.boundsQueryToString(options.bounds)
                },
                settings: {
                    hide: false,
                    pause: false,
                },
            });
            this.fetchData(this.attributeGet('params'));
        },
        mapBoundsChange: function (data) {
            this.attributeSet({
                bounds: data.bounds,
                clusters: data.clusters
            });
            const query = { geocode: this.boundsQueryToString(data.bounds) };
            const oldGeocode = this.attributeGet('params').geocode;
            if (query.geocode === oldGeocode)
                return;
            ItemCollection.prototype.mapBoundsChange.apply(this, [query]);
        },
        clear: function () {
            ItemCollection.prototype.clear.apply(this);
            EventMediator.emit('twitter-cleared', null);
        },
        setSearchValue: function (searchValue) {
            let params = this.attributeGet('params');
            params = Object.assign(params, { q: searchValue });
            this.attributeSet('params', params);
        },
        showIds: function (ids) {
            const allModels = this.attributeGet('allModels');
            ids.forEach((id) => {
                allModels[id].show();
            });
        },
    });
    return TweetCollection;
});
//# sourceMappingURL=tweet_collection.js.map