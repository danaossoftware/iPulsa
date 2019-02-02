$(document).ready(function() {
});

function signup() {
    $("#error").css("display", "none");
    var email = $("#email").val();
    var password = $("#password").val();
    if (email == '') {
        $("#error").html("Mohon masukkan email Anda");
        $("#error").css("display", "block");
        return;
    }
    if (password == '') {
        $("#error").html("Mohon masukkan kata sandi Anda");
        $("#error").css("display", "block");
        return;
    }
    $("#loading-container").css("display", "flex");
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'signup.php',
        data: {'email': email, 'password': password},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                window.location.href = "buy.html";
            } else if (a == -1) {
                $("#error").html("Email sudah digunakan");
                $("#error").css("display", "block");
                $("#loading-container").hide();
            }
        },
        error: function(a, b, c) {
        }
    });
}