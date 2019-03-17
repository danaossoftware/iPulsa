<?php
$fileName = $_POST["file-name"];
if (!file_exists("../userdata/documents")) {
    mkdir("../userdata/documents", 777, true);
}
chmod("../userdata/documents", 755);
move_uploaded_file($_FILES["file"]["tmp_name"], "../userdata/documents/" . $fileName);