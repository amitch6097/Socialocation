"use strict";
define('NavView', [
    'backbone',
    'underscore',
], function (Backbone, _) {
    var NavView = Backbone.View.extend({
        initialize: function (data) {
            this.router = data.router;
            var template = _.template("\n        <ul>\n          <% _.each(Object.keys(routes), function(route){ %>\n              <li id=\"nav-<%= route %>\" data-url=\"<%= route %>\"><%= route %></li>\n          <% }); %>\n        </ul>\n      ");
            this.$el.html(template({ routes: this.router.routes }));
            return this;
        },
        events: {
            "click": "onClick"
        },
        onClick: function (e) {
            var $li = $(e.target);
            var router = this.router;
            router.navigate($li.attr("data-url"), { trigger: true });
        }
    });
    return NavView;
});
//# sourceMappingURL=nav.js.map