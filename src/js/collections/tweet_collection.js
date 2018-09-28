define('TweetCollection',[
	'backbone',
  'ItemModelTweet',
  'ItemCollection',
	'EventMediator'
], function (
  Backbone, ItemModelTweet, ItemCollection, EventMediator
){
  var LAT_LNG_TO_MILES = function(miles){return miles*69;}

	var TweetCollection = ItemCollection.extend({

      model: ItemModelTweet,
      url: '/api/tweets',

      parse:function(data){
        return data;
      },

      boundsQueryToString(bounds){
        return `${bounds.center.lat},${bounds.center.lng},${LAT_LNG_TO_MILES(bounds.dist)}mi`;
      },

      initialize: function(models, options){
        this.bounds = options.bounds;
        this.params = {geocode: this.boundsQueryToString(this.bounds)}
        this.timeout = false;
        this.scrollTo = undefined;
        this.clusters = [];
        this.allModels = {};
        this.settings = {hide: false, pause: false};

        EventMediator.listen('map-bounds-changed', this.mapBoundsChange, this);
        EventMediator.listen('map-cluster-selected', this.mapClusterSelected, this);

        this.fetchData(this.params);
        return this;
      },

			mapBoundsChange: function(data){
				this.bounds = data.bounds;
        this.clusters = data.clusters;
				data.query = {geocode: this.boundsQueryToString(data.bounds)};
        if(data.query.geocode === this.params.geocode) return;
				ItemCollection.prototype.mapBoundsChange.apply(this, [data])
			},

      clear: function(){
				ItemCollection.prototype.clear.apply(this)
        EventMediator.emit('twitter-clear', null);
      },

      setSearchValue: function(searchValue){
        this.params = Object.assign(this.params, {q:searchValue});
      },

			showIds: function(ids){
				ids.forEach((id) => {
					this.allModels[id].show();
				});
			},

    });

	return TweetCollection;
});
