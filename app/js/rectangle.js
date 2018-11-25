// This function can take arguments: x, y, width, height
function addRectangle() {
    // get previous element
    var prevSelector = $(".draggable:nth-child(" + $(".draggable").length + ")")
    var prevEl = prevSelector[0];
    var x = prevEl.getAttribute("data-x");
    var y = prevEl.getAttribute("data-y");

    // Default new rectangle sizes
    var width = 100;
    var height = 100;

    // Define sizes and position if arguments passed
    if (arguments.length == 4) {
        x = arguments[0];
        // Y = dataY(previous element) + Y(new element) - ( Y(previous element) + H(previous element) )
        y = parseFloat(y) + parseFloat(arguments[1]) - (parseFloat(prevSelector.position().top) + parseFloat(prevEl.style.height.slice(0, -2)));
        width = arguments[2];
        height = arguments[3];
    }

    var itemNo = $(".draggable").length;

    document.getElementById("rectanglecontainer").innerHTML =
        document.getElementById("rectanglecontainer").innerHTML +
        '<div id="drag-' + itemNo.toString() + '" class="draggable" style="width: ' + width + 'px; height:' + height + 'px; ' +
        'transform: translate(' + x + 'px, ' + y + 'px)"' +
        'data-x="' + x + '"' +
        'data-y="' + y + '">' +
        '<p class="overlay">' + itemNo.toString() +
        '</p>\n</div>\n';
}
