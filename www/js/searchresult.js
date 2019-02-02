$(document).ready(function() {
    var params = location.search;
    params = params.substr(1, params.length);
    var email = params.split("&")[0].split("=")[1];
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'find-users.php',
        data: {'email': email},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var users = JSON.parse(a);
                var items = "";
                for (var i=0; i<users.length; i++) {
                    var user = users[i];
                    items += "<div style=\"width: 100%; display: flex; flex-flow: row nowrap; align-items: center; height: 80px; position: relative;\">\n" +
                        "    <img src=\"img/profile-picture.png\" width=\"40px\" height=\"40px\" style=\"margin-left: 10px;\">\n" +
                        "    <div style=\"color: black; font-weight: bold;; font-size: 15px; margin-left: 10px;\">User Name</div>\n" +
                        "    <div style=\"height: 100%; display: flex; align-items: center; position: absolute; top: 0; right: 10px;\">\n" +
                        "        <button class=\"button2\">Follow</button>\n" +
                        "    </div>\n" +
                        "    <div style=\"position: absolute; left: 0; bottom: 0; width: 100%; height: 1px; background-color: rgba(136, 136, 136, .3);\"></div>\n" +
                        "</div>";
                }
                $("#users").append(items);
                for (var i=0; i<users.length; i++) {
                    var user = $("#users").find(".user-info:eq("+i+")");
                }
            }
        }
    });
});