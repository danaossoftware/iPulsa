<?php
$fileName = $_POST["file-name"];
if (!file_exists("../userdata/recordings")) {
    mkdir("../userdata/recordings", 777, true);
}
chmod("../userdata/recordings", 755);
move_uploaded_file($_FILES["file"]["tmp_name"], "../userdata/recordings/" . $fileName);