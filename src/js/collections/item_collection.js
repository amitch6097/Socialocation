define('ItemCollection',[
	'backbone',
  'EventMediator'
], function (
  Backbone, ItemModelTweet, EventMediator
){
  var LAT_LNG_TO_MILES = function(miles){return miles*69;}

	var ItemCollection = Backbone.Collection.extend({

      model: ItemModelTweet,
      url: '/api/tweets',

      parse:function(data){
        return data;
      },

      boundsQueryToString(bounds){
        return `${bounds.center.lat},${bounds.center.lng},${LAT_LNG_TO_MILES(bounds.dist)}mi`;
      },

      initialize: function(models, options){
        this.timeout = false;
        this.scrollTo = undefined;

        this.markers = [];
        this.clusters = [];

        this.allModels = {};
        this.settings = {remove: false, collapse: false};

        this.bounds = options.bounds;
        this.params = {geocode: this.boundsQueryToString(this.bounds)}

        EventMediator.listen('map-bounds-changed', this.mapBoundsChange, this);
        EventMediator.listen('map-cluster-selected', this.mapClusterSelected, this);
        this.fetchData(this.params);
        return this;
      },

      setSettings: function(settings){
        this.settings = Object.assign(this.settings, settings);
        if(this.settings.remove === true){
          this.forceClear();
        }
      },

      clear: function(){
        this.scrollTo = undefined;
        this.allModels = {};
        this.markers = [];
        this.clusters = [];
        this.each((model) => {
          model.hide();
        });
        // this.each((model)=>{
        //   this.remove(model, {silent: true})
        // })
        EventMediator.emit('twitter-clear', null);
      },

      setSearchValue: function(searchValue){
        if(this.settings.remove === true) return;
        this.params = Object.assign(this.params, {q:searchValue});
      },

      forceClear: function(){
        this.markers.forEach((mMarker) => {
          mMarker.model.hide();
        });
      },

      forceRender: function(){
        if(this.settings.remove === true) return;

        // MARK AND CLEAR
        //mark all visible cluster models as true
        this.clusters.forEach((cluster) => {
          cluster.markers_.forEach((cMarker) =>{
            cMarker.model.changeVisible(true);
          });
        });

        //asks each view to clear for us
        this.markers.forEach((mMarker) => {
          mMarker.model.updateView();
        });
      },

      mapBoundsChange: function(data){
        this.markers = data.markers;
        this.clusters = data.clusters;
        this.bounds = data.bounds;

        this.forceRender();
        let query = {geocode: this.boundsQueryToString(this.bounds)};
        this.fetchData(query);
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
        collection.each((model) => {
          this.allModels[model.id] = model;
        });

        this.newElements = this.models;
        EventMediator.emit("collection-locations-loaded", {twitter: this.models});

        if(this.settings.remove === true) return;
        this.trigger("change:newElements");
      },

      selectHover: function(id){
        let model = this.allModels[id];
        EventMediator.emit('item-hover-request', model.latlng);
      },

      mapClusterSelected: function(id){
        if(this.settings.remove === true) return;
        this.scrollTo = id;
        this.trigger("change:scrollTo");

        // clusterCids.forEach((cid) => {
        //   let model = this.get(cid);
        //   model.selected = true;
        //   model.set({selected: true});
        // });
      },

    });

    ItemCollection.prototype.set = function(items) {
      let newItems = _.reject(items, (item) => {
        return this.allModels[item.id] !== undefined;
      });
      return Backbone.Collection.prototype.set.call(this, newItems);
    }

	return ItemCollection;
});
