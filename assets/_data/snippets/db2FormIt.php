id: 48
name: db2FormIt
description: 'DB to FormIt hook.'
category: FormIt2db
properties: 'a:12:{s:6:"prefix";a:7:{s:4:"name";s:6:"prefix";s:4:"desc";s:26:"formit2db.db2formit.prefix";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:11:"packagename";a:7:{s:4:"name";s:11:"packagename";s:4:"desc";s:31:"formit2db.db2formit.packagename";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:9:"classname";a:7:{s:4:"name";s:9:"classname";s:4:"desc";s:29:"formit2db.db2formit.classname";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:9:"tablename";a:7:{s:4:"name";s:9:"tablename";s:4:"desc";s:29:"formit2db.db2formit.tablename";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:5:"where";a:7:{s:4:"name";s:5:"where";s:4:"desc";s:25:"formit2db.db2formit.where";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:9:"paramname";a:7:{s:4:"name";s:9:"paramname";s:4:"desc";s:29:"formit2db.db2formit.paramname";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:9:"fieldname";a:7:{s:4:"name";s:9:"fieldname";s:4:"desc";s:29:"formit2db.db2formit.fieldname";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:11:"arrayFormat";a:7:{s:4:"name";s:11:"arrayFormat";s:4:"desc";s:31:"formit2db.db2formit.arrayFormat";s:4:"type";s:4:"list";s:7:"options";a:2:{i:0;a:2:{s:4:"text";s:3:"CSV";s:5:"value";s:3:"csv";}i:1;a:2:{s:4:"text";s:4:"JSON";s:5:"value";s:4:"json";}}s:5:"value";s:3:"csv";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:11:"arrayFields";a:7:{s:4:"name";s:11:"arrayFields";s:4:"desc";s:31:"formit2db.db2formit.arrayFields";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:2:"[]";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:12:"ignoreFields";a:7:{s:4:"name";s:12:"ignoreFields";s:4:"desc";s:32:"formit2db.db2formit.ignoreFields";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:2:"[]";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:16:"notFoundRedirect";a:7:{s:4:"name";s:16:"notFoundRedirect";s:4:"desc";s:36:"formit2db.db2formit.notFoundRedirect";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:11:"autoPackage";a:7:{s:4:"name";s:11:"autoPackage";s:4:"desc";s:31:"formit2db.db2formit.autoPackage";s:4:"type";s:13:"combo-boolean";s:7:"options";s:0:"";s:5:"value";b:0;s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}}'

-----

/**
 * FormIt2db/db2FormIt
 *
 * Copyright 2013-2019 by Thomas Jakobi <thomas.jakobi@partout.info>
 *
 * The snippets bases on the code in the following thread in MODX forum
 * http://forums.modx.com/thread/?thread=32560
 *
 * @package formit2db
 * @subpackage snippet
 *
 * @var modX $modx
 * @var array $scriptProperties
 * @var fiHooks $hook
 */
$prefix = $modx->getOption('prefix', $scriptProperties, $modx->getOption(xPDO::OPT_TABLE_PREFIX), true);
$packagename = $modx->getOption('packagename', $scriptProperties, '', true);
$classname = $modx->getOption('classname', $scriptProperties, '', true);
$tablename = $modx->getOption('tablename', $scriptProperties, '', true);
$where = $modx->fromJson($modx->getOption('where', $scriptProperties, '', true));
$paramname = $modx->getOption('paramname', $scriptProperties, '', true);
$fieldname = $modx->getOption('fieldname', $scriptProperties, $paramname, true);
$arrayFormat = $modx->getOption('arrayFormat', $scriptProperties, 'csv', true);
$arrayFields = $modx->fromJson($modx->getOption('arrayFields', $scriptProperties, '[]', true));
$ignoreFields = $modx->fromJson($modx->getOption('ignoreFields', $scriptProperties, '[]', true));
$notFoundRedirect = (integer)$modx->getOption('notFoundRedirect', $scriptProperties, '0', true);
$autoPackage = (boolean)$modx->getOption('autoPackage', $scriptProperties, false);

$packagepath = $modx->getOption($packagename . '.core_path', null, $modx->getOption('core_path') . 'components/' . $packagename . '/');
$modelpath = $packagepath . 'model/';

if ($autoPackage) {
    $schemapath = $modelpath . 'schema/';
    $schemafile = $schemapath . $packagename . '.mysql.schema.xml';
    $manager = $modx->getManager();
    /** @var xPDOGenerator_mysql|xPDOGenerator_sqlsrv|xPDOGenerator_sqlite $generator */
    $generator = $manager->getGenerator();
    $newFolderPermissions = $modx->getOption('new_folder_permissions', null, 0755);
    if (!file_exists($schemafile)) {
        if (!is_dir($packagepath)) {
            mkdir($packagepath, $newFolderPermissions);
        }
        if (!is_dir($modelpath)) {
            mkdir($modelpath, $newFolderPermissions);
        }
        if (!is_dir($schemapath)) {
            mkdir($schemapath, $newFolderPermissions);
        }
        // Use this to create a schema from an existing database
        if (!$generator->writeSchema($schemafile, $packagename, 'xPDOObject', $prefix, true)) {
            $modx->log(modX::LOG_LEVEL_ERROR, 'Could not generate XML schema', '', 'db2FormIt Hook');
        }
    }
    $generator->parseSchema($schemafile, $modelpath);
    $modx->log(modX::LOG_LEVEL_WARN, 'autoPackage parameter active', '', 'db2FormIt Hook');
    $modx->addPackage($packagename, $modelpath, $prefix);
    $classname = $generator->getClassName($tablename);
} else {
    $modx->addPackage($packagename, $modelpath, $prefix);
}

if ($fieldname) {
    if ($requestParams = $modx->request->getParameters(array($paramname), 'REQUEST')) {
        $where = (is_array($where)) ? array_merge($where, $requestParams) : $requestParams;
    }
}

if (is_array($where)) {
    if ($dataobject = $modx->getObject($classname, $where)) {
        $formFields = $dataobject->toArray();
        foreach ($formFields as $field => $value) {
            if (in_array($field, $ignoreFields)) {
                unset($formFields[$field]);
            }
            if (in_array($field, $arrayFields)) {
                switch ($arrayFormat) {
                    case 'json':
                        $formFields[$field] = $value;
                        break;
                    case 'csv' :
                    default :
                        $formFields[$field] = json_encode(explode(',', $value));
                        break;
                }
            }
        }
        $hook->setValues($formFields);
    } else {
        if ($notFoundRedirect) {
            $modx->sendRedirect($modx->makeUrl($notFoundRedirect));
        }
    }
} else {
    if ($notFoundRedirect) {
        $modx->sendRedirect($modx->makeUrl($notFoundRedirect));
    }
}

return true;