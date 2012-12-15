<?php

function zm_gmaps_scripts() {

    $dependencies[] = 'jquery';

    wp_enqueue_script( 'zm-gmaps-script', plugin_dir_url( __FILE__ ) . 'scripts.js', $dependencies  );
    // wp_enqueue_style( 'zm-gmaps-style', plugin_dir_url( __FILE__ ) . 'styles.css' );
}
add_action( 'wp_enqueue_scripts', 'zm_gmaps_scripts');

function zm_gmaps_header(){
    print '<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=' . get_option('zm_gmaps_api_key') . '&sensor=false"></script>';
}
add_action('wp_head', 'zm_gmaps_header');

function zm_gmaps_mini(){

    global $post;
    global $post_type;
    $post_id = $post->ID;
    ?>
    <!-- Map -->
    <div class="map-container" id="venues_map_handle" data-post_type="<?php print $post_type; ?>" data-template="mini-map.php" data-post_id="<?php print $post_id; ?>">
        <div id="veneus_map_target"></div>
        <div class="zm-loading-icon" style="display: none;"></div>
    </div>
    <!-- -->
<?php }

/**
 * loads a template from a specificed path
 */
function zm_gmaps_load_template() {

    if ( ! isset( $_POST['template'] ) )
        return;

    $file = $_POST['template'];
    $path = plugin_dir_path( __FILE__ );

    $template = $path . $file;

    if ( $template == null )
        wp_die( 'Yo, you need a template!');

    load_template( $template );
    die();
}
add_action( 'wp_ajax_nopriv_zm_gmaps_load_template', 'zm_gmaps_load_template' );
add_action( 'wp_ajax_zm_gmaps_load_template', 'zm_gmaps_load_template' );

function zm_gmaps_settings(){?>
    <fieldset>
        <legend>zM Google Maps</legend>
        <div class="row">
            <label>Google Maps API Key</label>
            <input name="zm_gmaps_api_key" id="zm_gmaps_api_key" type="text" value="<?php print get_option('zm_gmaps_api_key'); ?>">
        </div>
    </fieldset>
<?php }
add_action('zm_ev_after_settings', 'zm_gmaps_settings');

function zm_gmaps_large_shortcode(){?>
<div class="maps-container">
    <div id="map_canvas" style="top: 127px; width: 100%; height: 100%;"></div>
</div>
<?php }
add_shortcode( 'zm_gmaps_large', 'zm_gmaps_large_shortcode' );
