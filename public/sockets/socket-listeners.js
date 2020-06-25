// VIDEO URL QUEUE

socket.on('video_url_queue', function(videoUrlQueue) {
    updateVideoQueue(videoUrlQueue);
});

// IS TYPING INFO

socket.on('is_typing_info', function(isTypingInfo) {
    updateIsTyping(isTypingInfo);
});

// IS BUFFERING INFO

socket.on('is_buffering_info', function(isBufferingInfo) {
    updateIsBuffering(isBufferingInfo);
});

// SENDER NAME CHANGE INFO

socket.on('sender_name_change_info', function(senderNameChangeInfo) {
    updateSenderName(senderNameChangeInfo);
});

// MESSAGE INFO

socket.on('message_info', function(messageInfo) {
    addMessage(messageInfo);
});

// VIDEO INFO

socket.on('video_info', function(info) {
    handleNewVideoInfo(info);
});

// IS ADMIN

socket.on('is_admin', function(isAdmin) {
    updateIsAdmin(isAdmin);
    $('#is-admin-checkbox').prop("checked", IS_ADMIN);
});

