<?php
include 'db.php';
$ip = $_SERVER["REMOTE_ADDR"];
$results = $c->query("SELECT * FROM sessions WHERE ip='139.195.72.60'");
if ($results && $results->num_rows > 0) {
    echo 0;
} else {
    echo -1;
}