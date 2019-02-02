var userId;
var followers;
var followerIds = [];

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-user-id.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            userId = a;
            $.ajax({
                type: 'GET',
                url: SERVER_URL+'get-followers.php',
                data: {'user-id': userId},
                dataType: 'text',
                cache: false,
                success: function(a) {
                    if (a < 0) {
                        // Error
                        $("#loading-container").hide();
                    } else {
                        followers = JSON.parse(a);
                        if (followers.length > 0) {
                            getFollowerId(0);
                        }
                    }
                }
            });
        }
    });
});

function getFollowerId(index) {
    if (index >= followers.length) {
        if (followerIds.length > 0) {
            followerIds.sort(function(a, b) {
                if (a["name"] < b["name"]) {
                    return -1;
                }
                if (a["name"] > b["name"]) {
                    return 1;
                }
                return 0;
            });
            displayFollower(0);
        }
    }
    var follower = followers[index];
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-user-info-by-id.php',
        data: {'user-id': follower["follower_id"]},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var userInfo = JSON.parse(a);
                var name = userInfo["name"];
                if (name == "") {
                    name = userInfo["email"];
                }
                followerIds.push({"id": follower["follower_id"], "name": name});
                getFollowerId(index+1);
            }
        }
    });
}

function displayFollower(index) {
    try {
        if (index >= followerIds.length) {
            $("#loading-container").hide();
            return;
        }
        var followerId = followerIds[index]["id"];
        $.ajax({
            type: 'GET',
            url: SERVER_URL + 'get-user-info-by-id.php',
            data: {'user-id': followerId},
            dataType: 'text',
            cache: false,
            success: function (a) {
                try {
                    if (a < 0) {
                        // Error
                        displayFollower(index + 1);
                    } else {
                        var user = JSON.parse(a);
                        var name = user["name"];
                        if (name == "") {
                            name = user["email"];
                        }
                        var profilePictureURL = user["profile_picture_url"];
                        if (profilePictureURL == "") {
                            profilePictureURL = "img/profile-picture.png";
                        }
                        $("#followers").append("" +
                            "<div class='follower' style='width: 100%; height: 60px; display: flex; flex-flow: row nowrap; align-items: center;'>" +
                            "<img src='" + profilePictureURL + "' width='40px' height='40px' style='margin-left: 10px; border-radius: 50%;'>" +
                            "<div style='color: black; margin-left: 10px; white-space: nowrap; margin-right: 10px;'>" + name + "</div>" +
                            "</div>"
                        );
                        displayFollower(index + 1);
                        setFollowerClickListener();
                    }
                } catch (e) {
                    show(e.toString());
                }
            }
        });
    } catch (e) {
        show(e.toString());
    }
}

function setFollowerClickListener() {
    $(".follower").unbind().on("click", function() {
        var index = $(this).parent().children().index(this);
        var followerId = followerIds[index]["id"];
        window.location.href = "send-message.html?user-id="+followerId;
    });
}