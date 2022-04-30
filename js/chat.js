const mainChatScreen = document.querySelector(".main-chat");
const messageRow = document.querySelector(".message-row");


const replyForm = document.querySelector(".reply");
const replyInput = document.querySelector(".reply input");
const replyButton = document.querySelector("reply button");

function replyEnter(event){
    event.preventDefault();
    const newReplyInput = replyInput.value;
    replyInput.value = "";
    myChatBubble(newReplyInput);
}

function myChatBubble(newReplyInput){
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
    messageBubble.textContent = newReplyInput;
    getChatClock(messageTime);
}

function getChatClock(messageTime){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    messageTime.textContent = `${hours}:${minutes}`;
}

replyForm.addEventListener("submit", replyEnter);