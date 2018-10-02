"use strict";
define('NavView', [
    'backbone',
    'underscore',
], function (Backbone, _) {
    let NavView = Backbone.View.extend({
        initialize: function (data) {
            this.router = data.router;
            let template = _.template(`
        <ul>
          <% _.each(Object.keys(routes), function(route){ %>
              <li id="nav-<%= route %>" data-url="<%= route %>"><%= route %></li>
          <% }); %>
        </ul>
      `);
            this.$el.html(template({ routes: this.router.routes }));
            return this;
        },
        events: {
            "click": "onClick"
        },
        onClick: function (e) {
            let $li = $(e.target);
            let router = this.router;
            router.navigate($li.attr("data-url"), { trigger: true });
        }
    });
    return NavView;
});
//# sourceMappingURL=nav.js.map