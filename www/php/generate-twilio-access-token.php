<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once 'twilio-php/Twilio/autoload.php'; // Loads the library
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;

// Required for all Twilio access tokens
$twilioAccountSid = 'ACcf9eb098f4badb30b60d64a579affcd1';
$twilioApiKey = 'SKaf22ac92375363bce2a1677060939bb6';
$twilioApiSecret = 'VXRxfyA5Q4fjPnENQlq5b9vzrSTzbXt9';

// Required for Video grant
$roomName = 'my-room';
// An identifier for your app - can be anything you'd like
$identity = 'com.dn.tc';

// Create access token, which we will serialize and send to the client
$token = new AccessToken(
    $twilioAccountSid,
    $twilioApiKey,
    $twilioApiSecret,
    3600,
    $identity
);

// Create Video grant
$videoGrant = new VideoGrant();
$videoGrant->setRoom($roomName);

// Add grant to token
$token->addGrant($videoGrant);

// render token to string
echo $token->toJWT();