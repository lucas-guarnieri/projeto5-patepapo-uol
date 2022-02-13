let chatUser;

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
    window.location.reload()
}
