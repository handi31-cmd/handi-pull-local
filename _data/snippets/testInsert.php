id: 59
source: 1
name: testInsert
properties: 'a:0:{}'

-----

$candidature = $modx->newObject('Candidature');
$candidature->set('prenom', 'Test');
$candidature->set('nom', 'Testeur');
$candidature->set('email', 'test@example.com');
$candidature->set('cv', 'assets/uploads/candidatures/test.pdf');
if ($candidature->save()) {
    return 'Insertion OK';
} else {
    return 'Erreur insertion';
}