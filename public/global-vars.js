const ROOM_ID = $('#room-id-label').html();
const CURRENT_USER = $('#user-id-label').html();

const YOUTUBE_API_KEY = "AIzaSyD6RqEN-zgYCiDcRD8L1u0wNI5GnxLWVNo";

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

let START_BUFFERING_SECONDS = null;

let IS_SUBMIT_LINK_DISABLED = false;

let IS_ADMIN = false;

let IS_FIRST_TIME = true;

