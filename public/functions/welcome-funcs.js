function updateWelcomeVisibility(makeVisible) {
    if (makeVisible) {
        $('#welcome-cancel-div').removeClass('invisible');
        $('#welcome-cancel-div').addClass('visible');
        $('#welcome-div').removeClass('invisible');
        $('#welcome-div').addClass('visible');
    } else {
        $('#welcome-cancel-div').removeClass('visible');
        $('#welcome-cancel-div').addClass('invisible');
        $('#welcome-div').removeClass('visible');
        $('#welcome-div').addClass('invisible');
    }
}

