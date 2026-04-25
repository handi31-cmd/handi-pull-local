id: 56
source: 1
name: isPosteEmpty
properties: 'a:0:{}'

-----

$nomPoste = $modx->resource->getTVValue('nom_poste');
return empty($nomPoste) ? 1 : 0;