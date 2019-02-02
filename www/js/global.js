const SERVER_URL = "http://danaos.xyz/ipulsa/www/php/";
var settingsOpened = false;
var monthNamesEN = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
var monthNamesID = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

$(document).ready(function () {
    var backFunctionExists = 0;
    if (typeof backKey !== "undefined") {
        backFunctionExists = 1;
    }
    //Native.backFunctionExists(backFunctionExists);
    document.addEventListener("deviceready", onDeviceReady, false);
    $("body").css("display", "block");
    $("#titlebar").load("titlebar.html");
    $("#menubar").load("menubar.html");
    $("#settings").load("settings.html");
    $("#actionbar").load("actionbar.html", function (a, b, c) {
        $(document).scroll(showOrHideActionBar);
    });
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
                var profilePictureURL = user["profile_picture_url"];
                if (profilePictureURL == "") {
                    profilePictureURL = "img/profile-picture.png";
                }
                $("#bar-profile-picture").attr("src", profilePictureURL);
            }
        },
        error: function(a, b, c) {
        }
    });
});

function showOrHideActionBar() {
    if ($(document).scrollTop() > 100) {
        $(".action-bar").css("margin-top", "0");
    } else {
        $(".action-bar").css("margin-top", "-80px");
    }
}

function onDeviceReady() {
    window.requestFileSystem(window.PERSISTENT, 0, function(fs) {
        fs.root.getFile("a.txt", {create: true, exclusive: true}, function(fileEntry) {
            fileEntry.createWriter(function(fw) {
                var blob = new Blob(["This is a text"], {type: "text/plain"});
                fw.write(blob);
            });
        });
    }, function(e) {
        alert(e.code);
    });
    document.addEventListener("backbutton", function () {
        if (settingsOpened) {
            closeSettings();
        } else {
            navigator.app.exitApp();
        }
    }, false);
}

function openSettings() {
    $("#settings-fader").hide();
    var windowHeight = $(window).height();
    $("#setting-texts").css("display", "flex").animate({
        marginRight: "20px"
    }, {
        duration: 300
    });
    $("#settings-container").css("display", "flex").animate({
        marginRight: "-200px"
    }, {
        duration: 300,
        complete: function () {
            settingsOpened = true;
        }
    });
}

function closeSettings() {
    settingsOpened = false;
    $("#settings-fader").hide();
    var windowHeight = $(window).height();
    $("#setting-texts").animate({
        marginRight: "-50%"
    }, {
        duration: 100,
        complete: function () {
            $("#setting-texts").css("display", "none");
        }
    });
    $("#settings-container").animate({
        marginRight: "-400px"
    }, {
        duration: 100,
        complete: function () {
            $("#settings-container").css("display", "none");
        }
    });
}

function formatBalance(balance, delimiter) {
    return balance.replace(/\d(?=(\d{3})+\.)/g, '$&' + delimiter);
}

function show(message) {
    /*var os = getMobileOperatingSystem();
    if (os == "Android") {
        show(message);
    } else if (os == "iOS") {
        webkit.messageHandlers.callbackHandler.postMessage(message);
    }*/
}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function shareImage(url) {
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        Native.shareImage(url);
    } else if (os == "iOS") {
        webkit.messageHandlers.callbackHandler.postMessage(url);
    }
}

function shareVideo(url) {
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        Native.shareVideo(url);
    } else if (os == "iOS") {
        webkit.messageHandlers.callbackHandler.postMessage(url);
    }
}

function logout() {
    window.location.href = "logout.html";
}

function getLanguage() {
    return 0;
    //return Native.getLanguage();
}

function getMonthName(index) {
    if (getLanguage() == 0) {
        return monthNamesID[index];
    } else if (getLanguage() == 1) {
        return monthNamesEN[index];
    }
}