<?php
include 'db.php';
session_id("ipulsa");
session_start();
unset($_SESSION["ipulsa_user_id"]);
session_destroy();
echo 0;