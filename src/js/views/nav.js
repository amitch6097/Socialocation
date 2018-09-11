define(['backbone',
  'NavView'
  ],
  function(
    Backbone
  ){

    var NavView = Backbone.View.extend({

      initialize: function(data) {
        console.log("ADD SOMETHING")
        this.$el.html(
          `<ul>
              <li id="nav-home" data-url="home">Home</li>
              <li id="nav-new" data-url="new">New</li>
          </ul>`
      );
        this.router = data.router;
        return this;
      },

      events: {
        "click": "onClick"
      },

      onClick: function(e){
          var $li = $(e.target);
          var router = this.router;
          router.navigate($li.attr("data-url"), { trigger: true });
      }

    });

    return NavView;
});
