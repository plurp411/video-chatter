$('#link-display').val('https://video-chat-280220.wl.r.appspot.com/?id=' + ROOM_ID);

if (CURRENT_USER == ROOM_ID) {
    $('#is-admin-checkbox-div').removeClass('d-none');
    $('#is-admin-checkbox-div').removeClass('d-block');
}

