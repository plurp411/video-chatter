function updateIsTyping(isTypingInfo) {
            
    const isTyping = isTypingInfo.is_typing;
    const isTypingName = isTypingInfo.is_typing_name;

    $('#is-typing-name-div').removeClass('visible');
    $('#is-typing-name-div').addClass('invisible');

    // $('#messages-div').css('height', 'calc(100% - 38px)');
    
    if (isTypingName == 'server_clear_is_typing') {
        return;
    }
    
    if (isTyping) {

        $('#is-typing-name-label').text(isTypingName + " is typing...");

        $('#is-typing-name-div').removeClass('invisible');
        $('#is-typing-name-div').addClass('visible');

        // $('#messages-div').css('height', 'calc(100% - 38px - 20px)');
        // scrollToBottom();
    }
}

