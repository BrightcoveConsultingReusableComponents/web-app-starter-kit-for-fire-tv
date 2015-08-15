/* Controls View
 *
 * Handles the custom video controls which overlay the video
 *
 */

(function (exports) {
    "use strict";

    /**
     * @class ContolsView
     * @description The custom controls object, this handles everything about the custom controls.
     */
    function ControlsView() {
        // mixin inheritance, initialize this as an event handler for these events:
        Events.call(this, ['loadingComplete']);

        //jquery constants
        this.$el = null;
        this.$currSeekTime = null;
        this.$containerControls = null;
        this.$rewindIndicator = null;
        this.$forwardIndicator = null;
        this.$forwardIndicatorText = null;
        this.$rewindIndicatorText = null;

        //class variables
        this.rewindIndicator = null;
        this.forwardIndicator = null;
        this.playerView = null;
        this.containerControls = null;
        this.seekHead = null;
        this.totalDurationFound = null;
        this.pauseTimeout = null;
        this.removalTimeout = null;
        this.indicatorTimeout = null;
        this.previousTime = null;
        this.continuousSeek = false;

        //play/pause icon
        this.playPauseButton = null;
        this.playingIcon = null;
        this.pausedIcon = null;

        this.MAX_SKIP_TIME = 30;
        this.SKIP_INDICATOR_OFFSET = 5;
        this.PAUSE_REMOVAL_TIME = 1500;
        this.CONTROLS_HIDE_TIME = 3000;


        this.controlsHideTime = app.settingsParams.controlsHideTime || this.CONTROLS_HIDE_TIME;

       /**
        * @function remove
        * @description remove the controls element from the app
        */
        this.remove = function () {
            this.$containerControls.remove();
            clearTimeout(this.removalTimeout);
        };

       /**
        * @function hide
        * @description hide controls element
        */
        this.hide = function () {
            // using opacity here instead of .show()/.hide() because we have a transition effect that can't be done with
            // display none.
            this.containerControls.style.opacity = "0";
        };

       /**
        * @function show
        * @description show controls element
        */
        this.show = function () {
            // using opacity here instead of .show()/.hide() because we have a transition effect that can't be done with
            // display none.
            this.containerControls.style.opacity = "0.99";
        };

       /**
        * @function hideTitleAndDescription 
        * @description hide title and description from Control View
        **/
        this.hideTitleAndDescription = function () {
            this.$container.find(".player-controls-content-title").hide();
            this.$container.find(".player-controls-content-subtitle").hide();
        };

       /**
        * @function showTitleAndDescription
        * @description show title and description from Control View
        **/
        this.showTitleAndDescription = function () {
            this.$container.find(".player-controls-content-title").show();
            this.$container.find(".player-controls-content-subtitle").show();
        };

       /**
        * @function controlsShowing
        * @description check if controls are currently showing
        */
        this.controlsShowing = function () {
            return (this.containerControls.style.opacity !== "0");
        };


        /**
         * @function updateTitleAndDescription
         * @description update the title and description 
         * @param {string} set the new title
         * @param {string} set the new description
         */
        this.updateTitleAndDescription = function(title, pubDate) {
            this.$container.find(".player-controls-content-title").text(title);
            this.$container.find(".player-controls-content-subtitle").text(this.truncateSubtitle(pubDate));
        }.bind(this);

        /**
         * @function render
         * @description creates the main content view from the template and appends it to the given element
         * @param {Object} $container the app container
         * @param {Object} data the data to render
         * @param {Object} playerView the player view
         */
        this.render = function ($container, data, playerView) {
            // Build the  content template and add it
            var html = utils.buildTemplate($("#controls-view-template"), {});

            //Initializing variables
            $container.append(html);
            this.$container = $container;
            this.$containerControls = $container.children().last();
            this.containerControls = $container.children().last()[0];

            //play pause icon
            this.playPauseButton = this.$container.find('.player-controls-play-pause-button')[0];
            this.playingIcon = "url(assets/btn_player.png)";
            this.pausedIcon = "url(assets/btn_pause.png)";

            //Render metadata items
            var thumbURL = 'url('+data.thumbURL+')';
            this.$container.find(".player-controls-content-image").css('background-image', thumbURL);
            this.$container.find(".player-controls-content-title").text(data.title);
            this.$container.find(".player-controls-content-subtitle").text(this.truncateSubtitle(data.pubDate));

            //Video specific variables
            this.seekHead = this.$containerControls.find(".player-controls-timeline-playhead")[0];
            this.thumb = this.$containerControls.find(".player-controls-timeline-thumb")[0];
            this.$currSeekTime = this.$containerControls.find(".player-controls-timestamp-curtime");
            this.$forwardIndicator = this.$containerControls.find("#forward-indicator");
            this.$rewindIndicator = this.$containerControls.find("#rewind-indicator");
            this.forwardIndicator = this.$forwardIndicator[0];
            this.rewindIndicator = this.$rewindIndicator[0];
            this.$forwardIndicatorText = this.$forwardIndicator.find(".player-controls-skip-number");
            this.$rewindIndicatorText = this.$rewindIndicator.find(".player-controls-skip-number");
            this.playerView = playerView;
            playerView.on('videoStatus', this.handleVideoStatus, this);

        };

        /**
         * @function convertSecondsToHHMMSS
         * @description convert seconds to string format for custom controls
         * @param {Number} seconds the time in seconds
         * @param {Boolean} alwaysIncludeHours the flag to indicate whether to include hours
         * @return {String} 
         */
        this.convertSecondsToHHMMSS = function(seconds, alwaysIncludeHours) {
            var hours = Math.floor( seconds / 3600 );
            var minutes = Math.floor( seconds / 60 ) % 60;
            seconds = Math.floor( seconds % 60 );

            var finalString = "";

            if (hours > 0 || alwaysIncludeHours) {
                finalString += hours + ":";
            }
            return finalString + ('00' + minutes).slice(-2) + ":" + ('00' + seconds).slice(-2);
        };

       /**
        * @function handleVideoStatus
        * @description status handler for video status events to convert them into showing correct controls
        * @param {Number} currentTime the current time of video playback
        * @param {Number} duration the duration of video
        * @param {String} type the type of video status event
        */
        this.handleVideoStatus = function(currentTime, duration, type) {
            // video has been loaded correctly
            if (!this.totalDurationFound) {
                this.durationChangeHandler(duration);                
            }

            switch (type) {
                case "paused":
                    this.pausePressed();
                    break;
                case "durationChange":
                    this.durationChangeHandler(duration);
                    break;
                case "playing":
                    this.timeUpdateHandler(duration, currentTime);
                    break;
                case "resumed":
                    this.resumePressed();
                    break;
                case "seeking":
                    this.seekPressed(currentTime);
                    break;
            }
            this.previousTime = currentTime;
        }.bind(this);          
        
       /**
        * @function seekPressed 
        * @description show the seek/rewind controls
        * @param {Number} currentTime the current time of video playback
        */
        this.seekPressed = function(currentTime) {
            var skipTime = Math.round(Math.abs(currentTime - this.previousTime));;
            if (this.previousTime > currentTime) {
                // skip backwards
                this.clearTimeouts();
                this.showAndHideControls();
                this.setIndicator("rewind", skipTime);
                this.$forwardIndicator.hide();
                this.indicatorTimeout = setTimeout(function() {
                    this.$rewindIndicator.hide();
                }.bind(this), this.controlsHideTime);
            }
            else if (currentTime > this.previousTime) {
                // skip forward
                this.clearTimeouts();
                this.showAndHideControls();
                this.setIndicator("forward", skipTime);
                this.$rewindIndicator.hide();
                this.indicatorTimeout = setTimeout(function() {
                    this.$forwardIndicator.hide();
                }.bind(this), this.controlsHideTime);
            }
        }.bind(this);

        /**
         * Set forward or rewind indicators
         */
        this.setIndicator = function(skipType, skipTime) {
            var indicator = null;
            var indicatorText = null;
            var indicatorSymbol = null;
            if (skipType === "rewind") {
                indicator = this.$rewindIndicator;
                indicatorText = this.$rewindIndicatorText;
                indicatorSymbol = "-";
            } else {
                indicator = this.$forwardIndicator;
                indicatorText = this.$forwardIndicatorText;
                indicatorSymbol = "+";
            }
            if (this.continuousSeek) {
                indicator.find(".player-controls-skip-symbol").text("");
                indicatorText.text("");
                indicator.find(".player-controls-skip-text").text("");
                indicator.css("min-width", "100px");
                indicator.css("margin-left", "30px");
                indicator.find("img").css("margin-left", "40px");
            } else {
                indicator.find(".player-controls-skip-symbol").text(indicatorSymbol);
                indicatorText.text(skipTime);
                indicator.find(".player-controls-skip-text").text("s");
                indicator.css("margin-left", "-20px");
            }
            indicator.css("display", "flex");
        };

        /**
         * Clear Timeouts
         */
        this.clearTimeouts = function() {
            if (this.indicatorTimeout) {
                clearTimeout(this.indicatorTimeout);
                this.indicatorTimeout = 0;
            }
        };

       /**
        * @function timeUpdateHandler
        * @description time Update Event handler within the video
        * @param {Number} videoDuration the video duration
        * @param {Number} videoCurrentTime the current time of video playback
        */
        this.timeUpdateHandler = function(videoDuration, videoCurrentTime) {
            // Calculate the slider value
            var value = (100 / videoDuration) * videoCurrentTime;
            this.seekHead.style.width = value + "%";
            this.thumb.style.left = value + "%";
            this.forwardIndicator.style.left = (value - this.SKIP_INDICATOR_OFFSET) + "%";
            this.rewindIndicator.style.left = (value - this.SKIP_INDICATOR_OFFSET) + "%";
            this.$currSeekTime.text(this.convertSecondsToHHMMSS(videoCurrentTime, this.videoDuration > 3600 ));
        }.bind(this);

        /**
         * @function durationChangeHandler
         * @description Duration change event handler
         * @param {Number} the current duration that was changed.
         */
        this.durationChangeHandler = function(videoDuration) {
            // check if we have found a duration yet, and that duration is a real value
            if (videoDuration) {
                    var duration = this.convertSecondsToHHMMSS(videoDuration);
                    this.$containerControls.find(".player-controls-timestamp-totaltime").text(duration);
                    this.totalDurationFound = true;

                    // show controls after duration found
                    this.containerControls.style.opacity = "0.99";
                    this.showAndHideControls();
            }
        }.bind(this);

       /**
        * @function pausePressed
        * @description pause the currently playing video, called when app loses focus
        */
        this.pausePressed = function () {
            this.showMetadataInfo();
            if (this.pauseTimeout) {
                clearTimeout(this.pauseTimeout);
                this.pauseTimeout = 0;
            }
            this.containerControls.style.opacity = "0.99";
            // cancel any pending timeouts
            clearTimeout(this.removalTimeout);
        };

       /**
        * @function resumePressed
        * @description resume the currently playing video, called when app regains focus
        */
        this.resumePressed = function() {
            this.hideMetadataInfo();
            this.showAndHideControls();
        };

        /**
         * @function showAndHideControls
         * @description shows the controls and hides them after 3s, resets the timer if this function is called again.
         */
        this.showAndHideControls = function() {
            //show and hide the controls after some seconds
            this.containerControls.style.opacity = "0.99";
            this.playPauseButton.style.display = "block";
            this.playPauseButton.style.opacity = "0.99"; 

            clearTimeout(this.removalTimeout);
            if(!this.playerView.isAdPlaying){
                this.removalTimeout = setTimeout(function() {
                    this.containerControls.style.opacity = "0";
                    this.$rewindIndicator.hide();
                    this.$forwardIndicator.hide();
                    this.hideMetadataInfo();
                    this.playPauseButton.style.opacity = "0";
                }.bind(this), this.controlsHideTime);
            } else{
                    this.containerControls.style.opacity = "0";
                    this.$rewindIndicator.hide();
                    this.$forwardIndicator.hide();
                    this.hideMetadataInfo();
                    this.playPauseButton.style.opacity = "0";
            }
        };
        this.showMetadataInfo = function() {
            //show metadata information
            this.playPauseButton.style.display = "block";
            this.playPauseButton.style.opacity = "0.99";
            this.playPauseButton.style.backgroundImage = this.playingIcon;
            $(".watermark").show();
            $(".gradient-to-bottom").show();
            $(".player-controls-content-image").show();
            $(".player-controls-text").show();  
        }

        this.hideMetadataInfo = function() {
            //hide metadata information
            this.playPauseButton.style.backgroundImage = this.pausedIcon;
            $(".watermark").hide();
            $(".gradient-to-bottom").hide();
            $(".player-controls-content-image").hide();
            $(".player-controls-text").hide();
        }

        /**
         * @function truncateSubtitle
         * @description truncate subtitle with ellipsis
         * @param {String} string the subtitle to truncate
         */
        this.truncateSubtitle = function(string) {
            if (string) {
                if (string.length > 150) {
                    return string.substring(0, 149) + '\u2026';
                } else {
                    return string;
                }
            } else {
                return '';
            }
        };
    }

    exports.ControlsView = ControlsView;
}(window));
