id: 47
name: FormIt2db
description: 'FormIt to DB hook.'
category: FormIt2db
properties: 'a:11:{s:6:"prefix";a:7:{s:4:"name";s:6:"prefix";s:4:"desc";s:26:"formit2db.formit2db.prefix";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:11:"packagename";a:7:{s:4:"name";s:11:"packagename";s:4:"desc";s:31:"formit2db.formit2db.packagename";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:9:"classname";a:7:{s:4:"name";s:9:"classname";s:4:"desc";s:29:"formit2db.formit2db.classname";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:9:"tablename";a:7:{s:4:"name";s:9:"tablename";s:4:"desc";s:29:"formit2db.formit2db.tablename";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:5:"where";a:7:{s:4:"name";s:5:"where";s:4:"desc";s:25:"formit2db.formit2db.where";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:9:"paramname";a:7:{s:4:"name";s:9:"paramname";s:4:"desc";s:29:"formit2db.formit2db.paramname";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:9:"fieldname";a:7:{s:4:"name";s:9:"fieldname";s:4:"desc";s:29:"formit2db.formit2db.fieldname";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:0:"";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:11:"arrayFormat";a:7:{s:4:"name";s:11:"arrayFormat";s:4:"desc";s:31:"formit2db.formit2db.arrayFormat";s:4:"type";s:4:"list";s:7:"options";a:2:{i:0;a:2:{s:4:"text";s:3:"CSV";s:5:"value";s:3:"csv";}i:1;a:2:{s:4:"text";s:4:"JSON";s:5:"value";s:4:"json";}}s:5:"value";s:3:"csv";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:11:"arrayFields";a:7:{s:4:"name";s:11:"arrayFields";s:4:"desc";s:31:"formit2db.formit2db.arrayFields";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:2:"[]";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:12:"removeFields";a:7:{s:4:"name";s:12:"removeFields";s:4:"desc";s:32:"formit2db.formit2db.removeFields";s:4:"type";s:9:"textfield";s:7:"options";s:0:"";s:5:"value";s:2:"[]";s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}s:11:"autoPackage";a:7:{s:4:"name";s:11:"autoPackage";s:4:"desc";s:31:"formit2db.formit2db.autoPackage";s:4:"type";s:13:"combo-boolean";s:7:"options";s:0:"";s:5:"value";b:0;s:7:"lexicon";s:20:"formit2db:properties";s:4:"area";s:0:"";}}'

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
$removeFields = $modx->fromJson($modx->getOption('removeFields', $scriptProperties, '[]', true));
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
            $modx->log(modX::LOG_LEVEL_ERROR, 'Could not generate XML schema', '', 'FormIt2db Hook');
        }
    }
    $generator->parseSchema($schemafile, $modelpath);
    $modx->log(modX::LOG_LEVEL_WARN, 'autoPackage parameter active', '', 'FormIt2db Hook');
    $modx->addPackage($packagename, $modelpath, $prefix);
    $classname = $generator->getClassName($tablename);
} else {
    $modx->addPackage($packagename, $modelpath, $prefix);
}

if ($fieldname) {
    if ($requestParams = $modx->request->getParameters(array($paramname), 'POST')) {
        $where = (is_array($where)) ? array_merge($where, $requestParams) : $requestParams;
    }
}

if (is_array($where)) {
    $dataobject = $modx->getObject($classname, $where);
    if (empty($dataobject)) {
        $dataobject = $modx->newObject($classname);
    }
} else {
    $dataobject = $modx->newObject($classname);
}

if (!is_object($dataobject) || !($dataobject instanceof xPDOObject)) {
    $errorMsg = 'Failed to create object of type: ' . $classname;
    $hook->addError('error_message', $errorMsg);
    $modx->log(modX::LOG_LEVEL_ERROR, $errorMsg, '', 'FormIt2db Hook');
    return false;
}

$formFields = $hook->getValues();
foreach ($formFields as $field => $value) {
    if (!in_array($field, $removeFields)) {
        if (in_array($field, $arrayFields)) {
            switch ($arrayFormat) {
                case 'json':
                    $value = json_encode($value);
                    break;
                case 'csv' :
                default :
                    $value = implode(',', $value);
                    break;
            }
        }
        $dataobject->set($field, $value);
    }
}

if (!$dataobject->save()) {
    $errorMsg = 'Failed to save object of type: ' . $classname;
    $hook->addError('error_message', $errorMsg);
    $modx->log(modX::LOG_LEVEL_ERROR, $errorMsg, '', 'FormIt2db Hook');
    return false;
}
return true;