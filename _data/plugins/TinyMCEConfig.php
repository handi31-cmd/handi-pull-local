id: 6
source: 1
name: TinyMCEConfig
properties: 'a:0:{}'

-----

if ($modx->event->name == 'OnRichTextEditorInit') {
    $relativeUrls = $modx->getOption('tiny.relative_urls', null, false, true);

    $config = array(
        'relative_urls' => (bool)!$relativeUrls,
        'remove_script_host' => (bool)!$relativeUrls,
        'convert_urls' => (bool)!$relativeUrls,

        // Ajout de plugins nécessaires
        'plugins' => 'lists link image code table textcolor',

        // Barre d'outils personnalisée
        'toolbar' => 'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | forecolor backcolor | code'
    );

    $modx->event->output($modx->toJSON($config));
}