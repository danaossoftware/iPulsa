var selectedType = 0; //0 = Prabayar, 1 = Pascabayar, 2 = Non Taglis
var selectedPrice = 0;
var selectedCode = '';
var array = [
    "Hello", "world"
];
var prabayarPrices = [];
var pascabayarPrices = [];
var nonTaglisPrices = [];

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
    $("#buy").html(getText(2));
    $("#buy-2").html(getText(2));
    $("#buy-3").html(getText(2));
    $("#prabayar-text").html(getText(5));
    $("#pascabayar-text").html(getText(6));
    $("#nontaglis-text").html(getText(7));
    $("#text1").html(getText(8));
    $("#text2").html(getText(17));
    $("#text3").html(getText(17));
    $("#text4").html(getText(17));
    $("#text5").html(getText(8));
    $("#text6").html(getText(8));
    loadSettings();
});

function loadSettings() {
    $("#prabayar-prices").find("*").remove();
    $("#pascabayar-prices").find("*").remove();
    $("#nontaglis-services").find("*").remove();
    prabayarPrices = [];
    pascabayarPrices = [];
    nonTaglisPrices = [];
    showLoading();
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var settings = new DOMParser().parseFromString(a, "text/xml");
            var pln = settings.getElementsByTagName("pln")[0];
            var prabayar = pln.getElementsByTagName("prabayar")[0];
            var prabayarDetails = prabayar.getElementsByTagName("detail");
            for (let i=0; i<prabayarDetails.length; i+=2) {
                let appendedDiv = "<div style='width: 100%; display: flex; flex-flow: row nowrap;'>";
                var prabayarDetail = prabayarDetails[i];
                if (prabayarDetail != undefined) {
                    try {
                        let price = parseInt(prabayarDetail.getElementsByTagName("price")[0].childNodes[0].nodeValue);
                        let code = prabayarDetail.getElementsByTagName("code")[0].childNodes[0].nodeValue;
                        prabayarPrices.push({'price': price, 'code': code});
                        let border = "";
                        if (i == 0) {
                            $("#prabayar-price").html("Rp"+formatMoney(price));
                            border = "border-top-left-radius: 15px;";
                        } else if (i == prabayarDetails.length - 1) {
                            if ((i % 2) == 0) {
                                border = "border-bottom-left-radius: 15px;";
                            } else if ((i % 2) == 1) {
                                border = "border-bottom-right-radius: 15px;";
                            }
                        } else if (i == prabayarDetails.length - 2) {
                            if ((i % 2) == 0) {
                                border = "border-bottom-left-radius: 15px;";
                            }
                        }
                        appendedDiv +=
                            "<div class='prabayar-price' style='"+border+" width: 50%; height: 80px; display: flex; justify-content: center; align-items: center; color: #069caa; flex-flow: row nowrap;'>"+
                                "<div style='font-size: 25px; font-weight: bold;'>"+formatMoney(price, ".", ",")+"</div>"+
                            "</div>";
                    } catch (e) {
                        console.log(e.toString());
                    }
                }
                prabayarDetail = prabayarDetails[i+1];
                if (prabayarDetail != undefined) {
                    try {
                        let price = prabayarDetail.getElementsByTagName("price")[0].childNodes[0].nodeValue;
                        let code = prabayarDetail.getElementsByTagName("code")[0].childNodes[0].nodeValue;
                        prabayarPrices.push({'price': price, 'code': code});
                        let border = "";
                        if ((i+1) == 1) {
                            border = "border-top-right-radius: 15px;";
                        } else if ((i+1) == prabayarDetails.length - 1) {
                            if (((i+1) % 2) == 0) {
                                border = "border-bottom-left-radius: 15px;";
                            } else if (((i+1) % 2) == 1) {
                                border = "border-bottom-right-radius: 15px;";
                            }
                        }
                        appendedDiv +=
                            "<div class='prabayar-price' style='"+border+" width: 50%; height: 80px; display: flex; justify-content: center; align-items: center; color: #069caa; flex-flow: row nowrap;'>"+
                                "<div style='font-size: 25px; font-weight: bold;'>"+formatMoney(price, ".", ",")+"</div>"+
                            "</div>";
                    } catch (e) {
                        console.log(e.toString());
                    }
                }
                appendedDiv += "</div>";
                $("#prabayar-prices").append(appendedDiv);
            }
            $(".prabayar-price:eq(0)").css("background-color", "#069caa").css("color", "white");
            var pascabayar = pln.getElementsByTagName("pascabayar")[0];
            var pascabayarDetails = pascabayar.getElementsByTagName("detail");
            for (let i=0; i<pascabayarDetails.length; i+=2) {
                let appendedDiv = "<div style='width: 100%; display: flex; flex-flow: row nowrap;'>";
                var pascabayarDetail = pascabayarDetails[i];
                if (pascabayarDetail != undefined) {
                    try {
                        let va = parseInt(pascabayarDetail.getElementsByTagName("va")[0].childNodes[0].nodeValue);
                        let price = parseInt(pascabayarDetail.getElementsByTagName("price")[0].childNodes[0].nodeValue);
                        let code = pascabayarDetail.getElementsByTagName("code")[0].childNodes[0].nodeValue;
                        pascabayarPrices.push({'va': va, 'price': price, 'code': code});
                        let border = "";
                        if (i == 0) {
                            $("#pascabayar-price").html("Rp"+formatMoney(price));
                            border = "border-top-left-radius: 15px;";
                        } else if (i == pascabayarDetails.length - 1) {
                            if ((i % 2) == 0) {
                                border = "border-bottom-left-radius: 15px;";
                            } else if ((i % 2) == 1) {
                                border = "border-bottom-right-radius: 15px;";
                            }
                        } else if (i == pascabayarDetails.length - 2) {
                            if ((i % 2) == 0) {
                                border = "border-bottom-left-radius: 15px;";
                            }
                        }
                        appendedDiv +=
                            "<div class='pascabayar-va' style='"+border+" width: 50%; height: 80px; display: flex; justify-content: center; align-items: center; color: #069caa; flex-flow: row nowrap;'>"+
                            "<div style='font-size: 25px; font-weight: bold;'>"+va+" VA</div>"+
                            "</div>";
                    } catch (e) {
                        console.log(e.toString());
                    }
                }
                pascabayarDetail = pascabayarDetails[i+1];
                if (pascabayarDetail != undefined) {
                    try {
                        let va = pascabayarDetail.getElementsByTagName("va")[0].childNodes[0].nodeValue;
                        let price = pascabayarDetail.getElementsByTagName("price")[0].childNodes[0].nodeValue;
                        let code = pascabayarDetail.getElementsByTagName("code")[0].childNodes[0].nodeValue;
                        pascabayarPrices.push({'va': va, 'price': price, 'code': code});
                        let border = "";
                        if ((i+1) == 1) {
                            border = "border-top-right-radius: 15px;";
                        } else if ((i+1) == pascabayarDetails.length - 1) {
                            if (((i+1) % 2) == 0) {
                                border = "border-bottom-left-radius: 15px;";
                            } else if (((i+1) % 2) == 1) {
                                border = "border-bottom-right-radius: 15px;";
                            }
                        }
                        appendedDiv +=
                            "<div class='pascabayar-va' style='"+border+" width: 50%; height: 80px; display: flex; justify-content: center; align-items: center; color: #069caa; flex-flow: row nowrap;'>"+
                            "<div style='font-size: 25px; font-weight: bold;'>"+va+" VA</div>"+
                            "</div>";
                    } catch (e) {
                        console.log(e.toString());
                    }
                }
                appendedDiv += "</div>";
                $("#pascabayar-prices").append(appendedDiv);
            }
            $(".pascabayar-va:eq(0)").css("background-color", "#069caa").css("color", "white");
            var nonTaglis = pln.getElementsByTagName("nontaglis")[0];
            var nonTaglisDetails = nonTaglis.getElementsByTagName("detail");
            for (let i=0; i<nonTaglisDetails.length; i++) {
                let appendedDiv = "";
                var nonTaglisDetail = nonTaglisDetails[i];
                if (nonTaglisDetail != undefined) {
                    try {
                        let name = nonTaglisDetail.getElementsByTagName("name")[0].childNodes[0].nodeValue;
                        let price = nonTaglisDetail.getElementsByTagName("price")[0].childNodes[0].nodeValue;
                        let code = nonTaglisDetail.getElementsByTagName("code")[0].childNodes[0].nodeValue;
                        $("#nontaglis-price").html("Rp"+formatMoney(price));
                        console.log("Price: "+price);
                        nonTaglisPrices.push({'name': name, 'price': price, 'code': code});
                        let border = "";
                        if (i == 0) {
                            border = "border-top-left-radius: 15px; border-top-right-radius: 15px;";
                        } else if (i == nonTaglisDetails.length - 1) {
                            border = "border-bottom-left-radius: 15px; border-bottom-right-radius: 15px;";
                        }
                        appendedDiv +=
                            "<div class='nontaglis-service' style='"+border+" width: 100%; height: 80px; display: flex; justify-content: center; align-items: center; font-size: 20px; font-weight: bold; color: #069caa;'>"+name+ "</div>"
                    } catch (e) {
                        console.log(e.toString());
                    }
                }
                appendedDiv += "";
                $("#nontaglis-services").append(appendedDiv);
            }
            $(".nontaglis-service:eq(0)").css("background-color", "#069caa").css("color", "white");
            setPriceClickListener();
            hideLoading();
        }
    });
}

function setPriceClickListener() {
    $(".prabayar-price").on("click", function() {
        var container = $(this).parent();
        var index = container.parent().children().index(container);
        var index2 = $(this).parent().children().index(this);
        index *= 2;
        index += index2;
        $(".prabayar-price").css("background-color", "white").css("color", "#069caa");
        $(".prabayar-price:eq("+index+")").css("background-color", "#069caa").css("color", "white");
        var price = prabayarPrices[index];
        selectedPrice = price['price'];
        selectedCode = price['code'];
        $("#prabayar-price").html("Rp"+formatMoney(price['price']));
    });
    $(".pascabayar-va").on("click", function() {
        var container = $(this).parent();
        var index = container.parent().children().index(container);
        var index2 = $(this).parent().children().index(this);
        index *= 2;
        index += index2;
        $(".pascabayar-va").css("background-color", "white").css("color", "#069caa");
        $(".pascabayar-va:eq("+index+")").css("background-color", "#069caa").css("color", "white");
        var price = pascabayarPrices[index];
        console.log("Price: "+price['price']);
        selectedPrice = price['price'];
        selectedCode = price['code'];
        $("#pascabayar-price").html("Rp"+formatMoney(price['price']));
    });
    $(".nontaglis-service").on("click", function() {
        var index = $(this).parent().children().index(this);
        var price = nonTaglisPrices[index];
        $(".nontaglis-service").css("background-color", "white").css("color", "#069caa");
        $(".nontaglis-service:eq("+index+")").css("background-color", "#069caa").css("color", "white");
        selectedCode = price['code'];
        selectedPrice = price['price'];
        $("#nontaglis-price").html("Rp"+formatMoney(price['price']));
    });
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

function buyPrabayar() {
    var meterNumber = $("#prabayar-id-pelanggan").val().trim();
    if (meterNumber == "") {
        show(getText(18));
        return;
    }
    if (meterNumber.indexOf("-") != -1) {
        meterNumber = meterNumber.replace("-", "");
    }
    var bought = confirm(getText(1));
    if (bought) {
        showLoading();
        $.ajax({
            type: 'GET',
            url: SERVER_URL+'get-balance.php',
            dataType: 'text',
            cache: false,
            success: function(balance) {
                console.log("Balance: "+balance);
                if (balance < selectedPrice) {
                    hideLoading();
                    var addFunds = confirm(getText(12));
                    if (addFunds) {
                        window.location.href = "../addfunds.html";
                    }
                } else {
                    $.ajax({
                        type: 'GET',
                        url: SERVER_URL + 'get-settings.php',
                        dataType: 'text',
                        cache: false,
                        success: function (a) {
                            var parser = new DOMParser();
                            var settings = parser.parseFromString(a, "text/xml").getElementsByTagName("settings")[0];
                            var ppob = settings.getElementsByTagName("ppob")[0];
                            var server = ppob.getElementsByTagName("server")[0].childNodes[0].nodeValue;
                            var mitraID = ppob.getElementsByTagName("idmitra")[0].childNodes[0].nodeValue;
                            var mitraPhone = ppob.getElementsByTagName("phone")[0].childNodes[0].nodeValue;
                            var requestID = ppob.getElementsByTagName("requestid")[0].childNodes[0].nodeValue;
                            var pin = ppob.getElementsByTagName("pin")[0].childNodes[0].nodeValue;
                            var user = ppob.getElementsByTagName("user")[0].childNodes[0].nodeValue;
                            var pass = ppob.getElementsByTagName("password")[0].childNodes[0].nodeValue;
                            if (bought) {
                                var xml = "<?xml version=\"1.0\"?><methodCall><methodName>topUpRequest</methodName><params><param><value><struct><member><name>MSISDN</name><value><string>" + mitraPhone + "</string></value></member><member><name>REQUESTID</name><value><string>" + requestID + "</string></value></member><member><name>PIN</name><value><string>" + pin + "</string></value></member><member><name>NOHP</name><value><string>" + meterNumber + "</string></value></member><member><name>NOM</name><value><string>" + selectedCode + "</string></value></member></struct></value></param></params></methodCall>";
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://' + server,
                                    data: xml,
                                    dataType: 'text/xml',
                                    cache: false,
                                    success: function (a) {
                                        var parser = new DOMParser();
                                        var response = parser.parseFromString(a, "text/xml");
                                        var struct = response.getElementsByTagName("struct")[0];
                                        var memberTags = struct.getElementsByTagName("member");
                                        var responseCode = "00";
                                        var message = "";
                                        var transactionID = "";
                                        for (let i = 0; i < memberTags.length; i++) {
                                            var member = memberTags[i];
                                            var name = member.getElementsByTagName("name")[0].childNodes[0].nodeValue;
                                            var value = member.getElementsByTagName("value")[0].getElementsByTagName("string")[0].childNodes[0].nodeValue;
                                            if (name == "RESPONSECODE") {
                                                responseCode = value;
                                            } else if (name == "MESSAGE") {
                                                message = value;
                                            } else if (name == "TRANSACTIONID") {
                                                transactionID = value;
                                            }
                                        }
                                        if (responseCode == "00" || responseCode == "68") {
                                            $.ajax({
                                                type: 'GET',
                                                url: SERVER_URL + 'add-transaction.php',
                                                data: {'transaction_id': transactionID, 'code': selectedCode},
                                                dataType: 'text',
                                                cache: false,
                                                success: function (a) {
                                                    showAlert(getText(11) + "\n" + message);
                                                    hideLoading();
                                                }
                                            });
                                        } else {
                                            if (message.trim() == "") {
                                                message = getText(10);
                                            }
                                            showAlert(getText(9) + message);
                                            hideLoading();
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }
}

function buyPascabayar() {
    var meterNumber = $("#pascabayar-id-pelanggan").val().trim();
    if (meterNumber == "") {
        show(getText(18));
        return;
    }
    if (meterNumber.indexOf("-") != -1) {
        meterNumber = meterNumber.replace("-", "");
    }
    var bought = confirm(getText(1));
    if (bought) {
        showLoading();
        $.ajax({
            type: 'GET',
            url: SERVER_URL+'get-balance.php',
            dataType: 'text',
            cache: false,
            success: function(balance) {
                console.log("Balance: "+balance);
                if (balance < selectedPrice) {
                    hideLoading();
                    var addFunds = confirm(getText(12));
                    if (addFunds) {
                        window.location.href = "../addfunds.html";
                    }
                } else {
                    $.ajax({
                        type: 'GET',
                        url: SERVER_URL + 'get-settings.php',
                        dataType: 'text',
                        cache: false,
                        success: function (a) {
                            var parser = new DOMParser();
                            var settings = parser.parseFromString(a, "text/xml").getElementsByTagName("settings")[0];
                            var ppob = settings.getElementsByTagName("ppob")[0];
                            var server = ppob.getElementsByTagName("server")[0].childNodes[0].nodeValue;
                            var mitraID = ppob.getElementsByTagName("idmitra")[0].childNodes[0].nodeValue;
                            var mitraPhone = ppob.getElementsByTagName("phone")[0].childNodes[0].nodeValue;
                            var requestID = ppob.getElementsByTagName("requestid")[0].childNodes[0].nodeValue;
                            var pin = ppob.getElementsByTagName("pin")[0].childNodes[0].nodeValue;
                            var user = ppob.getElementsByTagName("user")[0].childNodes[0].nodeValue;
                            var pass = ppob.getElementsByTagName("password")[0].childNodes[0].nodeValue;
                            if (bought) {
                                var xml = "<?xml version=\"1.0\"?><methodCall><methodName>topUpRequest</methodName><params><param><value><struct><member><name>MSISDN</name><value><string>" + mitraPhone + "</string></value></member><member><name>REQUESTID</name><value><string>" + requestID + "</string></value></member><member><name>PIN</name><value><string>" + pin + "</string></value></member><member><name>NOHP</name><value><string>" + meterNumber + "</string></value></member><member><name>NOM</name><value><string>" + selectedCode + "</string></value></member></struct></value></param></params></methodCall>";
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://' + server,
                                    data: xml,
                                    dataType: 'text/xml',
                                    cache: false,
                                    success: function (a) {
                                        var parser = new DOMParser();
                                        var response = parser.parseFromString(a, "text/xml");
                                        var struct = response.getElementsByTagName("struct")[0];
                                        var memberTags = struct.getElementsByTagName("member");
                                        var responseCode = "00";
                                        var message = "";
                                        var transactionID = "";
                                        for (let i = 0; i < memberTags.length; i++) {
                                            var member = memberTags[i];
                                            var name = member.getElementsByTagName("name")[0].childNodes[0].nodeValue;
                                            var value = member.getElementsByTagName("value")[0].getElementsByTagName("string")[0].childNodes[0].nodeValue;
                                            if (name == "RESPONSECODE") {
                                                responseCode = value;
                                            } else if (name == "MESSAGE") {
                                                message = value;
                                            } else if (name == "TRANSACTIONID") {
                                                transactionID = value;
                                            }
                                        }
                                        if (responseCode == "00" || responseCode == "68") {
                                            $.ajax({
                                                type: 'GET',
                                                url: SERVER_URL + 'add-transaction.php',
                                                data: {'transaction_id': transactionID, 'code': selectedCode},
                                                dataType: 'text',
                                                cache: false,
                                                success: function (a) {
                                                    showAlert(getText(11) + "\n" + message);
                                                    hideLoading();
                                                }
                                            });
                                        } else {
                                            if (message.trim() == "") {
                                                message = getText(10);
                                            }
                                            showAlert(getText(9) + message);
                                            hideLoading();
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }
}

function buyNonTaglis() {
    var meterNumber = $("#non-taglis-id-pelanggan").val().trim();
    if (meterNumber == "") {
        show(getText(18));
        return;
    }
    if (meterNumber.indexOf("-") != -1) {
        meterNumber = meterNumber.replace("-", "");
    }
    var bought = confirm(getText(1));
    if (bought) {
        showLoading();
        $.ajax({
            type: 'GET',
            url: SERVER_URL+'get-balance.php',
            dataType: 'text',
            cache: false,
            success: function(balance) {
                console.log("Balance: "+balance);
                if (balance < selectedPrice) {
                    hideLoading();
                    var addFunds = confirm(getText(12));
                    if (addFunds) {
                        window.location.href = "../addfunds.html";
                    }
                } else {
                    $.ajax({
                        type: 'GET',
                        url: SERVER_URL + 'get-settings.php',
                        dataType: 'text',
                        cache: false,
                        success: function (a) {
                            var parser = new DOMParser();
                            var settings = parser.parseFromString(a, "text/xml").getElementsByTagName("settings")[0];
                            var ppob = settings.getElementsByTagName("ppob")[0];
                            var server = ppob.getElementsByTagName("server")[0].childNodes[0].nodeValue;
                            var mitraID = ppob.getElementsByTagName("idmitra")[0].childNodes[0].nodeValue;
                            var mitraPhone = ppob.getElementsByTagName("phone")[0].childNodes[0].nodeValue;
                            var requestID = ppob.getElementsByTagName("requestid")[0].childNodes[0].nodeValue;
                            var pin = ppob.getElementsByTagName("pin")[0].childNodes[0].nodeValue;
                            var user = ppob.getElementsByTagName("user")[0].childNodes[0].nodeValue;
                            var pass = ppob.getElementsByTagName("password")[0].childNodes[0].nodeValue;
                            if (bought) {
                                var xml = "<?xml version=\"1.0\"?><methodCall><methodName>topUpRequest</methodName><params><param><value><struct><member><name>MSISDN</name><value><string>" + mitraPhone + "</string></value></member><member><name>REQUESTID</name><value><string>" + requestID + "</string></value></member><member><name>PIN</name><value><string>" + pin + "</string></value></member><member><name>NOHP</name><value><string>" + meterNumber + "</string></value></member><member><name>NOM</name><value><string>" + selectedCode + "</string></value></member></struct></value></param></params></methodCall>";
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://' + server,
                                    data: xml,
                                    dataType: 'text/xml',
                                    cache: false,
                                    success: function (a) {
                                        var parser = new DOMParser();
                                        var response = parser.parseFromString(a, "text/xml");
                                        var struct = response.getElementsByTagName("struct")[0];
                                        var memberTags = struct.getElementsByTagName("member");
                                        var responseCode = "00";
                                        var message = "";
                                        var transactionID = "";
                                        for (let i = 0; i < memberTags.length; i++) {
                                            var member = memberTags[i];
                                            var name = member.getElementsByTagName("name")[0].childNodes[0].nodeValue;
                                            var value = member.getElementsByTagName("value")[0].getElementsByTagName("string")[0].childNodes[0].nodeValue;
                                            if (name == "RESPONSECODE") {
                                                responseCode = value;
                                            } else if (name == "MESSAGE") {
                                                message = value;
                                            } else if (name == "TRANSACTIONID") {
                                                transactionID = value;
                                            }
                                        }
                                        if (responseCode == "00" || responseCode == "68") {
                                            $.ajax({
                                                type: 'GET',
                                                url: SERVER_URL + 'add-transaction.php',
                                                data: {'transaction_id': transactionID, 'code': selectedCode},
                                                dataType: 'text',
                                                cache: false,
                                                success: function (a) {
                                                    showAlert(getText(11) + "\n" + message);
                                                    hideLoading();
                                                }
                                            });
                                        } else {
                                            if (message.trim() == "") {
                                                message = getText(10);
                                            }
                                            showAlert(getText(9) + message);
                                            hideLoading();
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }
}