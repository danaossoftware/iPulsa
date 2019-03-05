<?php
include 'db.php';
$xml = simplexml_load_string(file_get_contents("php://input"));
$responseCode = $xml->params->param->value->struct->member[0]->value->string;
$requestID = $xml->params->param->value->struct->member[1]->value->string;
$message = $xml->params->param->value->struct->member[2]->value->string;
$transactionID = $xml->params->param->value->struct->member[3]->value->string;
$c->query("INSERT INTO topup_history (id, type, server_id, client_id, status_code, product_code, msisdn, serial_number, message, response_code, request_id, transaction_id) VALUES ('" . uniqid() . "', 'xml', '', '', '', '', '', '', '" . $message . "', '" . $responseCode . "', '" . $requestID . "', '" . $transactionID . "')");