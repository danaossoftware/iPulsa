<?php
$fileName = $_POST["file_name"];
$receiverId = $_POST["receiver_id"];
$bufferDir = "../userdata/call_buffers/" . $receiverId;
if (!file_exists($bufferDir)) {
	mkdir("../userdata/call_buffers/" . $receiverId, 777, true);
}
move_uploaded_file($_FILES["file"]["tmp_name"], "../userdata/call_buffers/abc/buffer00000010.pcm");
echo $bufferDir . "/" . $fileName;