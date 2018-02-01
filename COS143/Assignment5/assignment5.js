
//working
function add() {
    document.getElementById("status").innerHTML = "Just added a picture below this text";
    if (document.getElementById("picture") == null) {
        var newElem = document.createElement("img");
        var div = document.createElement("div");
        newElem.innerHTML = "<img src=\"https://upload.wikimedia.org/wikipedia/commons/5/57/Code.svg\" height=\"100px\">";
        div.id = "picture";
        div.appendChild(newElem);
        var p = document.getElementsByTagName("p")[0];
        document.body.insertBefore(div, p);
        document.getElementById("addButton")[0].innerHTML = "1. Add Content";
    } else {
        document.getElementById("picture").remove();
    }

}
 
//working
function remove() {
    document.getElementById("radioactive").remove();
    console.log("Element Removed");
    document.getElementById("status").innerHTML = "The radioactive image at the bottom left just dissappeared";
}

//working
function move() {
    /**
    Do stuff here
    */
    var move = document.getElementById("moveButton");
    move.parentNode.insertBefore(move, move.parentNode.children[0]);
    document.getElementById("status").innerHTML = "The button you just clicked got sent to the front of the button list";
}

//working
function modify() {
    var h1 = document.getElementsByTagName("h1")[0];
    if (h1.innerHTML == "Assignment Five: DOM Editing") {
        h1.innerHTML = "Assignment 5: DOM Editing";
    } else {
        h1.innerHTML = "Assignment Five: DOM Editing";
        document.getElementById("status").innerHTML = "The title just changed";
    }
}

//working
function changeAttribute(li) {
    if (li.innerHTML == "5. Change Attribute") {
        li.innerHTML = "5. Changed";
    } else {
        li.innerHTML = "5. Change Attribute";
    }
    document.getElementById("status").innerHTML = "The button you just clicked changed.";
}

//working
function changeStyle() {
    var change = document.getElementById("changeColor");
    if (change.style.color == "red") {
        change.style.color = "black";
    } else {
        change.style.color = "red";
    }
    document.getElementById("status").innerHTML = "The first paragraph's color just changed to red";
}

//Not working
function duplicate() {
    var copy = document.getElementById("duplicate").cloneNode(true);
    copy.innerHTML = "<br><br>" + copy.innerHTML;
    document.getElementsByTagName("p")[0].append(copy);
    document.getElementById("status").innerHTML = "The second paragraph just got appended to the end of the text";
}


var addButton           = document.getElementById("addButton");
var removeButton        = document.getElementById("removeButton");
var moveButton          = document.getElementById("moveButton");
var modifyButton        = document.getElementById("modifyButton");
var attributeButton     = document.getElementById("attributeButton");
var styleButton         = document.getElementById("styleButton");
var duplicateButton     = document.getElementById("duplicateButton");

addButton.addEventListener("click", add);
removeButton.addEventListener("click", remove);
moveButton.addEventListener("click", move);
modifyButton.addEventListener("click", modify);
attributeButton.addEventListener("click", changeAttribute);
styleButton.addEventListener("click", changeStyle);
duplicateButton.addEventListener("click", duplicate);
