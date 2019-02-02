$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-posts.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            try {
                if (a < 0) {
                    // No posts
                } else {
                    var posts = JSON.parse(a);
                    var items = "";
                    for (var i = 0; i < posts.length; i++) {
                        var post = posts[i];
                        var mimeType = post["mime_type"].toString();
                        var userId = post["user_id"];
                        if (mimeType.match("^image")) {
                            items += "<div class=\"picture-feed\" style=\"width: 100%; display: flex; flex-flow: column nowrap; margin-top: 20px;\">\n" +
                                "    <div style=\"position: relative; height: 30px;\">\n" +
                                "        <div style=\"position: absolute; left: 10px; top: 0;\">\n" +
                                "            <img class=\"feed-profile-picture\" src=\"img/profile-picture.png\" width=\"30px\" height=\"30px\"\n" +
                                "                 style=\"border-radius: 50%;\">\n" +
                                "        </div>\n" +
                                "        <div style=\"position: absolute; left: 0; top: 0; width: 100%; display: flex; justify-content: center;\">\n" +
                                "            <div style=\"color: #222222; font-weight: bold;;\">User Name</div>\n" +
                                "        </div>\n" +
                                "        <div class=\"feed-menu-btn\"\n" +
                                "             style=\"position: absolute; top: 0; right: 10px; width: 100%; display: flex; justify-content: flex-end;\">\n" +
                                "            <div style=\"position: relative; width: 100%;\">\n" +
                                "                <div class=\"feed-menu\"\n" +
                                "                     style=\"position: absolute; padding-left: 15px; padding-right: 15px; top: 0; right: 0; border-radius: 10px; box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.6); background-color: white; display: none;\">\n" +
                                "                    <div class=\"save-to-gallery\"\n" +
                                "                         style=\"margin-top: 30px; color: #222222; font-weight: bold;;\">Save to Gallery\n" +
                                "                    </div>\n" +
                                "                    <div class=\"copy-link\" style=\"margin-top: 10px; color: #222222; font-weight: bold;;\">Copy\n" +
                                "                        Link\n" +
                                "                    </div>\n" +
                                "                    <div class=\"unfollow\" style=\"margin-top: 10px; color: #222222; font-weight: bold;;\">\n" +
                                "                        Unfollow\n" +
                                "                    </div>\n" +
                                "                    <div class=\"report\"\n" +
                                "                         style=\"margin-top: 10px; color: #222222; font-weight: bold;; margin-bottom: 15px;\">\n" +
                                "                        Report\n" +
                                "                    </div>\n" +
                                "                </div>\n" +
                                "                <img src=\"img/triangle.png\" width=\"20px\" height=\"10px\"\n" +
                                "                     style=\"position: absolute; top: 10px; right: 10px;\">\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "    </div>\n" +
                                "    <div style=\"margin-top: 10px; width: 100%; height: 300px;\">\n" +
                                "        <img class=\"feed-media\" width=\"100%\" height=\"100%\" style=\"object-fit: cover;\">\n" +
                                "    </div>\n" +
                                "    <div style=\"position: relative; height: 50px;\">\n" +
                                "        <div class=\"share-menu\"\n" +
                                "             style=\"opacity: 0; position: absolute; left: 0; top: 0; width: 100%; margin-top: 0; height: 60px; display: flex; justify-content: center;\">\n" +
                                "            <div style=\"background-color: white; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); display: flex; flex-flow: row nowrap; align-items: center;\">\n" +
                                "                <div style=\"background-color: #45cec4; border-radius: 10px; width: 60px; height: 100%; display: flex; justify-content: center; align-items: center;\">\n" +
                                "                    <img src=\"img/messages-4.png\" width=\"30px\" height=\"24px\">\n" +
                                "                </div>\n" +
                                "                <div style=\"margin-left: 30px; width: 40px; height: 100%; display: flex; justify-content: center; align-items: center;\">\n" +
                                "                    <img src=\"img/whatsapp.png\" width=\"30px\" height=\"30px\">\n" +
                                "                </div>\n" +
                                "                <div style=\"margin-left: 20px; width: 40px; height: 100%; display: flex; justify-content: center; align-items: center;\">\n" +
                                "                    <img src=\"img/facebook.png\" width=\"30px\" height=\"30px\">\n" +
                                "                </div>\n" +
                                "                <div style=\"margin-left: 20px; margin-right: 20px; width: 40px; height: 100%; display: flex; justify-content: center; align-items: center;\">\n" +
                                "                    <img src=\"img/instagram.png\" width=\"30px\" height=\"30px\">\n" +
                                "                </div>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div style=\"position: absolute; left: 0; top: 0; width: 100%; display: flex; flex-flow: row nowrap; margin-top: 5px; margin-left: 5px; margin-bottom: 5px;\">\n" +
                                "            <img src=\"img/dislike.png\" width=\"25px\" height=\"25px\">\n" +
                                "            <div style=\"margin-left: 3px; color: #222222; font-weight: bold;;\">999</div>\n" +
                                "            <img src=\"img/messages-3.png\" width=\"25px\" height=\"25px\" style=\"margin-left: 20px;\">\n" +
                                "            <div class=\"share-button-img\" style=\"margin-left: 3px; color: #222222; font-weight: bold;;\">99</div>\n" +
                                "            <img class=\"share-button\" src=\"img/share.png\" width=\"25px\" height=\"25px\" style=\"margin-left: 20px;\">\n" +
                                "        </div>\n" +
                                "    </div>\n" +
                                "</div>";
                        } else {
                            items += "<div class=\"video-feed\" style=\"width: 100%; display: flex; flex-flow: column nowrap; margin-top: 20px;\">\n" +
                                "    <div style=\"position: relative; height: 30px;\">\n" +
                                "        <div style=\"position: absolute; left: 10px; top: 0;\">\n" +
                                "            <img class=\"feed-profile-picture\" src=\"img/profile-picture.png\" width=\"30px\" height=\"30px\" style=\"border-radius: 50%;\">\n" +
                                "        </div>\n" +
                                "        <div style=\"position: absolute; left: 0; top: 0; width: 100%; display: flex; justify-content: center;\">\n" +
                                "            <div style=\"color: #222222; font-weight: bold;;\">User Name</div>\n" +
                                "        </div>\n" +
                                "        <div style=\"position: absolute; top: 0; right: 10px; width: 100%; display: flex; justify-content: flex-end;\">\n" +
                                "            <img src=\"img/triangle.png\" width=\"20px\" height=\"10px\">\n" +
                                "        </div>\n" +
                                "    </div>\n" +
                                "    <div style=\"margin-top: 10px; width: 100%; height: 300px;\">\n" +
                                "        <img class=\"feed-media\" width=\"100%\" height=\"100%\" style=\"object-fit: cover;\">\n" +
                                "    </div>\n" +
                                "    <div style=\"width: 100%; display: flex; flex-flow: row nowrap; margin-top: 5px; margin-left: 5px; margin-bottom: 5px;\">\n" +
                                "        <img src=\"img/dislike.png\" width=\"25px\" height=\"25px\">\n" +
                                "        <div style=\"margin-left: 3px; color: #222222; font-weight: bold;;\">999</div>\n" +
                                "        <img src=\"img/messages-3.png\" width=\"25px\" height=\"25px\" style=\"margin-left: 20px;\">\n" +
                                "        <div style=\"margin-left: 3px; color: #222222; font-weight: bold;;\">99</div>\n" +
                                "        <img src=\"img/share.png\" width=\"25px\" height=\"25px\" style=\"margin-left: 20px;\">\n" +
                                "    </div>\n" +
                                "</div>";
                        }
                    }
                    $("#feeds").append(items);
                    for (var i = 0; i < posts.length; i++) {
                        var post = posts[i];
                        var mediaURL = post.media_url;
                        var media = $("#feeds").find(".feed-media:eq(" + i + ")");
                        $("#feeds").find(".feed-menu-btn:eq(" + i + ")").on("click", function () {
                            var pictureFeed = $(this).parent().parent();
                            var index = pictureFeed.parent().children().index(pictureFeed);
                            if ($(this).find(".feed-menu").css("display") == "none") {
                                $(this).find(".feed-menu").css("display", "block");
                            } else {
                                $(this).find(".feed-menu").css("display", "none");
                            }
                        });
                        $("#feeds").find(".share-button:eq(" + i + ")").on("click", function () {
                            var shareMenu = $(this).parent().parent().find(".share-menu");
                            if (shareMenu.css("opacity") == "0") {
                                shareMenu.animate({
                                    top: "-70px",
                                    opacity: "1"
                                }, 500);
                            } else {
                                shareMenu.animate({
                                    top: "0",
                                    opacity: "0"
                                }, 500);
                            }
                        });
                        media.attr("src", mediaURL);
                        var mimeType = post.mime_type;
                        var userId = post.user_id;
                        $.ajax({
                            type: 'GET',
                            url: SERVER_URL + 'get-user-info-by-id.php',
                            data: {'user-id': userId},
                            dataType: 'text',
                            async: false,
                            cache: false,
                            success: function (a) {
                                if (a < 0) {
                                    // Error
                                } else {
                                    var user = JSON.parse(a);
                                    var profilePictureURL = user.profile_picture_url;
                                    var className;
                                    if (mimeType.match("^image")) {
                                        className = ".picture-feed";
                                    } else {
                                        className = ".video-feed";
                                    }
                                    var profilePicture = $("#feeds").find(".feed-profile-picture:eq(" + i + ")");
                                    profilePicture.attr("src", profilePictureURL);
                                }
                            },
                            error: function (a, b, c) {
                            }
                        });
                    }
                }
            } catch (e) {
                show(e.toString());
            }
        },
        error: function(a, b, c) {
        }
    });
});

function backKey() {
    Native.finishApp();
}