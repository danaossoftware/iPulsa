var userInfo;
var postId;
var commentCounter = 0;
var comments;

$(document).ready(function () {
    var params = location.search;
    params = params.substr(1, params.length);
    postId = params.split("&")[0].split("=")[1];
    $.ajax({
        type: 'GET',
        url: SERVER_URL + 'get-user-info.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                userInfo = JSON.parse(a);
                getComments();
                $("#loading-container").hide();
            }
        }
    });
});

function getComments() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL + 'get-comments.php',
        data: {'post-id': postId},
        dataType: 'text',
        cache: false,
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                comments = JSON.parse(a);
                displayComment();
            }
        }
    });
}

function displayComment() {
    var comment = comments[commentCounter];
    var commenterId = comment["commenter"];
    $.ajax({
        type: 'GET',
        url: SERVER_URL + 'get-user-info-by-id.php',
        data: {'user-id': commenterId},
        dataType: 'text',
        cache: false,
        success: function (a) {
            var userInfo = JSON.parse(a);
            var profilePictureURL = userInfo["profile_picture_url"];
            if (profilePictureURL == "") {
                profilePictureURL = "img/profile-picture.png";
            }
            $("#comments").append("" +
                "<div style='width: calc(100% - 40px); display: flex; flex-flow: row nowrap; padding-left: 20px; padding-right: 20px; margin-top: 10px;'>" +
                "<img src='" + profilePictureURL + "' width='30px' height='30px' style='border-radius: 50%;'>" +
                "<div style='display: flex; flex-flow: column nowrap; margin-left: 10px; width: 100%;>'" +
                "<div style='color: black; font-weight: bold;; font-size: 16px;>'" +
                userInfo["name"] +
                "</div>" +
                "<div style='color: black;'>" +
                comment["comment"] +
                "</div>" +
                "<div style='width: 100%; height: 1px; background-color: rgba(0, 0, 0, .1); margin-top: 10px;'></div>" +
                "</div>" +
                "</div>"
            );
            commentCounter++;
            displayComment();
        }
    });
}

function comment() {
    var comment = $("#comment").val();
    if (comment == "") {
        return;
    }
    var profilePictureURL = userInfo["profile_picture_url"];
    if (profilePictureURL == "") {
        profilePictureURL = "img/profile-picture.png";
    }
    var fd = new FormData();
    fd.append("post-id", postId);
    fd.append("comment", comment);
    $.ajax({
        type: 'POST',
        url: SERVER_URL + 'add-comment.php',
        data: fd,
        contentType: false,
        processData: false,
        cache: false,
        success: function (a) {
            $("#comments").append("" +
                "<div style='width: calc(100% - 40px); display: flex; flex-flow: row nowrap; padding-left: 20px; padding-right: 20px; margin-top: 10px;'>" +
                "<img src='" + profilePictureURL + "' width='30px' height='30px' style='border-radius: 50%;'>" +
                "<div style='display: flex; flex-flow: column nowrap; margin-left: 10px; width: 100%;>'" +
                "<div style='color: black; font-weight: bold;; font-size: 16px;>'" +
                userInfo["name"] +
                "</div>" +
                "<div style='color: black;'>" +
                comment +
                "</div>" +
                "<div style='width: 100%; height: 1px; background-color: rgba(0, 0, 0, .1); margin-top: 10px;'></div>" +
                "</div>" +
                "</div>"
            );
        }
    });
}