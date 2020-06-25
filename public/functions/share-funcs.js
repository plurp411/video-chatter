function updateShareVisibility(makeVisible) {
    if (makeVisible) {
        $('#share-cancel-div').removeClass('invisible');
        $('#share-cancel-div').addClass('visible');
        $('#share-div').removeClass('invisible');
        $('#share-div').addClass('visible');
    } else {
        $('#share-cancel-div').removeClass('visible');
        $('#share-cancel-div').addClass('invisible');
        $('#share-div').removeClass('visible');
        $('#share-div').addClass('invisible');
    }
}

function handleCopyLink() {
    var copyText = document.getElementById("link-display");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

function handleHostOwn() {
    window.location.href = 'https://video-chat-280220.wl.r.appspot.com/';
}

function setupSharePopup() {

    if (CURRENT_USER == ROOM_ID) {

        $('#is-admin-checkbox-div').removeClass('d-none');
        $('#host-own-div').removeClass('d-inline-block');

        $('#is-admin-checkbox-div').addClass('d-block');
        $('#host-own-div').addClass('d-none');
    }
}

