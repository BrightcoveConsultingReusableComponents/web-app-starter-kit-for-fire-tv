/* Search Input View
 *
 * Search Widget for a row view container like the left nav view. 
 * 
 */
(function (exports) {
    "use strict";


   /**
    * @class SearchInputView
    * @description The search row in the left nav view. 
    */
    function SearchInputView() {
        // mixin inheritance, initialize this as an event handler for these events:
        Events.call(this, ['searchQueryEntered']);
        this.currentSearchQuery = null;
        this.$el = null;
        
        this.render = function ($parent) {
            var html = utils.buildTemplate($("#search-input-template"), {});
  
            $parent.html(html);

            this.$el = $parent.children().eq(0);
            this.$el.on("change", this.searchQueryEntered);
            this.$el.on("keyup", this.enterButtonPressed);
            this.$el.on("keyup", this.changeToSearchView);
        };

        this.enterButtonPressed = function(e){
          if(e.keyCode == 13){
            this.currentSearchQuery = e.target.value;
            this.trigger("searchQueryEntered");
            console.log($('#search-input').html());
          }
        }.bind(this);

        this.searchQueryEntered = function(e) {
            this.currentSearchQuery = e.target.value;
            this.trigger("searchQueryEntered");
       }.bind(this);

       this.changeToSearchView = function(e) {
            //change for search view
            if(e.target.value){
              $('#left-nav').css('width', '120%');
              $('#left-nav').css('height', '22%');
              $('#left-nav').css('top', '-150px');
              $('#app-header-bar').hide();
              $('#left-nav').css('width', '120%');
              $('#left-nav').css('height', '22%');
              $('#left-nav').css('top', '-150px');
              $('#app-header-bar').hide();
            }
       }.bind(this);

       this.changeToNormalView = function() {
            //normal position of search
            $('#app-header-bar').show();
            $('#left-nav').css('width', '840px');
            $('#left-nav').css('height', '1080px');
            $('#left-nav').css('top', 0);
            $('.right-nav').show();
            $('#search-input').css('background-color', 'rgba(232, 232, 232, 0.0980392)');
       }

       this.select = function () {
            $('#search-input').css('background-image', 'url(assets/search.png)');
            $('#search-input').css('background-color', 'rgba(223, 115, 183, 0.6)');
            $('.right-nav').hide();
            this.$el.focus();
       }.bind(this);

       this.reset = function () {
            this.currentSearchQuery = null;
            this.$el.val("");
       }.bind(this);

       this.deselect = function () {
            this.changeToNormalView();
            this.$el.blur();
       }.bind(this);
    }

    exports.SearchInputView = SearchInputView;
}(window));
