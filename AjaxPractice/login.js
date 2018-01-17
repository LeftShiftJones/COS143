function login(userName, password) {
    var ajax = new XMLHttpRequest();
    //run this when we get a response back
    ajax.addEventListener("load", function() {
        console.dir(this.response);
        document.getElementById("messages").innerHTML = this.response;
    });

    ajax.open("post", "//cse.taylor.edu/~cos143/users.php");
    ajax.send();

}
