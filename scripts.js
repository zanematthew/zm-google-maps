(function(){
jQuery( document ).ready(function( $ ){

    /**
     * If we have a location set for the user, we use it and set-up
     * Google Directions.
     *
     * @todo Some how lets not have this conditional scattered
     */
    if ( typeof _user != "undefined" && _user.location != "undefined" ){
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
    }


    /**
     * Google Maps holder
     */
    var map;


    /**
     * Gets the google map and determines directions from the
     * global _user object.
     */
    function get_google_map( map_target ){

        /**
         * Create and assign our lat long
         */
        var myLatlng = new google.maps.LatLng( $('#venues_lat').html(), $('#venues_long').html() );


        /**
         * Set-up our map options, note the UI/Controls
         * https://developers.google.com/maps/documentation/javascript/controls?hl=en
         */
        var myOptions = {
            center: myLatlng,
            disableDefaultUI: true, // Remove street view/terrian/etc.
            zoomControl: true, // Bring back zoom icons
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 5
        };

        /**
         * Init our map passing in the target and the options
         */
        var map = new google.maps.Map( map_target, myOptions );


        /**
         * If we have a location set for our user we init
         * the Google Directions and do NOT show the default marker.
         * Instead we start "A" and end "B".
         */
        if ( typeof _user != "undefined" && _user.location != "undefined" ){
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById("directionsPanel"));
        } else {
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map
            });
        }
    }


    /**
     * Calucaltes the route based on the global _user object
     * along with the track city and state from the DOM.
     *
     * Ref: https://developers.google.com/maps/documentation/javascript/directions
     */
    function calcRoute() {

        var request = {
            origin: '"' + _user.location.city + ',' + _user.location.region + '"',
            destination: '"' + $('#venues_city').html() + ',' + $('#venues_region').html() + '"',
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
    }


    /**
     * Run some stuff when the page is loaded.
     */
    $( window ).load(function(){

        /**
         * If we have the #veneus_map_target on this page
         * run the below code on page load.
         */
        if ( $( '#veneus_map_target' ).length != 0 ) {

            var params = {
                "action" : "zm_gmaps_load_template",
                "target_div": "#veneus_map_target",
                "template": $( '#venues_map_handle' ).attr( 'data-template' ),
                "post_id": $( '#venues_map_handle' ).attr('data-post_id'),
                "post_type": $('#venues_map_handle').attr('data-post_type')
            };

            $.ajax({
                data: params,
                success: function( msg ){
                    $( params.target_div ).fadeIn().html( msg );
                    get_google_map( document.getElementById('mini_map_target') );
                    if ( typeof _user != "undefined" && _user.location != "undefined" ){
                        calcRoute();
                    }
                }
            });
        } // End 'if length'
    });
});
})();