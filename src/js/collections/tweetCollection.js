define('TweetCollection',[
	'backbone',
  'TweetModel'
], function (
  Backbone, TweetModel
){

	var TweetCollection = Backbone.Collection.extend({

      model: TweetModel,

      initialize: function(data){

        for(var i = 0; i < 5; i++){
          var tweet = new TweetModel({link:'https://twitter.com/ABforPresident/status/1040282272723886080'});
          this.add(tweet);
        }

        return this;
      }

    });

	return TweetCollection;
});
