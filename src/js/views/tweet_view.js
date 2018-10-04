"use strict";
define('TweetView', [
    'backbone',
    'tpl!views/templates/tweet_view.tpl',
], function (Backbone, TweetViewTemplate) {
    var TweetView = Backbone.View.extend({
        initialize: function (data) {
            this.model = data.model;
            this.el = data.el;
            this.template = TweetViewTemplate;
            let link = this.model.getLink();
            this.html = this.template({
                link: link,
            });
        },
        render: function () {
            $(this.el).append(this.html);
        },
    });
    return TweetView;
});
