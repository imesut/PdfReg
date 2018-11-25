# PdfReg

PdfReg is a javascript based web tool, which gets text at selected region of pdf document.

PdfReg is based on [Pdf.js](https://github.com/mozilla/pdf.js) with Text Layer render option and [Interact.js](https://github.com/taye/interact.js).


# How to use?

1. Go to app. Or clone this repo and open app/index.html file at your local.
2. Upload a pdf document.
3. Create rectangles where you want.
4. Click "Get All Text" button.

![Flow](asset/intro.gif)


# Notes

**How to get text at a region with Pdf.js?**

This gist will be helpfull [gist:getTextInRect.js](https://gist.github.com/imesut/d6d44db101b4a434064d88cfebe647eb) with text layer rendering option, check out the article about [how to enable text layering](https://www.sitepoint.com/custom-pdf-rendering/)