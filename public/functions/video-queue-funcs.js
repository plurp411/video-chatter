function handleSubmitLink() {

    if (CURRENT_NAME == '') {
        $('#sender-name-input').css('background-color', '#291a1a');
        return;
    }

    const videoLink = $("#link-input").val().trim();
    const videoId = getVideoIdFromLink(videoLink);

    if (!videoId || videoId == VIDEO_ID || videoLink in VIDEO_URL_QUEUE) {
        return;
    }

    VIDEO_URL_QUEUE[videoLink] = {
        sender_name: CURRENT_NAME,
        sender_id: CURRENT_USER
    };
    emitVideoUrlQueue(VIDEO_URL_QUEUE);

    $("#link-input").val('');

    const messageInfo = {
        message: " added a video",
        sender_id: CURRENT_USER,
        sender_name: CURRENT_NAME,
        message_id: create_UUID(),
        message_type: 'server_add_video'
    };

    addMessage(messageInfo);
    emitMessageInfo(messageInfo);
}

function handleNextVideo() {

    if (CURRENT_NAME == '') {
        $('#sender-name-input').css('background-color', '#291a1a');
        return;
    }

    if (isEmpty(VIDEO_URL_QUEUE)) {
        return;
    }

    const videoLink = Object.keys(VIDEO_URL_QUEUE)[0];
    const videoLinkSenderName = VIDEO_URL_QUEUE[videoLink]['sender_name'];
    const videoLinkSenderId = VIDEO_URL_QUEUE[videoLink]['sender_id'];
    handleStartVideo(videoLink, videoLinkSenderName, videoLinkSenderId);
    
    delete VIDEO_URL_QUEUE[videoLink];
    emitVideoUrlQueue(VIDEO_URL_QUEUE);
}

function updateVideoQueueDisplay() {

    $('#videos-div').removeClass('d-block');
    $('#videos-div').removeClass('d-none');
    $('#no-videos-div').removeClass('d-block');
    $('#no-videos-div').removeClass('d-none');

    if (isEmpty(newVideoUrlQueue)) {
        $('#videos-div').addClass('d-none');
        $('#no-videos-div').addClass('d-block');
    } else {
        $('#videos-div').addClass('d-block');
        $('#no-videos-div').addClass('d-none');
    }
}

function updateVideoQueue(newVideoUrlQueue) {

    VIDEO_URL_QUEUE = newVideoUrlQueue;

    $('#videos').html('');

    let position = 0;
    for (const [key, value] of Object.entries(newVideoUrlQueue)) {

        position++;

        const videoLink = key;
        const senderName = value.sender_name;
        const senderId = value.sender_id;

        addVideo(position, videoLink, senderId, senderName);
    }

    updateVideoQueueDisplay();
    scrollToBottomVideoUrlQueue();
}

function addVideo(position, videoLink, senderId, senderName) {
    $('#videos').append(`
        <div class="list-group-item p-0" style="background-color: rgb(35, 35, 35);">

            <div class="float-left d-inline-block" style="width: 40px; height: 61px;">
                <label class="unselectable h-100 w-100 font-weight-bold" style="text-align: center; line-height: 61px; color: rgb(150, 150, 150);">${position}</label>
            </div>

            <div class="float-right d-inline-block p-1 pr-0 pl-0" style="width: calc(100% - 40px)">
                <label class="small text-left d-inline-block float-left w-100 m-1 font-italic text-truncate" style="color: rgb(200, 200, 200); max-width: calc(100% - 10px);">${videoLink}</label>
                <label class="${senderId} unselectable text-left d-inline-block float-left rounded m-1 pl-1 pr-1 small text-truncate" style="max-width: calc(100% - 10px); background-color: rgb(50, 50, 50); color: rgb(180, 180, 180);">${senderName}</label>
            </div>

        </div>
    `);
}

