var userId;
var posts;
var currentPost;
var liked = false;

$(document).ready(function() {
    $(document).on("click", function() {
        $("#post-container").hide();
    });
    $("#like-post").click(function(event) {
        event.stopPropagation();
        likePost();
    });
    $("#comment").click(function(event) {
        event.stopPropagation();
        $("#post-container").hide();
        comment();
    });
    $("#share-post").click(function(event) {
        event.stopPropagation();
        $("#post-container").hide();
        sharePost();
    });
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-user-id.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            userId = a;
            $.ajax({
                type: 'GET',
                url: SERVER_URL+'get-follow-count.php',
                data: {'user-id': userId},
                dataType: 'text',
                cache: false,
                success: function(a) {
                    var followData = JSON.parse(a);
                    var followerCount = followData["follower"];
                    var followingCount = followData["following"];
                    $("#follower-count").html(followerCount);
                    $("#following-count").html(followingCount);
                }
            });
        }
    });
    loadPosts();
});

function loadPosts() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-own-posts.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
                $("#posts").hide();
                $("#no-post-container").css("display", "flex");
            } else {
                posts = JSON.parse(a);
                $("#post-count").html(posts.length);
                for (var i = 0; i < posts.length; i++) {
                    var post = posts[i];
                    var mediaURL = post["media_url"];
                    if ((i % 3) == 0) {
                        $("#posts").append("" +
                            "<div class='post' style='width: 33%; height: 150px; background-color: white;'>" +
                            "<div style='background-repeat: no-repeat; background-size: cover; object-fit: cover; width: calc(100% - 1px); height: calc(100% - 2px); margin-top: 1px; margin-bottom: 1px; margin-right: 1px; background-image: url(" + mediaURL + ");'" +
                            "</div>" +
                            "</div>"
                        );
                    } else if ((i % 3) == 1) {
                        $("#posts").append("" +
                            "<div class='post' style='width: 33%; height: 150px; background-color: white;'>" +
                            "<div style='background-repeat: no-repeat; background-size: cover; object-fit: cover; width: calc(100% - 2px); height: calc(100% - 2px); margin-left: 1px; margin-top: 1px; margin-bottom: 1px; margin-right: 1px; background-image: url(" + mediaURL + ");'" +
                            "</div>" +
                            "</div>"
                        );
                    } else if ((i % 3) == 2) {
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
            $("#loading-container").hide();
        }
    });
}

function setPostClickListener() {
    $(".post").unbind().click(function() {
        $("#post-preview-img").click(function(event) {
            event.stopPropagation();
        });
        var index = $(this).parent().children().index(this);
        var post = posts[index];
        currentPost = post;
        $("#loading-container").css("display", "flex");
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