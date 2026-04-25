id: 39
source: 1
name: renderHandiproMenu
category: Handipro31
properties: 'a:0:{}'

-----

$chunkName = $modx->resource->getTVValue('menuPage');
$logoPath = $modx->resource->getTVValue('logoPage');

if (empty($chunkName)) return '';

$json = $modx->getChunk($chunkName);
$items = json_decode($json, true);

if (!is_array($items)) return '';

$output = '<aside class="left-sidebar">';

// Cadre logo
if (!empty($logoPath)) {
    $output .= '<div class="box logo-box">';
    $output .= '<img src="' . $logoPath . '" alt="Logo de la page" class="logo-img">';
    $output .= '</div>';
}

// Cadre menu
$output .= '<div class="box menu-box">';
$output .= '<nav class="handipro-nav" aria-label="Navigation interne">';
$output .= '<ul class="menu-list">';
foreach ($items as $item) {
    $output .= '<li class="menu-item"><a href="' . $item['anchor'] . '">' . $item['title'] . '</a></li>';
}
$output .= '</ul></nav>';
$output .= '</div>';

$output .= '</aside>';

return $output;