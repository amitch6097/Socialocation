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
        console.log(data);
        return data;
      },

      populateModels: function(data){

      }

      initialize: function(data){
        var data = this.fetch({success: this.populateModels});

        for(var i = 0; i < 5; i++){
          var tweet = new TweetModel({link:'https://twitter.com/ABforPresident/status/1040282272723886080'});
          this.add(tweet);
        }

        return this;
      }

    });

	return TweetCollection;
});
