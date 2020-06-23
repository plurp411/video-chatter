function handleSubmitLink() {

    if (IS_SUBMIT_LINK_DISABLED) {
        return;
    }

    IS_SUBMIT_LINK_DISABLED = true;

    if (CURRENT_NAME == '') {
        makeSenderNameInputRed();
        IS_SUBMIT_LINK_DISABLED = false;
        return;
    }

    const videoLink = $("#link-input").val().trim();
    const videoId = getVideoIdFromLink(videoLink);

    if (!videoId || videoId == VIDEO_ID || videoId in VIDEO_URL_QUEUE || isHTML(videoLink)) {
        IS_SUBMIT_LINK_DISABLED = false;
        return;
    }

    // `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${videoId}&key=${YOUTUBE_API_KEY}`

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;
    fetch(url).then(response => response.json()).then(data => {

        IS_SUBMIT_LINK_DISABLED = false;

        if (data.items.length <= 0) {
            return;
        }

        const videoTitle = data.items[0].snippet.title;

        VIDEO_URL_QUEUE[videoId] = {
            sender_name: CURRENT_NAME,
            sender_id: CURRENT_USER,
            title: videoTitle
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
    });
}

function handleNextVideo() {

    if (CURRENT_NAME == '') {
        makeSenderNameInputRed();
        return;
    }

    if (isEmpty(VIDEO_URL_QUEUE)) {
        return;
    }

    const videoId = Object.keys(VIDEO_URL_QUEUE)[0];
    const videoSenderName = VIDEO_URL_QUEUE[videoId]['sender_name'];
    const videoSenderId = VIDEO_URL_QUEUE[videoId]['sender_id'];
    handleStartVideo(videoId, videoSenderName, videoSenderId);
    
    delete VIDEO_URL_QUEUE[videoId];
    emitVideoUrlQueue(VIDEO_URL_QUEUE);
}

function updateVideoQueueDisplay(newVideoUrlQueue) {

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

        const senderName = value.sender_name;
        const senderId = value.sender_id;
        const title = value.title;

        addVideo(position, senderId, senderName, title);
    }

    updateVideoQueueDisplay(newVideoUrlQueue);
    scrollToBottomVideoUrlQueue();
}

function addVideo(position, senderId, senderName, title) {

    let backgroundColor = 'rgb(40, 40, 40)';
    if (position % 2 == 0) {
        backgroundColor = 'rgb(35, 35, 35)';
    }

    $('#videos').append(`
        <div class="list-group-item p-0 border-0" style="background-color: ${backgroundColor};">

            <div class="float-left d-inline-block" style="width: 40px; height: 61px;">
                <label class="unselectable h-100 w-100 font-weight-bold" style="text-align: center; line-height: 61px; color: rgb(150, 150, 150);">${position}</label>
            </div>

            <div class="float-right d-inline-block pt-1 pb-1 pr-0 pl-0" style="width: calc(100% - 40px)">
                <label class="small text-left d-inline-block float-left w-100 m-1 text-truncate" style="color: rgb(200, 200, 200); max-width: calc(100% - 10px);">${title}</label>
                <label class="${senderId} unselectable text-left d-inline-block float-left rounded m-1 pl-1 pr-1 small text-truncate" style="max-width: calc(100% - 10px); background-color: rgb(50, 50, 50); color: rgb(180, 180, 180);">${senderName}</label>
            </div>

        </div>
    `);
}

