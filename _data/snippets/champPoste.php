id: 55
source: 1
name: champPoste
properties: 'a:0:{}'

-----

// Si tu passes un ID de ressource manuellement dans l'URL ou depuis un appel
$offreId = (int) $modx->getOption('offreId', $scriptProperties, $modx->getOption('id', $_GET, 0));

// Récupérer la ressource cible
$offre = $modx->getObject('modResource', $offreId);

// Sécurité : on vérifie que la ressource existe
if (!$offre) {
    return '<input type="text" name="poste" id="poste" required placeholder="Entrez le poste souhaité">';
}

// On récupère la TV nom_poste
$nomPoste = $offre->getTVValue('nom_poste');

// Affichage
if (empty($nomPoste)) {
    return '<input type="text" name="poste" id="poste" required placeholder="Entrez le poste souhaité">';
} else {
    return '<input type="text" name="poste" id="poste" value="' . htmlentities($nomPoste, ENT_QUOTES, 'UTF-8') . '" readonly aria-readonly="true" required>';
}