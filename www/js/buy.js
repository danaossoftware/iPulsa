const SERVER_URL = "http://danaos.xyz/ipulsa/www/php/";

$(document).ready(function() {
    getUserInfo();
});

function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-user-info.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var user = JSON.parse(a);
                var name = user.name;
                var balance = user.balance;
                $("#user-name").html(name);
                $("#balance").html(formatBalance(balance));
            }
        },
        error: function(a, b, c) {
        }
    });
}