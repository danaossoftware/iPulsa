var userId;
var following = false;
var unfollowing = false;
var followerCount = 0;
var followingCount = 0;
var posts;
var liked;
var currentPost;

$(document).ready(function() {
    var params = location.search;
    params = params.substr(1, params.length);
    userId = params.split("&")[0].split("=")[1];
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-follow-count.php',
        data: {'user-id': userId},
        dataType: 'text',
        cache: false,
        success: function(a) {
            var followCount = JSON.parse(a);
            followerCount = followCount["follower"];
            followingCount = followCount["following"];
            var followerCountText = followerCount;
            if (followerCount >= 1000) {
                followerCountText = followerCount/1000;
                followerCountText += "K";
            } else if (followerCount >= 1000000) {
                followerCountText = followerCount/1000000;
                followerCountText += "M";
            } else if (followerCount >= 1000000000) {
                followerCountText = followerCount/1000000000;
                followerCountText += "B";
            }
            var followingCountText = followingCount;
            if (followingCount >= 1000) {
                followingCountText = followingCount/1000;
                followingCountText += "K";
            } else if (followingCount >= 1000000) {
                followingCountText = followingCount/1000000;
                followingCountText += "M";
            } else if (followingCount >= 1000000000) {
                followingCountText = followingCount/1000000000;
                followingCountText += "B";
            }
            $("#follower-count").html(followerCountText);
            $("#following-count").html(followingCountText);
            $.ajax({
                type: 'GET',
                url: SERVER_URL+'is-following.php',
                data: {'user-id': userId},
                dataType: 'text',
                cache: false,
                success: function(a) {
                    $("#loading-container").hide();
                    if (a == 0) {
                        // Following
                        $("#follow-user").css("background-color", "#e74c3c");
                        $("#follow-user").html("Batal mengikuti");
                        $("#follow-user").attr("onclick", "unfollow()");
                    } else {
                        // Not following
                    }
                }
            });
        }
    });
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-user-info-by-id.php',
        data: {'user-id': userId},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var user = JSON.parse(a);
                var profilePictureURL = user["profile_picture_url"];
                $("#profile-picture").attr("src", profilePictureURL);
            }
        }
    });
    loadPosts();
});

function loadPosts() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-posts-by-id.php',
        data: {'user-id': userId},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                posts = JSON.parse(a);
                for (var i=0; i<posts.length; i++) {
                    var post = posts[i];
                    var mediaURL = post["media_url"];
                    if ((i%3) == 0) {
                        $("#posts").append("" +
                            "<div class='post' style='width: 33%; height: 150px; background-color: white;'>" +
                            "<div style='background-repeat: no-repeat; background-size: cover; object-fit: cover; width: calc(100% - 1px); height: calc(100% - 2px); margin-top: 1px; margin-bottom: 1px; margin-right: 1px; background-image: url(" + mediaURL + ");'" +
                            "</div>" +
                            "</div>"
                        );
                    } else if ((i%3) == 1) {
                        $("#posts").append("" +
                            "<div class='post' style='width: 33%; height: 150px; background-color: white;'>" +
                            "<div style='background-repeat: no-repeat; background-size: cover; object-fit: cover; width: calc(100% - 2px); height: calc(100% - 2px); margin-left: 1px; margin-top: 1px; margin-bottom: 1px; margin-right: 1px; background-image: url(" + mediaURL + ");'" +
                            "</div>" +
                            "</div>"
                        );
                    } else if ((i%3) == 2) {
                        $("#posts").append("" +
                            "<div class='post' style='width: 34%; height: 150px; background-color: white;'>" +
                            "<div style='background-repeat: no-repeat; background-size: cover; object-fit: cover; width: calc(100% - 1px); height: calc(100% - 2px); margin-left: 1px; margin-top: 1px; margin-bottom: 1px; background-image: url(" + mediaURL + ");'" +
                            "</div>" +
                            "</div>"
                        );
                    }
                }
                setPostClickListener();
            }
        }
    });
}

function setPostClickListener() {
    $(".post").unbind().click(function() {
        var index = $(this).parent().children().index(this);
        var post = posts[index];
        currentPost = post;
        $("#loading-container").css("display", "flex");
        $(document).click(function() {
            if(this != $("#post-container")[0]) {
                $("#post-container").hide();
            }
        });
        $.ajax({
            type: 'GET',
            url: SERVER_URL+'is-post-liked.php',
            data: {'post-id': post["id"]},
            dataType: 'text',
            cache: false,
            success: function(a) {
                if (a == 1) {
                    liked = true;
                } else {
                    liked = false;
                }
                if (liked) {
                    $("#like-img").attr("src", "img/like.png");
                }
                $("#post-container").css("display", "flex");
                $("#post-preview-img").attr("src", post["media_url"]);
                $("#loading-container").hide();
            }
        });
    });
}

function follow() {
    if (!following) {
        following = true;
        $.ajax({
            type: 'GET',
            url: SERVER_URL + 'follow.php',
            data: {'user-id': userId},
            dataType: 'text',
            cache: false,
            success: function (a) {
                $("#follow-user").css("background-color", "#e74c3c");
                $("#follow-user").html("Batal mengikuti");
                $("#follow-user").attr("onclick", "unfollow()");
                followerCount++;
                var followerCountText = followerCount;
                if (followerCount >= 1000) {
                    followerCountText = followerCount/1000;
                    followerCountText += "K";
                } else if (followerCount >= 1000000) {
                    followerCountText = followerCount/1000000;
                    followerCountText += "M";
                } else if (followerCount >= 1000000000) {
                    followerCountText = followerCount/1000000000;
                    followerCountText += "B";
                }
                $("#follower-count").html(followerCountText);
                following = false;
            }
        });
    }
}

function unfollow() {
    if (!unfollowing) {
        unfollowing = true;
        $.ajax({
            type: 'GET',
            url: SERVER_URL + 'unfollow.php',
            data: {'user-id': userId},
            dataType: 'text',
            cache: false,
            success: function (a) {
                $("#follow-user").css("background-color", "#079dab");
                $("#follow-user").html("Ikuti");
                $("#follow-user").attr("onclick", "follow()");
                followerCount--;
                var followerCountText = followerCount;
                if (followerCount >= 1000) {
                    followerCountText = followerCount/1000;
                    followerCountText += "K";
                } else if (followerCount >= 1000000) {
                    followerCountText = followerCount/1000000;
                    followerCountText += "M";
                } else if (followerCount >= 1000000000) {
                    followerCountText = followerCount/1000000000;
                    followerCountText += "B";
                }
                $("#follower-count").html(followerCountText);
                unfollowing = false;
            }
        });
    }
}

function likePost() {
    liked = !liked;
    if (liked) {
        $("#like-img").attr("src", "img/like.png");
        show("Disukai");
        $.ajax({
            type: 'GET',
            url: SERVER_URL+'like-post.php',
            data: {'post-id': currentPost["id"]},
            dataType: 'text',
            cache: false,
            success: function(a) {
            }
        });
    } else {
        $("#like-img").attr("src", "img/unlike.png");
        show("Batal disukai");
        $.ajax({
            type: 'GET',
            url: SERVER_URL+'dislike-post.php',
            data: {'post-id': currentPost["id"]},
            dataType: 'text',
            cache: false,
            success: function(a) {
            }
        });
    }
}

function sharePost() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('HEAD', url);
    xhttp.onreadystatechange = function () {
        if (this.readyState == this.DONE) {
            var mimeType = this.getResponseHeader("Content-Type");
            if (mimeType.match("^image")) {
                shareImage(currentPost["media_url"]);
            } else if (mimeType.match("^video")) {
                shareVideo(currentPost["media_url"]);
            }
        }
    };
    xhttp.send();
}

function comment() {
    window.location.href="comments.html?post_id="+currentPost["id"];
}