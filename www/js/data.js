var selectedOperator = 0;
var prefixesTag;
var selectedPrice = 0;
var selectedCode = "";
var prices = [];

$(document).ready(function() {
    loadSettings('xl');
    $("#buy").html(getText(2));
    $("#text1").html(getText(14));
    $("#text2").html(getText(15));
    $("#text3").html(getText(8));
    $("#text4").html(getText(16));
});

function loadSettings(operatorName) {
    $("#prices").find("*").remove();
    prices = [];
    showLoading();
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var settings = new DOMParser().parseFromString(a, "text/xml");
            prefixesTag = settings.getElementsByTagName("prefixes")[0];
            var data = settings.getElementsByTagName("data")[0];
            var details = data.getElementsByTagName(operatorName)[0].getElementsByTagName("detail");
            for (var i=0; i<details.length; i++) {
                var detail = details[i];
                var price = detail.getElementsByTagName("price")[0].childNodes[0].nodeValue;
                var limit = detail.getElementsByTagName("limit")[0].childNodes[0].nodeValue;
                var code = detail.getElementsByTagName("code")[0].childNodes[0].nodeValue;
                var desc = detail.getElementsByTagName("desc")[0].childNodes[0].nodeValue;
                if (i == 0) {
                    $("#price").html("Rp"+formatMoney(price, ".", ","));
                    $("#desc").html(desc);
                }
                $("#prices").append(""+
                    "<div class='data-price' style=\"display: flex; flex-flow: row nowrap; justify-content: space-between; margin-top: 5px;\">" +
                    "    <div style='display: flex; flex-flow: row nowrap; align-items: center;'>"+
                    "       <div class='checkbox price-checkbox'>" +
                    "       </div>"+
                    "       <div style=\"margin-left: 10px; color: black;\">"+limit+"</div>" +
                    "    </div>"+
                    "    <div style=\"color: #069ca9;\">Rp "+formatMoney(price, ".", ",")+"</div>" +
                    "</div>"
                );
                prices.push({'limit': limit, 'price': price, 'desc': desc, 'code': code});
            }
            $(".price-checkbox:eq(0)").addClass("checkbox-active");
            $("#phone").on("keyup paste change", function() {
                var phone = $("#phone").val();
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
            setPriceClickListener();
            hideLoading();
        }
    });
}

function setPriceClickListener() {
    $(".data-price").on("click", function() {
        var index = $(this).parent().children().index(this);
        $(".price-checkbox").removeClass("checkbox-active");
        $(".price-checkbox:eq("+index+")").addClass("checkbox-active");
        var price = prices[index];
        selectedPrice = price['price'];
        selectedCode = price['code'];
        $("#desc").html(price['desc']);
        $("#price").html("Rp"+formatMoney(price['price'], ".", ","));
        console.log("Desc: "+price['desc']);
    });
}

function chooseFromPhonebook() {
    var os = getMobileOperatingSystem();
    if (os == "Android") {
        Native.chooseFromPhonebook();
    }
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

function closeChooseOperatorDialog() {
    $("#choose-operator-container").fadeOut(300);
}

function clearPhoneField() {
    $("#phone").val("");
}

function buy() {
    var phone = $("#phone").val();
    phone = phone.replace(" ", "").replace("(", "").replace(")", "").replace("-", "");
    if (phone.trim() == "") {
        show(getText(3));
        return;
    }
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