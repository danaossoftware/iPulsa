<?php
$fileName = $_POST["file-name"];
if (!file_exists("../userdata/videos")) {
    mkdir("../userdata/videos", 777, true);
}
chmod("../userdata/videos", 755);
move_uploaded_file($_FILES["uploaded_file"]["tmp_name"], "../userdata/videos/" . $fileName);