function createUser(){
    console.log("createUser");
    const user = document.querySelector(".user").value;
    const newUser = { name: user };
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants ", newUser);

    promise.then(createUserSuccess);
    promise.catch(createUserError);
}

function createUserSuccess(){
    document.querySelector(".login-screen").classList.add("hidden");
}

function createUserError(){
    document.querySelector(".login-screen span").innerHTML = "Usuário já existe";
}