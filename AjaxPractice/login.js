function login(userName, password) {
    var ajax = new XMLHttpRequest();
    var d = document.getElementById("messages");
    ajax.addEventListener("load",function() {
        console.log("hi");
        d.innerHTML = this.respons;
        console.dir(this.response);
    });
    ajax.setResponseType="json";
    ajax.open("POST","//cse.taylor.edu/~cos143/sessions.php");
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var toSend = "name="+userName+"&password="+password;
    ajax.send(toSend);
}
