<?php
/**
 * This template is loaded via Ajax from a $_POST request, hence
 * the post_id. It contains the target for Google maps, Google Directions
 * Panel and has "hidden" fields for the track, city and region/state of
 * the Event.
 * @todo remove this logic from the tpl
 */

// else its a tracks post type
if ( $_POST['post_type'] == 'events' ) {
    $venues_id = Events::getVenueId( $_POST['post_id'] );
} else {
    $venues_id = $_POST['post_id'];
}

?>
<div class="map-container">
    <div id="mini_map_target" style="height: 240px; width: 300px; border: 1px solid #ddd;"></div>

    <div id="venues_city" style="display: none;"><?php print Venues::getAttribute( array( 'key' => 'city', 'venues_id' => $venues_id ) ); ?></div>
    <div id="venues_region" style="display: none;"><?php print Venues::getAttribute( array( 'key' => 'state', 'venues_id' => $venues_id ) ); ?></div>
    <div id="venues_lat" style="display: none;"><?php print get_post_meta( $venues_id, 'lat', true ); ?></div>
    <div id="venues_long" style="display: none;"><?php print get_post_meta( $venues_id, 'long', true ); ?></div>

    <!-- <div id="directionsPanel"></div> -->

</div>