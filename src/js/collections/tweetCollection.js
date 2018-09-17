define('TweetCollection',[
	'backbone',
  'TweetModel'
], function (
  Backbone, TweetModel
){

	var TweetCollection = Backbone.Collection.extend({

      model: TweetModel,
      url: '/api/tweets',

      parse: function(data) {
        return data;
      },

      fetchData(query){
        this.fetch({
          data: query,
          processData: true,
          remove: true,
          success: (collection, response) => {this.trigger("change");},
          error: (collection, response) => {console.log(response);}
        });
      },

      initialize: function(data){
        this.fetchData({geocode: "42.9634,-85.6681,1mi"})
        return this;
      }

    });

	return TweetCollection;
});
