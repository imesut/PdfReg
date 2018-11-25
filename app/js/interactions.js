// Send kind as success, info, danger or warning
function showInfo(text, kind) {
    $("#onPageAlert")[0].classList.replace($("#onPageAlert")[0].classList[1], "alert-" + kind);
    $("#onPageAlert")[0].innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>' + text;
    $("#onPageAlert").fadeTo(1500, 500).slideUp(500, function () {
        $("#onPageAlert").slideUp(500);
    });
}