<?php
$to = 'ton_adresse_email@exemple.com';
$subject = 'Test email Mailpit';
$message = 'Ceci est un test d\'envoi via mailpit.';
$headers = 'From: no-reply@monprojet.local' . "\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo 'Email envoyé avec succès !';
} else {
    echo 'Erreur lors de l\'envoi de l\'email.';
}
?>
