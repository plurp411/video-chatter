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

