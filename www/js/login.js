var loginPasswordShown = false;
var signupPasswordShown = false;
var signupRepeatPasswordShown = false;

$(document).ready(function() {
    $("#login-btn").addClass("login-menu-item-active");
    $("#login-btn").on("click", function() {
        $("#signup-btn").removeClass("login-menu-item-active");
        $("#login-btn").addClass("login-menu-item-active");
        $("#signup-form").css("display", "none");
        $("#login-form").css("display", "flex");
        $("#indicator").css("margin-top", "200px");
    });
    $("#signup-btn").on("click", function() {
        $("#login-btn").removeClass("login-menu-item-active");
        $("#signup-btn").addClass("login-menu-item-active");
        $("#login-form").css("display", "none");
        $("#signup-form").css("display", "flex");
        $("#indicator").css("margin-top", "240px");
    });
});

function login() {
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
    if (password.length < 8) {
        $("#error").html("Masukkan kata sandi minimal 8 karakter");
        $("#error").css("display", "block");
        return;
    }
    $("#loading-container").css("display", "flex");
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'login.php',
        data: {'email': email, 'password': password},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                window.location.href = "home.html";
            } else if (a == -1) {
                // User not found
                $("#error").html("Akun tidak ditemukan");
                $("#error").css("display", "block");
                $("#loading-container").hide();
            }
        },
        error: function(a, b, c) {
        }
    });
}

function signup() {
    var name = $("#signup-name").val();
    var email = $("#signup-email").val();
    var password = $("#signup-password").val();
    var repeatedPassword = $("#signup-password").val();
    var referralCode = $("#signup-referral-code").val();
    if (name == "" || email == "" || password == "" || repeatedPassword == "" || referralCode == "") {
        return;
    }
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'signup.php',
        data: {'email': email, 'password': password, 'name': name, 'referral': referralCode},
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

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    alert("Email: "+profile.getEmail());
}

function loginWithGooglePlus() {
    $("#google-sign-in").trigger("click");
}

function renderSignInWithGoogleButton() {
    gapi.signin2.render('google-sign-in', {
        'scope': 'profile email',
        'width': 40,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': function(googleUser) {
            var profile = googleUser.getBasicProfile();
            alert("Email: "+profile.getEmail());
        },
        'onfailure': function(error) {
        }
    });
}

function showLoginPassword() {
    loginPasswordShown = !loginPasswordShown;
    if (loginPasswordShown) {
        $("#password").attr("type", "text");
    } else {
        $("#password").attr("type", "password");
    }
}

function showSignupPassword() {
    signupPasswordShown = !signupPasswordShown;
    if (signupPasswordShown) {
        $("#signup-password").attr("type", "text");
    } else {
        $("#signup-password").attr("type", "password");
    }
}

function showSignupRepeatPassword() {
    signupRepeatPasswordShown = !signupRepeatPasswordShown;
    if (signupRepeatPasswordShown) {
        $("#signup-repeat-password").attr("type", "text");
    } else {
        $("#signup-repeat-password").attr("type", "password");
    }
}