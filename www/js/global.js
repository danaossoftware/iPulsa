const SERVER_URL = "http://danaos.xyz/ipulsa/www/php/";
var settingsOpened = false;
var monthNamesEN = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
var monthNamesID = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];
var texts = [
    "1", "Apakah Anda yakin pilihan Anda sudah benar?", "Are you sure your selection is correct?",
    "2", "Beli", "Buy",
    "3", "Mohon masukkan nomor telepon yang valid", "Please enter correct phone number",
    "4", "Memuat...", "Getting data...",
    "5", "Prabayar", "Prepaid",
    "6", "Pascabayar", "Postpaid",
    "7", "Non-Taglis", "Non Electricity Bills",
    "8", "Harga", "Price",
    "9", "Maaf, transaksi Anda gagal. Penyebab:", "Sorry, your transaction was failed. Cause:",
    "10", "Tidak diketahui", "Unknown reason",
    "11", "Transaksi berhasil.", "Transaction succeeded",
    "12", "Saldo Anda tidak cukup. Apakah Anda ingin mengisinya sekarang?", "Your balance is not sufficient. Add funds now?",
    "13", "Nominal", "Nominal",
    "14", "Nomor Telepon", "Phone Number",
    "15", "Paket Data", "Buy Data",
    "16", "Keterangan", "Description",
    "17", "Masukkan ID pelanggan/No. Meter", "Please enter customer ID/meter number",
    "18", "Mohon masukkan ID pelanggan/no. meter", "Please enter customer ID or meter number"
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
        url: SERVER_URL + 'get-user-info.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
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
        error: function (a, b, c) {
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
    window.requestFileSystem(window.PERSISTENT, 0, function (fs) {
        fs.root.getFile("a.txt", {create: true, exclusive: true}, function (fileEntry) {
            fileEntry.createWriter(function (fw) {
                var blob = new Blob(["This is a text"], {type: "text/plain"});
                fw.write(blob);
            });
        });
    }, function (e) {
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
    try {
        $("#toast-msg").html(message);
        $("#toast-container").css("display", "flex").hide().fadeIn(300);
        setTimeout(function () {
            $("#toast-container").fadeOut(300);
        }, 3000);
    } catch (e) {
        console.log(e.toString());
    }
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

function setDivClickListener() {
    $(".ripple-btn").click(function (e) {

        // Remove any old one
        $(".ripple").remove();

        // Setup
        var posX = $(this).offset().left,
            posY = $(this).offset().top,
            buttonWidth = $(this).width(),
            buttonHeight = $(this).height();

        // Add the element
        $(this).prepend("<span class='ripple'></span>");


        // Make it round!
        if (buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }

        // Get the center of the element
        var x = e.pageX - posX - buttonWidth / 2;
        var y = e.pageY - posY - buttonHeight / 2;


        // Add the ripples CSS and start the animation
        $(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
        }).addClass("rippleEffect");
    });
}

function showImage(url) {
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        Native.showImage(url);
    }
}

function showVideo(url) {
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        Native.showVideo(url);
    }
}

function getInt(name) {
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        return Native.readInt(name, 0);
    }
    return 0;
}

function getText(id) {
    id--;
    if (id < 0) {
        id = 0;
    }
    var lang = getInt("language");
    if (lang === 0) {
        return texts[id * 3 + 1];
    } else if (lang === 1) {
        return texts[id * 3 + 2];
    }
    return "";
}

function showLoading(msg) {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
}

function hideLoading() {
    $("#loading-container").fadeOut(300);
}

function showAlert(message) {
    alert(message);
}

function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    var formattedMoney = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    if (formattedMoney.endsWith(",00")) {
        formattedMoney = formattedMoney.substring(0, formattedMoney.lastIndexOf(","));
    }
    if (formattedMoney.endsWith(".00")) {
        formattedMoney = formattedMoney.substring(0, formattedMoney.lastIndexOf("."));
    }
    return formattedMoney;
};