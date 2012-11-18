jQuery( document ).ready(function( $ ){

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;


    /**
     * Gets the google map and determines directions from the
     * global _user object.
     */
    function get_google_map( map_target ){

        directionsDisplay = new google.maps.DirectionsRenderer();

        if ( typeof _user === "undefined" ){
            lat = 41.1343;
            lon = -81.8559;
        } else {
            lat = _user.location.lat;
            lon = _user.location.lon;
        }

        var myOptions = {
            center: new google.maps.LatLng( lat, lon ),
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 5
        };

        var map = new google.maps.Map( map_target, myOptions );
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    }


    /**
     * Calucaltes the route based on the global _user object
     * along with the track city and state from the DOM.
     *
     * Ref: https://developers.google.com/maps/documentation/javascript/directions
     */
    function calcRoute() {

        city = $('#track_city').html();
        region = $('#track_region').html();

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
                    if ( typeof _user != "undefined" ){
                        $('#_user_city_target').html( _user.location.city );
                        $('#_user_region_target').html( _user.location.region );
                    }
                    get_google_map( document.getElementById('mini_map_target') );

                    if ( typeof _user != "undefined" ){
                        calcRoute();
                    }
                }
            });
        } // End 'if lenght'
    });
});

// /**
//  * Data for the markers consisting of a name, a LatLng and a zIndex for
//  * the order in which these markers should display on top of each
//  * other.
//  */
// var markers = {"map":[]};
// var map;
// var bounds;
// var infowindow = new google.maps.InfoWindow({
//     size: new google.maps.Size(50,50)
// });
// var user_center;

// jQuery( document ).ready(function( $ ){

//     /**
//      * Only load the map when the map target is present. Send an ajax request,
//      * if we get a response back we then push everything we want in from our
//      * feed into our marker array. Finally we initialize our Google Map
//      */
//     if ( $('#map_canvas').length ) {
//         $.ajax({
//             url: '/races/tracks.json',
//             success: function( msg ){
//                 for ( var i in msg ) {
//                     if ( msg[i].l && msg[i].lo ){
//                         markers.map.push({
//                             lat: msg[i].l,
//                             lon: msg[i].lo,
//                             title: msg[i].t,
//                             url: msg[i].u,
//                             city: msg[i].c,
//                             state: msg[i].s,
//                             event_count: msg[i].ec,
//                             website: msg[i].w
//                         });
//                     }
//                 }
//                 initialize();
//             }
//         });
//     }
// });


// /**
//  * Set the map options: zoom level, center (global user object for lat/long),
//  * and map type. Create the map object based on the options set and attach it
//  * to the given DOM id.
//  *
//  * Finally we set our markers.
//  */
// function initialize() {

//     user_center = new google.maps.LatLng( _user.lat, _user.lon );

//     var myOptions = {
//         zoom: 8,
//         center: user_center,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     }

//     var map = new google.maps.Map( document.getElementById("map_canvas"), myOptions);

//     // google.maps.event.addListener( map, 'idle', function( event ){
//     //     setMarkers( map, markers );
//     // });

//     setMarkers( map, markers );

//     var circleCenter = {
//         strokeColor: "#FF0000",
//         strokeOpacity: 0.8,
//         strokeWeight: 1,
//         fillColor: "#FF0000",
//         fillOpacity: 0.35,
//         map: map,
//         center: user_center,
//         radius: 50000
//     };

//     userCircle = new google.maps.Circle( circleCenter );

// }


// /**
//  * For each item in our markers object we build a new marker and attach an
//  * info window to it.
//  */
// function setMarkers( map, locations ) {

//     for ( var i = 0; i < locations.map.length; i++ ) {
//         curLat = locations.map[i].lat;
//         curLon = locations.map[i].lon;

//         var myLatLng = new google.maps.LatLng( curLat, curLon );

//         /**
//          * Build our marker
//          */
//         var marker = new google.maps.Marker({
//             position: myLatLng,
//             map:   map,
//             title: locations.map[i].title,
//             url:   locations.map[i].url,
//             city:  locations.map[i].city,
//             state: locations.map[i].state,
//             website: locations.map[i].website,
//             event_count: locations.map[i].event_count,
//             animation: google.maps.Animation.DROP
//         });

//         myInfoWindow( marker, map, infowindow );
//     }
// }


// function myInfoWindow( marker, map, infowindow ){
//     google.maps.event.addListener(marker, 'click', function() {

//         html = '<h3>'+marker.title+'</h3>';
//         html += '<p>'+marker.city+', '+marker.state+'</p><br />';

//         html += '<ul class="inline">';
//         html += '<li><a href="'+marker.url+'">More info</a><span class="bar">|</span></li>';
//         html += '<li><a href="'+marker.website+'" target="_blank">Website</a><span class="bar">|</span></li>';
//         html += '<li><a href="'+marker.url+'#events">Events</a><span class="count">' + marker.event_count + '</span></li>';
//         html += '</ul>';

//         infowindow.setContent( html );
//         infowindow.open(map,marker);
//         infowindow.setPosition( new google.maps.LatLng( _user.lat, _user.lon ) );
//     });
// }