var selectedOperator = 0;
var promoPrices = [];
var regularPrices = [];
var vipPrices = [];
var selectedBalanceType = 0; //0 = Promo, 1 = Regular, 2 = VIP
var selectedBalance = 0;
var selectedPrice = 0;
var selectedCode = '';
var prefixesTag;

$(document).ready(function() {
    loadSettings('xl');
    $("#buy").html(getText(2));
    $("#text1").html(getText(13));
    $("#text2").html(getText(8));
    $("#text3").html(getText(13));
    $("#text4").html(getText(8));
    $("#text5").html(getText(13));
    $("#text6").html(getText(8));
    $("#text7").html(getText(8));
    $("#text8").html(getText(14));
});

function loadSettings(operatorName) {
    promoPrices = [];
    regularPrices = [];
    vipPrices = [];
    showLoading();
    $("#promo-prices").find("*").remove();
    $("#regular-prices").find("*").remove();
    $("#vip-prices").find("*").remove();
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var parser = new DOMParser();
            var xml = parser.parseFromString(a, "text/xml");
            var settings = xml.getElementsByTagName("settings")[0];
            var promo = settings.getElementsByTagName("prices")[0].getElementsByTagName("topup")[0].getElementsByTagName("promo")[0].getElementsByTagName(operatorName)[0];
            var promoDetails = promo.getElementsByTagName("detail");
            prefixesTag = xml.getElementsByTagName("prefixes")[0];
            for (let i=0; i<promoDetails.length; i++) {
                var promoDetail = promoDetails[i];
                let balance = promoDetail.getElementsByTagName("balance")[0].childNodes[0].nodeValue;
                let price = promoDetail.getElementsByTagName("price")[0].childNodes[0].nodeValue;
                let code = promoDetail.getElementsByTagName("code")[0].childNodes[0].nodeValue;
                $("#promo-prices").append(""+
                    "<div class='promo-balance' style=\"display: flex; flex-flow: row nowrap; justify-content: space-between\">" +
                    "    <div style='display: flex; flex-flow: row nowrap; align-items: center;'>"+
                    "       <div class='checkbox balance-checkbox'>" +
                    "       </div>"+
                    "       <div style=\"margin-left: 10px; color: black;\">Rp "+formatMoney(balance, ".", ",")+"</div>" +
                    "    </div>"+
                    "    <div style=\"color: #069ca9;\">Rp "+formatMoney(price, ".", ",")+"</div>" +
                    "</div>"
                );
                if (i < promoDetails.length-1) {
                    $("#promo-prices").append(""+
                        "<div style='width: 100%; height: 1px; background-color: rgba(0, 0, 0, .1); margin-top: 5px;'></div>"
                    );
                }
                promoPrices.push({'balance': balance, 'price': price, 'code': code});
            }
            selectedPrice = promoPrices[0]['price'];
            selectedBalance = promoPrices[0]['balance'];
            selectedCode = promoPrices[0]['code'];
            $("#price").html("Rp"+formatMoney(selectedPrice, '.', ','));
            $("#promo-prices").find(".checkbox:eq(0)").addClass("checkbox-active");
            var regular = settings.getElementsByTagName("prices")[0].getElementsByTagName("topup")[0].getElementsByTagName("regular")[0].getElementsByTagName(operatorName)[0];
            var regularDetails = regular.getElementsByTagName("detail");
            for (let i=0; i<regularDetails.length; i++) {
                var regularDetail = regularDetails[i];
                let balance = regularDetail.getElementsByTagName("balance")[0].childNodes[0].nodeValue;
                let price = regularDetail.getElementsByTagName("price")[0].childNodes[0].nodeValue;
                let code = regularDetail.getElementsByTagName("code")[0].childNodes[0].nodeValue;
                $("#regular-prices").append(""+
                    "<div class='regular-balance' style=\"display: flex; flex-flow: row nowrap; justify-content: space-between\">" +
                    "    <div style='display: flex; flex-flow: row nowrap; align-items: center;'>"+
                    "       <div class='checkbox balance-checkbox'>" +
                    "       </div>"+
                    "       <div style=\"margin-left: 10px; color: black;\">Rp "+formatMoney(balance, ".", ",")+"</div>" +
                    "    </div>"+
                    "    <div style=\"color: #069ca9;\">Rp "+formatMoney(price, ".", ",")+"</div>" +
                    "</div>"
                );
                if (i < regularDetails.length-1) {
                    $("#regular-prices").append(""+
                        "<div style='width: 100%; height: 1px; background-color: rgba(0, 0, 0, .1); margin-top: 5px;'></div>"
                    );
                }
                regularPrices.push({'balance': balance, 'price': price, 'code': code});
            }
            $("#regular-prices").find(".checkbox:eq(0)").addClass("checkbox-active");
            var vip = settings.getElementsByTagName("prices")[0].getElementsByTagName("topup")[0].getElementsByTagName("vip")[0].getElementsByTagName(operatorName)[0];
            var vipDetails = vip.getElementsByTagName("detail");
            for (let i=0; i<vipDetails.length; i++) {
                var vipDetail = vipDetails[i];
                let balance = vipDetail.getElementsByTagName("balance")[0].childNodes[0].nodeValue;
                let price = vipDetail.getElementsByTagName("price")[0].childNodes[0].nodeValue;
                let code = vipDetail.getElementsByTagName("code")[0].childNodes[0].nodeValue;
                $("#vip-prices").append(""+
                    "<div class='vip-balance' style=\"display: flex; flex-flow: row nowrap; justify-content: space-between\">" +
                    "    <div style='display: flex; flex-flow: row nowrap; align-items: center;'>"+
                    "       <div class='checkbox balance-checkbox'>" +
                    "       </div>"+
                    "       <div style=\"margin-left: 10px; color: black;\">Rp "+formatMoney(balance, ".", ",")+"</div>" +
                    "    </div>"+
                    "    <div style=\"color: #069ca9;\">Rp "+formatMoney(price, ".", ",")+"</div>" +
                    "</div>"
                );
                if (i < vipDetails.length-1) {
                    $("#vip-prices").append(""+
                        "<div style='width: 100%; height: 1px; background-color: rgba(0, 0, 0, .1); margin-top: 5px;'></div>"
                    );
                }
                vipPrices.push({'balance': balance, 'price': price, 'code': code});
            }
            $("#vip-prices").find(".checkbox:eq(0)").addClass("checkbox-active");
            $("#loading-container").hide();
            setBalanceClickListener();
            $("#phone").on("change paste keyup", function() {
                var phone = $("#phone").val().trim();
                phone = phone.replace(" ", "").replace("(", "").replace(")", "").replace("-", "");
                if (phone.startsWith("+62")) {
                    phone = "0"+phone.substring(3, phone.length);
                }
                if (phone.length == 4) {
                    var prefixes = prefixesTag.getElementsByTagName("prefix");
                    for (let i = 0; i < prefixes.length; i++) {
                        var prefix = prefixes[i].childNodes[0].nodeValue;
                        if (phone.startsWith(prefix)) {
                            var operatorName = prefixes[i].parentNode.nodeName;
                            console.log("Operator name: "+operatorName);
                            switch (operatorName) {
                                case 'xl':
                                    selectedOperator = 0;
                                    $("#operator-img").attr("src", "../img/xl.png");
                                    break;
                                case 'tsel':
                                    selectedOperator = 1;
                                    $("#operator-img").attr("src", "../img/telkomsel.png");
                                    break;
                                case 'three':
                                    selectedOperator = 2;
                                    $("#operator-img").attr("src", "../img/three.png");
                                    break;
                                case 'indosat':
                                    selectedOperator = 3;
                                    $("#operator-img").attr("src", "../img/indosat.png");
                                    break;
                                case 'smartfren':
                                    selectedOperator = 4;
                                    $("#operator-img").attr("src", "../img/indosat.png");
                                    break;
                            }
                            break;
                        }
                    }
                }
            });
            hideLoading();
        }
    });
}

function getOperator() {

}

function setBalanceClickListener() {
    $(".promo-balance").on("click", function() {
        var index = $(this).parent().children().index(this);
        index /= 2;
        var price = promoPrices[index];
        $("#promo-prices").find(".checkbox:eq(0)").removeClass("checkbox-active");
        $(".balance-checkbox").each(function() {
            $(this).removeClass("checkbox-active");
            $(this).addClass("checkbox");
        });
        $(this).find(".checkbox").addClass("checkbox-active");
        selectedBalance = price['balance'];
        selectedPrice = price['price'];
        selectedCode = price['code'];
        $("#price").html('Rp'+formatMoney(selectedPrice, '.', ','));
    });
    $(".regular-balance").on("click", function() {
        var index = $(this).parent().children().index(this);
        index /= 2;
        var price = regularPrices[index];
        $("#regular-prices").find(".checkbox:eq(0)").removeClass("checkbox-active");
        $(".balance-checkbox").each(function() {
            $(this).removeClass("checkbox-active");
            $(this).addClass("checkbox");
        });
        $(this).find(".checkbox").addClass("checkbox-active");
        selectedBalance = price['balance'];
        selectedPrice = price['price'];
        selectedCode = price['code'];
        $("#price").html('Rp'+formatMoney(selectedPrice, '.', ','));
    });
    $(".vip-balance").on("click", function() {
        var index = $(this).parent().children().index(this);
        index /= 2;
        var price = vipPrices[index];
        $("#vip-prices").find(".checkbox:eq(0)").removeClass("checkbox-active");
        $(".balance-checkbox").each(function() {
            $(this).removeClass("checkbox-active");
            $(this).addClass("checkbox");
        });
        $(this).find(".checkbox").addClass("checkbox-active");
        selectedBalance = price['balance'];
        selectedPrice = price['price'];
        selectedCode = price['code'];
        $("#price").html('Rp'+formatMoney(selectedPrice, '.', ','));
    });
}

function changeOperator() {
    $("#choose-operator-container").css("display", "flex").hide().fadeIn(300);
}

function chooseOperator(index) {
    selectedOperator = index;
    switch (index) {
        case 0:
            $("#operator-img").attr("src", "../img/xl.png");
            loadSettings('xl');
            break;
        case 1:
            $("#operator-img").attr("src", "../img/telkomsel.png");
            loadSettings('tsel');
            break;
        case 2:
            $("#operator-img").attr("src", "../img/three.png");
            loadSettings('three');
            break;
        case 3:
            $("#operator-img").attr("src", "../img/indosat.png");
            loadSettings('indosat');
            break;
        case 4:
            $("#operator-img").attr("src", "../img/smartfren.png");
            loadSettings('smartfren');
            break;
    }
    $("#choose-operator-container").fadeOut(300);
}

function chooseFromPhonebook() {
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        Native.chooseFromPhonebook();
    }
}

function contactChosen(number) {
    $("#phone").val(number);
}

function choosePromo() {
    selectedBalanceType = 0;
    $("#promo-selector").css("background-color", "#069caa");
    $("#regular-selector").css("background-color", "white");
    $("#vip-selector").css("background-color", "white");
    $("#promo-text").css("color", "white");
    $("#regular-text").css("color", "black");
    $("#vip-text").css("color", "black");
    $("#regular-ctr").css("display", "none");
    $("#vip-ctr").css("display", "none");
    $("#promo-ctr").css("display", "flex");
    $("#promo-prices").find(".checkbox:eq(0)").addClass("checkbox-active");
    $("#price").html('Rp'+formatMoney(promoPrices[0]["price"], ".", ","));
    var price = promoPrices[0];
    selectedBalance = price['balance'];
    selectedPrice = price['price'];
    selectedCode = price['code'];
}

function chooseRegular() {
    selectedBalanceType = 1;
    $("#promo-selector").css("background-color", "white");
    $("#regular-selector").css("background-color", "#069caa");
    $("#vip-selector").css("background-color", "white");
    $("#promo-text").css("color", "black");
    $("#regular-text").css("color", "white");
    $("#vip-text").css("color", "black");
    $("#vip-ctr").css("display", "none");
    $("#promo-ctr").css("display", "none");
    $("#regular-ctr").css("display", "flex");
    $("#regular-prices").find(".checkbox:eq(0)").addClass("checkbox-active");
    $("#price").html('Rp'+formatMoney(regularPrices[0]["price"], ".", ","));
    var price = regularPrices[0];
    selectedBalance = price['balance'];
    selectedPrice = price['price'];
    selectedCode = price['code'];
}

function chooseVIP() {
    selectedBalanceType = 2;
    $("#promo-selector").css("background-color", "white");
    $("#regular-selector").css("background-color", "white");
    $("#vip-selector").css("background-color", "#069caa");
    $("#promo-text").css("color", "black");
    $("#regular-text").css("color", "black");
    $("#vip-text").css("color", "white");
    $("#promo-ctr").css("display", "none");
    $("#regular-ctr").css("display", "none");
    $("#vip-ctr").css("display", "flex");
    $("#vip-prices").find(".checkbox:eq(0)").addClass("checkbox-active");
    $("#price").html('Rp'+formatMoney(vipPrices[0]["price"], ".", ","));
    var price = vipPrices[0];
    selectedBalance = price['balance'];
    selectedPrice = price['price'];
    selectedCode = price['code'];
}

function buy() {
    var phone = $("#phone").val();
    if (phone.trim() == "") {
        show("Mohon masukkan nomor telepon");
        return;
    }
    phone = phone.replace(" ", "").replace("(", "").replace(")", "").replace("-", "");
    if (phone.startsWith("+62")) {
        phone = "0"+phone.substring(3, phone.length);
    }
    if (!phone.startsWith("0")) {
        show(getText(3));
        return;
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
                                var xml = "<?xml version=\"1.0\"?><methodCall><methodName>topUpRequest</methodName><params><param><value><struct><member><name>MSISDN</name><value><string>" + mitraPhone + "</string></value></member><member><name>REQUESTID</name><value><string>" + requestID + "</string></value></member><member><name>PIN</name><value><string>" + pin + "</string></value></member><member><name>NOHP</name><value><string>" + phone + "</string></value></member><member><name>NOM</name><value><string>" + selectedCode + "</string></value></member></struct></value></param></params></methodCall>";
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

function closeChooseOperatorDialog() {
    $("#choose-operator-container").fadeOut(300);
}