/* Log In View
 *
 * Login Widget for a row view container like the left nav view. 
 * 
 */
(function (exports) {
    "use strict";


   /**
    * @class LoginInputView
    * @description The login row in the left nav view. 
    */
    function LoginInputView() {
        // mixin inheritance, initialize this as an event handler for these events:
        Events.call(this);
        this.$el = null;
        this.loginIconUrl = null;
        
        this.render = function ($parent) {
            var html = utils.buildTemplate($("#login-input-template"), {});
            $parent.html(html);
            this.$el = $parent.children().eq(0);
            this.loginIconUrl = 'url(assets/login_icon.png)';
            
        };

       this.select = function () {
            $('#login-input').css('background-image', this.loginIconUrl);
            this.setLoginCover();
       }.bind(this);

       this.deselect = function () {
            this.unsetLoginCover();
       }.bind(this);

       this.getToken = function() {
        //ajax call

        var urlString = 'http://10.1.49.8:2222/login';
        
        var submit = $.ajax({
            url: urlString, 
            type: 'GET', 
            contentType: 'application/json', 
          error: function(error) {
            console.log("Error - AJAX");
          }
        });
          submit.success(function (data) {
            var success = data;
            console.log(success);
        });

       }

       this.renew = function(){
        console.log('renew');
       }

       this.isTokenValid = function(){
        return false;
       }

       this.setLoginCover = function() {

        /*$('.right-nav').show();
        $('#right-nav-cover-details').hide();
        $('#right-nav-cover-desc').hide();
        $('#right-nav-cover-icon').hide();
        $('#right-nav-cover-title').text('');
        $('#right-nav-cover-image').css('background-image', this.loginIconUrl);
        $('#right-nav-cover-image').width('100px');
        $('#right-nav-cover-image').height('100px');
        $('#right-nav-cover-image').css('border-radius', '50%');
        $('#right-nav-cover-title').text('Selectx to get a token');*/
       }

       this.unsetLoginCover = function(){
        //dsa
        /*
        $('#right-nav-cover-details').show();
        $('#right-nav-cover-desc').show();
        $('#right-nav-cover-icon').show();
        */
        $('.right-nav').hide();
       }

    }

    exports.LoginInputView = LoginInputView;
}(window));