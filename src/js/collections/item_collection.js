define('ItemCollection',[
	'backbone',
  'EventMediator'
], function (
  Backbone, EventMediator
){

	var ItemCollection = Backbone.Collection.extend({

      setSettings: function(settings){
        this.settings = Object.assign(this.settings, settings);
        if(this.settings.hide === true ||
          this.settings.pause
        ){
          this.forceHide();
        }
      },

			clear: function(){
				this.scrollTo = undefined;
				this.allModels = {};
				this.clusters = [];
				this.each((model) => {
					model.hide();
				});
			},

      forceHide: function(){
        Object.keys(this.allModels).forEach((id) => {
          this.allModels[id].hide();
        });
      },

      updateViews: function(){
        if(this.settings.hide === true ||
          this.settings.pause == true
        ) return;
        Object.keys(this.allModels).forEach((id_str) => {
          this.allModels[id_str].updateView();
        });
      },

      mapBoundsChange: function(data){
        if(this.settings.pause) return;

				let query = data.query;
        this.updateViews();
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
						throw "ERROR FETCHING";
					}
				});
				 setTimeout(() => {this.timeout = false;}, 1000);
			},

      dataLoaded: function(collection, response, options){
        collection.each((model) => {
          this.allModels[model.id_str] = model;
        });

        this.newElements = this.models;

        EventMediator.emit("collection-locations-loaded", {twitter: this.models});

        if(this.settings.hide === true) return;
        this.trigger("change:newElements");
      },

      selectHover: function(id_str){
        let model = this.allModels[id_str];
        EventMediator.emit('item-hover-request', model.get('latlng'));
      },

      mapClusterSelected: function(model){
        if(this.settings.hide === true ||
          this.settings.pause
        ) return;

        this.scrollTo = model;
        this.trigger("change:scrollTo");

        // clusterCids.forEach((cid) => {
        //   let model = this.get(cid);
        //   model.selected = true;
        //   model.set({selected: true});
        // });
      },

    });

    ItemCollection.prototype.set = function(items) {
      if(this.settings.pause === true) return;

      let newItems = _.reject(items, (item) => {
        return this.allModels[item.id_str] !== undefined;
      });
      return Backbone.Collection.prototype.set.call(this, newItems);
    }

	return ItemCollection;
});
