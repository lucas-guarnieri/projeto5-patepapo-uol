let chatUser;
let messages = [];

function startChat(){
    sendUserStatus();
    getMessages();
    const statusInterval = setInterval(sendUserStatus, 5000);
    const messagesInetval = setInterval(getMessages, 3000);
}

function createUser(){
    const user = document.querySelector(".user").value;
    const newUser = { name: user };
    chatUser = newUser;
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", newUser);
    promise.then(createUserSuccess);
    promise.catch(createUserError);
}

function createUserSuccess(){
    document.querySelector(".login-screen").classList.add("hidden");
    startChat();
}

function createUserError(){
    document.querySelector(".login-screen span").innerHTML = "Usuário já existe";
}

function sendUserStatus(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", chatUser);
    promise.then(userStatusSuccess);
    promise.catch(userStatusError);
}

function userStatusSuccess(){
    console.log("status sent");
}

function userStatusError(error){
    console.log(error.responce);
    alert("Você foi desconectado. Desculpa, falha nossa ;)");
    document.location.reload();
}

function getMessages(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(getMessagesSucceed);
    promise.catch(getMessagesError);
}

function getMessagesSucceed(response){
    messages = response.data;
    renderChat();
}

function getMessagesError(error){
    console.log(error.responce);
}

function renderChat(){
    messages.forEach(renderMensage);
}

function renderMensage(message){
    const messageSection = document.querySelector(".message-section");
    if (message.type ==="status"){
        messageSection.innerHTML += `
        <div class="message status" data-identifier="message">
        <span>(${message.time})</span> <b>${message.from}</b> ${message.text}
        </div>
        `;
    }else if(message.type === "private_message" && (message.from === chatUser || message.to === chatUser)){
        messageSection.innerHTML += `
        <div class="message private" data-identifier="message">
        <span>(${message.time})</span> <b>${message.from}</b> reservadamente para <b>${message.to}</b>: ${message.text}
        </div>
        `;
    }else{messageSection.innerHTML += `
        <div class="message" data-identifier="message">
        <span>(${message.time})</span> <b>${message.from}</b> para <b>${message.to}</b>: ${message.text}
        </div>
        `;
    }
 
    let lastMessage = messageSection.lastElementChild;
    lastMessage.scrollIntoView();

}
function sendMessage(){
    const chatText = document.querySelector(".chat-text").value;
    const message = {
        from: chatUser.name,
        to: "Todos",
        text: chatText,
        type: "message"
    }

    const request = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", message);
    request.then(requestSuccess);
    request.catch(requestError);
}

function requestSuccess(){
    getMessages();
    document.querySelector(".chat-text").value = "";
    
}

function requestError(error){
    console.log(error.responce);
}


// código para habilitar envio com tecla enter
let input = document.querySelector(".chat-text");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.querySelector(".send-button").click();
  }
});

let inputEntry = document.querySelector(".user");
inputEntry.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.querySelector(".enter-button").click();
  }
});
