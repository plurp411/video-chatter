// SENDER NAME

$('#sender-name-input').on('focus', function() {
    resetSenderNameInputColors();
});

$('#sender-name-input').on('focusout', function() {
    handleNewSenderName();
});

$('#sender-name-input').bind('keypress', function(e) {
    if (didPressEnter(e.keyCode)) {
        handleNewSenderName();
    }
});

$('#sender-name-input').on('input', function() {
    handleSenderNameInput();
});

// MESSAGE

$('#message-input').on('input', function() {
    handleMessageInput();
});

$('#message-input').on('keyup', function() {
    handleMessageKeyup();
});

$('#message-input').bind('keypress', function(e) {
    if (didPressEnter(e.keyCode)) {
        handleSendMessage();
    }
});

// LINK

$('#link-input').bind('keypress', function(e) {
    if (didPressEnter(e.keyCode)) {
        handleSubmitLink();
    }
});

