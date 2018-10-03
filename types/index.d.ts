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

  interface IndexedItemModels {
    [id_str: string]:ItemModel
  }


  class Model extends Backbone.Model{
  }

  class ItemModel extends Backbone.Model {
    show(): void;
    hide(): void;
    changeVisible(value: boolean): void;
    updateView(): void;
    getLink(): string;
  }

  class ItemModelInstagram extends ItemModel {
    initialize(data: any): void
    getLink(): string;
  }

  class ItemModelTweet extends ItemModel {
    initialize(data: any): void
    getLink(): string;
  }

  class MapModel extends Backbone.Model {
    initialize(data: any): void;
    updateLocationMarker(latlng: App.LatLng) :void;
    clear(): void;
    clearCurrentLocationMarker(): void;
    addLocations(locations: App.Locations):void;
    updateSelectedCluster(cluster: any);
    updateBounds() : void;
  }

  class MarkerModel {
    constructor(mode: App.ItemModel);
    model: App.ItemModel;
  }

  class PopupModel extends Backbone.Model {
    populate(cluster: App.MarkerClusterer): void;
    next():void;
    previous():void;
    fromLatLngToPoint(latLng: google.maps.LatLng, map: google.maps.Map): google.maps.Point;
  }

  class Router extends Backbone.Router {
    initialize(options: any):void;
    start(): void;
    updateURL(data: App.Params):void;
    location(lat:string, lng:string, dist:string):void;

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

  class InstagramCollection extends ItemCollection {
    initialize(models: App.ItemModel[], options: any) : void;
    mapBoundsChange(data: App.Params) : void;
    clear(): void;
  }

  class TweetCollection extends ItemCollection {
    boundsQueryToString(bounds: App.Bounds): string;
    initialize(models: App.ItemModel[], options: any) : void;
    mapBoundsChange(data: App.Params) : void;
    clear(): void;
    setSearchValue(searchValue: string);
    showIds(ids: string[]);
  }

  class GeolocationModel extends Backbone.Model {
    parseUserInput(input: string): void;
    parseLatLngLocation(splitInput: string[]): void;
    fetchData(query: string): void;
    geocodeDataLoad(results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus): void;
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



}
