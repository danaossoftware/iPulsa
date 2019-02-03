<?php
$fileName = $_POST["file-name"];
if (!file_exists("../userdata/documents")) {
    mkdir("../userdata/documents");
}
move_uploaded_file($_FILES["uploaded_file"]["tmp_name"], "../userdata/documents/" . $fileName);