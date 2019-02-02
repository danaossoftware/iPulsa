$(document).ready(function() {
    var params = location.search;
    params = params.substr(1, params.length);
    var email = params.split("&")[0].split("=")[1];
    $("#reset-password").on("click", function() {
        $("#error").css("display", "none");
        var password = $("#password").val();
        var repeatedPassword = $("#repeated-password").val();
        if (password == '' || repeatedPassword == '') {
            return;
        }
        if (password != repeatedPassword) {
            $("#error").html("Kata sandi tidak cocok");
            $("#error").css("display", "block");
            return;
        }
        $.ajax({
            type: 'GET',
            url: SERVER_URL+'reset-password.php',
            data: {'email': email, 'password': password},
            dataType: 'text',
            cache: false,
            success: function(a) {
                if (a == -1) {
                    // Email does not exist
                    $("#error").html("Email tidak terdaftar di sistem kami");
                    $("#error").show();
                } else if (a == 0) {
                    window.location.href = "password-changed.html";
                }
            },
            error: function(a, b, c) {
            }
        });
    });
});