import Axios from 'axios'
const container = document.getElementById('container');
const login_container = document.getElementById('login_container');
const loginButton = document.getElementById('loginButton');
const inputLogin = document.getElementById('login')
const inputPassword = document.getElementById('password')
var login = null;
container.style.display = "none";
loginButton.style.fontSize = "20px";
loginButton.style.height = "50px";


export function signIn(username){
    login = username;
    console.log("Вошёл пользователь");
}

export function signOut(){
    login = null;
    console.log("Вышел пользователь");
}

export function loggedIn(){
    return login;
}

loginButton.onclick = function(){
    const axios = require('axios').default;
    axios.post('http://ng-2020-fall-meetings.azurewebsites.net/api/Authentication',{
        userName: inputLogin.value,
        password: inputPassword.value
    })
        .then(function (response){
            signIn(response.data.name);
            login_container.style.display = "none";
            container.style.display = "block";
        })
        .catch(function (error){
            signOut()
            console.log(error);
        })
}
/*
loginButton.onclick = function(){
    if (inputLogin.value != ''){
        login_container.style.display = "none";
        container.style.display = "block";
    }
}*/