/// <reference path="../../../types/index.d.ts" />

define('InstagramView',[
  'backbone',
  'tpl!views/templates/instagram_view.tpl',
  ],
  function(
    Backbone, InstagramViewTemplate
  ){

    var InstagramView = Backbone.View.extend({

      initialize: function(data: any):void {
        this.model = data.model;
        this.el = data.el;
        this.template = InstagramViewTemplate;
        let link: string = this.model.getLink();

        this.html = this.template({
          link: link,
          id_str: this.model.id_str
        });
      },

      render: function():void {
        $(this.el).append(this.html);
      },

    });

    return InstagramView;
});
