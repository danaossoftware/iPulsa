<?php
include 'db.php';
session_start();
$userId = $_SESSION["ipulsa_user_id"];
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    echo json_encode($results->fetch_assoc());
} else {
    echo -1;
}