<?php
include 'db.php';
include 'get-ip.php';
include 'common.php';
$ip = getIP();
$userId = getUserID();
$c->query("DELETE FROM sessions WHERE ip='" . $ip . "' AND user_id='" . $userId . "'");
echo 0;