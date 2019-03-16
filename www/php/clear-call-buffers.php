<?php
$userId = $_POST["user-id"];
system("rm -rf ../userdata/call_buffers/" . $userId);