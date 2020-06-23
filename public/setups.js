$('#link-display').val('https://video-chat-280220.wl.r.appspot.com/?id=' + ROOM_ID);

if (ROOM_ID == CURRENT_USER) {
    $('#checkbox-div').removeClass('d-none');
    $('#checkbox-div').removeClass('d-block');
}

