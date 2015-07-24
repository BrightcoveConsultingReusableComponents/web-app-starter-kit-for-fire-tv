(function(exports) {
    'use strict';
    
    //initialize the app
    var settings = {
        Model: BrightcoveAPIModel,
        PlayerView: BrightcovePlayerView,
        PlaylistView: PlaylistPlayerView,
        dataURL: "https://api.brightcove.com/services/library",
        numberOfCategories: 30,
        developerToken: "6gVxMdyXfHwO2-c0Oe4_zt4ZZN0DK1tUHueUuTA6okLxHnxNGn354w..",
        accountID: "3986618082001",
        playerID: "115d0726-53ff-4cd9-8a5d-c68ea10d3ea2",
        showSearch: true,
        displayButtons: false
    };

    /*
    -FqR1GflweyUTwuFeGR94fLc_tSL4ajzdIWBr8UvwZSiJzvXGyI_dw..

    4368278020001

    68c11549-de3c-41e9-b3bb-dfdb1bcdac97
    */
    
    /*
    developerToken: "6gVxMdyXfHwO2-c0Oe4_zt4ZZN0DK1tUHueUuTA6okLxHnxNGn354w..",
    accountID: "3986618082001",
    playerID: "115d0726-53ff-4cd9-8a5d-c68ea10d3ea2",
    */
    
    /*
    read token: nilXNoAjFzq9GscHT697cGUT79EnCHYM_OdZZ3mL68CLbuQoFXMWlQ..
    account id: 2779557264001
    player id: 2782693289001
    */

    /*read token - eLYrpMHIuFO3KwHt8WIZpxbBLa7PzbFcY2X5DKEgs0voZL_hzZaXdQ..
    pub id - 2031051552001
    player id - 24012810-6fd7-4c3c-ba39-c25476c8b986
     */

    var app = new App(settings);
    exports.app = app;
}(window));
