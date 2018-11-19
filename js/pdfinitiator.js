PDFJS = pdfjsLib;

function loadSelected() {
    var filename;
    if (document.querySelector('input[type=file]').files.length == 0) {
        filename = "sample.pdf";
    } else {
        filename = document.querySelector('input[type=file]').files[0].name;
    }
    loadPDF(filename);
}

function loadPDF(filename) {
    pdfjsLib.getDocument(filename).then(
        function (pdf) {
            var container = document.getElementById("pdfcontainer");
            var height = 0;

            for (var i = 1; i <= pdf.numPages; i++) {

                pdf.getPage(i).then(
                    function (page) {
                        var scale = 1;
                        var viewport = page.getViewport(scale);
                        var div = document.createElement("div");

                        div.setAttribute("id", "page-" + (page.pageIndex + 1));
                        div.setAttribute("class", "page");
                        var pageHeight = page.view[3]
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


                        page.render(renderContext).then(function () {
                            return page.getTextContent();
                        }).then(
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