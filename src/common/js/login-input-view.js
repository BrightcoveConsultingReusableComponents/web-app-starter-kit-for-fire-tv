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

        this.canLogout = false;
        
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
              self.canLogout = true;
            } else{
              self.setLoginCover('token', data);
              self.canLogout = false;
            }
        });

       }

       this.renew = function(){
        console.log('renew');
       }

       this.confirmLogin = function() {

        if(!this.canLogout){
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
                self.canLogout = true;
              }
          });
        } else {
          if (confirm("Are you sure you want to logout?")) {
                var self = this;
                var submit = $.ajax({
                  url: this.loginUrl + '/logout', 
                  type: 'GET', 
                  contentType: 'application/json', 
                  error: function(error) {
                    console.log("Error - AJAX");
                  }
                });
                  submit.success(function (data) {
                  var success = data;
                  console.log(data);
                  if(data[0] == '#'){
                    self.setLoginCover('logout', data.substring(1));
                    self.canLogout = false;
                  } 
              });
          }
          buttons.resync();
        }

       }

       this.setLoginCover = function(flag, content) {
        $('.right-nav').show();
        $('#right-nav-cover-details').hide();
        $('#right-nav-cover-icon').hide();
        this.changeToLoginCover();
        if(flag === 'user'){
          $('#right-nav-cover-title').text('Welcome, '+content+'.');
          $('#right-nav-cover-desc').text("You're now logged in!"+"\n"+"Click again to logout.");
        } else if (flag === 'token'){
          $('#right-nav-cover-title').text(content);
          $('#right-nav-cover-desc').text('Sign in on www.bcov.com/intern and enter the token above. Select "Sign In" again to confirm you are logged in.');
        } else if (flag === 'logout'){
          $('#right-nav-cover-title').text(content);
          $('#right-nav-cover-desc').text('Sign in on www.bcov.com/intern and enter the token above. Select "Sign In" again to confirm you are logged in.');
        } else {
          $('#right-nav-cover-title').text('Error');
          $('#right-nav-cover-desc').text("Sign in is currently not available.");
        }
       }

       this.unsetLoginCover = function(){
        this.backToNormalCover();
        $('#right-nav-cover-details').show();
        $('#right-nav-cover-icon').show();
        $('#right-nav-cover-title').text('');
        $('#right-nav-cover-desc').text('');
        $('.right-nav').hide();
       }

       this.changeToLoginCover = function() {
        $('#right-nav-cover-image').css('background-image', this.userIcon);
        $('#right-nav-cover-image').css('-webkit-box-shadow', 'none');
        $('#right-nav-cover-title').css('margin-left', '100px');
        $('#right-nav-cover-desc').css('margin-left', '100px');
        $('#right-nav-cover-image').css('width', '600px');
        $('#right-nav-cover-image').css('height', '400px');
       }

       this.backToNormalCover = function() {
        $('#right-nav-cover-image').css('-webkit-box-shadow', '0px 0px 10px 10px rgba(223,115,183, 0.5)');
        $('#right-nav-cover-title').css('margin-left', '0px');
        $('#right-nav-cover-desc').css('margin-left', '0px');
        $('#right-nav-cover-image').css('width', '750px');
        $('#right-nav-cover-image').css('height', '450px');
       }

    }

    exports.LoginInputView = LoginInputView;
}(window));