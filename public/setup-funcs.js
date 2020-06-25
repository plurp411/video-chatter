function getSetFirstTime() {
    const isFirstTime = localStorage.getItem("is_first_time");
    if (isFirstTime == 'false') {
        IS_FIRST_TIME = false;
    }
    if (IS_FIRST_TIME) {
        localStorage.setItem("is_first_time", "false");
    }
}

function setupTryGetStorage() {
    if (canUseStorage()) {
        getSetFirstTime();
        getSetDisplayName();
    }
}

