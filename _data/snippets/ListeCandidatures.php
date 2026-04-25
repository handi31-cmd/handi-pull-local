id: 61
source: 1
name: ListeCandidatures
properties: 'a:0:{}'

-----

// Récupération des filtres GET
$posteFiltre = $modx->getOption('poste', $_GET, '');
$nomFiltre = $modx->getOption('nom', $_GET, '');
$typeDemandeFiltre = $modx->getOption('type_demande', $_GET, '');
$statutFiltre = $modx->getOption('statut', $_GET, '');

// Mise à jour du champ "enregistree" si demandé
$traiterId = $modx->getOption('traiter_id', $_GET, '');
if ($traiterId !== '') {
    $updateSql = "UPDATE modx_formit_forms SET enregistree = IF(enregistree = 1, 0, 1) WHERE id = ?";
    $updateStmt = $modx->prepare($updateSql);
    $updateStmt->execute([$traiterId]);
    // Redirection propre pour éviter le re-post du formulaire
    header("Location: " . strtok($_SERVER["REQUEST_URI"], '?'));
    exit;
}

// Récupération des candidatures
$sql = "SELECT id, enregistree, `values`, date FROM modx_formit_forms ORDER BY date DESC";
$stmt = $modx->prepare($sql);
if (!$stmt || !$stmt->execute()) {
    return "Erreur à l'exécution de la requête.";
}
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Construction du formulaire de filtres
$output = '
<form method="get">
    <label>Poste: <input type="text" name="poste" value="'.htmlspecialchars($posteFiltre).'"></label>
    <label>Nom: <input type="text" name="nom" value="'.htmlspecialchars($nomFiltre).'"></label>
    <label>Type de demande:
        <select name="type_demande">
            <option value="">-- Tous --</option>
            <option value="Candidature spontanée" '.($typeDemandeFiltre == "Candidature spontanée" ? 'selected' : '').'>Candidature spontanée</option>
            <option value="Réponse d\'offre" '.($typeDemandeFiltre == "Réponse d\'offre" ? 'selected' : '').'>Réponse d\'offre</option>
        </select>
    </label>
    <label>Statut:
        <select name="statut">
            <option value="">-- Tous --</option>
            <option value="enregistree" '.($statutFiltre == "enregistree" ? 'selected' : '').'>Enregistrée</option>
            <option value="non_enregistree" '.($statutFiltre == "non_enregistree" ? 'selected' : '').'>Non enregistrée</option>
        </select>
    </label>
    <div style="display: flex; gap: 10px;">
        <button type="submit">Filtrer</button>
        <button type="button" onclick="window.location.href=\''. strtok($_SERVER["REQUEST_URI"], '?') .'\';">
            Réinitialiser
        </button>
    </div>
</form>';

// Construction du tableau
$output .= '<table class="candidatures">
    <thead>
        <tr>
            <th>Date</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Type de demande</th>
            <th>Poste</th>
            <th>Disponibilité</th>
            <th>Statut</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>';

foreach ($rows as $row) {
    $data = json_decode($row['values'], true);
    if (!$data) continue;

    // Application des filtres
    if ($posteFiltre && stripos($data['poste'] ?? '', $posteFiltre) === false) continue;
    if ($nomFiltre && stripos($data['nom'] ?? '', $nomFiltre) === false) continue;
    if ($typeDemandeFiltre && stripos($data['type_demande'] ?? '', $typeDemandeFiltre) === false) continue;
    if ($statutFiltre === 'enregistree' && $row['enregistree'] != 1) continue;
    if ($statutFiltre === 'non_enregistree' && $row['enregistree'] != 0) continue;

    // Affichage du statut avec indicateur visuel
    $statut = $row['enregistree']
        ? '🟢 <strong>Enregistrée</strong>'
        : '🔴 <strong>Non enregistrée</strong>';

    // Ligne du tableau
    $output .= '<tr>
        <td>'.htmlspecialchars($row['date'] ? date('d/m/Y', $row['date']) : '') .'</td>
        <td>'.htmlspecialchars($data['nom'] ?? '').'</td>
        <td>'.htmlspecialchars($data['prenom'] ?? '').'</td>
        <td>'.htmlspecialchars($data['email'] ?? '').'</td>
        <td>'.htmlspecialchars($data['tel'] ?? '').'</td>
        <td>'.htmlspecialchars(html_entity_decode($data['type_demande'] ?? ''), ENT_QUOTES | ENT_HTML5).'</td>
        <td>'.htmlspecialchars($data['poste'] ?? '') .'</td>
        <td>'.htmlspecialchars($data['disponibilite'] ?? '').'</td>
        <td>'.$statut.'</td>
        <td>
            <a href="?traiter_id='.urlencode($row['id']).'" class ="btn-modif" onclick="return confirm(\'Changer le statut enregistrée ?\')">Changer</a>
        </td>
    </tr>';
}

$output .= '</tbody></table>';

return $output;