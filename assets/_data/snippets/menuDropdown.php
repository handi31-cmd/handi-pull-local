id: 1
source: 1
name: menuDropdown
properties: 'a:0:{}'
static: 1
static_file: core/components/myplugin/snippets/menuDropdown.php

-----


$jsonMenu = $modx->getChunk('menuJSON');
if (empty($jsonMenu)) return 'Chunk menuJSON introuvable ou vide';

$data = json_decode($jsonMenu, true);
if (!is_array($data)) return 'Erreur JSON invalide dans chunk menuJSON';

$output = '<ul class="main-nav">';
$menuCounter = 1;

foreach ($data as $section) {
    $label = htmlspecialchars($section['label'] ?? '');

    // Stocke la chaîne dans une variable pour passer par référence
    $linkToParse = $section['link'] ?? '#';
    $modx->parser->processElementTags('', $linkToParse, true, true);

    $items = $section['items'] ?? [];

    $hasDropdown = !empty($items) ? ' dropdown' : '';
    $menuId = 'dropdown-menu-' . $menuCounter;

    $output .= '<li class="' . $hasDropdown . '">';

    if ($hasDropdown) {
        $output .= '<a href="' . $linkToParse . '" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="' . $menuId . '">' . $label . '</a>';
        $output .= '<ul id="' . $menuId . '" class="dropdown-menu" hidden>';

        foreach ($items as $item) {
            $itemTitle = htmlspecialchars($item['title'] ?? '');
            $itemLinkToParse = $item['link'] ?? '#';
            $modx->parser->processElementTags('', $itemLinkToParse, true, true);
            $output .= '<li><a href="' . $itemLinkToParse . '">' . $itemTitle . '</a></li>';
        }

        $output .= '</ul>';
    } else {
        $output .= '<a href="' . $linkToParse . '" class="dropdown-toggle" aria-haspopup="false">' . $label . '</a>';
    }

    $output .= '</li>';
    $menuCounter++;
}

$output .= '</ul>';
return $output;