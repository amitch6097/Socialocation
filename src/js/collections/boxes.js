define('BoxesCollection',[
	'backbone',
  'BoxModel'
], function (
  Backbone, BoxModel
){

	var BoxesCollection = Backbone.Collection.extend({

      model: BoxModel,

      initialize: function(data){
        for(var i = 0; i < 5; i++){
          var box = new BoxModel();
          this.add(box);
        }
        return this;
      }
    });

	return BoxesCollection;
});
