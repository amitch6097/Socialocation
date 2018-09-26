define('InstagramCollection',[
	'backbone',
  'ItemModelInstagram',
  'EventMediator',
], function (
  Backbone, ItemModelInstagram, EventMediator
){

	var InstagramCollection = Backbone.Collection.extend({

      model: ItemModelInstagram,
      url: '/api/instagram',

      parse:function(data){
        return data;
      },

      initialize: function(models, options){
        this.bounds = options.bounds;
        this.params = {lat: this.bounds.center.lat, lng: this.bounds.center.lng};
        this.allModels = {};
        this.settings = {remove: false, collapse: false};
        this.fetchData(this.params);
      },

      fetchData: function(query){
        if(this.timeout){
          return;
        }
        this.timeout  = true;

        this.params = Object.assign(this.params, query);
        this.fetch({
          data: this.params,
          processData: true,
          remove: true,
          success: this.dataLoaded.bind(this),
          error: (collection, response) => {
            throw "ERROR FETCHING TWEETS";
          }
        });

        setTimeout(() => {this.timeout = false;}, 1000);
      },

      dataLoaded: function(collection, response, options){
        console.log(response);
      },

      dataLoaded: function(collection, response, options){
        collection.each((model) => {
          this.allModels[model.id] = model;
        });

        this.newElements = this.models;
        EventMediator.emit("collection-locations-loaded", {instagram: this.models});

        if(this.settings.remove === true) return;
        this.trigger("change:newElements");
      },

    });

    InstagramCollection.prototype.set = function(instagrams) {
      let newInstagram = _.reject(instagrams, (instagram) => {
        return this.allModels[instagram.id] !== undefined;
      });
      return Backbone.Collection.prototype.set.call(this, newInstagram);
    }

	return InstagramCollection;
});
