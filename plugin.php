<?php
/**
 * Plugin Name: zM Google Maps
 * Plugin URI: --
 * Description: Determines the users location based on their IP address.
 * Version: 1
 * Author: Zane M. Kolnik
 * Author URI: http://zanematthew.com/
 * License: GPL
 */

define( 'ZM_GMAPS_VERSION', '1' );
define( 'ZM_GMAPS_OPTION', 'zm_gmaps_version' );

require_once 'functions.php';

/**
 * Add the version number to the options table when
 * the plugin is installed.
 *
 * @note Our version number is used in Themes to check
 * if the plugin is installed!
 */
function zm_gmaps_activation() {

    if ( get_option( ZM_GMAPS_OPTION ) &&
         get_option( ZM_GMAPS_OPTION ) > ZM_GMAPS_VERSION )
        return;

    update_option( ZM_GMAPS_OPTION, ZM_GMAPS_VERSION );
}
register_activation_hook( __FILE__, 'zm_gmaps_activation' );


/**
 * Delete our version number from the database
 */
function zm_gmaps_deactivation(){
    delete_option( ZM_GMAPS_OPTION );
}
register_deactivation_hook( __FILE__, 'zm_gmaps_deactivation' );