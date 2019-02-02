$(document).ready(function() {
});

function selectGallery() {
    $("#gallery-text").css("color", "#262626");
    $("#gallery-indicator").css("display", "block");
    $("#photo-text").css("color", "#989898");
    $("#photo-indicator").css("display", "none");
    $("#video-text").css("color", "#989898");
    $("#video-indicator").css("display", "none");
}

function selectPhoto() {
    $("#gallery-text").css("color", "#989898");
    $("#gallery-indicator").css("display", "none");
    $("#photo-text").css("color", "#262626");
    $("#photo-indicator").css("display", "block");
    $("#video-text").css("color", "#989898");
    $("#video-indicator").css("display", "none");
}

function selectVideo() {
    $("#gallery-text").css("color", "#989898");
    $("#gallery-indicator").css("display", "none");
    $("#photo-text").css("color", "#989898");
    $("#photo-indicator").css("display", "none");
    $("#video-text").css("color", "#262626");
    $("#video-indicator").css("display", "block");
}

function cancelUploading() {
    window.history.back();
}