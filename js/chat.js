const mainChatScreen = document.querySelector(".main-chat");

function timeStampGetClock(timeStampDiv){
    const stampDate = new Date();
    const stampYears = stampDate.getFullYear();
    const stampMonth = stampDate.getMonth() + 1;
    const stampDays = stampDate.getDate();
    timeStampDiv.textContent = `${stampYears}년 ${stampMonth}월 ${stampDays}일`;
}

const messageRow = document.querySelector(".message-row");
const replyForm = document.querySelector(".reply");
const replyInput = document.querySelector(".reply input");

let newReplys =[];
let timeStamps = [];

const NEWREPLYS_KEY = "newReplys";
const TIMESTAMP_KEY = "TimeStamp";

function saveTimeStamp(){
    localStorage.setItem(TIMESTAMP_KEY, JSON.stringify(timeStamps));
}

function saveNewReplys(){
    localStorage.setItem(NEWREPLYS_KEY, JSON.stringify(newReplys));
}

function replyEnter(event){
    event.preventDefault();
    handleTimeStamp();
    const newReply = replyInput.value;
    replyInput.value = "";
    myChatBubble(newReply);
    saveTimeStamp();
    saveNewReplys();
}

function handleTimeStamp(){
    const timeStampDiv = document.createElement("div");
    mainChatScreen.appendChild(timeStampDiv);
    timeStampDiv.classList.add("chat__timestamp");
    timeStampGetClock(timeStampDiv);
    timeStamps.push(timeStampDiv.textContent);
}

function myChatBubble(newReply){
    const messageRowOwnDiv = document.createElement("div");
    mainChatScreen.appendChild(messageRowOwnDiv);
    messageRowOwnDiv.classList.add("my-chat", "message-row", "message-row--own");
    const messageRowContent = document.createElement("div");
    messageRowOwnDiv.appendChild(messageRowContent);
    messageRowContent.classList.add("message-row__content");
    const messageInfo = document.createElement("div");
    messageRowContent.appendChild(messageInfo);
    messageInfo.classList.add("message__info")
    const messageBubble = document.createElement("span");
    messageInfo.appendChild(messageBubble);
    messageBubble.classList.add("message__bubble");
    const messageTime = document.createElement("span");
    messageInfo.appendChild(messageTime);
    messageTime.classList.add("message__time");
    messageBubble.textContent = newReply;
    getChatClock(messageTime);
    newReplys.push(newReply);
}

function getChatClock(messageTime){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    messageTime.textContent = `${hours}:${minutes}`;
}

const savedTimeStamp = localStorage.getItem(TIMESTAMP_KEY);
const savedNewReplys = localStorage.getItem(NEWREPLYS_KEY);

replyForm.addEventListener("submit", replyEnter);

if(savedTimeStamp !== null){
    const parsedTimeStamp = JSON.parse(savedTimeStamp);
    parsedTimeStamp.forEach(handleTimeStamp);
}

if(savedNewReplys !== null){
    const parsedNewReplys = JSON.parse(savedNewReplys);
    parsedNewReplys.forEach(myChatBubble);
}