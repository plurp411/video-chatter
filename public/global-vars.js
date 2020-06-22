const ROOM_ID = $('#room-id-label').html();
const CURRENT_USER = $('#user-id-label').html();

let CURRENT_NAME = '';
let VIDEO_ID = '';

let GOT_INFO = null;
let GOT_VIDEO_ID = null;
let GOT_CURRENT_TIME = null;
let GOT_IS_PAUSED = null;

let CURRENT_STATE = null;

let IS_API_READY = false;
let IS_PLAYER_READY = false;

let IS_BUFFERING = false;

let LAST_MESSAGE_INFO = {};

let VIDEO_URL_QUEUE = {};

let socket = io();

$('#link-display').val('https://video-chat-280220.wl.r.appspot.com/?id=' + ROOM_ID);

