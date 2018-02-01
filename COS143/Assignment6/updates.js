/** Assignment 6 | Ryan Jones | 2017/01/16 **/
var iterations = 0;
setInterval(getTime, 1000); //start timer

function getTime() { //make ajax request
    iterations++;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", getResponse);
    xhr.open("GET", "http://cse.taylor.edu/~cos143/time.php");
    xhr.send();
}
function getResponse() { //assign response based on iteration
    addToList(this.response, 0);
    if(iterations % 2 == 0) addToList(this.response, 1);
    if(iterations % 5 == 0) addToList(this.response, 2);
    if(iterations % 10 == 0) addToList(this.response, 3);
}

function addToList(value, listVal) { //set values
    var list = document.getElementsByTagName("ol")[listVal];
    var setLength = (listVal == 0 || listVal == 1) ? 5 : 2;
    if(list.children.length >= setLength) list.removeChild(list.children[0]);
    var item = document.createElement("li");
    item.innerHTML = value; 
    list.appendChild(item);
}
