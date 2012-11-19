jQuery( document ).ready(function( $ ){

    // var directionsDisplay;
    // var directionsService = new google.maps.DirectionsService();
    var map;


    /**
     * Gets the google map and determines directions from the
     * global _user object.
     */
    function get_google_map( map_target ){

        // directionsDisplay = new google.maps.DirectionsRenderer();

        // if ( typeof _user === "undefined" ){
        //     lat = 41.1343;
        //     lon = -81.8559;
        // } else {
        //     lat = _user.location.lat;
        //     lon = _user.location.lon;
        // }

        var myLatlng = new google.maps.LatLng( $('#venues_lat').html(), $('#venues_long').html() );

        var myOptions = {
            center: myLatlng,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 5
        };

        var map = new google.maps.Map( map_target, myOptions );

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });
        // directionsDisplay.setMap(map);
        // directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    }


    /**
     * Calucaltes the route based on the global _user object
     * along with the track city and state from the DOM.
     *
     * Ref: https://developers.google.com/maps/documentation/javascript/directions
     */
    function calcRoute() {

        city = $('#venues_city').html();
        region = $('#venues_region').html();

        var start = '"'+_user.location.city +','+ _user.location.region+'"';
        var end = '"'+city+','+region+'"';

        var request = {
            origin: start,
            destination: end,
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
         * If we have the #bmx_rs_map_target on this page
         * run the below code on page load.
         */
        if ( $( '#bmx_rs_map_target' ).length != 0 ) {
            var params = {
                "action" : "zm_gmaps_load_template",
                "target_div": "#bmx_rs_map_target",
                "template": $( '#bmx_rs_map_handle' ).attr( 'data-template' ),
                "post_id": $( '#bmx_rs_map_handle' ).attr('data-post_id'),
                "post_type": $('#bmx_rs_map_handle').attr('data-post_type')
            };

            $.ajax({
                data: params,
                success: function( msg ){
                    $( params.target_div ).fadeIn().html( msg );
                    // if ( typeof _user != "undefined" ){
                    //     $('#_user_city_target').html( _user.location.city );
                    //     $('#_user_region_target').html( _user.location.region );
                    // }
                    get_google_map( document.getElementById('mini_map_target') );

                    if ( typeof _user != "undefined" ){
                        // calcRoute();
                    }
                }
            });
        } // End 'if lenght'
    });
});