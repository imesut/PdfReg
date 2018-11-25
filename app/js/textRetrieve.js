// This method works only when pdf is rendered with Text Layer
// It compares particular text/word element coordinates with
// the rectangle's coordinates. If text/word coordinates is in
// the rectangle, text has got. And successing texts are similar.
// Check out text layer rendering option at the article below.
// https://www.sitepoint.com/custom-pdf-rendering/

function getTextInRect(pageNumber, Xi, Yi, Xl, Yl) { // modify pageNumber if required
    // Get the page if page render method works like (page-1, page-2, ...)
    // If not, modify according to 
    var page = $("#page-" + pageNumber + " > div")[0];
    var textInRect = "";
    for (j = 0; j < page.childNodes.length; j++) {
        // get text parts
        var textPart = page.childNodes[j];
        // if text parts are between the rectangle borders
        if (textPart.style.left != "" & textPart.style.top != "") {
            textPartX = parseFloat(textPart.style.left.slice(0, -2));
            textPartY = parseFloat(textPart.style.top.slice(0, -2));
            // Get the text part
            if (textPartX > Xi & textPartX < Xl & textPartY > Yi & textPartY < Yl) {
                textInRect = textInRect + textPart.textContent;
            }
        }
    }
    // concatenated text
    return textInRect;
}


function getAllText() {
    allText = "";
    // for each rectangle
    for (i = 1; i <= $(".draggable").length; i++) {

        // get rectangle-i
        var el = $(".draggable:nth-child(" + i + ")");

        //get rectangle info
        var position = el.position(); // returns as array containing float
        var elHtml = el[0];
        var height = elHtml.style.height; // returns as string w px addition
        var width = elHtml.style.width; // returns as string w px addition

        // use postion data like position.left or position.top

        var Xi = position.left; // Xi
        var Yi = position.top; // Yi
        var Xl = position.left + parseFloat(width.slice(0, -2)); // Xl, clean px addition and convert to float
        var Yl = position.top + parseFloat(height.slice(0, -2)); // Yl

        // Calculating Page Number
        var _Yi = Yi;
        var _Yl = Yl;
        for (pageI = 1; pageI <= $(".page").length; pageI++) {
            // get Page height
            var pageHeight = $(".page:nth-child(" + pageI + ")")[0].getAttribute("height");

            //upside
            if (pageHeight > _Yi) {
                pageNumber = pageI; // set Page Number
                break;
            } else {
                _Yi = _Yi - pageHeight; // Decrease _Yi
            }
        }
        //bottomside, _Yi + h < pageHeight => Normal flow
        if (_Yi + (Yl - Yi) < pageHeight) {
            _Yl = _Yi + (Yl - Yi);

            // retrieve parameteres defined
            var textInRect = getTextInRect(pageNumber, Xi, _Yi, Xl, _Yl);

            allText = allText + " " + textInRect;
        } else { // error case
            throw "Rectangle doesn't ends at the same page."
        };
    }

    var link = document.createElement('a');
    mimeType = 'text/plain';
    var time = new Date();
    link.setAttribute('download', "output_" + (time.getUTCMonth() + 1) + "." + time.getUTCDate() + "_" + time.getUTCHours() + "." + time.getUTCMinutes() + "." + time.getUTCSeconds() + ".txt");
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(allText));
    link.click();
}