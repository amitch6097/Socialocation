/// <reference path="../../../types/index.d.ts" />

define([
	'backbone',
	'HomeView',
	'Router',
	],
	function(
		Backbone, HomeView, Router,
	) {

	const App = Backbone.View.extend({
		initialize() {
			const router = new Router();
			Backbone.history.start();
			router.start();
		},
	});

	return App;
});
