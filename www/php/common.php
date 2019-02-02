<?php
include 'get-ip.php';

function getUserID() {
    $c = new mysqli("localhost", "u954666570_pulsa", "HelloWorld123");
    $c->select_db("u954666570_pulsa");
    $ip = getIP();
    $results = $c->query("SELECT * FROM sessions WHERE ip='" . $ip . "'");
    if ($results && $results->num_rows > 0) {
        return $results->fetch_assoc()["user_id"];
    } else {
        return -1;
    }
};