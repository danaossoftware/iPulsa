var userId;
var users;
var forwardedMessages;

$(document).ready(function() {
    if (getLanguage() == 1) {
        $("#text1").html("Share message to");
    }
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-user-id.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            userId = a;
            getForwardedMessages();
        }
    });
});

function getForwardedMessages() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-forwarded-messages.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            forwardedMessages = JSON.parse(a);
            collectUsers();
        }
    });
}

function collectUsers() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-followers.php',
        data: {'user-id': userId},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
                if (getLanguage() == 0) {
                    show("Tidak ada pengguna yang mengikuti akun Anda");
                } else {
                    show("No user followed your account");
                }
            } else {
                users = JSON.parse(a);
                if (users.length == 0) {
                    if (getLanguage() == 0) {
                        show("Tidak ada pengguna yang mengikuti akun Anda");
                    } else {
                        show("No user followed your account");
                    }
                } else {
                    displayUser(0);
                }
            }
        }
    });
}

function displayUser(index) {
    if (index >= users.length) {
        return;
    }
    var user = users[index];
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-user-info-by-id.php',
        data: {'user-id': user["id"]},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var userInfo = JSON.parse(a);
                var profilePictureURL = userInfo["profile_picture_url"];
                if (profilePictureURL == "") {
                    profilePictureURL = "img/profile-picture.png";
                }
                var name = userInfo["name"];
                if (name == "") {
                    name = userInfo["email"];
                }
                $("#users").append(""+
                    "<div class='user' style='width: 100%; height: 50px; display: flex; flex-flow: row nowrap; align-items: center;'>"+
                        "<label class='flat-checkbox'><input type='checkbox'><span></span></label>"+
                        "<img src='"+profilePictureURL+"' width='30px' height='30px' style='border-radius: 50%;'>"+
                        "<div style='color: black; margin-left: 10px; margin-right: 10px;'>"+name+"</div>"+
                    "</div>"
                );
                displayUser(index+1);
            }
        }
    });
}

function selectAll() {
    $(".flat-checkbox").find(".checkbox").prop("checked", true);
}