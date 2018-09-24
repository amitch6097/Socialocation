define('TweetCollection',[
	'backbone',
  'TweetModel',
  'EventMediator'
], function (
  Backbone, TweetModel, EventMediator
){
  var LAT_LNG_TO_MILES = function(miles){return miles*69;}

	var TweetCollection = Backbone.Collection.extend({

      model: TweetModel,
      url: '/api/tweets',

      parse:function(data){
        return data;
      },

      boundsQueryToString(bounds){
        console.log(bounds);

        return `${bounds.center.lat},${bounds.center.lng},${LAT_LNG_TO_MILES(bounds.dist)}mi`;
      },

      initialize: function(models, options){
        this.timeout = false;
        this.scrollTo = undefined;

        this.mapLocations = {};
        this.visibleElements = [];
        this.allModels = {};

        this.bounds = options.bounds;
        console.log(this.bounds);
        console.log(this.boundsQueryToString(this.bounds));

        this.params = {geocode: this.boundsQueryToString(this.bounds)}
        console.log(this.params);

        EventMediator.listen('map-bounds-changed', this.mapBoundsChange, this);
        EventMediator.listen('map-cluster-selected', this.mapClusterSelected, this);

        this.fetchData(this.params);
        return this;
      },

      clear: function(){
        this.scrollTo;
        this.visibleElements = [];
        this.mapLocations = {};
        this.allModels = {};
        this.reset();
        EventMediator.emit('tweets-clear', null);
      },

      tweetSearch: function(searchValue){
        this.clear();
        this.fetchData({q:searchValue});
      },

      mapBoundsChange: function(data){
        this.bounds = data.bounds;
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
