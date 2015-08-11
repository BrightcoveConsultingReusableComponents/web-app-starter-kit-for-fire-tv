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
        this.loginIcon = null;
        this.userIcon = null;
        this.loginUrl = null;
        
        this.render = function ($parent) {
            var html = utils.buildTemplate($("#login-input-template"), {});
            $parent.html(html);
            this.$el = $parent.children().eq(0);
            this.loginIcon = 'url(assets/login_icon.png)';
            this.userIcon = 'url(assets/user_icon.png)';
            this.loginUrl = 'http://10.1.49.8:2222/login';            
        };

       this.select = function () {
            $('#login-input').css('background-image', this.loginIcon);
            this.getToken();
       }.bind(this);

       this.deselect = function () {
            this.unsetLoginCover();
       }.bind(this);

       this.getToken = function() {

        var self = this;
        var submit = $.ajax({
            url: this.loginUrl, 
            type: 'GET', 
            contentType: 'application/json', 
          error: function(error) {
            console.log("Error - AJAX");
          }
        });
          submit.success(function (data) {
            var success = data;
            if(data[0] == '#'){
              self.setLoginCover('user', data.substring(1));
            } else{
              self.setLoginCover('token', data);
            }
        });

       }

       this.renew = function(){
        console.log('renew');
       }

       this.confirmLogin = function() {

        var self = this;
        var submit = $.ajax({
            url: this.loginUrl + '/check', 
            type: 'GET', 
            contentType: 'application/json', 
          error: function(error) {
            console.log("Error - AJAX");
          }
        });
          submit.success(function (data) {
            var success = data;
            if(data[0] == '#'){
              self.setLoginCover('user', data.substring(1));
            } 
        });

       }

       this.setLoginCover = function(flag, content) {
        $('.right-nav').show();
        $('#right-nav-cover-details').hide();
        $('#right-nav-cover-icon').hide();
        $('#right-nav-cover-image').css('background-image', this.userIcon);
        if(flag === 'user'){
          $('#right-nav-cover-title').text("You're logged in!");
          $('#right-nav-cover-desc').text('Welcome '+content+'.');
        } else if (flag === 'token'){
          $('#right-nav-cover-title').text(content);
          $('#right-nav-cover-desc').text('Sign in on www.bcov.com/intern and enter the token above. Select "Sign In" again to confirm you are logged in.');
        } else {
          $('#right-nav-cover-title').text('Error');
          $('#right-nav-cover-desc').text("Sign in is currently not available.");
        }
       }

       this.unsetLoginCover = function(){
        $('#right-nav-cover-details').show();
        $('#right-nav-cover-icon').show();
        $('#right-nav-cover-title').text('');
        $('#right-nav-cover-desc').text('');
        $('.right-nav').hide();
       }

    }

    exports.LoginInputView = LoginInputView;
}(window));