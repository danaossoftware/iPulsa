<?php
$c = new mysqli("danaos.xyz", "u954666570_pulsa", "HelloWorld123");
$c->select_db("u954666570_pulsa");
$results = $c->query("SELECT * FROM messages WHERE sender_id='123abd' AND receiver_id='5c3890258a741'");
$row = $results->fetch_assoc();
echo json_encode($row);