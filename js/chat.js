const mainChatScreen = document.querySelector(".main-chat");
const messageRow = document.querySelector(".message-row");


const replyForm = document.querySelector(".reply");
const replyInput = document.querySelector(".reply input");

let newReplys =[];

const NEWREPLYS_KEY = "newReplys";

function saveNewReplys(){
    localStorage.setItem(NEWREPLYS_KEY, JSON.stringify(newReplys));
}

function replyEnter(event){
    event.preventDefault();
    const newReply = replyInput.value;
    replyInput.value = "";
    myChatBubble(newReply);
    saveNewReplys();
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

const savedNewReplys = localStorage.getItem(NEWREPLYS_KEY);

replyForm.addEventListener("submit", replyEnter);

if(savedNewReplys !== null){
    const parsedNewReplys = JSON.parse(savedNewReplys);
    parsedNewReplys.forEach(myChatBubble);
}