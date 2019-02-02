<?php
$fileName = $_POST["file-name"];
if (!file_exists("../userdata/videos")) {
    mkdir("../userdata/videos");
}
move_uploaded_file($_FILES["uploaded_file"]["tmp_name"], "../userdata/videos/" . $fileName);