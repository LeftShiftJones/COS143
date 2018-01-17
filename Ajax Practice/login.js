function login(userName, password) {
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load",function() {
        console.log("hi");
        console.dir(this.response);
    });
    ajax.setResponseType="json";
    ajax.open("post","//cse.taylor.edu/~cos143/users.php");
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    ajax.send();
}
