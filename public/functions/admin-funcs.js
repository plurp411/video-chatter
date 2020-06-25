function updateIsAdmin(isAdmin) {

    IS_ADMIN = isAdmin;

    if (isUserAdmin()) {

        $('#link-input').removeClass('d-none');
        $('#submit-link-button').removeClass('d-none');
        $('#next-video-button').removeClass('d-none');
        $('#player').css('pointer-events', 'auto');

        $('#link-input').addClass('d-inline-block');
        $('#submit-link-button').addClass('d-block');
        $('#next-video-button').addClass('d-block');

    } else {

        $('#link-input').removeClass('d-inline-block');
        $('#submit-link-button').removeClass('d-block');
        $('#next-video-button').removeClass('d-block');

        $('#link-input').addClass('d-none');
        $('#submit-link-button').addClass('d-none');
        $('#next-video-button').addClass('d-none');
        $('#player').css('pointer-events', 'none');
    }
}

