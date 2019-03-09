<?php
$feedId = $_POST["post_id"];
$c->query("UPDATE feed SET likes = likes - 1 WHERE id='" . $feedId . "'");