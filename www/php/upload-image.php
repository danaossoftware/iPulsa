<?php
$fileName = $_POST["file-name"];
if (!file_exists("../userdata/imgs")) {
    mkdir("../userdata/imgs", 777, true);
}
chmod("../userdata/imgs", 755);
move_uploaded_file($_FILES["file"]["tmp_name"], "../userdata/imgs/" . $fileName);