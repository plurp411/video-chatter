function onYouTubeIframeAPIReady() {

    $("#loading-div").remove();

    $("#next-video-button").removeClass('invisible');
    $("#sender-name-input").removeClass('invisible');
    $("#message-input").removeClass('invisible');

    IS_API_READY = true;
    
    if (GOT_INFO !== null) {
        updateVideoPlayer(GOT_INFO);
    }
}

function onPlayerReady(event) {

    IS_PLAYER_READY = true;

    player.seekTo(GOT_CURRENT_TIME);

    if (GOT_IS_PAUSED) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function onPlayerStateChange(event) {

    CURRENT_STATE = event.data;

    let isPaused = true;
    if (event.data == YT.PlayerState.PLAYING) {
        isPaused = false;
    }

    const currentTime = getVideoTime();
    if (VIDEO_ID != GOT_VIDEO_ID || isPaused != GOT_IS_PAUSED || (Math.abs(currentTime - GOT_CURRENT_TIME) > 1)) {
        if (event.data != YT.PlayerState.BUFFERING && event.data != -1) {
            emitVideoInfo(CURRENT_USER, VIDEO_ID, currentTime, isPaused);
        }
    }

    if (event.data == YT.PlayerState.BUFFERING) {

        IS_BUFFERING = true;
        emitIsBufferingInfo(true);
        
    } else if (IS_BUFFERING) {

        IS_BUFFERING = false;
        emitIsBufferingInfo(false);
    }
}

function stopVideo() {
    player.stopVideo();
}

function getVideoTime() {
    return player.getCurrentTime();
}

