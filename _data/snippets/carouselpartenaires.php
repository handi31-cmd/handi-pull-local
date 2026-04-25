id: 34
source: 1
name: carouselpartenaires
properties: 'a:0:{}'

-----

// Récupérer la valeur MIGX (JSON) depuis la TV 'partenaires' sur la ressource courante
$donneesMigx = $modx->resource->getTVValue('partenaires');
if (empty($donneesMigx)) {
    return '';
}

// Décoder le JSON en tableau PHP
$partenaires = json_decode($donneesMigx, true);
if (empty($partenaires) || !is_array($partenaires)) {
    return '';
}
// Début du output HTML
$html = '<section id="partenaires-carousel">
  <h3>Nos partenaires</h3>
  <div class="carousel-container">
    <button class="carousel-btn prev" aria-label="Précédent">&#10094;</button>
    <div class="carousel-track">';

foreach ($partenaires as $partenaire) {
    $url = isset($partenaire['url']) ? htmlspecialchars($partenaire['url'], ENT_QUOTES, 'UTF-8') : '#';
    $image = isset($partenaire['image']) ? htmlspecialchars($partenaire['image'], ENT_QUOTES, 'UTF-8') : '';
    $alt = isset($partenaire['name']) ? htmlspecialchars($partenaire['name'], ENT_QUOTES, 'UTF-8') : 'Partenaire';

    $html .= '<a href="' . $url . '" target="_blank" class="carousel-card" rel="noopener noreferrer">';
    if ($image !== '') {
        $html .= '<img src="' . $image . '" alt="' . $alt . '" />';
    } else {
        $html .= '<div class="no-image">' . $alt . '</div>';
    }
    $html .= '</a>';
}

$html .= '</div>
    <button class="carousel-btn next" aria-label="Suivant">&#10095;</button>
  </div>
</section>';

return $html;// Récupérer la valeur MIGX (JSON) depuis la TV 'partenaires' sur la ressource courante
$donneesMigx = $modx->resource->getTVValue('partenaires');
if (empty($donneesMigx)) {
    return '';
}

// Décoder le JSON en tableau PHP
$partenaires = json_decode($donneesMigx, true);
if (empty($partenaires) || !is_array($partenaires)) {
    return '';
}

// Début du output HTML
$html = '<section id="partenaires-carousel">
  <h3>Nos partenaires</h3>
  <div class="carousel-container">
    <button class="carousel-btn prev" aria-label="Précédent">&#10094;</button>
    <div class="carousel-track">';

echo '<pre>';
print_r($partenaires);
echo '</pre>';


foreach ($partenaires as $partenaire) {
    $url = isset($partenaire['url']) ? htmlspecialchars($partenaire['url'], ENT_QUOTES, 'UTF-8') : '#';
    $image = isset($partenaire['image']) ? htmlspecialchars($partenaire['image'], ENT_QUOTES, 'UTF-8') : '';
    $alt = isset($partenaire['name']) ? htmlspecialchars($partenaire['name'], ENT_QUOTES, 'UTF-8') : 'Partenaire';

    $html .= '<a href="' . $url . '" target="_blank" class="carousel-card" rel="noopener noreferrer">';
    if ($image !== '') {
        $html .= '<img src="' . $image . '" alt="' . $alt . '" />';
    } else {
        $html .= '<div class="no-image">' . $alt . '</div>';
    }
    $html .= '</a>';
}

$html .= '</div>
    <button class="carousel-btn next" aria-label="Suivant">&#10095;</button>
  </div>
</section>';


return $html;