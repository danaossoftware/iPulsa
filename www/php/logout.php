<?php
include 'db.php';
session_start();
$_SESSION["ipulsa_user_id"] = "";
unset($_SESSION["ipulsa_user_id"]);
session_destroy();