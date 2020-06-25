function scrollToBottom() {
    const messagesDiv = document.getElementById("messages-div");
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function scrollToBottomVideoUrlQueue() {
    const videoUrlQueue = document.getElementById("videos-div");
    videoUrlQueue.scrollTop = videoUrlQueue.scrollHeight;
}

function getCurrentSenderName() {
    return $("#sender-name-input").val().trim();
}

function messageLog(messageText) {
    $('#messages').append(`
        <div class="p-0 m-0 w-100 float-left">
            <label class="text-left d-inline-block bg-white text-dark float-left rounded m-1 pl-1 pr-1" style="word-break: break-all;">${messageText}</label>
        </div>
    `);
    scrollToBottom();
}

function didPressEnter(keyCode) {
    if (keyCode == 13){
        return true;
    }
    return false;
}

function emojiParse(text) {
    // faces
    // wink tongue
    text = text.replace(/\;p/g, "😜");
    text = text.replace(/\;P/g, "😜");
    // wink
    text = text.replace(/\;\)/g, "😉");
    // big smile
    text = text.replace(/\:\>/g, "😊");
    // smile
    text = text.replace(/\:\)/g, "🙂");
    // sad
    text = text.replace(/\:\(/g, "🙁 ");
    // tongue
    text = text.replace(/\:p/g, "😛");
    text = text.replace(/\:P/g, "😛");
    // kiss
    text = text.replace(/\:\*/g, "😘");
    // neutral
    text = text.replace(/\:\|/g, "😑");
    // open grin
    text = text.replace(/\:D/g, "😀");
    // upside down smile
    text = text.replace(/\(\:/g, "🙃");
    // open mouth
    text = text.replace(/\:o/g, "😮");
    // scared
    text = text.replace(/\:O/g, "😱");
    // super angry
    text = text.replace(/\>\>\>\:/g, "😤");
    // very angry
    text = text.replace(/\>\>\:/g, "😡");
    // angry
    text = text.replace(/\>\:/g, "😠");
    // thinking
    // text = text.replace(/\:\//g, "🤔");
    text = text.replace(/\:\\/g, "🤔");
    // more crying
    text = text.replace(/\:\'\'\(/g, "😭");
    text = text.replace(/\:\"\(/g, "😭");
    // crying
    text = text.replace(/\:\'\(/g, "😢");
    // sleeping
    text = text.replace(/z\:o/g, "😴");
    text = text.replace(/z\:O/g, "😴");
    // zzzs
    text = text.replace(/zzz/g, "💤");
    // laughing
    text = text.replace(/xD/g, "😂");
    text = text.replace(/XD/g, "😂");
    // teethy grin
    text = text.replace(/\:\#/g, "😬");
    // disappointed
    text = text.replace(/D\:/g, "😦");
    // zipper mouth
    text = text.replace(/\:\$/g, "🤐");
    // hush
    text = text.replace(/\:\%/g, "🤫");
    // eye roll
    text = text.replace(/e\_e/g, "🙄");

    // other
    // dot heart
    text = text.replace(/\.\<3/g, "❣");
    // double hearts
    text = text.replace(/\<\<3/g, "💕");
    // shiny heart
    text = text.replace(/\*\<3/g, "💖");
    // spinning hearts
    text = text.replace(/\<\-\<3/g, "💞");
    // heart
    text = text.replace(/\<3/g, "❤");
    return text;
}

function create_UUID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

let delay = (function() {
    let timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

function getVideoIdFromLink(videoLink) {
    let videoId = videoLink.split('v=')[1];
    if (videoId === undefined) {
        return;
    }
    let ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition != -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }
    return videoId;
}

function updateGotInfo(info) {
    GOT_INFO = info;
    GOT_VIDEO_ID = info.video_id;
    GOT_CURRENT_TIME = info.current_time;
    GOT_IS_PAUSED = info.is_paused;
}

function isHTML(str) {

    var a = document.createElement('div');
    a.innerHTML = str;

    for (var c = a.childNodes, i = c.length; i--; ) {
        if (c[i].nodeType == 1) return true; 
    }

    return false;
}

function isUserAdmin() {
    if (IS_ADMIN && CURRENT_USER == ROOM_ID) {
        return true;
    } else if (!IS_ADMIN) {
        return true;
    }
    return false;
}

