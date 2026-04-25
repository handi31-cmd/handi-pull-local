id: 49
source: 1
name: doubleEmailHook
category: Recrutement
properties: 'a:0:{}'

-----

$emailToRecruteur = 'stagiaire@capemploi31.com';
$recruteurTpl = 'emailRecruteurTpl';
$candidatTpl = 'emailCandidatureTpl';

$fields = $hook->getValues();
$modx->getService('mail', 'mail.modPHPMailer');

// Debug : vérifier si les fichiers sont bien reçus
$modx->log(modX::LOG_LEVEL_INFO, 'Fichiers uploadés : ' . print_r($_FILES, true));

// -- MAIL AU RECRUTEUR --
$modx->mail->set(modMail::MAIL_BODY, $modx->getChunk($recruteurTpl, $fields));
$modx->mail->set(modMail::MAIL_SUBJECT, 'Nouvelle candidature reçue');
$modx->mail->set(modMail::MAIL_FROM, $fields['email']);
$modx->mail->set(modMail::MAIL_FROM_NAME, 'Formulaire Candidature');
$modx->mail->address('to', $emailToRecruteur);
$modx->mail->setHTML(true);

// Attacher les fichiers CV et lettre de motivation
$files = ['cv', 'lettreMotiv'];
foreach ($files as $fieldName) {
    if (!empty($_FILES[$fieldName]['tmp_name']) && is_uploaded_file($_FILES[$fieldName]['tmp_name'])) {
        $modx->mail->mailer->addAttachment($_FILES[$fieldName]['tmp_name'], $_FILES[$fieldName]['name']);
    }
}

if (!$modx->mail->send()) {
    $modx->log(modX::LOG_LEVEL_ERROR, 'Erreur envoi mail recruteur : ' . $modx->mail->mailer->ErrorInfo);
}
$modx->mail->reset();

// -- MAIL AU CANDIDAT --
if (!empty($fields['email'])) {
    $modx->mail->set(modMail::MAIL_BODY, $modx->getChunk($candidatTpl, $fields));
    $modx->mail->set(modMail::MAIL_SUBJECT, 'Confirmation de votre candidature');
    $modx->mail->set(modMail::MAIL_FROM, 'noreply@handipro31.com');
    $modx->mail->set(modMail::MAIL_FROM_NAME, 'Handipro31');
    $modx->mail->address('to', $fields['email']);
    $modx->mail->setHTML(true);

    // Pas de pièces jointes pour le candidat
    if (!$modx->mail->send()) {
        $modx->log(modX::LOG_LEVEL_ERROR, 'Erreur envoi mail candidat : ' . $modx->mail->mailer->ErrorInfo);
    }
    $modx->mail->reset();
}

return true;