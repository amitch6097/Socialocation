declare const define: any;

interface Data {
		$el: string;
		router: object;
}

define('NavView', [
	'backbone',
	'underscore',
	],
	function(
		Backbone,
		_,
	) {

	const NavView: object = Backbone.View.extend({

		initialize(data: Data) {

			this.router = data.router;

			const template = _.template(`
        <ul>
          <% _.each(Object.keys(routes), function(route){ %>
              <li id="nav-<%= route %>" data-url="<%= route %>"><%= route %></li>
          <% }); %>
        </ul>
      `);

			this.$el.html(template({routes: this.router.routes}));
			return this;
		},

		events: {
			click: "onClick",
		},

		onClick(e: Event) {
				const $li = $(e.target);
				const router = this.router;
				router.navigate($li.attr("data-url"), { trigger: true });
		},

	});

	return NavView;
});
