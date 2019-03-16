<?php
$fileName = $_POST["file_name"];
$receiverId = "v2LltKoheOeXiX34ga59FihHSHu2";
$bufferDir = "../userdata/call_buffers/" . $receiverId;
if (!file_exists($bufferDir)) {
	mkdir("../userdata/call_buffers/" . $receiverId, 777, true);
}
move_uploaded_file($_FILES["file"]["tmp_name"], $bufferDir . "/" . $fileName);