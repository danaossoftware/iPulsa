<?php
include 'db.php';
$userId = $_POST["user_id"];
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
	echo 0;
} else {
	echo -1;
}