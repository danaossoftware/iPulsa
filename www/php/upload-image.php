<?php
$fileName = $_POST["file-name"];
if (!file_exists("../userdata/imgs")) {
    mkdir("../userdata/imgs");
}
move_uploaded_file($_FILES["uploaded_file"]["tmp_name"], "../userdata/imgs/" . $fileName);