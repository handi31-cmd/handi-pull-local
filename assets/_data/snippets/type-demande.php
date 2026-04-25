id: 53
source: 1
name: type_demande
properties: 'a:0:{}'

-----

$offre = $modx->getOption('offre', $_GET, '');
$typeDemande = !empty($offre) ? "Réponse d'offre" : "Candidature spontanée";
$modx->setPlaceholder('type_demande', $typeDemande);
return '';