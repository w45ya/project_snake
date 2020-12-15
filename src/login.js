const container = document.getElementById('container');
const login_container = document.getElementById('login_container');
const loginButton = document.getElementById('loginButton');
const login = document.getElementById('login')
container.style.display = "none";
loginButton.style.fontSize = "20px";
loginButton.style.height = "50px";


loginButton.onclick = function(){
    if (login.value != ''){
        login_container.style.display = "none";
        container.style.display = "block";
    }
}