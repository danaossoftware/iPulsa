var userId;
var followers;
var followerIds = [];
var opponentUserId;
var messages;
var recording = false;
var recordingStream = null;
var pressTimer;
var clickDuration = 0;
var clickStart = 0;
var selecting = false;
var messageSelections = []; //0 = not selected, 1 = selected
var totalSelection = 0;
var messageSelectionMenuShown = false;
var currentEdittedMessageIndex = 0;
var chatMenuShown = false;
var forwardedMessages = [];
var attachmentShown = false;
var cameraTypeShown = false;
var galleryTypeShown = false;
/*
ATTACHMENT TYPES:
1 = Picture
2 = Video
3 = Location
4 = Document
5 = Contact
 */

$(document).ready(function () {
    var params = location.search;
    params = params.substr(1, params.length);
    opponentUserId = params.split("&")[0].split("=")[1];
    if (getLanguage() == 1) {
        $("#text7").html("Take picture");
        $("#text8").html("Record video");
        $("#text9").html("Message Info");
        $("#text10").html("Pick image");
        $("#text11").html("Pick video");
    }
    $.ajax({
        type: 'GET',
        url: SERVER_URL + 'get-user-id.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
            userId = a;
            $.ajax({
                type: 'GET',
                url: SERVER_URL + 'set-messages-read.php',
                data: {'sender-id': opponentUserId, 'receiver-id': userId},
                dataType: 'text',
                cache: false,
                success: function (a) {
                    getMessages();
                }
            });
            $.ajax({
                type: 'GET',
                url: SERVER_URL + 'get-followers.php',
                data: {'user-id': userId},
                dataType: 'text',
                cache: false,
                success: function (a) {
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
    $.ajax({
        type: 'GET',
        url: SERVER_URL + 'get-user-info-by-id.php',
        data: {'user-id': opponentUserId},
        dataType: 'text',
        cache: false,
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                var userInfo = JSON.parse(a);
                var profilePictureURL = userInfo["profile_picture_url"];
                if (profilePictureURL == "") {
                    profilePictureURL = "img/profile-picture.png";
                }
                $("#profile-picture").attr("src", profilePictureURL);
                $("#sender-name").html(userInfo["name"]);
            }
        }
    });
});

function getMessages() {
    var config = {
        apiKey: "AIzaSyDbWeuigsz-OgZEVtSAGwL6R3npzwfmgD4",
        authDomain: "ipulsa-bos.firebaseapp.com",
        databaseURL: "https://ipulsa-bos.firebaseio.com",
        projectId: "ipulsa-bos",
        storageBucket: "ipulsa-bos.appspot.com",
        messagingSenderId: "645656494342"
    };
    firebase.initializeApp(config);
    firebase.database().ref("message_notifications/" + userId).set({
        "new_message": 0
    });
    firebase.database().ref("message_notifications/" + opponentUserId).set({
        "new_message": 0
    });
    // Listen for message
    firebase.database().ref("message_notifications/" + userId + "/new_message").on("value", function (snapshot) {
        var newMessage = snapshot.val();
        if (newMessage == 1) {
            firebase.database().ref("message_notifications/" + userId).set({
                "new_message": 0
            });
            $.ajax({
                type: 'GET',
                url: SERVER_URL + 'get-last-message.php',
                data: {'sender-id': opponentUserId, 'receiver-id': userId},
                dataType: 'text',
                cache: false,
                success: function (a) {
                    if (a < 0) {
                        // Error
                    } else {
                        var message = JSON.parse(a);
                        $.ajax({
                            type: 'GET',
                            url: SERVER_URL + 'get-user-info-by-id.php',
                            data: {'user-id': opponentUserId},
                            dataType: 'text',
                            cache: false,
                            success: function (a) {
                                if (a < 0) {
                                    // Error
                                } else {
                                    var userInfo = JSON.parse(a);
                                    var profilePictureURL = userInfo["profile_picture_url"];
                                    if (profilePictureURL == "") {
                                        profilePictureURL = "img/profile-picture.png";
                                    }
                                    var sentDate = new Date(parseInt(message["sent_date"]));
                                    var hour = sentDate.getHours();
                                    hour %= 12;
                                    if (hour < 10) {
                                        hour = "0" + hour;
                                    }
                                    var minute = sentDate.getMinutes();
                                    if (minute < 10) {
                                        minute = "0" + minute;
                                    }
                                    var sentTime = hour + ":" + minute;
                                    if (sentDate.getHours() >= 12) {
                                        sentTime += (" " + "PM");
                                    } else {
                                        sentTime += (" " + "AM");
                                    }
                                    var msgDiv = $("<div class='opponent-message message'>" +
                                        "<img src='" + profilePictureURL + "' width='40px' height='40px' style='position: absolute; top: 0; left: 5px; border-radius: 50%; margin-top: 10px; margin-top: 10px;'>" +
                                        "<div class='opponent-message-inner'>" +
                                        "<div class='message-text' style='text-align: left; max-width: calc(100% - 20px);'>" + message["message"] + "</div>" +
                                        "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                                        "</div>" +
                                        "</div>").hide();
                                    $("#messages").append(msgDiv).css("margin-bottom", "70px");
                                    msgDiv.show();
                                    messageSelections.push(0);
                                    setMessageClickListener();
                                    scrollToBottom();
                                }
                            }
                        });
                    }
                }
            });
        }
    });
    $.ajax({
        type: 'GET',
        url: SERVER_URL + 'get-chats.php',
        data: {'receiver-id': opponentUserId},
        dataType: 'text',
        cache: false,
        success: function (a) {
            console.log(a);
            if (a < 0) {
                // Error
                $("#loading-container").hide();
            } else {
                messages = JSON.parse(a);
                if (messages.length > 0) {
                    displayMessage(0);
                } else {
                    $("#loading-container").hide();
                }
            }
        }
    });
};

function displayMessage(index) {
    if (index >= messages.length) {
        $("#loading-container").hide();
        return;
    }
    var message = messages[index];
    var senderId = message["sender_id"];
    var receiverId = message["receiver_id"];
    if (senderId == userId) {
        $.ajax({
            type: 'GET',
            url: SERVER_URL + 'get-user-info-by-id.php',
            data: {'user-id': userId},
            dataType: 'text',
            cache: false,
            success: function (a) {
                if (a < 0) {
                    // Error
                } else {
                    var userInfo = JSON.parse(a);
                    var profilePictureURL = userInfo["profile_picture_url"];
                    if (profilePictureURL == "") {
                        profilePictureURL = "img/profile-picture.png";
                    }
                    var sentDate = new Date(parseInt(message["sent_date"]));
                    var hour = sentDate.getHours();
                    hour %= 12;
                    if (hour < 10) {
                        hour = "0" + hour;
                    }
                    var minute = sentDate.getMinutes();
                    if (minute < 10) {
                        minute = "0" + minute;
                    }
                    var sentTime = hour + ":" + minute;
                    if (sentDate.getHours() >= 12) {
                        sentTime += (" " + "PM");
                    } else {
                        sentTime += (" " + "AM");
                    }
                    var attachmentType = message["attachment_type"];
                    var attachmentURL = message["attachment"];
                    if (attachmentURL == "") {
                        var msgDiv = $("<div class='my-message message'>" +
                            "<div class='my-message-inner'>" +
                            "<div class='message-text' style='text-align: right; max-width: calc(100% - 20px);'>" + message["message"] + "</div>" +
                            "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                            "</div>" +
                            "<img src='" + profilePictureURL + "' width='40px' height='40px' style='margin-right: 5px; border-radius: 50%; margin-top: 10px;'>" +
                            "</div>").hide();
                        $("#messages").append(msgDiv);
                        msgDiv.show();
                    } else {
                        if (attachmentType == 1) {
                            $("#messages").append("<div class='my-message message-img'>" +
                                "<div class='my-message-inner'>" +
                                "<img src='" + attachmentURL + "' width='100px' height='100px' style='border-radiu: 5px;'>" +
                                "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                                "</div>" +
                                "<img src='" + profilePictureURL + "' width='40px' height='40px' style='margin-right: 5px; border-radius: 50%; margin-top: 10px;'>" +
                                "</div>");
                        } else if (attachmentType == 2) {
                            $("#messages").append("<div class='my-message message-video'>" +
                                "<div class='my-message-inner'>" +
                                "<video width='100px' height='100px' style='border-radius: 5px;'>"+
                                "<source src='"+attachmentURL+"'>"+
                                "</video>" +
                                "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                                "</div>" +
                                "<img src='" + profilePictureURL + "' width='40px' height='40px' style='margin-right: 5px; border-radius: 50%; margin-top: 10px;'>" +
                                "</div>");
                        } else if (attachmentType == 3) {
                            $("#messages").append("" +
                                "<div class='my-message message-document'>" +
                                "<div class='my-message-inner'>" +
                                "<div style='width: calc(100% - 20px); height: 40px; background-color: #eeeeee; border: 1px solid #dddddd; border-radius: 10px; margin-left: 10px; margin-right: 10px; display: flex; flex-flow: row nowrap; align-items: center;';>"+
                                "<div style='width: calc(100% - 60px); margin-left: 10px; color: black; margin-right: 10px;'>"+fileName+"</div>"+
                                "<div style='width: 40px; height: 40px; border: 1px solid #dddddd; border-radius: 50%; display: flex; justify-content: center; align-items: center;'>"+
                                "<img src='img/download.png' width='20px' height='20px'>"+
                                "</div>"+
                                "</div>"+
                                "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                                "</div>" +
                                "<img src='" + profilePictureURL + "' width='40px' height='40px' style='position: absolute; top: 0; right: 5px; border-radius: 50%; margin-top: 10px;'>" +
                                "</div>");
                        } else if (attachmentType == 4) {
                            $("#messages").append("" +
                                "<div class='my-message message-document'>" +
                                "<div class='my-message-inner'>" +
                                "<div style='width: calc(100% - 20px); height: 40px; background-color: #eeeeee; border: 1px solid #dddddd; border-radius: 10px; margin-left: 10px; margin-right: 10px; display: flex; flex-flow: row nowrap; align-items: center;';>"+
                                "<div style='width: calc(100% - 60px); margin-left: 10px; color: black; margin-right: 10px;'>"+message["attachment_name"]+"</div>"+
                                "<div style='width: 40px; height: 40px; border: 1px solid #dddddd; border-radius: 50%; display: flex; justify-content: center; align-items: center;'>"+
                                "<img src='img/download.png' width='20px' height='20px'>"+
                                "</div>"+
                                "</div>"+
                                "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                                "</div>" +
                                "<img src='" + profilePictureURL + "' width='40px' height='40px' style='position: absolute; top: 0; right: 5px; border-radius: 50%; margin-top: 10px;'>" +
                                "</div>"
                            );
                        }
                    }
                    messageSelections.push(0);
                    setMessageClickListener();
                    scrollToBottom();
                    displayMessage(index + 1);
                }
            }
        });
    } else if (senderId == opponentUserId) {
        $.ajax({
            type: 'GET',
            url: SERVER_URL + 'get-user-info-by-id.php',
            data: {'user-id': opponentUserId},
            dataType: 'text',
            cache: false,
            success: function (a) {
                if (a < 0) {
                    // Error
                } else {
                    var userInfo = JSON.parse(a);
                    var profilePictureURL = userInfo["profile_picture_url"];
                    if (profilePictureURL == "") {
                        profilePictureURL = "img/profile-picture.png";
                    }
                    var sentDate = new Date(parseInt(message["sent_date"]));
                    var hour = sentDate.getHours();
                    hour %= 12;
                    if (hour < 10) {
                        hour = "0" + hour;
                    }
                    var minute = sentDate.getMinutes();
                    if (minute < 10) {
                        minute = "0" + minute;
                    }
                    var sentTime = hour + ":" + minute;
                    if (sentDate.getHours() >= 12) {
                        sentTime += (" " + "PM");
                    } else {
                        sentTime += (" " + "AM");
                    }
                    var attachmentType = message["attachment_type"];
                    var attachmentURL = message["attachment"];
                    if (attachmentURL == "") {
                        $("#messages").append("" +
                            "<div class='opponent-message message'>" +
                            "<img src='" + profilePictureURL + "' width='40px' height='40px' style='margin-left: 5px; border-radius: 50%; margin-top: 10px;'>" +
                            "<div class='opponent-message-inner'>" +
                            "<div class='message-text' style='text-align: left; max-width: calc(100% - 20px);'>" + message["message"] + "</div>" +
                            "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                            "</div>" +
                            "</div>"
                        );
                    } else {
                        if (attachmentType == 1) {
                            $("#messages").append("" +
                                "<div class='opponent-message message-img'>" +
                                "<img src='" + profilePictureURL + "' width='40px' height='40px' style='margin-left: 5px; border-radius: 50%; margin-top: 10px;'>" +
                                "<div class='opponent-message-inner'>" +
                                "<img src='" + attachmentURL + "' width='100px' height='100px' style='border-radiu: 5px;'>" +
                                "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                                "</div>" +
                                "</div>"
                            );
                        } else if (attachmentType == 2) {
                            $("#messages").append("" +
                                "<div class='opponent-message message-img'>" +
                                "<video width='100px' height='100px' style='border-radius: 5px;'>"+
                                "<source src='"+attachmentURL+"'>"+
                                "</video>" +
                                "<div class='opponent-message-inner'>" +
                                "<img src='" + attachmentURL + "' width='100px' height='100px' style='border-radiu: 5px;'>" +
                                "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                                "</div>" +
                                "</div>"
                            );
                        }
                    }
                    messageSelections.push(0);
                    setMessageClickListener();
                    scrollToBottom();
                    displayMessage(index + 1);
                }
            }
        });
    }
}

function setMessageClickListener() {
    $(".message").unbind().on("click", function (e) {
        if (selecting) {
            var index = $(this).parent().children().index(this);
            var selected = messageSelections[index];
            if (selected == 0) {
                selected = 1;
                totalSelection++;
            } else {
                selected = 0;
                totalSelection--;
            }
            messageSelections[index] = selected;
            if (selected == 0) {
                $(this).css("background-color", "white");
            } else if (selected == 1) {
                $(this).css("background-color", "#c1ebea");
            }
            if (getLanguage() == 0) {
                $("#messages-selected").html("" + totalSelection + " pesan dipilih");
            } else if (getLanguage() == 1) {
                $("#messages-selected").html("" + totalSelection + " messages selected");
            }
        } else {
            var index = $(this).parent().children().index(this);
            var message = messages[index];
            $("#sent").html("Dikirim: -");
            $("#read").html("Dibaca: -");
            $("#message-info-container").css("display", "flex");
            $.ajax({
                type: 'GET',
                url: SERVER_URL + 'get-message-info.php',
                data: {'message-id': message["id"]},
                dataType: 'text',
                cache: false,
                success: function (a) {
                    if (a < 0) {
                        // Error
                    } else {
                        var messageInfo = JSON.parse(a);
                        var sentDate = messageInfo["sent_date"];
                        var readDate = messageInfo["read_date"];
                        var monthNames = [
                            "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"
                        ];
                        var date = new Date(parseInt(sentDate));
                        var day = date.getDate();
                        var month = monthNames[date.getMonth()];
                        var year = date.getFullYear();
                        var hour = date.getHours();
                        if (hour < 10) {
                            hour = "0" + hour;
                        }
                        var minute = date.getMinutes();
                        if (minute < 10) {
                            minute = "0" + minute;
                        }
                        $("#sent").html("Dikirim: " + day + " " + month + " " + year + ", jam " + hour + ":" + minute);
                        date = new Date(parseInt(readDate));
                        day = date.getDate();
                        month = monthNames[date.getMonth()];
                        year = date.getFullYear();
                        hour = date.getHours();
                        if (hour < 10) {
                            hour = "0" + hour;
                        }
                        minute = date.getMinutes();
                        if (minute < 10) {
                            minute = "0" + minute;
                        }
                        $("#read").html("Dibaca: " + day + " " + month + " " + year + ", jam " + hour + ":" + minute);
                    }
                }
            });
        }
    });
    $(".message-img").unbind().on("click", function() {
        if (selecting) {
            var index = $(this).parent().children().index(this);
            var selected = messageSelections[index];
            if (selected == 0) {
                selected = 1;
                totalSelection++;
            } else {
                selected = 0;
                totalSelection--;
            }
            messageSelections[index] = selected;
            if (selected == 0) {
                $(this).css("background-color", "white");
            } else if (selected == 1) {
                $(this).css("background-color", "#c1ebea");
            }
            if (getLanguage() == 0) {
                $("#messages-selected").html("" + totalSelection + " pesan dipilih");
            } else if (getLanguage() == 1) {
                $("#messages-selected").html("" + totalSelection + " messages selected");
            }
        } else {
            var index = $(this).parent().children().index(this);
            var message = messages[index];
            var attachmentURL = message["attachment"];
            showImage(attachmentURL);
        }
    });
    $(".message-video").unbind().on("click", function() {
        if (selecting) {
            var index = $(this).parent().children().index(this);
            var selected = messageSelections[index];
            if (selected == 0) {
                selected = 1;
                totalSelection++;
            } else {
                selected = 0;
                totalSelection--;
            }
            messageSelections[index] = selected;
            if (selected == 0) {
                $(this).css("background-color", "white");
            } else if (selected == 1) {
                $(this).css("background-color", "#c1ebea");
            }
            if (getLanguage() == 0) {
                $("#messages-selected").html("" + totalSelection + " pesan dipilih");
            } else if (getLanguage() == 1) {
                $("#messages-selected").html("" + totalSelection + " messages selected");
            }
        } else {
            var index = $(this).parent().children().index(this);
            var message = messages[index];
            var attachmentURL = message["attachment"];
            showVideo(attachmentURL);
        }
    });
    $(".message-map").unbind().on("click", function() {
        if (selecting) {
            var index = $(this).parent().children().index(this);
            var selected = messageSelections[index];
            if (selected == 0) {
                selected = 1;
                totalSelection++;
            } else {
                selected = 0;
                totalSelection--;
            }
            messageSelections[index] = selected;
            if (selected == 0) {
                $(this).css("background-color", "white");
            } else if (selected == 1) {
                $(this).css("background-color", "#c1ebea");
            }
            if (getLanguage() == 0) {
                $("#messages-selected").html("" + totalSelection + " pesan dipilih");
            } else if (getLanguage() == 1) {
                $("#messages-selected").html("" + totalSelection + " messages selected");
            }
        } else {
            var index = $(this).parent().children().index(this);
            var message = messages[index];
            try {
                var latitude = message["latitude"];
                var longitude = message["longitude"];
                var os = getMobileOperatingSystem();
                if (os == "Android") {
                    Native.showLocation(latitude, longitude);
                }
            } catch (e) {
                console.log(e.toString());
            }
        }
    });
    $(".message-document").unbind().on("click", function() {
        if (selecting) {
            var index = $(this).parent().children().index(this);
            var selected = messageSelections[index];
            if (selected == 0) {
                selected = 1;
                totalSelection++;
            } else {
                selected = 0;
                totalSelection--;
            }
            messageSelections[index] = selected;
            if (selected == 0) {
                $(this).css("background-color", "white");
            } else if (selected == 1) {
                $(this).css("background-color", "#c1ebea");
            }
            if (getLanguage() == 0) {
                $("#messages-selected").html("" + totalSelection + " pesan dipilih");
            } else if (getLanguage() == 1) {
                $("#messages-selected").html("" + totalSelection + " messages selected");
            }
        } else {
            var index = $(this).parent().children().index(this);
            var message = messages[index];
            var os = getMobileOperatingSystem();
            if (os == "Android") {
                Native.downloadFile(message["attachment"]);
            }
        }
    });
    $(".message-contact").unbind().on("click", function() {
        if (selecting) {
            var index = $(this).parent().children().index(this);
            var selected = messageSelections[index];
            if (selected == 0) {
                selected = 1;
                totalSelection++;
            } else {
                selected = 0;
                totalSelection--;
            }
            messageSelections[index] = selected;
            if (selected == 0) {
                $(this).css("background-color", "white");
            } else if (selected == 1) {
                $(this).css("background-color", "#c1ebea");
            }
            if (getLanguage() == 0) {
                $("#messages-selected").html("" + totalSelection + " pesan dipilih");
            } else if (getLanguage() == 1) {
                $("#messages-selected").html("" + totalSelection + " messages selected");
            }
        } else {
            var index = $(this).parent().children().index(this);
            var message = messages[index];
            var os = getMobileOperatingSystem();
            if (os == "Android") {
                Native.addContact(message["contact_number"]);
            }
        }
    });
}

function sendMessage() {
    var message = $("#message").val();
    if (message == "") {
        return;
    }
    $("#message").val("");
    var fd = new FormData();
    fd.append("receiver-id", opponentUserId);
    fd.append("message", message);
    fd.append("attachment-type", 0);
    fd.append("attachment-url", "");
    fd.append("address", "");
    fd.append("latitude", 0);
    fd.append("longitude", 0);
    fd.append("language", getLanguage());
    $.ajax({
        type: 'POST',
        url: SERVER_URL + 'send-message.php',
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function (a) {
            var messageInfo = JSON.parse(a);
            messages.push(messageInfo);
            firebase.database().ref("message_notifications/" + opponentUserId).set({
                "new_message": 1
            });
            $.ajax({
                type: 'GET',
                url: SERVER_URL + 'get-user-info-by-id.php',
                data: {'user-id': userId},
                dataType: 'text',
                cache: false,
                success: function (a) {
                    if (a < 0) {
                        // Error
                    } else {
                        var userInfo = JSON.parse(a);
                        var profilePictureURL = userInfo["profile_picture_url"];
                        if (profilePictureURL == "") {
                            profilePictureURL = "img/profile-picture.png";
                        }
                        var sentDate = new Date();
                        var hour = sentDate.getHours();
                        hour %= 12;
                        if (hour < 10) {
                            hour = "0" + hour;
                        }
                        var minute = sentDate.getMinutes();
                        if (minute < 10) {
                            minute = "0" + minute;
                        }
                        var sentTime = hour + ":" + minute;
                        if (sentDate.getHours() >= 12) {
                            sentTime += (" " + "PM");
                        } else {
                            sentTime += (" " + "AM");
                        }
                        $("#messages").append("" +
                            "<div class='my-message message'>" +
                            "<div class='my-message-inner'>" +
                            "<div class='message-text' style='text-align: right; max-width: calc(100% - 20px);'>" + message + "</div>" +
                            "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                            "</div>" +
                            "<img src='" + profilePictureURL + "' width='40px' height='40px' style='position: absolute; top: 0; right: 5px; border-radius: 50%; margin-top: 10px;'>" +
                            "</div>"
                        );
                        messageSelections.push(0);
                        setMessageClickListener();
                        scrollToBottom();
                        selecting = false;
                        messageSelectionMenuShown = false;
                        $(".message").css("background-color", "white");
                        $("#message-selection-menu").hide();
                        $("#select-messages-container").hide();
                    }
                }
            });
        }
    });
}

function scrollToBottom() {
    $("html, body").animate({scrollTop: $("#messages").height()}, 0);
}

function closeMessageInfoDialog() {
    $("#message-info-container").hide();
}

function record() {
    if (recording) {
        //show("Rekaman berhasil dibuat. Mengirim rekaman...");
        if (recordingStream != null) {
            recordingStream.stop();
        }
        recording = false;
    } else {
        //show("Klik tombol 'Rekam' lagi untuk menghentikan rekaman.");
        navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(function (stream) {
            recordingStream = stream.getTracks()[0];
        });
        recording = true;
    }
}

function openMenu() {
    chatMenuShown = !chatMenuShown;
    if (chatMenuShown) {
        $("#chat-menu").css("display", "flex");
    } else {
        $("#chat-menu").css("display", "none");
    }
}

function markMessages() {
    $("#chat-menu").css("display", "none");
    $("#select-messages-container").css("display", "flex");
    selecting = true;
}

function deleteAllMessages() {
    $("#chat-menu").css("display", "none");
    $("#prompt-title").html("Hapus Pesan");
    $("#prompt-message").html("Apakah Anda yakin ingin menghapus semua pesan?");
    $("#prompt-ok").on("click", function () {
        $("#prompt-container").hide();
        messages = [];
        $("#messages").find("*").remove();
        messageSelections = [];
    });
    $("#prompt-cancel").on("click", function () {
        $("#prompt-container").hide();
    });
    $("#prompt-container").css("display", "flex");
}

function showMessageSelectionMenu() {
    messageSelectionMenuShown = !messageSelectionMenuShown;
    if (messageSelectionMenuShown) {
        $("#message-selection-menu").css("display", "flex");
    } else {
        $("#message-selection-menu").css("display", "none");
    }
}

function editMessage() {
    $("#message-selection-menu").hide();
    if (totalSelection == 0) {
        $("#alert-title").html("Peringatan");
        $("#alert-message").html("Jumlah pesan yang bisa diedit minimal 1.")
        $("#alert-container").css("display", "flex");
        $("#alert-ok").on("click", function () {
            $("#alert-container").hide();
        });
    } else if (totalSelection > 1) {
        $("#alert-title").html("Peringatan");
        $("#alert-message").html("Hanya 1 pesan yang diperbolehkan untuk diedit.")
        $("#alert-container").css("display", "flex");
        $("#alert-ok").on("click", function () {
            $("#alert-container").hide();
        });
    } else {
        var selectedMessageIndex = 0;
        for (var i = 0; i < messageSelections.length; i++) {
            if (messageSelections[i] == 1) {
                selectedMessageIndex = i;
                break;
            }
        }
        currentEdittedMessageIndex = selectedMessageIndex;
        var title = "Edit pesan";
        if (getLanguage() == 1) {
            title = "Edit message";
        }
        showTextAreaDialog(1, getLanguage(), title, messages[selectedMessageIndex]["message"]);
    }
}

function replyMessage() {
    $("#message-selection-menu").hide();
    if (totalSelection == 0) {
        $("#alert-title").html("Peringatan");
        $("#alert-message").html("Jumlah pesan yang bisa dibalas minimal 1.")
        $("#alert-container").css("display", "flex");
        $("#alert-ok").on("click", function () {
            $("#alert-container").hide();
        });
    } else if (totalSelection > 1) {
        $("#alert-title").html("Peringatan");
        $("#alert-message").html("Hanya 1 pesan yang diperbolehkan untuk dibalas.")
        $("#alert-container").css("display", "flex");
        $("#alert-ok").on("click", function () {
            $("#alert-container").hide();
        });
    } else {
        var selectedMessageIndex = 0;
        for (var i = 0; i < messageSelections.length; i++) {
            if (messageSelections[i] == 1) {
                selectedMessageIndex = i;
                break;
            }
        }
        currentEdittedMessageIndex = selectedMessageIndex;
        $("#message").val("@" + messages[currentEdittedMessageIndex]["message"] + " ");
    }
}

function deleteMessage() {
    if (totalSelection == 0) {
        messageSelectionMenuShown = false;
        $("#message-selection-menu").hide();
        $("#alert-title").html("Peringatan");
        $("#alert-message").html("Jumlah pesan yang bisa dihapus minimal 1.")
        $("#alert-container").css("display", "flex");
        $("#alert-ok").on("click", function () {
            $("#alert-container").hide();
        });
        return;
    }
    $("#message-selection-menu").hide();
    $("#prompt-title").html("Hapus Pesan");
    $("#prompt-message").html("Apakah Anda yakin ingin menghapus pesan yang Anda pilih?");
    $("#prompt-ok").on("click", function () {
        $("#prompt-container").hide();
        $("#loading-container").css("display", "flex");
        var selectedMessageIndexes = [];
        for (var i = 0; i < messageSelections.length; i++) {
            var selected = messageSelections[i];
            if (selected == 1) {
                selectedMessageIndexes.push(i);
            }
        }
        if (selectedMessageIndexes.length > 0) {
            $("#loading-container").css("display", "flex");
            deleteMessages(0, selectedMessageIndexes);
        }
    });
    $("#prompt-cancel").on("click", function () {
        $("#prompt-container").hide();
    });
    $("#prompt-container").css("display", "flex");
}

function deleteMessages(counter, indexes) {
    if (counter >= indexes.length) {
        $("#loading-container").hide();
        return;
    }
    var message = messages[indexes[counter]];
    var messageId = message["id"];
    $.ajax({
        type: 'GET',
        url: SERVER_URL + 'delete-message.php',
        data: {'id': messageId},
        dataType: 'text',
        cache: false,
        success: function (a) {
            deleteMessages(counter + 1, indexes);
        }
    });
}

function copyMessage() {
    $(".message").css("background-color", "white");
    selecting = false;
    messageSelectionMenuShown = false;
    $("#message-selection-menu").hide();
    $("#select-messages-container").hide();
    var copiedText = "";
    for (var i = 0; i < messageSelections.length; i++) {
        if (messageSelections[i] == 1) {
            copiedText += messages[i]["message"];
            copiedText += " ";
        }
    }
    Native.addToClipboard(copiedText);
    if (getLanguage() == 0) {
        show("Teks disalin");
    } else if (getLanguage() == 1) {
        show("Text copied");
    }
}

function clearSelection() {
    $("#message-selection-menu").hide();
    for (var i=0; i<messageSelections.length; i++) {
        messageSelections[i] = 0;
    }
    $(".message").css("background-color", "white");
}

function shareMessage() {
    $("#message-selection-menu").hide();
    if (totalSelection == 0) {
        $("#alert-title").html("Peringatan");
        $("#alert-message").html("Jumlah pesan yang bisa disebarkan minimal 1.")
        $("#alert-container").css("display", "flex");
        $("#alert-ok").on("click", function () {
            $("#alert-container").hide();
        });
    } else if (totalSelection > 1) {
        $("#alert-title").html("Peringatan");
        $("#alert-message").html("Hanya 1 pesan yang diperbolehkan untuk disebarkan.")
        $("#alert-container").css("display", "flex");
        $("#alert-ok").on("click", function () {
            $("#alert-container").hide();
        });
    } else {
        var selectedMessageIndex = 0;
        for (var i = 0; i < messageSelections.length; i++) {
            if (messageSelections[i] == 1) {
                selectedMessageIndex = i;
                break;
            }
        }
        Native.shareMessage(messages[selectedMessageIndex]["message"]);
    }
}

function forwardMessage() {
    if (totalSelection == 0) {
        $("#alert-title").html("Peringatan");
        $("#alert-message").html("Jumlah pesan yang bisa diteruskan minimal 1.")
        $("#alert-container").css("display", "flex");
        $("#alert-ok").on("click", function () {
            $("#alert-container").hide();
        });
        return;
    }
    forwardedMessages = [];
    for (var i = 0; i < messageSelections.length; i++) {
        if (messageSelections[i] == 1) {
            var message = messages[i];
            forwardedMessages.push(message);
        }
    }
    openForwardDialog();
}

function backKey() {
    if (selecting) {
        $("#select-messages-container").hide();
        $(".message").css("background-color", "white");
        for (var i = 0; i < messageSelections.length; i++) {
            messageSelections[i] = 0;
        }
        selecting = false;
    } else if (messageSelectionMenuShown) {
        $("#select-messages-container").hide();
        messageSelectionMenuShown = false;
    } else if (chatMenuShown) {
        $("#chat-menu").hide();
    } else if (cameraTypeShown) {
        $("#choose-media-type").hide();
        cameraTypeShown = false;
    } else if (attachmentShown) {
        $("#attachment").css("margin-bottom", "-240px");
        attachmentShown = false;
    } else {
        window.history.back();
    }
}

function textAreaFinished(code, value) {
    if (code == 1) {
        $("#loading-container").css("display", "flex");
        var message = messages[currentEdittedMessageIndex];
        var fd = new FormData();
        fd.append("id", message["id"]);
        fd.append("message", value);
        $.ajax({
            type: 'POST',
            url: SERVER_URL + 'edit-message.php',
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (a) {
                $("#loading-container").hide();
                $("#messages").find(".message-text:eq(" + currentEdittedMessageIndex + ")").html(value);
            }
        });
    }
}

function closeRepliedMessage() {
    $("#replied-message").hide();
}

function openForwardDialog() {
    $("#forward-dialog").css("display", "flex");
}

function closeForwardDialog() {
    $("#forward-dialog").hide();
}

function getFollowerId(index) {
    if (index >= followers.length) {
        if (followerIds.length > 0) {
            followerIds.sort(function (a, b) {
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
        url: SERVER_URL + 'get-user-info-by-id.php',
        data: {'user-id': follower["follower_id"]},
        dataType: 'text',
        cache: false,
        success: function (a) {
            if (a < 0) {
                // Error
            } else {
                var userInfo = JSON.parse(a);
                var name = userInfo["name"];
                if (name == "") {
                    name = userInfo["email"];
                }
                followerIds.push({"id": follower["follower_id"], "name": name});
                getFollowerId(index + 1);
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
    $(".follower").unbind().on("click", function () {
        var index = $(this).parent().children().index(this);
        var followerId = followerIds[index]["id"];
        var message = "";
        for (var i=0; i<forwardedMessages.length; i++) {
            message += forwardedMessages[i]["message"];
            message += " ";
        }
        var fd = new FormData();
        fd.append("receiver-id", followerId);
        fd.append("message", message);
        fd.append("attachment-type", 0);
        fd.append("attachment-url", "");
        fd.append("address", "");
        fd.append("latitude", 0);
        fd.append("longitude", 0);
        fd.append("language", getLanguage());
        $.ajax({
            type: 'POST',
            url: SERVER_URL + 'send-message.php',
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (a) {
                var messageInfo = JSON.parse(a);
                messages.push(messageInfo);
                firebase.database().ref("message_notifications/" + opponentUserId).set({
                    "new_message": 1
                });
                selecting = false;
                messageSelectionMenuShown = false;
                $(".message").css("background-color", "white");
                $("#message-selection-menu").hide();
                $("#select-messages-container").hide();
                $("#forward-dialog").hide();
                if (getLanguage() == 0) {
                    show("Pesan diteruskan");
                } else if (getLanguage() == 1) {
                    show("Messages forwarded");
                }
            }
        });
    });
}

function closeMessageSelectionBar() {
    $("#message-selection-menu").hide();
    $("#select-messages-container").hide();
    $(".message").css("background-color", "white");
    selecting = false;
    resetSelections();
    messageSelectionMenuShown = false;
}

function resetSelections() {
    for (var i=0; i<messageSelections.length; i++) {
        messageSelections[i] = 0;
    }
}

function showAttachment() {
    attachmentShown = !attachmentShown;
    if (attachmentShown) {
        $("#attachment").css("margin-bottom", "70px");
    } else {
        $("#attachment").css("margin-bottom", "-240px");
    }
}

function openCamera() {
    $("#attachment").css("margin-bottom", "-240px");
    attachmentShown = false;
    $("#choose-media-type").css("display", "flex");
    cameraTypeShown = true;
}

function takePicture() {
    $("#choose-media-type").hide();
    cameraTypeShown = false;
    Native.openCamera();
}

function captureVideo() {
    $("#choose-media-type").hide();
    cameraTypeShown = false;
    Native.recordVideo();
}

function openGallery() {
    $("#attachment").css("margin-bottom", "-240px");
    attachmentShown = false;
    $("#choose-gallery-type").css("display", "flex");
    galleryTypeShown = true;
}

function pickPicture() {
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        Native.pickPicture();
    } else if (os == "iOS") {
    }
}

function pickVideo() {
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        Native.pickVideo();
    } else if (os == "iOS") {
    }
}

function pickIcon() {
    $("#attachment").css("margin-bottom", "-240px");
    attachmentShown = false;
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        Native.pickPicture();
    } else if (os == "iOS") {
    }
}

function pickLocation() {
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        Native.pickLocation();
    } else if (os == "iOS") {
    }
}

function pickDocument() {
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        Native.pickDocument();
    } else if (os == "iOS") {
    }
}

function pickContact() {
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        Native.pickContact();
    } else if (os == "iOS") {
    }
}

function pictureUploaded(url) {
    $("#message").val("");
    var fd = new FormData();
    fd.append("receiver-id", opponentUserId);
    fd.append("message", "");
    fd.append("attachment-url", url);
    fd.append("attachment-type", "1");
    fd.append("address", "");
    fd.append("latitude", 0);
    fd.append("longitude", 0);
    fd.append("language", getLanguage());
	$.ajax({
		type: 'POST',
		url: SERVER_URL+"send-message.php",
        data: fd,
        processData: false,
        contentType: false,
		cache: false,
		success: function(a) {
            var messageInfo = JSON.parse(a);
            messages.push(messageInfo);
            firebase.database().ref("message_notifications/" + opponentUserId).set({
                "new_message": 1
            });
            $.ajax({
                type: 'GET',
                url: SERVER_URL + 'get-user-info-by-id.php',
                data: {'user-id': userId},
                dataType: 'text',
                cache: false,
                success: function (a) {
                    if (a < 0) {
                        // Error
                    } else {
                        var userInfo = JSON.parse(a);
                        var profilePictureURL = userInfo["profile_picture_url"];
                        if (profilePictureURL == "") {
                            profilePictureURL = "img/profile-picture.png";
                        }
                        var sentDate = new Date();
                        var hour = sentDate.getHours();
                        hour %= 12;
                        if (hour < 10) {
                            hour = "0" + hour;
                        }
                        var minute = sentDate.getMinutes();
                        if (minute < 10) {
                            minute = "0" + minute;
                        }
                        var sentTime = hour + ":" + minute;
                        if (sentDate.getHours() >= 12) {
                            sentTime += (" " + "PM");
                        } else {
                            sentTime += (" " + "AM");
                        }
                        $("#messages").append("" +
                            "<div class='my-message message-img'>" +
                            "<div class='my-message-inner'>" +
                            "<img src='"+url+"' width='100px' height='100px' style='border-radius: 5px;'>" +
                            "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                            "</div>" +
                            "<img src='" + profilePictureURL + "' width='40px' height='40px' style='position: absolute; top: 0; right: 5px; border-radius: 50%; margin-top: 10px;'>" +
                            "</div>"
                        );
                        messageSelections.push(0);
                        setMessageClickListener();
                        scrollToBottom();
                        selecting = false;
                        messageSelectionMenuShown = false;
                        $(".message").css("background-color", "white");
                        $("#message-selection-menu").hide();
                        $("#select-messages-container").hide();
                        $("#messages").css("margin-bottom", "100px");
                    }
                }
            });
		}
	});
}

function videoUploaded(url) {
    $("#message").val("");
    var fd = new FormData();
    fd.append("receiver-id", opponentUserId);
    fd.append("message", "");
    fd.append("attachment-url", url);
    fd.append("attachment-type", "2");
    fd.append("address", "");
    fd.append("latitude", 0);
    fd.append("longitude", 0);
    fd.append("language", getLanguage());
    $.ajax({
        type: 'POST',
        url: SERVER_URL+"send-message.php",
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function(a) {
            var messageInfo = JSON.parse(a);
            messages.push(messageInfo);
            firebase.database().ref("message_notifications/" + opponentUserId).set({
                "new_message": 1
            });
            $.ajax({
                type: 'GET',
                url: SERVER_URL + 'get-user-info-by-id.php',
                data: {'user-id': userId},
                dataType: 'text',
                cache: false,
                success: function (a) {
                    if (a < 0) {
                        // Error
                    } else {
                        var userInfo = JSON.parse(a);
                        var profilePictureURL = userInfo["profile_picture_url"];
                        if (profilePictureURL == "") {
                            profilePictureURL = "img/profile-picture.png";
                        }
                        var sentDate = new Date();
                        var hour = sentDate.getHours();
                        hour %= 12;
                        if (hour < 10) {
                            hour = "0" + hour;
                        }
                        var minute = sentDate.getMinutes();
                        if (minute < 10) {
                            minute = "0" + minute;
                        }
                        var sentTime = hour + ":" + minute;
                        if (sentDate.getHours() >= 12) {
                            sentTime += (" " + "PM");
                        } else {
                            sentTime += (" " + "AM");
                        }
                        $("#messages").append("" +
                            "<div class='my-message message-video'>" +
                            "<div class='my-message-inner'>" +
                            "<video width='100px' height='100px' style='border-radius: 5px;'>"+
                            "<source src='"+url+"'>"+
                            "</video>" +
                            "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                            "</div>" +
                            "<img src='" + profilePictureURL + "' width='40px' height='40px' style='position: absolute; top: 0; right: 5px; border-radius: 50%; margin-top: 10px;'>" +
                            "</div>"
                        ).css("margin-bottom", "100px");
                        messageSelections.push(0);
                        setMessageClickListener();
                        scrollToBottom();
                        selecting = false;
                        messageSelectionMenuShown = false;
                        $(".message").css("background-color", "white");
                        $("#message-selection-menu").hide();
                        $("#select-messages-container").hide();
                    }
                }
            });
        }
    });
}

function locationPicked(address, latitude, longitude) {
    $("#message").val("");
    var fd = new FormData();
    fd.append("receiver-id", opponentUserId);
    fd.append("message", "");
    fd.append("attachment-type", "3");
    fd.append("attachment-url", "");
    fd.append("address", address);
    fd.append("latitude", latitude);
    fd.append("longitude", longitude);
    fd.append("language", getLanguage());
    $.ajax({
        type: 'POST',
        url: SERVER_URL+"send-message.php",
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function(a) {
            var messageInfo = JSON.parse(a);
            messages.push(messageInfo);
            firebase.database().ref("message_notifications/" + opponentUserId).set({
                "new_message": 1
            });
            $.ajax({
                type: 'GET',
                url: SERVER_URL + 'get-user-info-by-id.php',
                data: {'user-id': userId},
                dataType: 'text',
                cache: false,
                success: function (a) {
                    if (a < 0) {
                        // Error
                    } else {
                        var userInfo = JSON.parse(a);
                        var profilePictureURL = userInfo["profile_picture_url"];
                        if (profilePictureURL == "") {
                            profilePictureURL = "img/profile-picture.png";
                        }
                        var sentDate = new Date();
                        var hour = sentDate.getHours();
                        hour %= 12;
                        if (hour < 10) {
                            hour = "0" + hour;
                        }
                        var minute = sentDate.getMinutes();
                        if (minute < 10) {
                            minute = "0" + minute;
                        }
                        var sentTime = hour + ":" + minute;
                        if (sentDate.getHours() >= 12) {
                            sentTime += (" " + "PM");
                        } else {
                            sentTime += (" " + "AM");
                        }
                        var name = userInfo["name"];
                        if (name == "") {
                            name = userInfo["email"];
                        }
                        var text = ""+name+" membagikan lokasi. Ketuk untuk melihat lokasi.";
                        if (getLanguage() == 1) {
                            text = ""+name+" shared location. Touch to view location in maps.";
                        }
                        $("#messages").append("" +
                            "<div class='my-message message-map'>" +
                            "<div class='my-message-inner'>" +
                            "<div style='color: black; font-size: 20sp;';>"+text+"</div>"+
                            "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                            "</div>" +
                            "<img src='" + profilePictureURL + "' width='40px' height='40px' style='position: absolute; top: 0; right: 5px; border-radius: 50%; margin-top: 10px;'>" +
                            "</div>"
                        ).css("margin-bottom", "100px");
                        messageSelections.push(0);
                        setMessageClickListener();
                        scrollToBottom();
                        selecting = false;
                        messageSelectionMenuShown = false;
                        $(".message").css("background-color", "white");
                        $("#message-selection-menu").hide();
                        $("#select-messages-container").hide();
                    }
                }
            });
        }
    });
}

function documentUploaded(url, fileName) {
    $("#message").val("");
    var fd = new FormData();
    fd.append("receiver-id", opponentUserId);
    fd.append("message", "");
    fd.append("attachment-type", "4");
    fd.append("attachment-url", url);
    fd.append("file-name", fileName);
    fd.append("address", address);
    fd.append("latitude", latitude);
    fd.append("longitude", longitude);
    fd.append("language", getLanguage());
    $.ajax({
        type: 'POST',
        url: SERVER_URL+"send-message.php",
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function(a) {
            var messageInfo = JSON.parse(a);
            messages.push(messageInfo);
            firebase.database().ref("message_notifications/" + opponentUserId).set({
                "new_message": 1
            });
            $.ajax({
                type: 'GET',
                url: SERVER_URL + 'get-user-info-by-id.php',
                data: {'user-id': userId},
                dataType: 'text',
                cache: false,
                success: function (a) {
                    if (a < 0) {
                        // Error
                    } else {
                        var userInfo = JSON.parse(a);
                        var profilePictureURL = userInfo["profile_picture_url"];
                        if (profilePictureURL == "") {
                            profilePictureURL = "img/profile-picture.png";
                        }
                        var sentDate = new Date();
                        var hour = sentDate.getHours();
                        hour %= 12;
                        if (hour < 10) {
                            hour = "0" + hour;
                        }
                        var minute = sentDate.getMinutes();
                        if (minute < 10) {
                            minute = "0" + minute;
                        }
                        var sentTime = hour + ":" + minute;
                        if (sentDate.getHours() >= 12) {
                            sentTime += (" " + "PM");
                        } else {
                            sentTime += (" " + "AM");
                        }
                        var name = userInfo["name"];
                        if (name == "") {
                            name = userInfo["email"];
                        }
                        $("#messages").append("" +
                            "<div class='my-message message-document'>" +
                            "<div class='my-message-inner'>" +
                            "<div style='width: calc(100% - 20px); height: 40px; background-color: #eeeeee; border: 1px solid #dddddd; border-radius: 10px; margin-left: 10px; margin-right: 10px; display: flex; flex-flow: row nowrap; align-items: center;';>"+
                            "<div style='width: calc(100% - 60px); margin-left: 10px; color: black; margin-right: 10px;'>"+fileName+"</div>"+
                            "<div style='width: 40px; height: 40px; border: 1px solid #dddddd; border-radius: 50%; display: flex; justify-content: center; align-items: center;'>"+
                            "<img src='img/download.png' width='20px' height='20px'>"+
                            "</div>"+
                            "</div>"+
                            "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                            "</div>" +
                            "<img src='" + profilePictureURL + "' width='40px' height='40px' style='position: absolute; top: 0; right: 5px; border-radius: 50%; margin-top: 10px;'>" +
                            "</div>"
                        ).css("margin-bottom", "100px");
                        messageSelections.push(0);
                        setMessageClickListener();
                        scrollToBottom();
                        selecting = false;
                        messageSelectionMenuShown = false;
                        $(".message").css("background-color", "white");
                        $("#message-selection-menu").hide();
                        $("#select-messages-container").hide();
                    }
                }
            });
        }
    });
}

function contactPicked(contactNumber, contactName) {
    $("#message").val("");
    var fd = new FormData();
    fd.append("receiver-id", opponentUserId);
    fd.append("message", "");
    fd.append("attachment-type", "5");
    fd.append("attachment-url", "");
    fd.append("file-name", "");
    fd.append("address", "");
    fd.append("latitude", 0);
    fd.append("longitude", 0);
    fd.append("language", getLanguage());
    fd.append("contact-name", contactName);
    fd.append("contact-number", contactNumber);
    $.ajax({
        type: 'POST',
        url: SERVER_URL+"send-message.php",
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function(a) {
            var messageInfo = JSON.parse(a);
            messages.push(messageInfo);
            firebase.database().ref("message_notifications/" + opponentUserId).set({
                "new_message": 1
            });
            $.ajax({
                type: 'GET',
                url: SERVER_URL + 'get-user-info-by-id.php',
                data: {'user-id': userId},
                dataType: 'text',
                cache: false,
                success: function (a) {
                    if (a < 0) {
                        // Error
                    } else {
                        var userInfo = JSON.parse(a);
                        var profilePictureURL = userInfo["profile_picture_url"];
                        if (profilePictureURL == "") {
                            profilePictureURL = "img/profile-picture.png";
                        }
                        var sentDate = new Date();
                        var hour = sentDate.getHours();
                        hour %= 12;
                        if (hour < 10) {
                            hour = "0" + hour;
                        }
                        var minute = sentDate.getMinutes();
                        if (minute < 10) {
                            minute = "0" + minute;
                        }
                        var sentTime = hour + ":" + minute;
                        if (sentDate.getHours() >= 12) {
                            sentTime += (" " + "PM");
                        } else {
                            sentTime += (" " + "AM");
                        }
                        var name = userInfo["name"];
                        if (name == "") {
                            name = userInfo["email"];
                        }
                        $("#messages").append("" +
                            "<div class='my-message message-contact'>" +
                            "<div class='my-message-inner'>" +
                            "<div style='width: calc(100% - 20px); height: 40px; background-color: #eeeeee; border: 1px solid #dddddd; border-radius: 10px; margin-left: 10px; margin-right: 10px; display: flex; flex-flow: row nowrap; align-items: center;';>"+
                            "<div style='width: calc(100% - 60px); margin-left: 10px; color: black; margin-right: 10px;'>"+name+"</div>"+
                            "<div style='width: 40px; height: 40px; border: 1px solid #dddddd; border-radius: 50%; display: flex; justify-content: center; align-items: center;'>"+
                            "<img src='img/user-2.png' width='20px' height='20px'>"+
                            "</div>"+
                            "</div>"+
                            "<div style='color: #888888; font-size: 13px;'>" + sentTime + "</div>" +
                            "</div>" +
                            "<img src='" + profilePictureURL + "' width='40px' height='40px' style='position: absolute; top: 0; right: 5px; border-radius: 50%; margin-top: 10px;'>" +
                            "</div>"
                        ).css("margin-bottom", "100px");
                        messageSelections.push(0);
                        setMessageClickListener();
                        scrollToBottom();
                        selecting = false;
                        messageSelectionMenuShown = false;
                        $(".message").css("background-color", "white");
                        $("#message-selection-menu").hide();
                        $("#select-messages-container").hide();
                    }
                }
            });
        }
    });
}