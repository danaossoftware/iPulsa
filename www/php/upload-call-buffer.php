<?php
//$fileName = $_POST["file_name"];
//$receiverId = $_POST["receiver_id"];
$bufferDir = "../userdata/call_buffers/" . $receiverId;
//if (!file_exists($bufferDir)) {
	mkdir("../userdata/call_buffers/WJExJRu9Csboai7cs1JDWRQifq23", 777, true);
//}
//move_uploaded_file($_FILES["file"]["tmp_name"], $bufferDir . "/" . $fileName);