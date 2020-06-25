function showMainView() {

    $("#loading-div").remove();

    $("#next-video-button").removeClass('invisible');
    $("#sender-name-input").removeClass('invisible');
    $("#message-input").removeClass('invisible');

    if (IS_FIRST_TIME) {
        updateWelcomeVisibility(true);
    }
}

