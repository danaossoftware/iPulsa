<?php
include 'get-ip.php';

function getUserID() {
    $c = new mysqli("localhost", "u954666570_pulsa", "HelloWorld123");
    $c->select_db("u954666570_pulsa");
    /*$ip = getIP();
    $results = $c->query("SELECT * FROM sessions WHERE ip='" . $ip . "'");
    if ($results && $results->num_rows > 0) {
        return $results["user_id"];
    } else {
        return -1;
    }*/
    return "5c3890258a741";
};