
var mapInfo = []

var map = '';
var mapSatellite = '';
var currPosition = '';
var infwindow = '';
var marker;
var circles;
var fixedMarker;
var infowindow
var geocoder = geocoder = new google.maps.Geocoder();
var isMobile = {
    Android: function() {return navigator.userAgent.match(/Android/i);},
    BlackBerry: function(){ return navigator.userAgent.match(/BlackBerry/i);},
    iOS: function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
    Opera: function(){return navigator.userAgent.match(/Opera Mini/i);},
    Windows: function(){return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);},
    any: function(){return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};


var minZoomLevel = 2,  mapzoom0=2, satzoom0=0; 
if(window.innerWidth<600) {var default_pos = new google.maps.LatLng(10.0, -35.0)}
else {var default_pos = new google.maps.LatLng(15.0, -30.0)};

var getcityLatLon;
    $.ajax({
        url: "http://freegeoip.net/json/",
        async: false,//type: "GET",//crossDomain: true,
        dataType: 'json',
        success: function(location) {getcityLatLon = [location.latitude,location.longitude];},
        error:function(){getcityLatLon = [15.0, -30.0];}
    });
if (!isNaN(getcityLatLon[0] || getcityLatLon[1])){default_pos = new google.maps.LatLng(getcityLatLon[0], getcityLatLon[1]);}



$('#address-input').show();
$('#region-suburb').show();

$('#direction-group').hide();
$('#search-group').hide();
$('#startend-group').hide();









        /*function formatAddress(result) {
            var actAddress = '';
            if (result[0])
                console.log(result[0]);
            var strAddress1 = result[0].formatted_address.split(',')
            var strAddress2 = result[1].formatted_address.split(',')
            console.log(strAddress1.length)
            for (var i = 0; i < strAddress1.length - 1; i++)
                actAddress = actAddress + strAddress1[i] + ', '
            return actAddress + '(' + strAddress2[0] + ')';
        }*/

function initialize() {
            // if(navigator.geolocation) {
            //  navigator.geolocation.getCurrentPosition(function(position) {
            //var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            //currPosition = {lat:position.coords.latitude, lng:position.coords.longitude};
            // alert(position.latLng);
            //var pos = new google.maps.LatLng(40.693134, -74.015497);
            //var pos = new google.maps.LatLng(52.491398, 13.417343);

            var STYLES_color = [
            

             {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "weight": "0.75"
            }
        ]
    },
    /*{
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ded7c6"
            }
        ]
    },*/
    {"featureType": "poi", "elementType": "geometry.all", "stylers": [ {"visibility": "on"}]},
    {"featureType": "poi", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"color": "#DAD1B8"}]},
    {"featureType": "administrative.country", "elementType": "geometry", "stylers": [  { "color": "#8B814C" }, { "weight": 5 }/*, { weight: 4 }*/ ] },
    {"featureType": "administrative.province", "elementType": "geometry", "stylers": [  { "color": "#8B814C" }, { "weight": 3 }/*, { weight: 4 }*/ ] },
     ///"stylers": [{"color": "#8B7D7B"}] //#8B7D7B; #646F5E; #7F887C; #838B83; #A6ADAB; brown "#9F8170       
    
    //{ "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#dee5e8" } ] },
    { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{"hue": "#8B7500"},{ "lightness": 99},{ "saturation": -59}, {"invert_lightness": true },{"gamma": 10}]},
    {"featureType": "landscape.natural","elementType": "geometry.fill","stylers": [{"hue": "#93A086"},{ "lightness": 99},{ "saturation": -70}, {"invert_lightness": true },{"gamma": 10}]},
      //{"featureType": "landscape", "elementType": "geometry.stroke", "stylers": [{"visibility": "on"}, {"color": "#F8F8FF"}]},
   
    //{"featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [{"visibility": "on"}, {"color": "#292421"}]},
  
        //{"stylers": [{"hue": "#FCFAE8"},{ "saturation": 0}, {"gamma": 1.2}]},
    //{"featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [{"visibility": "on"}, {"color": "#00688B"}]},
    
        //{"stylers": [{"hue": "#FCFAE8"},{ "saturation": 0}, {"gamma": 1.2}]},
    /*{
        "stylers": [{"hue": "#FCFAE8"},
            {
                "saturation": 10
            },
            {
                "gamma": 1.6
            }
        ]
    },*//*
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stoke",
        "stylers": [
            {"color": "#00688B"}
        ]
    },
    
      
{
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#FBF9EA"
            }
        ]
    },*/
    /*{
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [{"hue": "#0077ff"},{"gamma": 3.1}]
    },*/
    /*{
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            //{"color": "#FFF2E2"}
            {"hue": "#FFBB00"},
            {"saturation": 43.400000000000006},
            {"lightness": 37.599999999999994},
            {"gamma": 1}
        ]
    },*/

    {
        "featureType": "road.highway",
        "stylers": [
            {
                "hue": "#FFC200"
            },
            {
                "saturation": -61.8
            },
            {
                "lightness": 45.599999999999994
            },
            {
                "gamma": 1
            }
        ]
    },
    /*{
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },*/
    {"featureType": "road", "elementType": "labels", "stylers": [{"visibility": "on"}, { "saturation": 0 }]},
    {"featureType": "road", "elementType": "labels.icon","stylers": [{"visibility": "on"}]},
    {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#FF9912"}]},
    {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#FFCC99"}]},
    {"featureType": "road.highway", "elementType": "labels.text", "stylers": [{"color": "#3A3A38"},{"weight": 1}]},
    {"featureType": "road.highway.controlled_access", "elementType": "geometry.fill", "stylers": [{ "color": "#7B3F00"}]},
    {"featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{"color": "#FDE674"/*"#FEF0AD"*/}]},
    //{"featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{"color": "#8B7500"/*"#292421"*/}] },
    {"featureType": "road.local", "elementType": "geometry.fill", "stylers": [{"color": "#F8F8FF"}] },
    {"featureType": "road.local", "elementType": "geometry.stroke", "stylers": [ { "hue": "#292421" } , { "saturation": -100 }] },

    //{"featureType": "road.local", "stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 52}, {"gamma": 1}]},
    {"featureType": "road.highway", "elementType": "labels.icon", "stylers": [ { "saturation": "-100"}]},
    //{"featureType": "transit.station.airport", "elementType": "geometry.fill", "stylers": [{"color": "#EEEB8D"}]},
    {"featureType": "transit", "elementType": "all", "stylers": [ { "visibility": "on" }  ] },
    {"featureType": "transit", "elementType": "labels", "stylers": [{"visibility": "on"}]},

    { "featureType": "transit.line", "elementType": "geometry.fill",  "stylers": [{"color": "#000000"}]},
    {"featureType": "transit.line",  "elementType": "geometry.stroke", "stylers": [{"color": "#000000"}] },
    
    {"featureType": "water","stylers": [{"hue": "#0078FF"}, {"saturation": -13.200000000000003}, {"lightness": 2.4000000000000057}, {"gamma": 1}]},
    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#3d535b" } ] },
    { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [ { "color": "#d1d9db" } ] },
    
    { "featureType": "poi", "elementType": "geometry.fill", "stylers": [ {"color": "#8B8989"}] },
    {"featureType": "poi.park","elementType": "geometry.fill","stylers": [{"color": "#77A361"}]},
    {"featureType": "poi.business", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }
    //{ "featureType": "poi.medical", "elementType": "fill", "stylers": [{"color": "#8B8378"}]},
    

   
    /*{"featureType": "poi.business", "elementType": "geometry", "stylers": [ { "color": "#BEB4A5" } ] },
    {"featureType": "poi.medical", "elementType": "geometry", "stylers": [ { "color": "#F8F1EC" } ] },//#F4C8AC
    {"featureType": "poi.school", "elementType": "geometry.fill","stylers": [{"color": "#EED6AF"}]},//#ded7c6    
    {"featureType": "poi.government", "elementType": "geometry", "stylers": [ { "color": "#E8E2DA" } ] },//#B39E83
    {"featureType": "poi.place_of_worship", "elementType": "geometry", "stylers": [ { "color": "#E8E2DA" } ] },*/
    //{"featureType": "poi.sports_complex", "elementType": "geometry", "stylers": [ { "color": "#E1CDAE" } ] }//#CAA66F,
    //{ "featureType": "poi.attraction", "elementType": "geometry", "stylers": [ { "color": "#FF5333" } ] }
   //poi.place_of_worship
   //poi.sports_complex
   //poi.attraction
   //{ "visibility": "off"}
]
//https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyleFeatureType
//administrative
//administrative.country
//administrative.land_parcel
//administrative.locality







            var STYLES_googleDefault=[]
            var STYLES_gray = [
                { "featureType": "administrative", "elementType": "all", "stylers": [ { "visibility": "on" }, { "lightness": 33 } ] },
                { "featureType": "administrative", "elementType": "labels", "stylers": [ { "saturation": "-100" } ] },
                { "featureType": "administrative", "elementType": "labels.text", "stylers": [ { "gamma": "0.75" } ] },
                { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [ { "lightness": "-37" } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [  { "color": "#f9f9f9"  } ] },
                { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [ { "saturation": "-100" }, { "lightness": "40" }, { "visibility": "off" } ] },
                { "featureType": "landscape.natural", "elementType": "labels.text.fill", "stylers": [ { "saturation": "-100" }, { "lightness": "-37" } ] },
                { "featureType": "landscape.natural", "elementType": "labels.text.stroke", "stylers": [ { "saturation": "-100" }, { "lightness": "100" }, { "weight": "2" } ] },
                { "featureType": "landscape.natural", "elementType": "labels.icon", "stylers": [ { "saturation": "-100" } ] },
                { "featureType": "poi", "elementType": "geometry", "stylers": [ { "saturation": "-100" }, { "lightness": "80"  } ] },
                { "featureType": "poi", "elementType": "labels", "stylers": [{"saturation": "-100" }, {"lightness": "0" } ] },
                { "featureType": "poi.attraction", "elementType": "geometry", "stylers": [ { "lightness": "-4" }, { "saturation": "-100" } ] },
                { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#4F4F2F" }, { "visibility": "on" }, { "saturation": "-95" }, { "lightness": "62" } ] },
                { "featureType": "poi.park", "elementType": "labels", "stylers": [ { "visibility": "on" }, { "lightness": 20 } ] },
                { "featureType": "road", "elementType": "all", "stylers": [ { "lightness": 20 } ] },
                { "featureType": "road", "elementType": "labels", "stylers": [ { "saturation": "-100" }, { "gamma": "1.00" } ] }, 
                { "featureType": "road", "elementType": "labels.text", "stylers": [ { "gamma": "0.50" } ] },
                { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "saturation": "-100" }, { "gamma": "0.50" } ] },
                { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#c5c6c6" }, { "saturation": "-100" } ] },
                { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "lightness": "-13" } ] },
                { "featureType": "road.highway", "elementType": "labels.icon", "stylers": [ { "lightness": "0" }, { "gamma": "1.09" } ] },
                { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#e4d7c6" }, { "saturation": "-100" }, { "lightness": "47" } ] },
                { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [ { "lightness": "-12" }  ] },
                { "featureType": "road.arterial", "elementType": "labels.icon",  "stylers": [ {  "saturation": "-100" } ] },
                { "featureType": "road.local",  "elementType": "geometry", "stylers": [ { "color": "#fbfaf7" }, { "lightness": "77" } ] },
                { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [ { "lightness": "-5" }, {"saturation": "-100" } ] }, 
                { "featureType": "road.local", "elementType": "geometry.stroke",  "stylers": [{"saturation": "-100"}, {"lightness": "-15"}]},
                {"featureType": "transit.station.airport", "elementType": "geometry", "stylers": [ { "lightness": "47" }, {"saturation": "-100"}] },
                { "featureType": "water", "elementType": "all", "stylers": [ { "visibility": "on" }, {"color": "#acbcc9"}]},
                {"featureType": "water", "elementType": "geometry", "stylers": [{"saturation": "53"}]},
                {"featureType": "water", "elementType": "labels.text.fill", "stylers": [{"lightness": "-42"},{"saturation": "17"}]},
                {"featureType": "water", "elementType": "labels.text.stroke", "stylers": [{"lightness": "61"}]}

            ]

var STYLES = STYLES_color; 

        var pos = default_pos
        var mapOptions = {
            zoom: 1,
            center: pos,
            scaleControl: true,
            /*zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },*/

            zoomControl: false,// to use custome zoom
            fullscreenControl: true,
            
            enableCloseButton: true,
            mapTypeControl: false,
            //streetViewControl: false,
            //streetViewControl: false,
            disableDefaultUI: false,
            streetViewControl: true,
            /*streetViewControlOptions: {
                enableCloseButton:true,
                position: google.maps.ControlPosition.RIGHT_CENTER
            },*/
            mapTypeId: google.maps.MapTypeId.TERRAIN, //ROADMAP,
            disableDoubleClickZoom: true,
            styles: STYLES //set style option1 
        };
        var mapSatelliteOptions = {
            zoom: 1,
            center: pos,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            scrollwheel: false,
            draggable: true,
        }


        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions); //set styles option 2 map.set('styles',STYLES_gray);
        var divMapSatellite = document.getElementById('map-satellite');
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(divMapSatellite);
        mapSatellite = new google.maps.Map(document.getElementById('map-satellite'), mapSatelliteOptions);
        //map.set('styles',STYLES_gray);


  /*var meetupIcons ='http://maps.gstatic.com/mapfiles/markers2/marker.png';
  var meetupJson={
    meetup:{
      items: findMeetupEventsObj
    } 
  };


  var yelpIcons= 'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png';
  var yelpJson={
    yelp:{      
      items: findMeetupEventsObj //findYelpEventsObj
    } 
  };

  var facebookIcons ='http://maps.gstatic.com/mapfiles/markers2/marker.png';
  var facebookJson={
    facebook:{
      items: findMeetupEventsObj //findMeetupEventsObj
    } 
  };


  var eventbriteIcons= 'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png';
  var eventbriteJson={
    eventbrite:{      
      items: findMeetupEventsObj //findYelpEventsObj
    } 
  };*/
var mapComingJson = {"fileSource":"internal","website":"Mapcoming", "sourceURL":"public/data/mapcoming_posts/mapcoming_posts_ajax", "markerIcon" :"http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png", "parentDiv":"find-mp-content", "clickParentDiv":"find-events-menu"};
       
var meetupJson = {"fileSource":"external","website":"Meetup", "sourceURL":"public/data/meetup/meetup_events_ajax", "markerIcon" :"http://maps.gstatic.com/mapfiles/markers2/marker.png", "parentDiv":"portfolio-mp-content", "clickParentDiv":"our-portfolio"};
var yelpJson = {"fileSource":"external","website":"Yelp","sourceURL":"public/data/yelp/yelp_events_ajax", "markerIcon" :"http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png", "parentDiv":"portfolio-mp-content", "clickParentDiv":"our-portfolio"};
var facebookJson = {"fileSource":"external","website":"Facebook","sourceURL":"public/data/facebook/facebook_events_ajax", "markerIcon" :"http://maps.gstatic.com/mapfiles/markers2/marker.png", "parentDiv":"portfolio-mp-content", "clickParentDiv":"our-portfolio"};
var eventbriteJson = {"fileSource":"external","website":"Eventbrite","sourceURL":"public/data/ticketmaster/ticketmaster_events_ajax", "markerIcon" :"http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png", "parentDiv":"portfolio-mp-content", "clickParentDiv":"our-portfolio"};

if(!isMobile.any() ){$(".infoWcontentString").addClass("rotated-90deg"); }
//<!--<img src="http://www.clipartkid.com/images/136/left-hand-outline-vLtkI2-clipart.png"  width="30px" height="30px">-->
var contentString = '<div><i class="fa fa-hand-o-left infoWcontentString" style="font-size:50px;"></i></div>';
var infowindow = new google.maps.InfoWindow({content: contentString,
                pixelOffset: new google.maps.Size(0,30)}),
    postedBy,  postedID, outsourceURL, theTitle , noOfViews, DD_HH_MM, descriptions, 
    startDay, startMonth, startWeekDay, startTime, numbInterest,
    coverImageUrl,outsourceURL, latitude, longitude, venueName, addressNRegion,
    missingCoverImageUrl="http://www.downtownmesa.com/wp-content/uploads/2013/05/EVENTS1.jpg";

  


  $('.show_ourEvents_only').click(function(){
      $(this).parent().parent().find('input:checkbox.internalPosts').prop('checked',true).trigger('change');
      $(this).parent().parent().find('input:checkbox.externalPosts').prop('checked',false).trigger('change');
  })

  $('.show_externalEvents_only').click(function(){
      $(this).parent().parent().find('input:checkbox.internalPosts').prop('checked',false).trigger('change');
      $(this).parent().parent().find('input:checkbox.externalPosts').prop('checked',true).trigger('change');
  })

  createMarkerGroups('.mapComing_CheckboxControlBox', mapComingJson);
  createMarkerGroups('.meetUpCheckboxControlBox', meetupJson);
  createMarkerGroups('.yelpCheckboxControlBox', yelpJson);
  createMarkerGroups('.fbCheckboxControlBox', facebookJson);
  createMarkerGroups('.ebCheckboxControlBox',eventbriteJson);
  function hideUncheckedEventsList(){

  }

  var list_contents = ''; 
  var addressNRegion="";
  function createMarkerGroups(controlBox, eventsdata){
    //eventsdata = JSON.parse(eventsdata);      
      var infoWindowContent = '';
      //now loop over the categories 
      //$.each(eventsdata,function(c,category){  //alert(category.toSource())
        $.ajax({
            url: eventsdata.sourceURL+".json",
            type: 'get',
            dataType: 'json',
            error: function(category){},
            success: function(category){
              //var switchButton = $('<label class="switch"> <div class="slider round"></div></label>');
              var switchButton = $($('.referenceCheckbox_'+eventsdata.fileSource).html());               
              //a checkbox fo the category
              var cat = switchButton.find('input[type="checkbox"]').change(function(){
                 $(this).data('goo').set('map',(this.checked)?map:null);
                 
                 if(this.checked){$(controlBox+"-list").css("display","block")} //sisplay list of events under outsource
                 else {$(controlBox+"-list").css("display","none")}
              })
                //create a data-property with a google.maps.MVCObject
                //this MVC-object will do all the show/hide for the category 
                .data('goo',new google.maps.MVCObject).prop('checked',!!category.checked)                
                //this will initialize the map-property of the MVCObject
                .trigger('change');  
                switchButton.appendTo($(controlBox)).after();  
                //loop over the items(markers)
                $.each(category.items,function(m,item){
                    latitude = item.Latitude; longitude=item.Longitude; markerIcon=eventsdata.markerIcon;
                    var marker=new google.maps.Marker({
                        position:new google.maps.LatLng(latitude, longitude), //labelClass: ["labels","length"],//title:item[0],
                        icon:markerIcon //category.icon
                    });//marker.setValues({type: "point", id: 1}); http://stackoverflow.com/questions/2564320/adding-ids-to-google-map-markers
                    marker.setValues({id: [eventsdata.fileSource, eventsdata.website, item.postedID]});
                    //findAddressFromLatLng(geocoder, latitude, longitude, postedID, theVenue, function(where){ addressNRegion=where;})
                  
                    infoWindowContent+=FXN_posteddata(item, eventsdata);
                    
                    //bind the map-property of the marker to the map-property
                   //of the MVCObject that has been stored as checkbox-data 
                   marker.bindTo('map',cat.data('goo'),'map');
                   // This event click on a marker to open Info Window is opened.
                   google.maps.event.addListener(marker,'click',function(){
                      //infowindow.setContent(contentString);

                      infowindow.open(map,this);
                      var markerID= marker.get("id"); //alert(markerID[2])
                      //alert(eventsdata.parentDiv)
                      $("#"+eventsdata.clickParentDiv).trigger('click'); // open relevant page if its closed 
                      if(!isMobile.any() ){
                        var toTop= $("#"+eventsdata.parentDiv).offset().top;//bug the last data in each JSON does not scroll to rght position
                        var toDiv = $("#"+markerID[2]).offset().top; //infoWindow ID scroll                      
                        $('.mnavaa').animate({  scrollTop: toDiv-toTop}, 'slow');
                      }

                   });
                    // Event that closes the Info Window with a click on the map
                });
               $(controlBox+"-list").html(infoWindowContent);
            }
        }) 





    }



    
        


        // Create the DIV to hold the control and call the ZoomControl() constructor
        // passing in this DIV.
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, map);

        zoomControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);


        // Get close button and insert it into streetView
        var closeButton = document.querySelector('#btn-closeStreetView'),
        controlPosition = google.maps.ControlPosition.RIGHT_TOP;
          
        // Assumes map has been initiated 
        var streetView = map.getStreetView();
          
        streetView.setOptions({ enableCloseButton: true });
          
        streetView.controls[ controlPosition ].push( closeButton );
          
        //Streetview close button listener
        google.maps.event.addDomListener(closeButton, 'click', function(){
            streetView.setVisible(false);
        });

        //Streetview general listener
        google.maps.event.addListener(streetView, 'visible_changed', visible_streetView_changed);        

      /*google.maps.event.addListenerOnce(map, 'idle', function(){});
        google.maps.event.addListener(map,"idle", function(){ 
             $(".mobileCompressZoom, .gm-svpc").css("display", "none")
        });*/


          



  
  

                 // Bounds for whole worldmap
           /*var allowedBounds = new google.maps.LatLngBounds(
                 new google.maps.LatLng(79, 177),//89NorthEast coordinates
                new google.maps.LatLng(20, -177));//30SouthWest coordinates*/
        marker_location_change();        
        bounds_changed(); // initialize with  maximum bounds (-89 , 89 latitude) at zoom =1. this unfortunately makes the  maps scroll moutside the bounds
        
        if (!isNaN(getcityLatLon[0] || getcityLatLon[1])){map.setZoom(12); mapSatellite.setZoom(12)}
        else{map.setZoom(mapzoom0);  mapSatellite.setZoom(satzoom0)} //set minimum zoom =2;
        
        bounds_changed(); //this has  bounds set as low as 40 lat, -40 lat and makes the map not scroll outside  normal 90,-90 latitude

     


           
        

           

            



  var input = document.getElementById('address-input');
  //map.controls[google.maps.ControlPosition.RIGHT_TOP].push(input);

  var region_part = document.getElementById('region-suburb');
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(region_part);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
  autocomplete.addListener('place_changed', autocompletion)

    

    
    // Listen for the dragend event

   google.maps.event.addListener(map, 'bounds_changed', bounds_changed); //works better than center_changed which  is inconsistent when +/-zoom button is clicked
   //listen to new placemarker locations
   google.maps.event.addListener(map, 'idle', marker_location_change);
   // Limit the zoom level
   google.maps.event.addListener(map, 'zoom_changed', zoom_changed);

    //google.maps.event.addListener(map, 'idle', placeChange);

    //google.maps.event.addListener(mapSatellite, 'zoom_changed', zoomChange_S);
    
    google.maps.event.addListener(map, 'click', function (e) { $('#accor').hide(); });
    google.maps.event.addListener(mapSatellite, 'click', function (e) { $('#accor').hide(); });
    google.maps.event.addListener(map, 'dblclick', function (e) { placeMarker(e.latLng, map); });

    addControls(map);
    addSearchButton(map);

    /*setMarkers(mapInfo, map);*/
    getGeolocation();
    //getGeolocation(function (latitude, longitude) {});// alert("lat: " + latitude + ", lon: " + longitude);            
    //currPosition = { lat: latitude, lng: longitude };//this part does the magic
    marker_location_change()

    // function to toggle between grayscale map and colored map
    //$("#btn_mapColorType").addClass("grayMap-style");
    $(document).on('click', function (e) {
        var $target;  $target = $(e.target);
        if( $target.closest('#btn_mapColorType').length ){
            $("#btn_mapColorType").find($(".grayMap, .coloredMap")).toggleClass('grayMap, coloredMap');
            if($("#btn_mapColorType").hasClass("coloredMap")){
                map.set('styles',STYLES_color);//change from gray to colored
                //$("#btn_mapColorType").removeClass("coloredMap").addClass("grayMap");
            }
            else{map.set('styles',STYLES_gray);// change from colored to gray
                //$("#btn_mapColorType").removeClass("grayMap").addClass("coloredMap");
            }                        
        }
    })

function autocompletion() {
    //console.log(marker);
    var place = autocomplete.getPlace();
    // If the place has a geometry, then present it on a map.
    var adaptiveZoomLevel=15;
    var localityType = place.address_components[0].types[0];//alert(localityType)
    if (localityType=="country"){adaptiveZoomLevel=6}
    else if (localityType=="administrative_area_level_1"){adaptiveZoomLevel=12;}
    else if (localityType=="locality" || localityType=="administrative_area_level_2"){adaptiveZoomLevel=13;}
    else if (localityType=="sublocality_level_1" || localityType=="administrative_area_level_3"){adaptiveZoomLevel=14; }
    else if (localityType=="sublocality_level_2" || localityType=="administrative_area_level_4"){adaptiveZoomLevel=14;}
    else if (localityType=="sublocality_level_3" || localityType=="sublocality_level_4"){adaptiveZoomLevel=15; }
    else if (localityType=="neighborhood"  || localityType=="sublocality_level_5"){adaptiveZoomLevel=16;}
    else if (localityType=="route"){adaptiveZoomLevel=16;}
    else if (localityType=="premise"){adaptiveZoomLevel=17;}
    

    if(marker){marker.setPosition(place.geometry.location);}//alert("mmmm----"+place.toSource())//alert("mmmm----"+place.geometry.location)
    if (place.geometry.viewport) {map.fitBounds(place.geometry.viewport);}//alert(place.geometry.viewport)
    else {map.setCenter(place.geometry.location);}
    map.setZoom(adaptiveZoomLevel);
    mapSatellite.setZoom(adaptiveZoomLevel);
    getRegionInformationFromPlace(place);
};

  //set minimum zoom level, and change map style
  function zoom_changed(){
      var zoom = map.getZoom();
      if ( zoom < minZoomLevel) map.setZoom(minZoomLevel);//placeChange();
      if (zoom<6){map.set('styles',STYLES_googleDefault);}
      else{map.set('styles',STYLES);}  
      
      //alert(google.maps.MapTypeId.ROADMAP)
      if(zoom>15){if(map.getMapTypeId()==="terrain"){map.setMapTypeId(google.maps.MapTypeId.ROADMAP);}}
      else {      if(map.getMapTypeId()==="roadmap"){map.setMapTypeId(google.maps.MapTypeId.TERRAIN);}};
  };

  function FXN_posteddata(item, eventsdata){ 
    postedBy=eventsdata.website;  postedID= item.postedID; outsourceURL= item.source_pageURL; theTitle= item.postedTitle ; noOfViews=50; coverImageUrl=item.coverImageUrl;
    DD_HH_MM="4d:3hr"; descriptions="description"; startDay="31"; startMonth="Aug"; startWeekDay="Wed"; startTime="6:30pm"; venueName=item.venueName;  addressNRegion=item.Address; numbInterest="10";
    if(!coverImageUrl){coverImageUrl= missingCoverImageUrl;}
    //coverImageUrl =(coverImageUrl!=undefined)?coverImageUrl: missingCoverImageUrl; 
    venueName =(venueName!=undefined)?' @'+venueName: "";   //alert(postedBy+"2="+postedID+"3="+outsourceURL+"4="+theTitle+ "5="+coverImageUrl+ "6="+venueName+ "7"+addressNRegion)                 
     htmlTags='\
      <section class="Envelope_prev" id="' + postedID + '" style="width:105% !important; padding-left:5px; padding-right:10% !important">\
            <div class="PostedBy"><br><br>\
              <img src="' + coverImageUrl + '" alt="" height="32" width="32" class="img-circle">\
              <p style=" float:left; margin-left:0px !important;"><a href="." >'+postedBy+'</a>\
                <br>'+DD_HH_MM+' <!--<img style="float:none; display:inline" src="public/images/eventsDesign/globel.png" width="10" height="10">-->\
              </p>\
            </div>\
            <p class="NumbView">Views '+noOfViews+'</p>\
            <p class="Title_prev" style="margin-top:40px; z-index:99999">'+theTitle+'</p>\
            <p class="details_prev">' +descriptions+'<span>!... See more</span><br></p>\
            <img src="'+coverImageUrl+'" alt="" class="coverImageUrl" width="100%" height="auto">\
             <div class="postedTable">\
                 <div class="postedTableCell hideTOverflow" style="width:50px;"><div class="Date_prev" style="line-height: 70%;""><div ">'+startDay+'</div><span style="top:-20px !important;">'+startMonth+'</span></div></div>\
                 <div class="postedTableCell hideTOverflow" style="width:175px; ">\
                      <div class="Time_prev hideTOverflow"" >'+startWeekDay+' '+startTime+'<span class="'+postedID+'-address" class="Address_prev hideTOverflow"" style=" ">'+venueName+' </span></div>\
                      <span class="hideTOverflow" style="color:black;">'+addressNRegion[0]+'... <span>\
                      <div class="hideTOverflow" style=" font-size:16px;font-weight:700; text-transform: uppercase; ">'+addressNRegion[1]+'</div>\
                  </div>\
              </div>\
              <div class="postedTable hideTOverflow">\
                 <div class="postedTableCell hideTOverflow" style="width:130px;height:30px; "><button class="ImInterested_prev" >&#9733; Interested</button></div>\
                 <div class="postedTableCell hideTOverflow NumbInterest_prev" style="width:90px; "><br><br>'+numbInterest+' People</div>\
              </div>\
             <div style="border:1px solid #e9eaed; margin-top:0px; margin-left:-10px">\
            <div style="clear:both"></div>\
            </div>\
      </section>\
      <hr class="scissors-DottedLine">';
      return htmlTags
    }
}



function directionGroup() {
  $('#search-group').toggle();
  $('#direction-group').toggle();
  $('#startend-group').toggle();
}; 

function toggleInput(){
  $('#search-group').toggle();
  if(!$('#search-group').is(':hidden') || !$('#direction-group').is(':hidden')){$('#pac-in').css('z-index','10');}
  else{$('#pac-in').css('z-index','0');}
  if(!$('#direction-group').is(':hidden')) {//console.log('Not Hidden');
    directionGroup(); searchGroup()
  }
}

function togglemap() {    
  modify_zoom();
  if(map.getMapTypeId()=='roadmap') {
    map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    mapSatellite.setMapTypeId(google.maps.MapTypeId.ROADMAP); 
  //mapSatellite.setZoom(15)
  }
  else { 
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    mapSatellite.setMapTypeId(google.maps.MapTypeId.HYBRID);
    //mapSatellite.setZoom(map.getZoom())
  //mapSatellite.setZoom(5)
  }

}


function LocationControl(controlDiv) {
    controlDiv.style.padding = '1px';
    var controlUI = document.createElement('div');

    controlUI.style.backgroundColor = 'white';
    controlUI.style.margin = '10px';
    /*controlUI.style.border = '1px solid';
    controlUI.style.padding = '1px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';*/

    controlDiv.appendChild(controlUI);            
    var controlText = document.createElement('div');
    //controlText.innerHTML = '<a href="#" role="button" class="ltn" ><img src="public/images/map-icons/gps.png" width="23px" height="auto"></a>';
    if( isMobile.any()){controlText.innerHTML = '<div class="zoom-mylocation  mobileCompressZoom" style="display:none; margin-right:-2px"><a href="#"><i class="fa fa-dot-circle-o" ></i></a></div>';}
    else{controlText.innerHTML = '<div class="zoom-mylocation  mobileCompressZoom"  style="margin-right:-2px"><a href="#" ><i class="fa fa-dot-circle-o" ></i></a></div>';}
    
    controlUI.appendChild(controlText);
    google.maps.event.addDomListener(controlUI, 'click', function () {
    getGeolocation();
    //getGeolocation(function (latitude, longitude) {}); //alert("lat: " + latitude + ", lon: " + longitude);
        //currPosition = { lat: latitude, lng: longitude };
        marker_location_change()
    });
}



function triggerclick() {
    $('#cameratop-div').find('span').trigger('click');
    showRadius="true"
}

function UploadControl(controlDiv) {
    var controlUI = document.createElement('span');            
    controlDiv.appendChild(controlUI);  
    //$('#cameratop').append('<a href="#" class"button hoverColor bt1 postIIevent_popup" style="margin-top:0px !important; padding-top: 0px; padding-bottom:0px;  text-align:center; color: #222 !important;text-shadow: 0px 2px 3px #555 !important" role="button" onclick="triggerclick()" id="cam" class="btn" ><span class="fa fa-camera fa-3x btn1 navHeaderBtns" id ="cameratop2"></span><span class="headerText" style="font-size:30"> Post</span></a>');
    $('#cameratop').append('<a href="#" role="button" onclick="triggerclick()" class="button btn hoverColor bt1 postIIevent_popup " style="width:150px; height:50px;  opacity: 0 !important; margin-top:-0px !important; "></a>');
    $('#mobile-topLeftDiv').append('<a href="#" role="button" onclick="triggerclick()" class="btn" style=" width:60px; height:60px;  border-radius: 35px;  margin-top:-52px !important; "></a>');
    
    //$('#cameratop').append(controlText);
    //cameratop

    google.maps.event.addDomListener(controlUI, 'click', function () {  
        //$('#accor').toggle();
        var endDate = new Date().getTime() + 3600000
        var mapObj = { Latitude: currPosition.lat, Longitude: currPosition.lng, Name: 'Hello', Description: 'Welcome to SnapMap', ImageUrl: 'https://wishpool.one/imgs/SNAP2.png', StartDate: new Date(), EndDate: endDate }
        $('#accor').hide();
        
        if(marker){marker.setMap(null) ;} // delete old marker  before setting new one at a new map center
        currPosition = mapSatellite.getCenter();
        marker = new google.maps.Marker({
            map:map, position:currPosition, draggable:true,
            icon: new google.maps.MarkerImage('public/images/map-icons/mapmarkerpin.gif',null,null,new google.maps.Point(72, 72)),            
        });
        
        if(circles){circles.setMap(null);}// delete if existing           
        /*Set Radius to Marker*/ 
        circles = new google.maps.Circle({ // radius: 100= 100 metres default
          map: map, radius: 100, strokeColor: "#0000FF", strokeOpacity: .35, strokeWeight: 1, fillColor: "#0000FF", fillOpacity: .05        
        });
        circles.bindTo('center', marker, 'position');   
        getAddressFromLatLng(currPosition);
        //getAddressFromLatLng(function (currPosition, address) {});
        //searchGroup()  
        

        google.maps.event.addListener(marker,'dragend',function(e){ getAddressFromLatLng(e.latLng);});
        marker.addListener('click', function() {showSlider();});        
    });
}


function getAddressFromLatLng(LatLng){
    var LatLon =default_pos;
    //var LatLng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': LatLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) { //console.log(results);

            var  region="unknown region"                    
            for(var i=0;i<4;i++) { //alert(JSON.stringify( data.results[i].formatted_address, null, 4))
                  var region_temp=results[i].address_components[0]
                /*if(region_temp.types=="postal_code"){
                    region = region_temp.short_name.split(" ")[0];}; // bad addresses like in UK*/
                var temp = results[i];
                if (i==0){ var address = temp.formatted_address; }//if (address_component.types[0] == "street_number")
                else{
                    try{var typeOf= temp.address_components[i].types[0]; //alert("i="+i+"   "+typeOf)
                        if(typeOf.includes("locality")){ //find region using locality parameter if given
                            region = temp.formatted_address.split(",")[0];//splite address including city,country
                        }
                        else if(region_temp.types=="postal_code"){ // find region using postal code parameter // UK
                                 region = region_temp.short_name.split(" ")[0];
                        }
                        else{
                            if(typeOf.includes("administrative_area_level") && (region=="unknown region")){// find region using administrative_region if given
                                region = temp.formatted_address.split(",");
                                region = region[region.length-3]; //including city,country
                            }
                        }; 
                    } catch(region){} //alert(i+"=i "+address+ "------"+region)
                    }
                } 

                $('#end-route').val(region);$('#end-route').css({'font-size' : '14px'});
                getRegionInformationFromPlace(region);
                if($('#region-suburb').val()){
                    $('#address-input').val(address.split(',', 1)[0]+ ", ("+ $('#region-suburb').val()+"), "+address.split(',', 2)[1]);                            
                    }
                else{$('#address-input').val(address)}

             }
        else{console.log('Geocoder failed due to: ' + status);}
    });
}


function getRegionInformationFromPlace(region){
    $('#region-suburb').val(region.toUpperCase());
    $('#region-suburb').css({'color' : 'purple'});  
    //console.log(region)
}






function ZoomControl(controlDiv, map) {
    // Creating divs & styles for custom zoom control
    /*controlDiv.style.padding = '15px';*/
    // Set CSS for the control wrapper
    var controlWrapper = document.createElement('div');
    /*controlWrapper.style.backgroundColor = 'white';
    controlWrapper.style.borderStyle = 'solid';
    controlWrapper.style.borderColor = 'gray';
    controlWrapper.style.borderWidth = '1px';
    controlWrapper.style.cursor = 'pointer';*/
    controlWrapper.style.textAlign = 'center';
    controlWrapper.style.width = '42px'; 
    controlWrapper.style.height = '210px';
    controlWrapper.style.position = "relative";
    controlWrapper.style.top = '-35px';
    controlWrapper.style.left = '-12px';
    controlDiv.appendChild(controlWrapper);
    
    // Set CSS for the zoomIn
    var zoomInButton = document.createElement('div');
    
    zoomInButton.style.width = '32px'; 
    zoomInButton.style.height = '32px';
    zoomInButton.style.position = "relative";
    zoomInButton.style.top = '52px';
    zoomInButton.style.padding = '2px';
   //if( isMobile.any()){$(".onlyInMobile").addClass("mobileCompressZoom")};
    /* Change this to be the .png image you want to use */
    //zoomInButton.style.backgroundImage = 'url("http://www.blazingtools.com/img/right_zoom/right_zoom_icon.png")';
    var controlFontIcon = document.createElement('div');
    if( isMobile.any()){controlFontIcon.innerHTML = '<div class="zoom-mylocation mobileCompressZoom"   style="display:none"><a href="#"><i class="fa fa-plus" ></i></a></div>';}
    else{controlFontIcon.innerHTML = '<div class="zoom-mylocation mobileCompressZoom"><a href="#"><i class="fa fa-plus" ></i></a></div>';}
    zoomInButton.appendChild(controlFontIcon);
    controlWrapper.appendChild(zoomInButton);
      
    // Set CSS for the zoomOut
    var zoomOutButton = document.createElement('div');
    zoomOutButton.style.width = '32px'; 
    zoomOutButton.style.height = '32px';
    zoomOutButton.style.position = "relative";
    zoomOutButton.style.top = '75px';
    zoomOutButton.style.padding = '2px';
    /* Change this to be the .png image you want to use */
    //zoomOutButton.style.backgroundImage = 'url("http://placehold.it/32/0000ff")';

    

    //controlText.innerHTML = '<a href="#" role="button" class="ltn" ><img src="public/images/map-icons/gps.png" width="23px" height="auto"></a>';
    var controlFontIcon = document.createElement('div');
    if( isMobile.any()){controlFontIcon.innerHTML = '<div class="zoom-mylocation mobileCompressZoom" style="display:none"><a href="#"><i class="fa fa-minus" ></i></a></div>';}
    else{controlFontIcon.innerHTML = '<div class="zoom-mylocation mobileCompressZoom"><a href="#"><i class="fa fa-minus" ></i></a></div>';}
  
    zoomOutButton.appendChild(controlFontIcon);
    controlWrapper.appendChild(zoomOutButton);
    // Setup the click event listener - zoomIn
    google.maps.event.addDomListener(zoomInButton, 'click', function() { map.setZoom(map.getZoom() + 1); });      
    // Setup the click event listener - zoomOut
    google.maps.event.addDomListener(zoomOutButton, 'click', function() { map.setZoom(map.getZoom() - 1); });     
}

function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            currPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
            map.setCenter(pos)
            mapSatellite.setCenter(pos);

            if (isMobile.any()) { map.setZoom(13); mapSatellite.setZoom(13) }
            else { map.setZoom(15); mapSatellite.setZoom(13);};
            
            //var lat = position.coords.latitude;
            //var lon = position.coords.longitude;
            //callback.call(null, lat, lon);
            }  , 
            function(error){
                switch(error.code) 
                {
                    case error.PERMISSION_DENIED:
                      console.log("User denied the request for Geolocation.")
                      break;
                    case error.POSITION_UNAVAILABLE:
                      console.log("Location information is unavailable.")
                      break;
                    case error.TIMEOUT:
                      console.log("The request to get user location timed out.")
                      break;
                    case error.UNKNOWN_ERROR:
                      console.log("An unknown error occurred.")
                      break;
                }
        });//else{alert("RECOMMENDED: activate location feature")}
    }
}


//function endDragging() {//the map stops draging at 90°lattitude
function modify_zoom(){
    var mapZoom = map.getZoom();
    var satZoom = map.getZoom(); 
    if(mapZoom>10){var satZoom=mapZoom-2; } 
    else{var satZoom=mapZoom-1} 
    mapSatellite.setZoom(satZoom);
    //map.setZoom(satZoom);
}
            
function bounds_changed() {
    modify_zoom()  
    var zoomLevel = map.getZoom();              
    var bound_maxLat ={items: [{zoom:0, stop:89}, {zoom:1, stop:89}, {zoom: 2, stop: 40}, {zoom:3, stop: 60}, {zoom:4, stop: 70}, {zoom:5, stop: 80}, {zoom:6, stop:80}]};
    var bound_minLat ={items: [{zoom:0, stop:-89},{zoom:1, stop:-89}, {zoom: 2, stop:-40}, {zoom:3, stop:-60}, {zoom:4, stop:-70}, {zoom:5, stop:-80}, {zoom:6, stop:-80}]};
    var minLat = -39; var maxLat=39;
    for(i=0; i<bound_maxLat .items.length; i++){
        if(zoomLevel>6){zoomLevel=6};// no changes expected
        if ((bound_maxLat.items[i].zoom===zoomLevel) ){
            maxLat = bound_maxLat.items[i].stop;
            minLat = bound_minLat.items[i].stop;
        }
    } //console.log(minLat+"uuuu"+maxLat)             
    // bounds of the desired area
    var allowedBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(minLat, -179.50),
      new google.maps.LatLng(maxLat, 179.90)
    );
    var boundLimits = {
        maxLat : allowedBounds.getNorthEast().lat(),
        maxLng : allowedBounds.getNorthEast().lng(),
        minLat : allowedBounds.getSouthWest().lat(),
        minLng : allowedBounds.getSouthWest().lng()
    };
    center = map.getCenter(); //console.log("center"+center)
    map.setCenter(center);
    mapSatellite.setCenter(center);// this prevents the map from being moved just centered
    //mapSatellite.setZoom(map.getZoom())

    //alert(map.getZoom()+ "HHHHH"+mapSatellite.getZoom())
    //console.log('Place Changing444:: ' + center); console.log('Place Changing555:: ' + mapSatellite.getCenter());
    // still within valid bounds, so save the last valid position
    if (allowedBounds.contains(center)) { lastValidCenter = map.getCenter(); return; } 
    newLat = lastValidCenter.lat(); newLng = lastValidCenter.lng();
    if(center.lng() > boundLimits.minLng && center.lng() < boundLimits.maxLng){ newLng = center.lng(); }
    if(center.lat() > boundLimits.minLat && center.lat() < boundLimits.maxLat){ newLat = center.lat(); }
    map.panTo(new google.maps.LatLng(newLat, newLng));
};            
//mapSatellite.setCenter(center);// this prevents the map from being moved just centered
 //map.setCenter(new google.maps.LatLng(y, x));


function visible_streetView_changed(){//this code  keeps the  logo from overlaping street-view address/back/exit icon from google          
   if(this.getVisible()){$("#map-canvas").css("margin-top", "-60px"); 
      $("#map-canvas").css("margin-bottom", "60px"); $("#map-canvas").css("height", "90%") ;
      //$(".mobile-circleDiv, #mobile-circleDiv").css("display", "none");  
      $(".zoom-mylocation, .gm-svpc").css("display", "block");        
    }
   else{$("#map-canvas").css("margin-top", "-120px"); $("#map-canvas").css("height", "100%"); 
      $(".mobile-circleDiv, #mobile-circleDiv, .address-input,.gm-svpc").css("display", "block");
      if( isMobile.any() ){$(".mobileCompressZoom, .gm-svpc").css("display", "none")};
    }
};



function addControls(map) {
    //var camControlDiv = document.createElement('div');
    //var camControl = new headerCameraControl(camControlDiv, map);
    //map.controls[google.maps.ControlPosition.RIGHT_TOP].push(camControlDiv);            
    var uploadControlDiv = document.getElementById('cameratop-div');
    var uploadControl = new UploadControl(uploadControlDiv, map);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(uploadControlDiv);
    var locationControlDiv = document.createElement('div');
    var locationControl = new LocationControl(locationControlDiv);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationControlDiv);
}



function calculateAndDisplayRoute(directionsService, directionsDisplay, start, end, transitMode) {
    var mode = 'google.maps.TravelMode.' + transitMode;
    console.log('calculate Mode: ' + mode);
    directionsService.route({origin: start,destination: end,travelMode: google.maps.TravelMode.WALKING
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            console.log(response.routes.length)
            console.log('Length: ' + response.routes[0].legs[0].distance.text);
            $('#route-info').html(response.routes[0].legs[0].distance.text)
            $('#route-info').css('background', 'white');
            console.log(response)
        } else {window.alert('Directions request failed due to ' + status);}
    });
}

function searchGroup() {
    /*$('#direction-group').toggle();*/
    $('#start-route').val('');
    //$('#end-route').val('');
    $('#route-info').html('')
    directionsDisplay.setMap(null);
    directionsDisplay = null
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionInfo('WALKING')
}


var startPlace;
var endPlace;
var directionsDisplay = new google.maps.DirectionsRenderer;
var directionsService = new google.maps.DirectionsService;

function directionInfo(transitMode) {
    directionsDisplay.setMap(map);

    var start = new google.maps.places.SearchBox(document.getElementById('start-route'));
    var end = new google.maps.places.SearchBox(document.getElementById('end-route'));

    start.addListener('places_changed', function () {
        var place = start.getPlaces();
        // console.log('Start Place: '+startPlace)
        if (start.getPlaces().length == 0) {
            return;
        }
        startPlace = { lat: place[0].geometry.location.G, lng: place[0].geometry.location.K };
        calculateAndDisplayRoute(directionsService, directionsDisplay, startPlace, endPlace, transitMode);
    });


    end.addListener('places_changed', function () {
        var place = end.getPlaces();

        if (place.length == 0) {
            return;
        }
        endPlace = { lat: place[0].geometry.location.G, lng: place[0].geometry.location.K };
        calculateAndDisplayRoute(directionsService, directionsDisplay, startPlace, endPlace, transitMode);
    });


}

function addSearchButton(map) {

    var divInput = document.getElementById('pac-in');
    var input = document.getElementById('pac-input');

    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(divInput);

    directionInfo('WALKING');

    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    //   // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                position:new google.maps.LatLng(item.Latitude, item.Longitude),
                animation: google.maps.Animation.DROP,
                //title:item[0],
                icon:markerIcons //category.icon
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
        mapSatellite.fitBounds(bounds);
        //kevin mapSatellite.setZoom(map.getZoom());
    });

}



navigator.geolocation.getAccurateCurrentPosition = function (geolocationSuccess, geolocationError, geoprogress, options) {
    var lastCheckedPosition,
        locationEventCount = 0,
        watchID,
        timerID;

    options = options || {};

    var checkLocation = function (position) {
        lastCheckedPosition = position;
        locationEventCount = locationEventCount + 1;
        // We ignore the first event unless it's the only one received because some devices seem to send a cached
        // location even when maxaimumAge is set to zero
        if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 1)) {
            clearTimeout(timerID);
            navigator.geolocation.clearWatch(watchID);
            foundPosition(position);
        } else {
            geoprogress(position);
        }
    };

    var stopTrying = function () {
        navigator.geolocation.clearWatch(watchID);
        foundPosition(lastCheckedPosition);
    };

    var onError = function (error) {
        clearTimeout(timerID);
        navigator.geolocation.clearWatch(watchID);
        geolocationError(error);
    };

    var foundPosition = function (position) {
        geolocationSuccess(position);
    };

    if (!options.maxWait) options.maxWait = 10000; // Default 10 seconds
    if (!options.desiredAccuracy) options.desiredAccuracy = 20; // Default 20 meters
    if (!options.timeout) options.timeout = options.maxWait; // Default to maxWait

    options.maximumAge = 0; // Force current locations only
    options.enableHighAccuracy = true; // Force high accuracy (otherwise, why are you using this function?)

    watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
    timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
};


        /*function edittab() {
            $("#carousel-example-generic").carousel("pause");
            var record = JSON.parse($('#imageInfo').val());

            var latlng = { lat: parseFloat(record.Latitude), lng: parseFloat(record.Longitude) };
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (results[1]) {
                    $('input[name="eposition"]').val(formatAddress(results))
                }
            });

            $('input[name="etitle"]').val(record.Name);
            $('input[name="einfo"]').val(record.Description);
            $('input[name="estartDate"]').val(new Date(record.StartDate).toJSON().slice(0, 19));
            $('input[name="eendDate"]').val(new Date(record.EndDate).toJSON().slice(0, 19));
            $('input[name="eid"]').val(record.id);
            $('input[name="eimageid"]').val(record.ImageUrl);
            $('input[name="efile"]').val(record.ImageUrl);
        }*/

        /*
        function getPos() {
            if ($('input[name="eposition"]').is('[readonly]'))
                $('input[name="eposition"]').attr("readonly", false);
        }*/


        /*
        function fileEdit() {
            // alert('file edit');
            $('#eFileChange').replaceWith("<input type='file' class='form-control' name='efile'>")
        }*/

        /*function moreInfo() {
            // alert('hello');
            $("#carousel-example-generic").carousel("pause");
            var record = JSON.parse($('#imageInfo').val());
            console.log(record);
            $('#title').text(record.Name);
            $('#dates').html("(" + record.StartDate + " - " + record.EndDate + ")<br>" + $('input[name="eposition"]').val());
            $('#description').replaceWith(record.Description);
            // var info = "<h4 align='center'>"+record.title+"</h4><h6 class='info' align='center'>("+record.startDate +" - "+record.endDate+")</h6>"+
            // "<p>"+record.info+"</p>"
            // $('#minfo').replaceWith(info)
            $('input[name="imgId"]').val(record.ImageUrl);
            // $('#minfo').replaceWith('')

        }*/

        /*
        function sComment(event) {
            // alert($('input[name="imgId"]').val());
            if (event.keyCode == 13) {
                var commentVal = {
                    'imageId': $('input[name="imgId"]').val(),
                    'date': new Date(),
                    'username': 'Srini',
                    'comment': $('input[name="miCmts"]').val()
                }
                $.ajax({
                    type: 'POST',
                    data: commentVal,
                    url: '/mobile/addComment',
                    dataType: 'JSON'
                }).done(function (response) {
                    console.log(response)
                    $('input[name="miCmts"]').val('')
                });

            }
            // alert($('input[name="miCmts"]').val())
        }*/
        function ChangeRadius(){
            //console.log('document.getElementById("radiusValue")');
            //console.log(document.getElementById("radiusValue").value)
            circles.setRadius(parseInt(document.getElementById("radiusValue").value));
            document.getElementById('radius-input').style.display = "none";
        }

        

        

        


        /*function placeChange() {

            mapSatellite.setCenter(map.getCenter());
            if (map.getZoom() > 7)
                mapSatellite.setZoom(map.getZoom() - 2)
            else if (map.getZoom() > 2)
                mapSatellite.setZoom(map.getZoom() - 3)
            else
              mapSatellite.fitBounds(map.getBounds())

          }*/
    

        function zoomChange_S() {

            //No implementation required, but skeleton required
        }

        //var fixedMarker =[]; //initialize fixed marker
        //currPosition = default_pos;
        function marker_location_change() {//alert("placechange-s") 

            if(!isNaN(currPosition.lat) && !isNaN(currPosition.lng)){
                var latitude = parseFloat(currPosition.lat);
                var longitude =  parseFloat(currPosition.lng);
                //map.setCenter({lat:latitude, lng: longitude})
                //mapSatellite.setCenter({lat:latitude, lng: longitude})
                    //map.setCenter({lat:latitude,lng:longitude})
                    //mapSatellite.setCenter({lat:latitude,lng:longitude});
            }
            else{var pos = mapSatellite.getCenter();
                /*using the name currPosition = mapSatellite.getCenter(); will override  the magic finding of approximate location
                that happens even without geolocation enabled*/
                var latitude = parseFloat(pos.lat());
                var longitude =  parseFloat(pos.lng());
            }

            //getAddressFromLatLng(pos); // for finding starting route

            //var pos = mapSatellite.getCenter(); 
            //map.setCenter(mapSatellite.getCenter()) 
            //mapSatellite.setCenter(currPosition); 
            //map.setCenter(currPosition)           
            var fixedIcon = {
                    url: "public/images/map-icons/gps3.png", // url
                    scaledSize: new google.maps.Size(20, 20), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(9, 10) // anchor
                };

            
              if(fixedMarker){fixedMarker.setMap(null);}
              var position = { lat: latitude , lng: longitude };
                fixedMarker = new google.maps.Marker({ map:map, position:position, icon: fixedIcon, draggable:false });

            geocoder.geocode({'latLng': position}, function(results, status) { 
                if (status == google.maps.GeocoderStatus.OK) {
                    var myaddress = results[0].formatted_address;//from street level
                    $('#start-route').val(myaddress);$('#start-route').css({'font-size' : '14px'});
                }
                else{console.log('Geocoder failed due to: ' + status);}
            });  
            

            
            //searchGroup();
            }
            /*if(fixedMarker.length>1){ // remove default & previous loocations when new location is requested
                fixedMarker[0].setMap(null);
                delete fixedMarker[0];
            }*/



google.maps.event.addDomListener(window, 'load', initialize);
        
        
    
      
