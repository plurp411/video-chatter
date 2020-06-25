function onYouTubeIframeAPIReady() {

    showMainView();

    IS_API_READY = true;
    
    if (GOT_INFO !== null) {
        updateVideoPlayer(GOT_INFO);
    }
}

function onPlayerReady(event) {

    // messageLog('READY NOW');

    IS_PLAYER_READY = true;

    // player.seekTo(GOT_CURRENT_TIME);

    // if (GOT_IS_PAUSED) {
    //     player.pauseVideo();
    // } else {
    //     player.playVideo();
    // }
}

function onPlayerStateChange(event) {

    // messageLog('..............................');
    // messageLog(event.data);

    if (event.data == -1 && IS_PLAYER_READY) {

        player.seekTo(GOT_CURRENT_TIME);

        if (GOT_CURRENT_TIME <= 1) {

            GOT_IS_PAUSED = false;
            player.playVideo();

        } else {

            if (GOT_IS_PAUSED) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        }
    }

    CURRENT_STATE = event.data;

    let isPaused = true;
    if (event.data == YT.PlayerState.PLAYING) {
        isPaused = false;
    }

    const currentTime = getVideoTime();
    if (VIDEO_ID != GOT_VIDEO_ID || isPaused != GOT_IS_PAUSED || (Math.abs(currentTime - GOT_CURRENT_TIME) > 1)) {
        if (event.data != YT.PlayerState.BUFFERING && event.data != -1) {
            // messageLog('EMIT 111');
            GOT_CURRENT_TIME = currentTime;
            GOT_IS_PAUSED = isPaused;
            emitVideoInfo(CURRENT_USER, VIDEO_ID, currentTime, isPaused);
        }
    }

    if (event.data == YT.PlayerState.BUFFERING || event.data == -1) {

        // emitIsBufferingInfo(true);

        if (!IS_BUFFERING) {

            START_BUFFERING_SECONDS = new Date().getTime() / 1000;

            IS_BUFFERING = true;
            emitIsBufferingInfo(true);
        }
        
    } else if (IS_BUFFERING) {
        
        const endBufferingSeconds = new Date().getTime() / 1000;
        if (endBufferingSeconds - START_BUFFERING_SECONDS > 1) {
            if (event.data != YT.PlayerState.BUFFERING && event.data != -1) {
                if (GOT_IS_PAUSED == false) {
                    // messageLog('EMIT 22222');
                    emitVideoInfo(CURRENT_USER, VIDEO_ID, GOT_CURRENT_TIME, GOT_IS_PAUSED);
                }
            }
        }

        IS_BUFFERING = false;
        emitIsBufferingInfo(false);
    }
}

function stopVideo() {
    player.stopVideo();
}

function getVideoTime() {
    // if (player === null) {
    //     return -1;
    // }
    return player.getCurrentTime();
}

