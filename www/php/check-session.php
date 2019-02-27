<?php
session_id("ipulsa");
session_start();
if (isset($_SESSION["ipulsa_user_id"])) {
    echo 0;
} else {
    echo -1;
}