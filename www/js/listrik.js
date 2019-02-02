$(document).ready(function() {
    var params = location.search;
    if (params != '') {
        params = params.substr(1, params.length);
        var page = params.split("&")[0].split("=")[1];
        if (page == 1) {
            $("#pascabayar-panel").css("display", "flex");
            $("#prabayar-panel").css("display", "none");
            $("#non-taglis-panel").css("display", "none");
            selectPascabayarPanel();
        }
    }
});

function selectPrabayarPackage(type) {
    if (type == 0) {
        $("#prabayar-listrik-20").css("background-color", "#069caa");
        $("#prabayar-listrik-20").css("color", "white");
        $("#prabayar-listrik-50").css("background-color", "white");
        $("#prabayar-listrik-50").css("color", "#069caa");
        $("#prabayar-listrik-100").css("background-color", "white");
        $("#prabayar-listrik-100").css("color", "#069caa");
        $("#prabayar-listrik-200").css("background-color", "white");
        $("#prabayar-listrik-200").css("color", "#069caa");
        $("#prabayar-listrik-500").css("background-color", "white");
        $("#prabayar-listrik-500").css("color", "#069caa");
        $("#prabayar-listrik-1000").css("background-color", "white");
        $("#prabayar-listrik-1000").css("color", "#069caa");
    } else if (type == 1) {
        $("#prabayar-listrik-20").css("background-color", "white");
        $("#prabayar-listrik-20").css("color", "#069caa");
        $("#prabayar-listrik-50").css("background-color", "#069caa");
        $("#prabayar-listrik-50").css("color", "white");
        $("#prabayar-listrik-100").css("background-color", "white");
        $("#prabayar-listrik-100").css("color", "#069caa");
        $("#prabayar-listrik-200").css("background-color", "white");
        $("#prabayar-listrik-200").css("color", "#069caa");
        $("#prabayar-listrik-500").css("background-color", "white");
        $("#prabayar-listrik-500").css("color", "#069caa");
        $("#prabayar-listrik-1000").css("background-color", "white");
        $("#prabayar-listrik-1000").css("color", "#069caa");
    } else if (type == 2) {
        $("#prabayar-listrik-20").css("background-color", "white");
        $("#prabayar-listrik-20").css("color", "#069caa");
        $("#prabayar-listrik-50").css("background-color", "white");
        $("#prabayar-listrik-50").css("color", "#069caa");
        $("#prabayar-listrik-100").css("background-color", "#069caa");
        $("#prabayar-listrik-100").css("color", "white");
        $("#prabayar-listrik-200").css("background-color", "white");
        $("#prabayar-listrik-200").css("color", "#069caa");
        $("#prabayar-listrik-500").css("background-color", "white");
        $("#prabayar-listrik-500").css("color", "#069caa");
        $("#prabayar-listrik-1000").css("background-color", "white");
        $("#prabayar-listrik-1000").css("color", "#069caa");
    } else if (type == 3) {
        $("#prabayar-listrik-20").css("background-color", "white");
        $("#prabayar-listrik-20").css("color", "#069caa");
        $("#prabayar-listrik-50").css("background-color", "white");
        $("#prabayar-listrik-50").css("color", "#069caa");
        $("#prabayar-listrik-100").css("background-color", "white");
        $("#prabayar-listrik-100").css("color", "#069caa");
        $("#prabayar-listrik-200").css("background-color", "#069caa");
        $("#prabayar-listrik-200").css("color", "white");
        $("#prabayar-listrik-500").css("background-color", "white");
        $("#prabayar-listrik-500").css("color", "#069caa");
        $("#prabayar-listrik-1000").css("background-color", "white");
        $("#prabayar-listrik-1000").css("color", "#069caa");
    } else if (type == 4) {
        $("#prabayar-listrik-20").css("background-color", "white");
        $("#prabayar-listrik-20").css("color", "#069caa");
        $("#prabayar-listrik-50").css("background-color", "white");
        $("#prabayar-listrik-50").css("color", "#069caa");
        $("#prabayar-listrik-100").css("background-color", "white");
        $("#prabayar-listrik-100").css("color", "#069caa");
        $("#prabayar-listrik-200").css("background-color", "white");
        $("#prabayar-listrik-200").css("color", "#069caa");
        $("#prabayar-listrik-500").css("background-color", "#069caa");
        $("#prabayar-listrik-500").css("color", "white");
        $("#prabayar-listrik-1000").css("background-color", "white");
        $("#prabayar-listrik-1000").css("color", "#069caa");
    } else if (type == 5) {
        $("#prabayar-listrik-20").css("background-color", "white");
        $("#prabayar-listrik-20").css("color", "#069caa");
        $("#prabayar-listrik-50").css("background-color", "white");
        $("#prabayar-listrik-50").css("color", "#069caa");
        $("#prabayar-listrik-100").css("background-color", "white");
        $("#prabayar-listrik-100").css("color", "#069caa");
        $("#prabayar-listrik-200").css("background-color", "white");
        $("#prabayar-listrik-200").css("color", "#069caa");
        $("#prabayar-listrik-500").css("background-color", "white");
        $("#prabayar-listrik-500").css("color", "#069caa");
        $("#prabayar-listrik-1000").css("background-color", "#069caa");
        $("#prabayar-listrik-1000").css("color", "white");
    }
}

function selectNonTaglisType(type) {
    if (type == 0) {
        $("#non-taglis-type-0").css("background-color", "#069caa");
        $("#non-taglis-type-0").css("color", "white");
        $("#non-taglis-type-1").css("background-color", "white");
        $("#non-taglis-type-1").css("color", "#069caa");
        $("#non-taglis-type-2").css("background-color", "white");
        $("#non-taglis-type-2").css("color", "#069caa");
        $("#non-taglis-type-3").css("background-color", "white");
        $("#non-taglis-type-3").css("color", "#069caa");
        $("#non-taglis-type-4").css("background-color", "white");
        $("#non-taglis-type-4").css("color", "#069caa");
    } else if (type == 1) {
        $("#non-taglis-type-0").css("background-color", "white");
        $("#non-taglis-type-0").css("color", "#069caa");
        $("#non-taglis-type-1").css("background-color", "#069caa");
        $("#non-taglis-type-1").css("color", "white");
        $("#non-taglis-type-2").css("background-color", "white");
        $("#non-taglis-type-2").css("color", "#069caa");
        $("#non-taglis-type-3").css("background-color", "white");
        $("#non-taglis-type-3").css("color", "#069caa");
        $("#non-taglis-type-4").css("background-color", "white");
        $("#non-taglis-type-4").css("color", "#069caa");
    } else if (type == 2) {
        $("#non-taglis-type-0").css("background-color", "white");
        $("#non-taglis-type-0").css("color", "#069caa");
        $("#non-taglis-type-1").css("background-color", "white");
        $("#non-taglis-type-1").css("color", "#069caa");
        $("#non-taglis-type-2").css("background-color", "#069caa");
        $("#non-taglis-type-2").css("color", "white");
        $("#non-taglis-type-3").css("background-color", "white");
        $("#non-taglis-type-3").css("color", "#069caa");
        $("#non-taglis-type-4").css("background-color", "white");
        $("#non-taglis-type-4").css("color", "#069caa");
    } else if (type == 3) {
        $("#non-taglis-type-0").css("background-color", "white");
        $("#non-taglis-type-0").css("color", "#069caa");
        $("#non-taglis-type-1").css("background-color", "white");
        $("#non-taglis-type-1").css("color", "#069caa");
        $("#non-taglis-type-2").css("background-color", "white");
        $("#non-taglis-type-2").css("color", "#069caa");
        $("#non-taglis-type-3").css("background-color", "#069caa");
        $("#non-taglis-type-3").css("color", "white");
        $("#non-taglis-type-4").css("background-color", "white");
        $("#non-taglis-type-4").css("color", "#069caa");
    } else if (type == 4) {
        $("#non-taglis-type-0").css("background-color", "white");
        $("#non-taglis-type-0").css("color", "#069caa");
        $("#non-taglis-type-1").css("background-color", "white");
        $("#non-taglis-type-1").css("color", "#069caa");
        $("#non-taglis-type-2").css("background-color", "white");
        $("#non-taglis-type-2").css("color", "#069caa");
        $("#non-taglis-type-3").css("background-color", "white");
        $("#non-taglis-type-3").css("color", "#069caa");
        $("#non-taglis-type-4").css("background-color", "#069caa");
        $("#non-taglis-type-4").css("color", "white");
    }
}

function selectPrabayarPanel() {
    $("#prabayar-panel").css("display", "flex");
    $("#pascabayar-panel").css("display", "none");
    $("#non-taglis-panel").css("display", "none");
    $("#prabayar-indicator").css("display", "block");
    $("#pascabayar-indicator").css("display", "none");
    $("#non-taglis-indicator").css("display", "none");
}

function selectPascabayarPanel() {
    $("#prabayar-panel").css("display", "none");
    $("#pascabayar-panel").css("display", "flex");
    $("#non-taglis-panel").css("display", "none");
    $("#prabayar-indicator").css("display", "none");
    $("#pascabayar-indicator").css("display", "block");
    $("#non-taglis-indicator").css("display", "none");
}

function selectNonTaglisPanel() {
    $("#prabayar-panel").css("display", "none");
    $("#pascabayar-panel").css("display", "none");
    $("#non-taglis-panel").css("display", "flex");
    $("#prabayar-indicator").css("display", "none");
    $("#pascabayar-indicator").css("display", "none");
    $("#non-taglis-indicator").css("display", "block");
}

function selectPascabayarPackage(type) {
    if (type == 0) {
        $("#pascabayar-listrik-450").css("background-color", "#069caa");
        $("#pascabayar-listrik-450").css("color", "white");
        $("#pascabayar-listrik-900").css("background-color", "white");
        $("#pascabayar-listrik-900").css("color", "#069caa");
        $("#pascabayar-listrik-1300").css("background-color", "white");
        $("#pascabayar-listrik-1300").css("color", "#069caa");
        $("#pascabayar-listrik-2200").css("background-color", "white");
        $("#pascabayar-listrik-2200").css("color", "#069caa");
        $("#pascabayar-listrik-3500").css("background-color", "white");
        $("#pascabayar-listrik-3500").css("color", "#069caa");
        $("#pascabayar-listrik-6600").css("background-color", "white");
        $("#pascabayar-listrik-6600").css("color", "#069caa");
    } else if (type == 1) {
        $("#pascabayar-listrik-450").css("background-color", "white");
        $("#pascabayar-listrik-450").css("color", "#069caa");
        $("#pascabayar-listrik-900").css("background-color", "#069caa");
        $("#pascabayar-listrik-900").css("color", "white");
        $("#pascabayar-listrik-1300").css("background-color", "white");
        $("#pascabayar-listrik-1300").css("color", "#069caa");
        $("#pascabayar-listrik-2200").css("background-color", "white");
        $("#pascabayar-listrik-2200").css("color", "#069caa");
        $("#pascabayar-listrik-3500").css("background-color", "white");
        $("#pascabayar-listrik-3500").css("color", "#069caa");
        $("#pascabayar-listrik-6600").css("background-color", "white");
        $("#pascabayar-listrik-6600").css("color", "#069caa");
    } else if (type == 2) {
        $("#pascabayar-listrik-450").css("background-color", "white");
        $("#pascabayar-listrik-450").css("color", "#069caa");
        $("#pascabayar-listrik-900").css("background-color", "white");
        $("#pascabayar-listrik-900").css("color", "#069caa");
        $("#pascabayar-listrik-1300").css("background-color", "#069caa");
        $("#pascabayar-listrik-1300").css("color", "white");
        $("#pascabayar-listrik-2200").css("background-color", "white");
        $("#pascabayar-listrik-2200").css("color", "#069caa");
        $("#pascabayar-listrik-3500").css("background-color", "white");
        $("#pascabayar-listrik-3500").css("color", "#069caa");
        $("#pascabayar-listrik-6600").css("background-color", "white");
        $("#pascabayar-listrik-6600").css("color", "#069caa");
    } else if (type == 3) {
        $("#pascabayar-listrik-450").css("background-color", "white");
        $("#pascabayar-listrik-450").css("color", "#069caa");
        $("#pascabayar-listrik-900").css("background-color", "white");
        $("#pascabayar-listrik-900").css("color", "#069caa");
        $("#pascabayar-listrik-1300").css("background-color", "white");
        $("#pascabayar-listrik-1300").css("color", "#069caa");
        $("#pascabayar-listrik-2200").css("background-color", "#069caa");
        $("#pascabayar-listrik-2200").css("color", "white");
        $("#pascabayar-listrik-3500").css("background-color", "white");
        $("#pascabayar-listrik-3500").css("color", "#069caa");
        $("#pascabayar-listrik-6600").css("background-color", "white");
        $("#pascabayar-listrik-6600").css("color", "#069caa");
    } else if (type == 4) {
        $("#pascabayar-listrik-450").css("background-color", "white");
        $("#pascabayar-listrik-450").css("color", "#069caa");
        $("#pascabayar-listrik-900").css("background-color", "white");
        $("#pascabayar-listrik-900").css("color", "#069caa");
        $("#pascabayar-listrik-1300").css("background-color", "white");
        $("#pascabayar-listrik-1300").css("color", "#069caa");
        $("#pascabayar-listrik-2200").css("background-color", "white");
        $("#pascabayar-listrik-2200").css("color", "#069caa");
        $("#pascabayar-listrik-3500").css("background-color", "#069caa");
        $("#pascabayar-listrik-3500").css("color", "white");
        $("#pascabayar-listrik-6600").css("background-color", "white");
        $("#pascabayar-listrik-6600").css("color", "#069caa");
    } else if (type == 5) {
        $("#pascabayar-listrik-450").css("background-color", "white");
        $("#pascabayar-listrik-450").css("color", "#069caa");
        $("#pascabayar-listrik-900").css("background-color", "white");
        $("#pascabayar-listrik-900").css("color", "#069caa");
        $("#pascabayar-listrik-1300").css("background-color", "white");
        $("#pascabayar-listrik-1300").css("color", "#069caa");
        $("#pascabayar-listrik-2200").css("background-color", "white");
        $("#pascabayar-listrik-2200").css("color", "#069caa");
        $("#pascabayar-listrik-3500").css("background-color", "white");
        $("#pascabayar-listrik-3500").css("color", "#069caa");
        $("#pascabayar-listrik-6600").css("background-color", "#069caa");
        $("#pascabayar-listrik-6600").css("color", "white");
    }
}