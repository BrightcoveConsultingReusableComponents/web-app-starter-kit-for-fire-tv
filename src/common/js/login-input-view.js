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
        
        this.render = function ($parent) {
            var html = utils.buildTemplate($("#login-input-template"), {});
            $parent.html(html);
            this.$el = $parent.children().eq(0);
        };

       this.select = function () {
            $('#login-input').css('background-image', 'url(assets/login_icon.png)');
            $('.right-nav').hide();
       }.bind(this);

       this.deselect = function () {
            $('.right-nav').hide();
       }.bind(this);
    }

    exports.LoginInputView = LoginInputView;
}(window));