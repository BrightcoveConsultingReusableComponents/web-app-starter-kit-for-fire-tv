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
        this.isOnSearchMode = false;
        this.searchFromShoveler = false;
        
        this.render = function ($parent) {
            var html = utils.buildTemplate($("#search-input-template"), {});
            this.parent = $parent;
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
          }
        }.bind(this);

        this.searchQueryEntered = function(e) {
            this.currentSearchQuery = e.target.value;
            this.trigger("searchQueryEntered");
       }.bind(this);

       this.changeToSearchView = function(e) {
            //change for search view
            if(!e || e.target.value){
              this.isOnSearchMode = true;
              $('#left-nav').css('width', '140%');
              $('#left-nav').css('height', '22%');
              $('#left-nav').css('top', '-150px');
              $('.leftnav-menu-scrolling-list').css('padding-top', '0px');
              $('#app-header-bar').hide();
            }
       }.bind(this);

       this.changeToNormalView = function() {
            this.isOnSearchMode = false;
            //normal position of search
            $('#app-header-bar').show();
            $('#left-nav').css('width', '840px');
            $('#left-nav').css('height', '1080px');
            $('#left-nav').css('top', 0);
            $('.leftnav-menu-scrolling-list').css('padding-top', '70px');
       }

       this.select = function () {
            $('#search-input').css('background-image', 'url(assets/search_icon.png)');
            $('.right-nav').hide();
            this.$el.focus();
       }.bind(this);

       this.reset = function () {
            this.currentSearchQuery = null;
            this.$el.val("");
       }.bind(this);

       this.deselect = function (index) {
            if(index){
              if(index>1){
                $('.right-nav').show();
                $('#one-d-no-items').hide();
              }
            }
            if(this.searchFromShoveler){
              this.searchFromShoveler = false;
            }
            this.changeToNormalView();
            this.$el.val("");
            this.$el.blur();
       }.bind(this);
    }

    exports.SearchInputView = SearchInputView;
}(window));
