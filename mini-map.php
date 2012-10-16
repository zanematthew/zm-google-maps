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
    $track_id = Events::getTrackId( $_POST['post_id'] );
} else {
    $track_id = $_POST['post_id'];
}

?>
<div class="map-container">
    <div id="mini_map_target" style="height: 240px; width: 300px; border: 1px solid #ddd;"></div>
    <!-- <div id="directionsPanel"></div> -->
    <span id="track_city" style="display: none;"><?php print Venues::getMetaField( 'city', $track_id ) ?></span>
    <span id="track_region" style="display: none;"><?php print Venues::getMetaField( 'state', $track_id ) ?></span>
</div>