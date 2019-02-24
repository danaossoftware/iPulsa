<?php
include 'db.php';
/*include 'get-ip.php';
include 'common.php';
$ip = getIP();
$userId = getUserID();
$c->query("DELETE FROM sessions WHERE ip='" . $ip . "' AND user_id='" . $userId . "'");*/
session_id("ipulsa");
session_start();
unset($_SESSION["ipulsa_user_id"]);
session_destroy();
echo 0;