/*
Assignment 6's javascript file
Handles Ajax protocols for tracking login/user information
Ryan Jones | Thomas Taylor
*/

var re = /^[\w\d]{4,6}$/;
var currentUser = "";

loginButton.addEventListener("click", function () {
    createAccount.className = "hidden";
    updateAccount.className = "hidden";
    deleteAccount.className = "hidden";
    loginSection.classList.remove("hidden");
});
createButton.addEventListener("click", function () {
    loginSection.className = "hidden";
    updateAccount.className = "hidden";
    deleteAccount.className = "hidden";
    createAccount.classList.remove("hidden");
});
updateButton.addEventListener("click", function () {
    loginSection.className = "hidden";
    createAccount.className = "hidden";
    document.getElementById("deleteAccount").classList.add("hidden");
    document.getElementById("updateAccount").classList.remove("hidden");
    if (currentUser == "admin") {
        document.getElementById("adminUpdate").classList.remove("hidden");
    }
});
deleteButton.addEventListener("click", function () {
    loginSection.className = "hidden";
    createAccount.className = "hidden";
    document.getElementById("updateAccount").classList.add("hidden");
    document.getElementById("deleteAccount").classList.remove("hidden");
});

submitLogin.addEventListener("click", function () {
    login(username.value, password.value);
});
submitAccount.addEventListener("click", function () {
    addAccount(newUsername.value, newPassword.value);
});
submitUpdate.addEventListener("click", function () {
    updateAccount(updatePassword)
});
submitDelete.addEventListener("click", function () {
    deleteAccount(deleteUsername.value);
});
logoutButton.addEventListener("click", logout);

newUsername.addEventListener("keyup", function () {
    if (re.test(newUsername.value)) {
        newUsername.className = "good";
        usernameOK.innerHTML = "Username OK";
    } else {
        newUsername.className = "bad";
        usernameOK.innerHTML = "Username not OK";
    }
});

newPassword.addEventListener("keyup", function () {
    if (re.test(newPassword.value)) {
        newPassword.className = "good";
    } else {
        newPassword.className = "bad";
    }
});

updatePassword.addEventListener("keyup", function () {
    if (re.test(updatePassword.value) && updatePasswordConfirm.value == updatePassword.value) {
        updatePassword.className = "good";
        updatePasswordConfirm.className = "good";
    } else {
        updatePassword.className = "bad";
        updatePasswordConfirm.className = "bad";
    }
});

updatePasswordConfirm.addEventListener("keyup", function () {
    if (re.test(updatePasswordConfirm.value) && updatePasswordConfirm.value == updatePassword.value) {
        updatePasswordConfirm.className = "good";
        updatePassword.className = "good";
    } else {
        updatePasswordConfirm.className = "bad";
        updatePassword.className = "bad";
    }
});

///////////////////////////////////////////////////////////////////////////////////

/**
Function to log users into the system
*/
function login(username, password) {
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", function () {
        console.dir(this.response);
        if (this.response[0].status == true) {
            currentUser = username;
            //reset text fields
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            loginButton.classList.add("hidden");
            logoutButton.classList.remove("hidden");
            if (this.response[0].username === "admin") {
                createButton.classList.add("hidden");
                deleteButton.classList.remove("hidden");
                get.classList.remove("hidden");
            } else {
                createButton.classList.add("hidden");
            }
            loggedIn.innerHTML = "Logged in as " + currentUser;
            updateButton.classList.remove("hidden");
            messages.innerHTML = this.response[0].message;
            loginSection.classList.add("hidden");
        } else {
            alert("Invalid username/password combination");
        }
    });
    ajax.responseType = "json";
    ajax.open("POST", "//cse.taylor.edu/~cos143/sessions.php");
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var toSend = "name=" + username + "&password=" + password;
    console.log(toSend);
    ajax.send(toSend);
}

/**
Function to log users out of the system
*/
function logout() {
    var ajax = new XMLHttpRequest();
    var d = document.getElementById("messages");
    ajax.addEventListener("load", function () {
        if (this.response[0].status == true) {
            d.innerHTML = this.response[0].message;
            console.dir(this.response);
            logoutButton.classList.add("hidden");
            loginButton.classList.remove("hidden");
            createButton.classList.remove("hidden");
            deleteButton.classList.add("hidden");
            updateButton.classList.add("hidden");
            document.getElementById("deleteAccount").classList.add("hidden");
            document.getElementById("updateAccount").classList.add("hidden");
            get.classList.add("hidden");
            getUsers.classList.add("hidden");
            currentUser = "";
            loggedIn.innerHTML = "Not logged in";
        }
    });
    ajax.responseType = "json";
    ajax.open("POST", "//cse.taylor.edu/~cos143/sessions.php");
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var toSend = "method=delete";
    ajax.send(toSend);
}

function updateAccount() {
    var validPassword = re.test(updatePassword.value);
    if (updatePassword.value == updatePasswordConfirm.value && validPassword) {
        var ajax = new XMLHttpRequest();
        ajax.responseType = "json";

        var userToEdit = currentUser;
        if (currentUser == "admin") {
            userToEdit = updateUsername.value;
        }
        ajax.addEventListener("load", function () {
            if (this.response[0].status == true) {
                messages.innerHTML = "Password changed successfully for " + userToEdit;
            }
        });
        ajax.open("POST", "//cse.taylor.edu/~cos143/users.php");
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var toSend = "method=put&name=" + userToEdit + "&password=" + updatePassword.value;
        ajax.send(toSend);
    }
}

function deleteAccount(username) {
    var ajax = new XMLHttpRequest();
    ajax.responseType = "json";
    ajax.addEventListener("load", function () {
        if (this.response[0].status == true) {
            messages.innerHTML = username + " deleted";
            console.log(username + " deleted");
        } else {
            alert(username + " does not exist");
        }
    });
    ajax.open("POST", "//cse.taylor.edu/~cos143/users.php");
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var toSend = "method=delete&Name=" + username;
    ajax.send(toSend);
}

function addAccount(username, password) {
    if (re.test(username) & re.test(password)) {
        //Add checking for account name and password here
        var ajax = new XMLHttpRequest();
        ajax.responseType = "json";
        ajax.addEventListener("load", function () {
            if (this.response[0].status == true) {
                messages.innerHTML = this.response[0];
                console.log(this.response[0]);
                alert("New user '" + username + "' created");
                login(username, password);
                createAccount.className = "hidden";
                usernameOK.className = "hidden";
            } else {
                messages.innerHTML = this.response[0];
                console.log(this.response[0]);
            }
        });
        ajax.open("POST", "//cse.taylor.edu/~cos143/users.php");
        var newAccount = "name=" + username + "&password=" + password;
        ajax.send(newAccount);
    }
}

function getData() {
    var ajax = new XMLHttpRequest();
    ajax.responseType = "json";
    getUsers.classList.remove("hidden");
    ajax.addEventListener("load", function () {
        for (var i = 2; i < this.response.length; i++) {
            var row = getUsers.insertRow(-1);
            var cell = row.insertCell(0);
            cell.innerHTML = i - 1;
            cell = row.insertCell(1);
            cell.innerHTML = this.response[i].Name;
            cell = row.insertCell(2);
            cell.innerHTML = this.response[i].ID;
        }
        console.log("this.response=", this.response);
    });
    ajax.open("GET", "//cse.taylor.edu/~cos143/users.php")
    ajax.send();
}
