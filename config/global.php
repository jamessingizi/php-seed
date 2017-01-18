<?php
/**
 * Created by PhpStorm.
 * User: James Singizi
 * Date: 17/01/2017
 * Time: 21:20
 */

error_reporting(E_ALL);

session_start();

/**
/---------------------------------------------------------------------------
/disable site caching for development
/---------------------------------------------------------------------------
**/
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
set_time_limit(0);

/**
/---------------------------------------------------------------------------
/set default time zone
/---------------------------------------------------------------------------
**/
date_default_timezone_set('Africa/Harare');


/**
/---------------------------------------------------------------------------
/configure autoload paths by removing config in realpath(). This makes it easy
/to include files from other directories outside the directory where
/config.php is located
/---------------------------------------------------------------------------
**/
$autoloadPath = str_replace('config', '', realpath(dirname(__FILE__)));

/**
/---------------------------------------------------------------------------
/require autoloader installed by composer for autoloading twig classes
/---------------------------------------------------------------------------
**/
require_once ($autoloadPath.'/vendor/autoload.php');

/**
/---------------------------------------------------------------------------
/set path to twig templates (named views in this case)
/---------------------------------------------------------------------------
**/
$twig_loader = new Twig_Loader_Filesystem($autoloadPath.'/views');
$twig = new Twig_Environment($twig_loader);