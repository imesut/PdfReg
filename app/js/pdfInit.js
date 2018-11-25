PDFJS = pdfjsLib;

var pdfData;
var base64marker = ';base64,';

function loadSelected() {
    var file = document.querySelector('input[type=file]').files[0];
    if (file) {
        // Remove pdf input area form html page
        $("#fileSelectArea").remove();
        
        // Uncomment and toggl below if just use for same directory files
        // if (document.querySelector('input[type=file]').files.length == 0) {
        //     filename = "sample.pdf";
        // } else {
        //     filename = file.name;
        // }

        var reader = new FileReader();
        reader.onloadend = function () {
            var base64result = reader.result;
            // Removes metadata tag at beginning "data:application/pdf;base64,"
            var base64Index = base64result.indexOf(base64marker) + base64marker.length;
            // pdf.js takes filename or atob data
            atobData = atob(base64result.substring(base64Index));
            loadPDF(atobData);
        }
        reader.readAsDataURL(file); //reads the data as a URL
    }
    else{
        // Show info to users
        showInfo("Please select a file.", 'warning');
    }
}

// Uncomment below if just use for same directory files with filename
// function loadPDF(filename) {
// pdfjsLib.getDocument(filename).then(

function loadPDF(atobData) {
    pdfjsLib.getDocument({
        data: atobData
    })
    .then(function (pdf) {
        var container = document.getElementById("pdfcontainer");
        var height = 0; // pdf pages div height

        // Render each page within for loop
        for (var i = 1; i <= pdf.numPages; i++) {

            pdf.getPage(i).then(
                function (page) {
                    var scale = 1;
                    var viewport = page.getViewport(scale);
                    var div = document.createElement("div");
                    div.setAttribute("id", "page-" + (page.pageIndex + 1));
                    div.setAttribute("class", "page");
                    var pageHeight = page.view[3] + 5 // textlayer approximately adds 5 px to each page
                    div.setAttribute("height", pageHeight);
                    div.setAttribute("style", "position: relative");
                    container.appendChild(div);

                    var canvas = document.createElement("canvas");
                    div.appendChild(canvas);
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };

                    height = height + pageHeight;
                    // Set main holder height as total height of pages
                    $("#holder")[0].style.height = height + "px";

                    // Set holder width to maximum width of the pages
                    if (parseFloat($("#holder")[0].style.width.slice(0, -2)) <= canvas.width) {
                        $("#holder")[0].style.width = (viewport.width + 0.5) + "px";
                    };

                    page.render(renderContext)
                    // Render with Text Layer
                    // credit: https://www.sitepoint.com/custom-pdf-rendering/
                    .then(
                        function () {
                            return page.getTextContent();
                    })
                    .then(
                        function (textContent) {
                            var textLayerDiv = document.createElement("div");
                            textLayerDiv.setAttribute("class", "textLayer");
                            div.appendChild(textLayerDiv);
                            var textLayer = new TextLayerBuilder({
                                textLayerDiv: textLayerDiv,
                                pageIndex: page.pageIndex,
                                viewport: viewport
                            });
                            textLayer.setTextContent(textContent);
                            textLayer.render();
                        });

                });

        };

    });
}