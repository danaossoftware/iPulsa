<?php
$email = $_GET["email"];
$url = "reset-password.html?email=" . $email;
$to      = $email;
$subject = 'Atur ulang kata sandi BOS';
$message = "<br/><img src='http://danaos.xyz/ipulsa/www/img/logo-2.png' width='160px' height='80px'><br/><br/><br/>Halo, " . $email . ", seseorang meminta untuk mengatur ulang kata sandi Anda. Silahkan salin URL berikut ke bilah alamat browser Anda:<br/><br/>" . $url . "<br/><br/><br/>Jika ini kesalahan pengiriman email, silahkan abaikan email ini.";
$headers = 'From: admin@danaos.xyz' . "\r\n" .
    'Reply-To: admin@danaos.xyz' . "\r\n" .
    'X-Mailer: PHP/' . phpversion() . "\r\n" .
    "Content-Type: text/html; charset=UTF-8\r\n";
mail($to, $subject, $message, $headers);