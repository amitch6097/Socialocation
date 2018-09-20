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

      parse: function(data) {
        return data;
      },

			dataLoaded: function(collection, response){
				collection.forEach((model)=> {
					collection.mapLocations = Object.assign(collection.mapLocations, model.getLatLng());
				});

				EventMediator.emit("locations-loaded", {twitter: this.mapLocations});
				this.trigger("change");
			},

      selectActiveTweet: function(cid){
				let model = this.get(cid);
				EventMediator.emit('tweet-clicked', model.latlng);
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

      moveTweets: function(cids){
        this.each((model) => {
          model.set({selected: false}, {trigger: false});
        });

        cids.forEach((cid) => {
          let model = this.get(cid);
          model.selected = true;
          model.set({selected: true});
        });
      },

      initialize: function(data){
        this.timeout = false;
				this.mapLocations = {};
        EventMediator.listen('bounds-changed', this.fetchData, this);
        EventMediator.listen('map-cluster-selected', this.moveTweets, this);

        this.params = {geocode: "42.9634,-85.6681,1mi"}
        this.fetchData(this.params);
        return this;
      }

    });

    // ANDREW NOT SURE IF THIS WORKS
    TweetCollection.prototype.add = function(tweet) {
      // Using isDupe routine from @Bill Eisenhauer's answer
      var isDupe = this.any(function(_tweet) {
          return _tweet.get('id_str') === tweet.get('id_str');
      });

      // Up to you either return false or throw an exception or silently ignore
      // NOTE: DEFAULT functionality of adding duplicate to collection is to IGNORE and RETURN. Returning false here is unexpected. ALSO, this doesn't support the merge: true flag.
      // Return result of prototype.add to ensure default functionality of .add is maintained.
      return isDupe ? false : Backbone.Collection.prototype.add.call(this, tweet);
    }

	return TweetCollection;
});
