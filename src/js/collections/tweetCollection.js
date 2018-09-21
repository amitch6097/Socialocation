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
        this.allModels = {};


        this.bounds = {center:{lat: 42.9634, lon:-85.6681}, dist: 0.015};

        EventMediator.listen('map-bounds-changed', this.mapBoundsChange, this);
        EventMediator.listen('map-cluster-selected', this.mapClusterSelected, this);

        this.params = {geocode: "42.9634,-85.6681,1mi"}
        this.fetchData(this.params);

        return this;
      },

      clear: function(){
        EventMediator.emit('map-refresh-request', null);
        this.scrollTo;
        this.visibleElements = [];
        this.mapLocations = {};
        this.allModels = {};
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
          this.allModels[model.id_str] = model;
        });

        this.newElements = this.models;
        EventMediator.emit("twitter-locations-loaded", {twitter: this.models});
        this.trigger("change:newElements");
      },

      selectTweetHover: function(cid){
        let model = this.allModels[cid];
        EventMediator.emit('twitter-tweet-hover', model.latlng);
      },

      mapClusterSelected: function(cid){

        this.scrollTo = cid;
        this.trigger("change:scrollTo");

        // clusterCids.forEach((cid) => {
        //   let model = this.get(cid);
        //   model.selected = true;
        //   model.set({selected: true});
        // });
      },

    });

    TweetCollection.prototype.set = function(tweets) {

      let newTweets = _.reject(tweets, (tweet) => {
        return this.allModels[tweet.id_str] !== undefined;
      });

      return Backbone.Collection.prototype.set.call(this, newTweets);
    }

	return TweetCollection;
});
