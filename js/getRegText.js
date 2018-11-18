function getTextInRect(pageNumber, Xi, Yi, Xl, Yl) {
    var page = $("#page-" + pageNumber + " > div")[0];

    console.log(page);

    var textInRect = "";

    for (i = 0; i < page.childNodes.length; i++) {
        var el = page.childNodes[i];
        if (el.style.left != "" & el.style.top != "") {
            elX = parseFloat(el.style.left.slice(0, -2));
            elY = parseFloat(el.style.top.slice(0, -2));
            if (elX > Xi & elX < Xl & elY > Yi & elY < Yl) {
                textInRect = textInRect + el.textContent;
            }
        }

    }
    return textInRect;
}