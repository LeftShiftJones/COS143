
/**
Function to log users into the system
*/
function login(userName, password) {
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load",function() {
        messages.innerHTML = this.response[0].message;
        console.dir(this.response);
        if(this.response[0].status==true) {
            document.getElementById("username").value="";
            document.getElementById("password").value="";
        }
    });
    ajax.responseType="json";
    ajax.open("POST","//cse.taylor.edu/~cos143/sessions.php");
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var toSend = "name="+userName+"&password="+password;
    ajax.send(toSend);
}

/**
Function to log users out of the system
*/
function logout() {
    var ajax = new XMLHttpRequest();
    var d = document.getElementById("messages");
    ajax.addEventListener("load",function() {
        d.innerHTML = this.response[0].message;
        console.dir(this.response);
    });
    ajax.responseType="json";
    ajax.open("POST","//cse.taylor.edu/~cos143/sessions.php");
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var toSend = "method=delete";
    ajax.send(toSend);
}

loginButton.addEventListener("click", function() {
    login(username.value, password.value);
});

logoutButton.addEventListener("click", logout);
