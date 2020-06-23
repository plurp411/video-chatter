function handleMessageInput() {

    const currentMessageText = $('#message-input').val();
    const newMessageText = emojiParse(currentMessageText);

    $('#message-input').val(newMessageText);

    if (CURRENT_NAME == '') {
        return;
    }
    
    emitIsTypingInfo(true);
}

function handleMessageKeyup() {

    if (CURRENT_NAME == '') {
        return;
    }

    delay(function() {
        emitIsTypingInfo(false);
    }, 1000);
}

function handleSendMessage() {

    const messageText = $('#message-input').val().trim();
    if (messageText != '' && CURRENT_NAME != '' && !isHTML(messageText)) {

        const messageInfo = {
            message: messageText,
            sender_id: CURRENT_USER,
            sender_name: CURRENT_NAME,
            message_id: create_UUID(),
            message_type: 'user'
        };

        addMessage(messageInfo);
        emitMessageInfo(messageInfo);

        emitIsTypingInfo(false);

        $('#message-input').val('');
    }
    
    if (messageText == '') {
        $('#message-input').val('');
    }

    if (CURRENT_NAME == '') {
        makeSenderNameInputRed();
    }
    
    return false;
}

function addMessage(messageInfo) {
            
    const message = messageInfo.message;
    const senderId = messageInfo.sender_id;
    const senderName = messageInfo.sender_name;
    const messageId = messageInfo.message_id;
    const messageType = messageInfo.message_type;

    if (!messageType.includes('server')) {

        let floatSide = 'left';
        let backgroundColor = 'secondary';

        if (senderId == CURRENT_USER) {
            floatSide = 'right';
            backgroundColor = 'primary';
        }

        addUserMessage(message, floatSide, backgroundColor);
        addUserMessageSenderName(floatSide, messageId, senderId, senderName);

    } else {

        if (messageType == 'server_start_video') {

            const messageVideoSenderId = messageInfo.video_sender_id;
            const messageVideoSenderName = messageInfo.video_sender_name;

            addServerMessageStartVideo(message, senderId, senderName, messageVideoSenderId, messageVideoSenderName);
            
        } else {
            addServerMessageOther(message, senderId, senderName);
        }
        
        if (messageType == 'server_user_connect') {

            if (VIDEO_ID != '') {
                
                // player.pauseVideo();

                let isPaused = true;
                if (CURRENT_STATE == YT.PlayerState.PLAYING) {
                    isPaused = false;
                }

                const currentTime = getVideoTime();
                // if (CURRENT_STATE != YT.PlayerState.BUFFERING) {
                    emitVideoInfo(CURRENT_USER, VIDEO_ID, currentTime, isPaused);
                // }
            }
            
            if (!isEmpty(VIDEO_URL_QUEUE)) {
                emitVideoUrlQueue(VIDEO_URL_QUEUE);
            }
        }
    }

    if (messageType == 'user' && senderId == LAST_MESSAGE_INFO.sender_id) {
        let senderDiv = document.getElementById(LAST_MESSAGE_INFO.message_id);
        if (senderDiv !== null) {
            senderDiv.remove();
        }
    }

    scrollToBottom();

    LAST_MESSAGE_INFO = messageInfo;
}

function addUserMessage(message, floatSide, backgroundColor) {
    $('#messages').append(`
        <div class="p-0 m-0 w-100 float-${floatSide}">
            <label class="text-left d-inline-block bg-${backgroundColor} text-light float-${floatSide} rounded mt-1 ml-1 mr-1 mb-0 pl-1 pr-1" style="word-break: break-all;">${message}</label>
        </div>
    `);
}

function addUserMessageSenderName(floatSide, messageId, senderId, senderName) {
    $('#messages').append(`
        <div id=${messageId} class="p-0 m-0 w-100 float-${floatSide}">
            <label class="unselectable ${senderId} text-left d-inline-block bg-light text-dark float-${floatSide} rounded m-1 pl-1 pr-1 small" style="word-break: break-all;">${senderName}</label>
        </div>
    `);
}

function addServerMessageStartVideo(message, senderId, senderName, messageVideoSenderId, messageVideoSenderName) {
    $('#messages').append(`
        <div class="p-0 m-0 w-100">
            <label class="unselectable text-left d-inline-block bg-light text-dark rounded m-1 pl-1 pr-1 small font-weight-bold" style="word-break: break-all;">
                <label class="${senderId} d-inline-block h-100 p-0 m-0">${senderName}</label>
                ${message}
                <label class="${messageVideoSenderId} d-inline-block h-100 p-0 m-0">${messageVideoSenderName}</label>'s video
            </label>
        </div>
    `);
}

function addServerMessageOther(message, senderId, senderName) {
    $('#messages').append(`
        <div class="p-0 m-0 w-100">
            <label class="unselectable text-left d-inline-block bg-light text-dark rounded m-1 pl-1 pr-1 small font-weight-bold" style="word-break: break-all;">
                <label class="${senderId} d-inline-block h-100 p-0 m-0">${senderName}</label>
                ${message}
            </label>
        </div>
    `);
}

