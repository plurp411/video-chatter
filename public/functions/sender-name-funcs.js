function resetSenderNameInputColors() {
    // $('#sender-name-input').css('background-color', 'rgb(50, 50, 50)');
    // $('#sender-name-input').css('color', 'rgb(235, 235, 235)');
    $('#sender-name-input').css('background-color', 'rgb(40, 40, 40)');
    $('#sender-name-input').css('color', 'rgb(235, 235, 235)');
}

function handleNewSenderName() {
    const currentSenderName = getCurrentSenderName();
    if (isHTML(currentSenderName)) {
        return;
    }
    if (currentSenderName != '' && currentSenderName != CURRENT_NAME) {
        emitSenderNameChangeInfo(currentSenderName);
    }
    CURRENT_NAME = currentSenderName;
    if (canUseStorage()) {
        localStorage.setItem("display_name", currentSenderName);
    }
    $('#sender-name-input').val(currentSenderName);
}

function handleSenderNameInput() {
    const currentSenderName = $('#sender-name-input').val();
    let newSenderName = emojiParse(currentSenderName);            
    newSenderName = newSenderName.substring(0, 50);
    $('#sender-name-input').val(newSenderName);
}

function updateSenderName(senderNameChangeInfo) {

    const senderNameChangeUser = senderNameChangeInfo.sender_name_change_user;
    const senderNameChangeName = senderNameChangeInfo.sender_name_change_name;

    $('.' + senderNameChangeUser).html(senderNameChangeName);

    for (const [key, value] of Object.entries(VIDEO_URL_QUEUE)) {
        const senderId = value.sender_id;
        if (senderId == senderNameChangeUser) {
            const videoLink = key;
            VIDEO_URL_QUEUE[videoLink].sender_name = senderNameChangeName;
        }
    }
}

function makeSenderNameInputRed() {
    $('#sender-name-input').css('background-color', '#ff8585');
}

function getSetDisplayName() {
    const displayName = localStorage.getItem("display_name");
    $('#sender-name-input').val(displayName);
    handleNewSenderName();
}

