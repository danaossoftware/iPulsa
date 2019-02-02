<?php
session_start();
$userId = $_SESSION["ipulsa_user_id"];
echo $userId;