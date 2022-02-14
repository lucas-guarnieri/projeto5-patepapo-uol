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

function userStatusError(){
    console.log("status sending error");
    alert("Você foi desconectado. Desculpa, falha nossa ;)");
    clearInterval(statusInterval);
    window.location.reload();
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
    messageSection.innerHTML += `
    <div class="message" data-identifier="message">
    (${message.time}) <b>${message.from}</b> para <b>${message.to}</b>: ${message.text}
    </div>
    `;
    let lastMessage = messageSection.lastElementChild;
    lastMessage.scrollIntoView();

}