/*
Assignment 8's javascript file
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
            } else {
                createButton.classList.add("hidden");
            }
            loggedIn.innerHTML = "Logged in as " + currentUser;
            updateButton.classList.remove("hidden");
            messages.innerHTML = this.response[0].message;
            loginSection.classList.add("hidden");
            stocks.classList.remove("hidden");
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
            currentUser = "";
            loggedIn.innerHTML = "Not logged in";
            stocks.classList.add("hidden");
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
    console.log("get data: ticker=" + stockTicker.value
        + ", earliest=" + startDate.value
        + ", latest=" + endDate.value);
    var ajax = new XMLHttpRequest();
    ajax.responseType = "json";
    ajax.addEventListener("load", function () {
        console.log(this.response);
        console.log(startDate.innerHTML);
        if(this.response.dataset === undefined) {
            alert("ticker does not exist");
        } else {
            console.log("High=" + this.response.dataset.data[0][2]);
            var row = stockTable.insertRow(-1);
            //Symbol
            var cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.dataset_code;
            var close = this.response.dataset.data[0][4];
            var open = this.response.dataset.data[0][1];
            if(close <  open) {
                cell.style.color = "black";
                cell.style.background = "pink";
            } else if(open < close) {
                cell.style.background = "lightgreen";
                cell.style.color ="black";
            }
            //Company Name
            cell = row.insertCell(-1);
            var re = /^[^(]+/;
            var companyName = re.exec(this.response.dataset.name)[0].trim();
            cell.innerHTML = companyName;
            //Open
            cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.data[0][1];
            //Close
            cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.data[0][4];
            //High
            cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.data[0][2];
            //Low
            cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.data[0][3];
            //volume
            cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.data[0][5];
            cell = row.insertCell(-1);
            var chartButton = document.createElement("input");
            chartButton.setAttribute("type", "button");
            chartButton.setAttribute("value", "Print Chart");
            chartButton.setAttribute("class", "chartButtons");
            cell.appendChild(chartButton);
            cell = row.insertCell(-1);
            var chartButton = document.createElement("input");
            chartButton.setAttribute("type", "button");
            chartButton.setAttribute("value", "Add to Portfolio");
            chartButton.setAttribute("class", "chartButtons");
            cell.appendChild(chartButton);
        }

    });

    var start = startDate.value;
    var end = endDate.value;
    ajax.open("GET", "https://www.quandl.com/api/v3/datasets/WIKI/"
        + stockTicker.value
        + ".json?"
        + "start_date="
        + start
        + "&"
        + "end_date="
        + end
        + "&"
        + "api_key=FDRaapU4txZNpXzAyhfe");
    ajax.send();
}

getDataButton.addEventListener("click", getData);
