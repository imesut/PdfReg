function addRectangle() {
    var itemNo = $(".draggable").length + 1;

    document.getElementById("rectanglecontainer").innerHTML = document.getElementById("rectanglecontainer").innerHTML +
        '<div id="drag-' + itemNo.toString() + '" class="draggable" style="width: 100px; height:100px; ' +
        'transform: ' + $(".draggable:nth-child(" + $(".draggable").length + ")")[0].style.transform + '" '+
        'data-x="' + $(".draggable:nth-child(" + $(".draggable").length + ")")[0].getAttribute("data-x") + '"' + 
        'data-y="' + $(".draggable:nth-child(" + $(".draggable").length + ")")[0].getAttribute("data-y") + '">' +
        '<p class="overlay">' + itemNo.toString() +
        '</p>\n</div>\n';
}