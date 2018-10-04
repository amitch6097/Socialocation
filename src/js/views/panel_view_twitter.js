"use strict";
define('PanelViewTwitter', [
    'backbone',
    'tpl!views/templates/panel_view_twitter.tpl',
    'PanelView',
    'PanelViewTweet',
    'TweetCollection',
    'SingletonView',
    'EventMediator',
], function (Backbone, PanelViewTwitterTemplate, PanelView, PanelViewTweet, TweetCollection, SingletonView, EventMediator) {
    var PanelViewTwitter = PanelView.extend({
        events: {
            "click .button-go-to-tweet-location": "tweetLocationRequest",
            "mouseenter .tweet-container": "tweetMouseHover",
            "click #tweet-search-submit": "tweetSearch",
            "click #twitter-hide": 'hide',
            "click #twitter-show": 'show',
            "click #twitter-pause": 'pause',
            "click #twitter-start": 'start'
        },
        initialize: function (options) {
            this.collection = new TweetCollection(null, { bounds: options.bounds });
            this.removedIds = [];
            options['uniqueName'] = "twitter";
            options['subView'] = PanelViewTweet;
            options['heading'] = PanelViewTwitterTemplate();
            PanelView.prototype.initialize.apply(this, [options]);
        },
        showPanel: function (settings) {
            this.collection.setSettings(settings);
            let css = { height: "95%", width: "330px" };
            this.changeView(this.holdHtml, css, { begin: { left: "-=500" }, end: { left: "+=500" } }, this.collection.showIds, this.collection, this.removedIds);
        },
        hidePanel: function (newHtml, settings) {
            this.collectVisibleTweetIds();
            this.collection.setSettings(settings);
            this.holdHtml = $(this.el).html();
            let css = { height: "auto", width: "auto" };
            this.changeView(newHtml, css, { begin: { left: "-=500" }, end: { left: "+=500" } });
        },
        collectVisibleTweetIds: function () {
            this.removedIds = [];
            let elementArray = $(this.el).find('.tweet-container');
            elementArray.each((index) => {
                let element = elementArray[index];
                this.removedIds.push($(element).attr("data-url"));
            });
        },
        tweetLocationRequest: function (e) {
            e.preventDefault();
            let latlng = $(e.target).attr("data-url");
            EventMediator.emit('map-center-request', JSON.parse(latlng));
        },
        tweetSearch: function (e) {
            e.preventDefault();
            let searchValue = $("#tweet-search-text").val();
            this.collection.setSearchValue(searchValue);
            this.clear();
        },
        tweetMouseHover: function (e) {
            e.preventDefault();
            let id_str = $(e.currentTarget).attr("data-url");
            this.collection.selectHover(id_str);
        },
    });
    return new SingletonView(PanelViewTwitter);
});
