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
        this.webkitColor = null;
        
        this.render = function ($parent) {
            var html = utils.buildTemplate($("#login-input-template"), {});
            $parent.html(html);
            this.$el = $parent.children().eq(0);
            this.loginIcon = 'url(assets/login_icon.png)';
            this.userIcon = 'url(assets/user_icon.png)';
            this.loginUrl = 'http://10.1.49.8:2222/login';

            //right view text
            this.rightViewImage = $('#right-view-cover-image')[0];
            this.rightViewTitle = $('#right-view-cover-title')[0];
            this.rightViewDesc = $('#right-view-cover-desc')[0];
            this.rightViewIcon = $('#right-view-cover-icon')[0];
            this.rightViewDetails = $('#right-view-cover-details')[0];

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

       };

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
        //show/hide
        $('.right-view').show();
        $('#right-view-cover-details').hide();
        $('#right-view-cover-icon').hide();

        //apply the style changes
        this.changeToLoginCover();

        //set messages
        if(flag === 'user'){
          this.rightViewTitle.innerHTML = 'Welcome, '+content+'.';
          this.rightViewDesc.innerHTML = "You're now logged in!"+"\n"+"Click again to logout.";
        } else if (flag === 'token'){
          this.rightViewTitle.innerHTML = content;
          this.rightViewDesc.innerHTML ='Sign in on www.bcov.com/intern and enter the token above. Select "Sign In" again to confirm you are logged in.';
        } else if (flag === 'logout'){
          this.rightViewTitle.innerHTML = content;
          this.rightViewDesc.innerHTML = 'Sign in on www.bcov.com/intern and enter the token above. Select "Sign In" again to confirm you are logged in.';
        } else {
          this.rightViewTitle.innerHTML = 'Error';
          this.rightViewDesc.innerHTML = 'Sign in is currently not available.';
        }
       }

       this.unsetLoginCover = function(){
        //show/hide
        $('.right-view').hide();
        $('#right-view-cover-details').show();
        $('#right-view-cover-icon').show();
        
        //back to normal cover
        this.rightViewTitle.innerHTML = '';
        this.rightViewDesc.innerHTML = '';
        this.backToNormalCover();
       }

       this.changeToLoginCover = function() {
        //right view image
        this.webkitColor = this.rightViewImage.style.webkitBoxShadow;
        this.rightViewImage.style.backgroundImage = this.userIcon;
        this.rightViewImage.style.webkitBoxShadow = 'none';
        this.rightViewImage.style.marginLeft = '-150px';
        this.rightViewImage.style.width = '600px';
        this.rightViewImage.style.height = '400px';
        //right view title and description
        this.rightViewTitle.style.marginLeft = '-40px';
        this.rightViewDesc.style.marginLeft = '-40px';
       }

       this.backToNormalCover = function() {
        //right view image
        this.rightViewImage.style.backgroundImage = 'none';
        this.rightViewImage.style.webkitBoxShadow = this.webkitColor;
        this.rightViewImage.style.marginLeft = '0px';
        this.rightViewImage.style.width = '750px';
        this.rightViewImage.style.height = '450px';
        //right view title and description
        this.rightViewTitle.style.marginLeft = '0px';
        this.rightViewDesc.style.marginLeft = '0px';
       }

    }

    exports.LoginInputView = LoginInputView;
}(window));