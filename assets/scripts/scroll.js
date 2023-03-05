// ==== Scroll to results ==== //
$(function () {
    $('#filterbutton').click(function () {
        $('html, body').animate({
            scrollTop: $("#filterresults").offset().top
        }, 500);
        return false;
    })
});