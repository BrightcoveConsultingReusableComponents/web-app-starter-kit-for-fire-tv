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

            this.searchIcon = 'url(assets/search_icon.png)';
            this.leftNav = $('#left-nav')[0];
            this.loginBox = $('.leftnav-login-box')[0];
            this.scrollingList = $('.leftnav-menu-scrolling-list')[0];
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
              $('#app-header-bar').hide();

              this.leftNav.style.width = '110%';
              this.leftNav.style.height = '22%';
              this.leftNav.style.top = '-75px';
              this.leftNav.style.left = '120px';
              this.loginBox.style.visibility = 'hidden';
              this.scrollingList.style.paddingTop = '0px';
            }
       }.bind(this);

       this.changeToNormalView = function() {
            this.isOnSearchMode = false;
            //normal position of search
            $('#app-header-bar').show();
            
            this.leftNav.style.width = '840px';
            this.leftNav.style.height = '1080px';
            this.leftNav.style.top = '0';
            this.leftNav.style.left = '0';
            this.loginBox.style.visibility = 'visible';
            this.scrollingList.style.paddingTop = '70px';
       }

       this.select = function () {
            $('#search-input').css('background-image', 'url(assets/search_icon.png)');
            $('.right-view').hide();
            this.$el.focus();
       }.bind(this);

       this.reset = function () {
            this.currentSearchQuery = null;
            this.$el.val("");
       }.bind(this);

       this.deselect = function (index) {
            if(index){
              if(index>1){
                $('.right-view').show();
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
