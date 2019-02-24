<?php
include 'db.php';
$code = $_GET["code"];
session_id("ipulsa");
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$date = round(microtime(true)*1000);
$transactionID = '';
while (true) {
    $transactionID = uniqid();
    $results = $c->query("SELECT * FROM transaction_ids WHERE id='" . $transactionID . "'");
    if ($results && $results->num_rows > 0) {
        continue;
    } else {
        break;
    }
}
$c->query("INSERT INTO transaction_ids (id, user_id, code, date) VALUES ('" . uniqid() . "', '" . $userId . "', '" . $code . "', " . $date . ")");
echo $transactionID;