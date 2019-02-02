$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var parser = new DOMParser();
            var xml = parser.parseFromString(a, "text/xml");
            var settings = xml.getElementsByTagName("settings")[0];
            var promo = settings.getElementsByTagName("prices")[0].getElementsByTagName("topup")[0].getElementsByTagName("promo")[0];
            var promoDetails = promo.getElementsByTagName("detail");
            for (var i=0; i<promoDetails.length; i++) {
                var promoDetail = promoDetails[i];
                var balance = promoDetail.getElementsByTagName("balance")[0].childNodes[0].nodeValue;
                var price = promoDetail.getElementsByTagName("price")[0].childNodes[0].nodeValue;
                $("#promo-prices").append(""+
                    "<div style=\"display: flex; flex-flow: row nowrap; justify-content: space-between\">" +
                    "    <div style='display: flex; flex-flow: row nowrap; align-items: center;'>"+
                    "       <div class='checkbox'>" +
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
            }
            $("#promo-prices").find(".checkbox:eq(0)").attr("class", "checkbox-active");
            $("#loading-container").hide();
            setBalanceClickListener();
        }
    });
});

function setBalanceClickListener() {
}

function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};