"use strict";
define('ItemCollection', [
    'backbone',
    'underscore',
    'EventMediator',
], function (Backbone, _, EventMediator) {
    var ItemCollection = Backbone.Collection.extend({
        setSettings: function (settings) {
            settings = Object.assign(this.attributeGet('settings'), settings);
            this.attributeSet('settings', settings);
            if (settings.hide === true ||
                settings.pause === true) {
                this.forceHide();
            }
        },
        clear: function () {
            this.attributeSet({
                scrollTo: undefined,
                allModels: {},
                clusters: [],
            });
            this.each((model) => {
                model.hide();
            });
        },
        forceHide: function () {
            const allModels = this.attributeGet('allModels');
            Object.keys(allModels).forEach((id) => {
                allModels[id].hide();
            });
        },
        updateViews: function () {
            const settings = this.attributeGet('settings');
            if (settings.hide === true ||
                settings.pause == true)
                return;
            const allModels = this.attributeGet('allModels');
            Object.keys(allModels).forEach((id_str) => {
                allModels[id_str].updateView();
            });
        },
        mapBoundsChange: function (query) {
            const settings = this.attributeGet('settings');
            if (settings.pause)
                return;
            this.updateViews();
            this.fetchData(query);
        },
        fetchData: function (query) {
            const timeout = this.attributeGet('timeout');
            if (timeout) {
                return;
            }
            this.attributeSet('timeout', true);
            let params = this.attributeGet('params');
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
            setTimeout(() => { this.attributeSet('timeout', false); }, 1000);
        },
        dataLoaded: function (collection) {
            const allModels = this.attributeGet('allModels');
            const settings = this.attributeGet('settings');
            collection.each((model) => {
                allModels[model.id_str] = model;
            });
            EventMediator.emit("collection-locations-loaded", { twitter: this.models });
            const trigger = settings.hide === true ? false : true;
            this.attributeSet('newElements', this.models, trigger);
        },
        selectHover: function (id_str) {
            const allModels = this.attributeGet('allModels');
            const model = allModels[id_str];
            EventMediator.emit('item-hover-request', model.get('latlng'));
        },
        mapClusterSelected: function (model) {
            const settings = this.attributeGet('settings');
            if (settings.hide === true ||
                settings.pause)
                return;
            this.attributeSet('scrollTo', model, true);
        },
    });
    ItemCollection.prototype.attributeGet = function (attribute) {
        if (!this.attributes)
            this.attributes = {};
        return this.attributes[attribute];
    };
    ItemCollection.prototype.attributeSet = function (attribute, value, trigger) {
        if (!this.attributes)
            this.attributes = {};
        if (attribute !== null && typeof attribute === 'object') {
            let attributes = attribute;
            Object.keys(attributes).forEach((attr) => {
                this.attributes[attr] = attributes[attr];
            });
            return;
        }
        if (typeof attribute === 'string') {
            this.attributes[attribute] = value;
            if (trigger !== undefined &&
                typeof trigger === typeof true &&
                trigger === true) {
                this.trigger(`change:${attribute}`);
            }
            return;
        }
    };
    ItemCollection.prototype.set = function (items) {
        const settings = this.attributeGet('settings');
        if (settings.pause === true)
            return;
        const allModels = this.attributeGet('allModels');
        let newItems = _.reject(items, (item) => {
            return allModels[item.id_str] !== undefined;
        });
        return Backbone.Collection.prototype.set.call(this, newItems);
    };
    return ItemCollection;
});
//# sourceMappingURL=item_collection.js.map