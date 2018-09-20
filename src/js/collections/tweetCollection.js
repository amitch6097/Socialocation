define('TweetCollection',[
	'backbone',
  'TweetModel',
  'EventMediator'
], function (
  Backbone, TweetModel, EventMediator
){

	var TweetCollection = Backbone.Collection.extend({

      model: TweetModel,
      url: '/api/tweets',

      parse:function(data){
        return data;
      },

      initialize: function(data){
        this.timeout = false;
        this.scrollTo = undefined;

        this.mapLocations = {};
        this.visibleElements = [];

        this.bounds = {center:{lat: 42.9634, lon:-85.6681}, dist: 0.015};

        EventMediator.listen('map-bounds-changed', this.mapBoundsChange, this);
        EventMediator.listen('map-cluster-selected', this.mapClusterSelected, this);

        this.params = {geocode: "42.9634,-85.6681,1mi"}
        this.fetchData(this.params);

        return this;
      },

      clear: function(){
        this.scrollTo;
        this.visibleElements = [];
        this.mapLocations = {};
        this.reset();
      },

      tweetSearch: function(searchValue){
        this.clear();
        this.fetchData({q:searchValue});
      },

      mapBoundsChange: function(data){
        this.bounds = data.bounds;
        this.fetchData(data.query);
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
          remove: false,
          success: this.dataLoaded.bind(this),
          error: (collection, response) => {
						throw "ERROR FETCHING TWEETS";
					}
        });

        setTimeout(() => {this.timeout = false;}, 1000);
      },

      dataLoaded: function(collection, response){
        collection.visibleElements = [];

        collection.each((model)=> {
          if(model.withinBounds(this.bounds)){
            collection.visibleElements.push(model)
          }
          collection.mapLocations = Object.assign(collection.mapLocations, model.getLatLng());
        });


        EventMediator.emit("twitter-locations-loaded", {twitter: collection.mapLocations});
        this.trigger("change:visibleElements");
      },

      selectTweetHover: function(cid){
        let model = this.get(cid);
        EventMediator.emit('twitter-tweet-hover', model.latlng);
      },

      mapClusterSelected: function(clusterCids){
        this.each((model) => {
          model.set({selected: false}, {trigger: false});
        });

        this.scrollTo = clusterCids[0];
        this.trigger("change:scrollTo");

        clusterCids.forEach((cid) => {
          let model = this.get(cid);
          model.selected = true;
          model.set({selected: true});
        });
      },
    });

    TweetCollection.prototype.add = function(tweet) {
      var isDupe = this.any(function(_tweet) {
          return _tweet.get('id_str') === tweet.get('id_str');
      });
      return isDupe ? false : Backbone.Collection.prototype.add.call(this, tweet);
    }

	return TweetCollection;
});
