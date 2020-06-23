function updateVideoPlayer(info) {

    const fromUser = info.from_user;
    const videoId = info.video_id;
    const currentTime = info.current_time;
    const isPaused = info.is_paused;

    // if (fromUser != CURRENT_USER) {

    GOT_VIDEO_ID = videoId;
    GOT_CURRENT_TIME = currentTime;
    GOT_IS_PAUSED = isPaused;

    if (videoId != VIDEO_ID) {

        VIDEO_ID = videoId;

        if (player === null) {

            player = new YT.Player('player', {
                videoId: videoId,
                playerVars: { 'autoplay': 1 },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });

        } else {
            // IS_PLAYER_READY = false;
            player.loadVideoById(videoId);
        }

    } else if (IS_PLAYER_READY) {

        player.seekTo(currentTime);

        if (isPaused) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }
    // }
}

function handleStartVideo(videoId, videoSenderName, videoSenderId) {

    if (videoId != VIDEO_ID) {

        VIDEO_ID = videoId;

        if (player === null) {

            player = new YT.Player('player', {
                videoId: videoId,
                playerVars: { 'autoplay': 1 },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });

        } else {
            GOT_CURRENT_TIME = 0;
            GOT_IS_PAUSED = false;
            // IS_PLAYER_READY = false;
            player.loadVideoById(videoId);
        }

        if (IS_PLAYER_READY) {
            player.playVideo();
        } else {
            GOT_CURRENT_TIME = 0;
            GOT_IS_PAUSED = false;
        }

        emitVideoInfo(CURRENT_USER, VIDEO_ID, 0, false);

        const messageInfo = {
            message: " started ",
            sender_id: CURRENT_USER,
            sender_name: CURRENT_NAME,
            message_id: create_UUID(),
            message_type: 'server_start_video',
            video_sender_id: videoSenderId,
            video_sender_name: videoSenderName,
        };

        addMessage(messageInfo);
        emitMessageInfo(messageInfo);
    }
}

function handleNewVideoInfo(info) {

    // messageLog('GOT: ' + info.is_paused);

    updateGotInfo(info);

    // messageLog(GOT_IS_PAUSED);

    if (!IS_API_READY) {
        return;
    }

    updateVideoPlayer(info);
}

