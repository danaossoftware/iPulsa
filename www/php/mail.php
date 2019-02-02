<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

function sendMail($from, $dst, $subject, $msg) {
    $to = $dst;
    $message = $msg;
    $headers = "From: " . $from . " . \r\n" .
        "Reply-To: " . $from . " . \r\n" .
        "Content-type: text/html; charset=utf-8" . "\r\n" .
        "X-Mailer: PHP/" . phpversion();
    mail($to, $subject, $message, $headers);
}

function sendMail2($from, $dst, $subject, $msg) {
    $mail = new PHPMailer(); // create a new object
    $mail->IsSMTP(); // enable SMTP
    $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = "danaossoftware";
    // TODO change this password
    $mail->Password = "BurgerLover123";
    $mail->SetFrom($from);
    $mail->Subject = $subject;
    $mail->Body = $msg;
    $mail->AddAddress($dst);
    if(!$mail->Send()) {
        //echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        //echo "Message has been sent";
    }
}