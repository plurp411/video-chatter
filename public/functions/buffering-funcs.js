function updateIsBuffering(isBufferingInfo) {

    const isBuffering = isBufferingInfo.is_buffering;
    const isBufferingName = isBufferingInfo.is_buffering_name;

    $('#is-buffering-name-div').removeClass('visible');
    $('#is-buffering-name-div').addClass('invisible');

    if (isBufferingName == 'server_clear_is_buffering') {
        return;
    }
    
    if (isBuffering) {

        if (isBufferingName == '') {
            $('#is-buffering-name-label').text("A user is buffering...");
        } else {
            $('#is-buffering-name-label').text(isBufferingName + " is buffering...");
        }

        $('#is-buffering-name-div').removeClass('invisible');
        $('#is-buffering-name-div').addClass('visible');
    }
}

