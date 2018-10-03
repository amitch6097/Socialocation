/// <reference path="../../../types/index.d.ts" />


define('ItemCollection',[
	'backbone',
	'underscore',
  'EventMediator',
], function (
  Backbone, _, EventMediator,
){

	// REALLY ALL OF THIS SHOULD HAVE BEEN PUT IN A MODEL
	var ItemCollection = Backbone.Collection.extend({

      setSettings: function(settings: App.Settings): void{
        settings = Object.assign(this.attributeGet('settings'), settings);
				this.attributeSet('settings', settings);

        if(settings.hide === true ||
          settings.pause === true
        ){
          this.forceHide();
        }
      },

			clear: function(): void{
				this.attributeSet({
					scrollTo: undefined,
					allModels: {},
					clusters: [],
				});

				this.each((model: App.ItemModel) => {
					model.hide();
				});
			},

      forceHide: function() : void{
				const allModels: object = this.attributeGet('allModels');
        Object.keys(allModels).forEach((id: string) => {
          allModels[id].hide();
        });
      },

      updateViews: function() : void{
				const settings: App.Settings = this.attributeGet('settings');

        if(settings.hide === true ||
          settings.pause == true
        ) return;

				const allModels: object = this.attributeGet('allModels');
        Object.keys(allModels).forEach((id_str: string) => {
          allModels[id_str].updateView();
        });

      },

      mapBoundsChange: function(query : object): void{
				const settings: App.Settings = this.attributeGet('settings')
        if(settings.pause) return;
        this.updateViews();
        this.fetchData(query);
      },

			fetchData: function(query: object) : void{
				const timeout: boolean = this.attributeGet('timeout');
				if(timeout){
					return;
				}
				this.attributeSet('timeout', true);

				let params: object = this.attributeGet('params');
				params = Object.assign(params, query);
				this.attributeSet('params', params);

				this.fetch({
					data: params,
					processData: true,
					remove: true,
					success: this.dataLoaded.bind(this),
					error: (collection, response) => {
						throw "ERROR FETCHING";
					}
				});
				 setTimeout(() => {this.attributeSet('timeout', false)}, 1000);
			},

      dataLoaded: function(collection: App.ItemCollection) : void{
				const allModels: App.IndexedItemModels = this.attributeGet('allModels');
				const settings: App.Settings = this.attributeGet('settings');

        collection.each((model: App.ItemModel) => {
          allModels[model.id_str] = model;
        });

        EventMediator.emit("collection-locations-loaded", {twitter: this.models});

				const trigger: boolean = settings.hide === true ? false : true;
				this.attributeSet('newElements', this.models, trigger);
      },

      selectHover: function(id_str: string) : void{
				const allModels : App.IndexedItemModels = this.attributeGet('allModels');
        const model: App.ItemModel = allModels[id_str];
        EventMediator.emit('item-hover-request', model.get('latlng'));
      },

      mapClusterSelected: function(model: App.ItemModel) : void{
				const settings: App.Settings = this.attributeGet('settings');

        if(settings.hide === true ||
          settings.pause
        ) return;

				this.attributeSet('scrollTo', model, true);
        // this.trigger("change:scrollTo");

        // clusterCids.forEach((cid) => {
        //   let model = this.get(cid);
        //   model.selected = true;
        //   model.set({selected: true});
        // });
      },
    });

		ItemCollection.prototype.attributeGet = function(attribute: string): any {
			if(!this.attributes)  this.attributes = {};
			return this.attributes[attribute];
		}

		ItemCollection.prototype.attributeSet = function(attribute: object | string, value: void | any, trigger: void | boolean): void {
			if(!this.attributes) this.attributes = {};
			// IF PARAM IS A OBJECT attributeSet({'attr': value})
			if(attribute !== null && typeof attribute === 'object'){
				let attributes: any = attribute;
				Object.keys(attributes).forEach((attr : string) => {
					this.attributes[attr] = attributes[attr];
					// this.trigger(`change:${attr}`);
				});
				return;

			}
			// IF PARAM IS A STRING attributeSet('attr', value)
			if(typeof attribute === 'string'){
				this.attributes[attribute] = value;

				// CHECK IF TRIGGER
				if(
					trigger !== undefined &&
					typeof trigger === typeof true &&
					trigger === true
				){
					this.trigger(`change:${attribute}`);
				}
				return;
			}
		}

    ItemCollection.prototype.set = function(items: App.ItemModel[]) {
			const settings: App.Settings = this.attributeGet('settings');
      if(settings.pause === true) return;

			const allModels: App.IndexedItemModels = this.attributeGet('allModels');
      let newItems: App.ItemModel[] = _.reject(items, (item : App.ItemModel) => {
        return allModels[item.id_str] !== undefined;
      });
      return Backbone.Collection.prototype.set.call(this, newItems);
    }

	return ItemCollection;
});
