<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
/*include 'db.php';
include 'get-ip.php';
$ip = getIP();
$results = $c->query("SELECT * FROM sessions WHERE ip='" . $ip . "'");
if ($results && $results->num_rows > 0) {
    echo 0;
} else {
    echo -1;
}*/
session_id("ipulsa");
session_start();
if (isset($_SESSION["ipulsa_user_id"])) {
    echo 0;
} else {
    echo -1;
}