/// <reference types="backbone" path="../node_modules/@types/backbone/index.d.ts" />
/// <reference types="googlemaps" path="../node_modules/@types/googlemaps/index.d.ts" />

export = App;
export as namespace App;
declare var Backbone;

declare namespace App {

  interface LatLng{
    lat: number,
    lng : number
  }

  interface InstargramFetchParams extends LatLng{}

  interface Bounds {
    center: LatLng,
    dist: number
  }

  interface Params {
    bounds: Bounds,
    clusters: any
  }


  interface Settings {
    hide: boolean,
    pause: boolean,
  }

  interface MarkerParams {
    position: LatLng,
    label: string,
    map: any
  }
  class Model extends Backbone.Model{
  }

  class ItemModel extends Backbone.Model {
    show(): void;
    hide(): void;
    changeVisible(value: boolean): void;
    getLink(): string;
  }

  class ItemCollection extends Backbone.Collection {
    setSettings(settings: App.Settings): void;
  	clear() : void;
    forceHide() : void;
    updateViews() : void
    mapBoundsChange(query : object): void;
  	fetchData(query: object): void;
    dataLoaded(collection, response, options): void;
    selectHover(id_str: string): void;
    mapClusterSelected(model: object):void;
    attributeGet(attribute: string) : any;
    attributeSet(attribute: object | string, value: void | any, trigger: void | boolean): void;
  }

  interface IndexedItemModels {
    [id_str: string]:ItemModel
  }

  class Marker extends google.maps.Marker {
    constructor(model: ItemModel)
    model: ItemModel;
  }

  class Cluster {
    markers_:Marker[];
  }

  class MarkerClusterer {
    markers_: Marker[];
    getCenter():google.maps.LatLng;
    getMap():google.maps.Map;
    getMarkers():Marker[];
  }

  interface Locations {
    // subscriber ie. "twitter" or "instagram"
    [subscriber: string]:ItemModel
  }

  interface Event {
    listen: string,
    context: any,
    callback: any
  }

  interface PanelAnimation {
    begin: string,
    end: string,
  }


}
