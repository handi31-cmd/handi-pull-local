id: 52
source: 1
name: setOffreCode
properties: 'a:0:{}'

-----

$offre = isset($_GET['offre']) ? $_GET['offre'] : '';
$modx->setPlaceholder('offreCode', $offre);
return '';