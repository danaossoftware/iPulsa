var messages;
var messageCounter = 0;
var userId;

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: SERVER_URL + 'get-user-id.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
            userId = a;
            $.ajax({
                type: 'GET',
                url: SERVER_URL + 'get-last-messages.php',
                dataType: 'text',
                cache: false,
                success: function (a) {
                    $("#loading-container").hide();
                    if (a < 0) {
                        // Error
                        showNoMessageInfo();
                    } else {
                        messages = JSON.parse(a);
                        if (messages.length == 0) {
                            showNoMessageInfo();
                        } else {
                            getMessage();
                        }
                    }
                }
            });
        }
    });
});

function showNoMessageInfo() {
    $("#chats").css("display", "none");
    $("#no-message-container").css("display", "flex");
}

function getMessage() {
    if (messageCounter >= messages.length) {
        return;
    }
    var message = messages[messageCounter];
    var displayedUserId;
    var senderId = message["sender_id"];
    var receiverId = message["receiver_id"];
    if (senderId == userId) {
        displayedUserId = receiverId;
    } else {
        displayedUserId = senderId;
    }
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-user-info-by-id.php',
        data: {'user-id': displayedUserId},
        dataType: 'text',
        cache: false,
        success: function(a) {
            var user = JSON.parse(a);
            var name = user["name"];
            var profilePictureURL = user["profile_picture_url"];
            if (profilePictureURL == "") {
                profilePictureURL = "img/profile_icon.png";
            }
            var lastMessage = message["last_message"];
            var date = new Date(parseInt(message["date"]));
            if (date.getHours() > 12) {
                date = ""+(date.getHours()%12)+":"+date.getMinutes()+" PM";
            } else {
                date = ""+date.getHours()+":"+date.getMinutes()+" AM";
            }
            $("#chats").append("" +
                "<div class='message' style=\"width: 100%; display: flex; flex-flow: row nowrap; align-items: center; height: 80px; position: relative;\">\n" +
                            "<div style='color: #888888; position: absolute; top: 10px; right: 10px; font-size: 13px;'>"+date+"</div>"+
                "            <img src=\""+profilePictureURL+"\" width=\"40px\" height=\"40px\" style=\"margin-left: 10px; border-radius: 50%;\">\n" +
                "            <div style=\"margin-left: 10px; display: flex; width: calc(100% - 50px); height: 100%; flex-flow: column nowrap;\">\n" +
                "                <div style=\"color: black; margin-top: 10px; font-weight: bold;; font-size: 18px;\">"+name+"</div>\n" +
                "                <div style=\"white-space: nowrap; color: #888888; margin-top: 10px; font-size: 12px;\">"+lastMessage+"</div>\n" +
                                "<div style='width: 100%; height: 1px; background-color: rgba(0, 0, 0, .1); margin-top: 10px;'></div>"+
                "            </div>\n" +
                "        </div>" +
                "");
            messageCounter++;
            setMessageClickListener();
        }
    });
}

function setMessageClickListener() {
    $(".message").unbind().on("click", function() {
        var index = $(this).parent().children().index(this);
        var senderId = messages[index]["sender_id"];
        var receiverId = messages[index]["receiver_id"];
        if (senderId == userId) {
            window.location.href = "send-message.html?id="+receiverId;
        } else {
            window.location.href = "send-message.html?id="+senderId;
        }
    });
}