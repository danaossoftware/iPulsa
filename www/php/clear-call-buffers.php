<?php
$userId = $_POST["user-id"];
try {
	unlink("../userdata/call_buffers/" . $userId . ");
} catch (Exception $e) {
}