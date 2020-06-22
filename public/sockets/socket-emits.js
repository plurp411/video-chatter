function emitVideoInfo(fromUser, videoId, currentTime, isPaused) {
    const videoInfo = {
        from_user: fromUser,
        video_id: videoId,
        current_time: currentTime,
        is_paused: isPaused
    };
    socket.emit('video_info', videoInfo);
}

function emitIsTypingInfo(isTyping) {
    const isTypingInfo = {
        is_typing_name: CURRENT_NAME,
        is_typing: isTyping
    };
    socket.emit('is_typing_info', isTypingInfo);
}

function emitIsBufferingInfo(isBuffering) {
    const isBufferingInfo = {
        is_buffering_name: CURRENT_NAME,
        is_buffering: isBuffering
    };
    socket.emit('is_buffering_info', isBufferingInfo);
}

function emitSenderNameChangeInfo(currentSenderName) {
    const senderNameChangeInfo = {
        sender_name_change_user: CURRENT_USER,
        sender_name_change_name: currentSenderName
    };
    updateSenderName(senderNameChangeInfo);
    socket.emit('sender_name_change_info', senderNameChangeInfo);
}

function emitVideoUrlQueue(videoUrlQueue) {
    updateVideoQueue(videoUrlQueue);
    socket.emit('video_url_queue', videoUrlQueue);
}

function emitMessageInfo(messageInfo) {
    socket.emit('message_info', messageInfo);
}

