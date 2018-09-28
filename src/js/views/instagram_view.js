define('InstagramView',[
  'backbone',
  'tpl!views/templates/instagram_view.tpl',
  ],
  function(
    Backbone, InstagramViewTemplate
  ){

    var InstagramView = Backbone.View.extend({

      initialize: function(data) {
        this.model = data.model;
        this.el = data.el;
        this.width = data.width === undefined ? 300 : data.width;

        this.template = InstagramViewTemplate;
        let link = this.model.getLink();
        this.html = this.template({
          link: link,
          id_str: this.model.id_str
        });
      },

      render: function() {
        $(this.el).append(this.html);
        return this;
      },

    });

    return InstagramView;
});
