var users;
var userCounter = 0;
var userId;
var action; //0 = send message, 1 = to follow

$(document).ready(function () {
    var params = location.search;
    params = params.substr(1, params.length);
    action = params.split("&")[0].split("=")[1];
});

function search() {
    var key = $("#key").val();
    if (key == "") {
        return;
    }
    key = key.toLowerCase();
    $("#users").find("*").remove();
    $("#loading-container").css("display", "flex");
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-user-id.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            userId = a;
            $.ajax({
                type: 'GET',
                url: SERVER_URL + 'find-user.php',
                data: {'key': key},
                dataType: 'text',
                cache: false,
                success: function (a) {
                    if (a < 0) {
                        // Error
                    } else {
                        users = JSON.parse(a);
                        displayUser();
                    }
                }
            });
        }
    });
}

function displayUser() {
    if (userCounter >= users.length) {
        $("#loading-container").hide();
        return;
    }
    var user = users[userCounter];
    var profilePictureURL = user["profile_picture_url"];
    if (profilePictureURL == "") {
        profilePictureURL = "img/profile_icon.png";
    }
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-followers.php',
        data: {'user-id': user["id"]},
        dataType: 'text',
        cache: false,
        success: function(a) {
            var followed = false;
            var followerCount = 0;
            if (a < 0) {
                // Error
                $("#loading-container").hide();
            } else {
                var followers = JSON.parse(a);
                followerCount = followers.length;
                for (var i=0; i<followers.length; i++) {
                    var follower = followers[i];
                    if (follower["follower_id"] == userId) {
                        followed = true;
                        break;
                    }
                }
            }
            var displayName = user["name"];
            if (displayName == "") {
                displayName = user["email"];
            }
            if (followed) {
                $("#users").append("" +
                    "<div style='background-color: white; margin-top: 10px; overflow: hidden; width: calc(100% - 30px); height: 50px; border-radius: 5px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2); display: flex; align-items: center; padding-left: 15px; padding-right: 15px; flex-flow: row nowrap; position: relative;'>" +
                    "   <img src='img/profile-picture.png' width='30px' height='30px'>" +
                    "   <div class='user' style='width: calc(100% - 20px); margin-left: 20px; flex-flow: column nowrap;'>" +
                    "       <div style='line-height: 15px; color: black; font-size: 20px;'>" + displayName + "</div>" +
                    "       <div style='color: #888888; font-size: 13px;'>" + followerCount + " pengikut</div>" +
                    "   </div>"+
                    "   <div class='check' style='position: absolute; top: 0; right: 0; width: 50px; height: 100%; display: none; justify-content: center; align-items: center;'>" +
                    "       <img src='img/check.png' width='25px' height='25px'>"+
                    "   </div>"+
                    "   <div class='remove' style='position: absolute; top: 0; right: 0; width: 50px; height: 100%; display: flex; justify-content: center; align-items: center;'>" +
                    "       <img class='remove-img' src='img/remove.png' width='25px' height='25px'>"+
                    "   </div>"+
                    "   <div class='follow-loading' style='position: absolute; top: 0; right: 0; width: 50px; height: 100%; display: none; justify-content: center; align-items: center;'>" +
                    "       <div class='loader-2'></div>"+
                    "   </div>"+
                    "</div>");
            } else {
                $("#users").append("" +
                    "<div style='background-color: white; margin-top: 10px; overflow: hidden; width: calc(100% - 30px); height: 50px; border-radius: 5px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2); display: flex; align-items: center; padding-left: 15px; padding-right: 15px; flex-flow: row nowrap; position: relative;'>" +
                    "   <img src='img/profile-picture.png' width='30px' height='30px'>" +
                    "   <div class='user' style='width: calc(100% - 20px); margin-left: 20px; flex-flow: column nowrap;'>" +
                    "       <div style='line-height: 15px; color: black; font-size: 20px;'>" + displayName + "</div>" +
                    "       <div style='color: #888888; font-size: 13px;'>" + followerCount + " pengikut</div>" +
                    "   </div>" +
                    "   <div class='check' style='position: absolute; top: 0; right: 0; width: 50px; height: 100%; display: none; justify-content: center; align-items: center;'>" +
                    "       <img src='img/check.png' width='25px' height='25px'>"+
                    "   </div>"+
                    "   <div class='add' style='position: absolute; top: 0; right: 0; width: 50px; height: 100%; display: flex; justify-content: center; align-items: center;'>" +
                    "       <img class='add-img' src='img/add.png' width='25px' height='25px'>"+
                    "   </div>"+
                    "   <div class='follow-loading' style='position: absolute; top: 0; right: 0; width: 50px; height: 100%; display: none; justify-content: center; align-items: center;'>" +
                    "       <div class='loader-2'></div>"+
                    "   </div>"+
                    "</div>");
            }
            userCounter++;
            displayUser();
            setUserClickListener();
            setAddButtonClickListener();
            setRemoveButtonClickListener();
        }
    });
}

function setUserClickListener() {
    $(".user").unbind().click(function() {
        var index = $(this).parent().parent().children().index($(this).parent());
        if (action == 0) {
            window.location.href = "send-message.html?user_id="+users[index]["id"];
        } else if (action == 1) {
            window.location.href = "view-user.html?user_id=" + users[index]["id"];
        }s
    });
}

function setAddButtonClickListener() {
    $(".add").unbind().click(function() {
        var index = $(this).parent().parent().children().index($(this).parent());
        $(this).css("display", "none");
        $(this).parent().find(".follow-loading").css("display", "flex");
        var addDiv = $(this);
        $.ajax({
            type: 'GET',
            url: SERVER_URL+'follow.php',
            data: {'user-id': users[index]["id"]},
            dataType: 'text',
            cache: false,
            success: function(a) {
                addDiv.parent().find(".follow-loading").css("display", "none");
                addDiv.parent().find(".check").css("display", "flex");
                addDiv.parent().find(".add-img").attr("src", "img/remove.png");
                addDiv.parent().find(".add-img").attr("class", "remove-img");
                addDiv.attr("class", "remove");
                setRemoveButtonClickListener();
            }
        });
    });
}

function setRemoveButtonClickListener() {
    $(".remove").unbind().click(function() {
        var index = $(this).parent().parent().children().index($(this).parent());
        $(this).css("display", "none");
        $(this).parent().find(".follow-loading").css("display", "flex");
        var removeDiv = $(this);
        $.ajax({
            type: 'GET',
            url: SERVER_URL+'unfollow.php',
            data: {'user-id': users[index]["id"]},
            dataType: 'text',
            cache: false,
            success: function(a) {
                removeDiv.parent().find(".follow-loading").css("display", "none");
                removeDiv.find(".remove-img").attr("src", "img/add.png");
                removeDiv.find(".remove-img").attr("class", "add-img");
                removeDiv.css("display", "flex");
                removeDiv.attr("class", "add");
                setAddButtonClickListener();
            }
        });
    });
}