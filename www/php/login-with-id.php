<?php
session_id("ipulsa");
session_start();
$userId = $_POST["user_id"];
$_SESSION["ipulsa_user_id"] = $userId;