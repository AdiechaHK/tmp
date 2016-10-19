/*'use strict';*/

var isMobile = {
    Android: function() {return navigator.userAgent.match(/Android/i);},
    BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
    iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
    Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
    Windows: function() {return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);},
    any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
if( isMobile.any() ){ $('html, body').animate({scrollTop:70},500);}//scroll so that login  button is instantly visible on mobile
function whichDevice_Mobile_Desktop(){
    function showForDevice(name) {
        // window.location.href = name + ".html";
        // ("#map-satellite").css("display","none");
        
        function processAjaxData(response, urlPath){
            document.write(response);
            document.close();
            window.history.pushState({"html":response.html,"pageTitle":name},"", urlPath);
        }
        $.get(name + '.html', function(data) {
            console.log(data);
        });
    }

    if( isMobile.any() ){showForDevice('mobile');}
    else{showForDevice('desktop');}
}

if( isMobile.any() ){
    $("#map-satellite, #ytplayer").css("display","none");
    $("#animateActivities-gif").css("display","block");
    $("#styleMapVideo").css("width", "120px")
} //hide #map-satellite in mobile device
else{
    $("#ytplayer").css("display","block"); 
    $("#animateActivities-gif").css("display","none"); 
}
//if( isMobile.any() ) alert('Mobile');

//if( isMobile.iOS() ) alert('iOS');
//if( isMobile.Android() ) alert('android');

var map = '';
var mapSatellite = '';
var currPosition = '';
var minZoomLevel = 2;
if(window.innerWidth<600) {var default_pos = new google.maps.LatLng(10.0, -35.0)}
else {var default_pos = new google.maps.LatLng(15.0, -30.0)}

function getGeolocation() {
     $.getJSON('http://freegeoip.net/json/', function(location, textStatus, jqXHR) {
        currPosition = { lat: location.latitude, lng: location.longitude };
        map.setCenter(currPosition)
        mapSatellite.setCenter(currPosition);
        map.setZoom(12)
        mapSatellite.setZoom(10)
    });
}

function initialize() {
    var STYLES = [
        {"featureType": "landscape.man_made","elementType": "geometry", "stylers": [{"hue": "#0077ff"},{"gamma": 3.1}]},
        { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ color: '#4d97c7' }]},
        {"featureType": "poi", "stylers": [{"visibility": "simplified"}]},
        {"featureType": "landscape","stylers": [{"visibility": "simplified"}]},
        {"featureType": "poi.park", "elementType": "all", "stylers": [{"hue": "#568203"}, {"saturation": 0}, {"visibility": "on"}]},
        {"featureType": "road.highway","elementType": "geometry","stylers": [{"visibility": "on"}]},
        {"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#3d3d3d"}]},
        {"featureType": "road.highway.controlled_access","elementType": "geometry.fill","stylers": [{ "color": "#313131"}]},
        {"featureType": "road.arterial","elementType": "geometry.fill","stylers": [{"color": "#808080"}]},
        {"featureType": "road.arterial","elementType": "geometry.stroke","stylers": [{"color": "#808080" }]},
        {"featureType": "road.local","elementType": "geometry.fill","stylers": [ {"color": "#ffffff"}]},
        {"featureType": "transit.line", "elementType": "geometry.fill","stylers": [{"color": "#F4C430"},{"saturation": "0"},{"lightness": "26"},{"gamma": "1.0"}]},
        {"featureType": "transit.line","elementType": "geometry.stroke","stylers": [{"color": "#000000"}]}
    ];


    var pos = default_pos
    var mapOptions = {
        zoom: 1,
        center: pos,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDoubleClickZoom: true,
        styles: STYLES
    };
    var mapSatelliteOptions = { zoom: 1, center: pos, mapTypeId: google.maps.MapTypeId.HYBRID, };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var divMapSatellite = document.getElementById('map-satellite');
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(divMapSatellite);
    mapSatellite = new google.maps.Map(document.getElementById('map-satellite'), mapSatelliteOptions);
    map.setZoom(1);
    mapSatellite.setZoom(1);
    getGeolocation();

/* flag to indicate google maps is loaded */
var googleMapsLoaded = false, norepeat=false;
var script = document.createElement('script');
/* listen to the tilesloaded event:if that is triggered, google maps is loaded successfully for sure */
google.maps.event.addListener(map, 'tilesloaded', function() {
   googleMapsLoaded = true;
   if(!norepeat){//to avoid running codes already run in the setTimeout
        script.src = 'public/scripts/homepage-scripts/HOMEPAGE-net_star.js';//loads after map_tiles are fully loaded increases loading speed
        document.body.appendChild(script);
        $("#stars-canvas").css("display","block");
   }
   $("#image2mapcanvas").css("display","none"); //remove temporary map image
   google.maps.event.clearListeners(map, 'tilesloaded'); //clear the listener, we only need it once
});
(googleMapsLoaded)
/* a delayed check to see if google maps was ever loaded */
setTimeout(function() {
  if (!googleMapsLoaded) {     
    script.src = 'public/scripts/homepage-scripts/HOMEPAGE-net_star.js';//loads after map_tiles are fully loaded increases loading speed
    document.body.appendChild(script);
    norepeat=true;
    $("#stars-canvas").css("display","block");     
  }    
}, 5000); //we have waited 5 secs, google maps is not loaded yet //alert('google maps is not loaded');


}
google.maps.event.addDomListener(window, 'load', initialize);



var email = $('#email'),
    password = $('#password'),
    userName = $('#user_name'),
    /*lastName = $('#last_name'),*/
    year = $('#year'),
    month = $('#month'),
    day = $('#day'),
    gender = $('#gender'),
    confirmEmail = $('#conf_email'),
    loginEmail = $('#email_login'),
    loginPassword = $('#password_login'),
    /*mobileLoginEmail = $('#mobile_email_login'),*/
    mobileLoginPassword = $('#mobile_password_login'),
    errorLoginPopup = $('.error_login'),
    errorAgePopup = $('.popup_error'),
    errorConfirmedPopup = $('.error_confirmed');

function emptynessSignupCheck() {
    return gender.val() === 'Gender' || day.val() === 'Date' || month.val() === 'Month' || year.val() === 'Yyear' || /*lastName.val() === '' ||*/ userName.val() === '' || password.val() === '' || !email.val().match(/@.*\../) || !confirmEmail.val().match(/@.*\../) || confirmEmail.val() !== email.val();
}
$('#reg_submit').click(function (e) {
    if (emptynessSignupCheck()) {
        console.log(gender.val()=== 'Gender');
        if (gender.val() === 'Gender') {
            gender.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            gender.focus(function () {
                gender.css('box-shadow', '');
                gender.focusout(function () {
                    if (gender.val() === 'gender') {
                        gender.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
                    }
                });
            });
        }
        if (day.val() === 'Date') {
            day.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            day.focus(function () {
                day.css('box-shadow', '');
                day.focusout(function () {
                    if (day.val() === 'date') {
                        day.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
                    }
                });
            });
        }
        if (!email.val().match(/@.*\../)) {
            email.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            email.focus(function () {
                email.css('box-shadow', '');
                email.focusout(function () {
                    if (email.val() == '' || !email.val().match(/@.*\../)) {
                        email.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
                    }
                });
            });
        }
        if (!confirmEmail.val().match(/@.*\../)) {
            confirmEmail.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            confirmEmail.focus(function () {
                confirmEmail.css('box-shadow', '');
                confirmEmail.focusout(function () {
                    if (confirmEmail.val() == '' || !confirmEmail.val().match(/@.*\../)) {
                        confirmEmail.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
                    }
                });
            });
        }
        if (confirmEmail.val() !== email.val()) {
            confirmEmail.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            email.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            $('.popup_confirm_error').fadeIn('fast');
            setTimeout(function(){$('.popup_confirm_error').fadeOut('fast');}, 2000);
            confirmEmail.focus(function () {
                confirmEmail.css('box-shadow', '');
                email.css('box-shadow', '');
            });
            email.focus(function () {
                confirmEmail.css('box-shadow', '');
                email.css('box-shadow', '');
            });
        }
        if (month.val() === 'Month') {
            month.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            month.focus(function () {
                month.css('box-shadow', '');
                month.focusout(function () {
                    if (month.val() === 'month') {
                        month.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
                    }
                });
            });
        }
        if (year.val() === 'Year') {
            year.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            year.focus(function () {
                year.css('box-shadow', '');
                year.focusout(function () {
                    if (year.val() === 'year') {
                        year.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
                    }
                });
            });
        }
        /*if (lastName.val() === '') {
            lastName.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            lastName.focus(function () {
                lastName.css('box-shadow', '');
                lastName.focusout(function () {
                    if (lastName.val() === '') {
                        lastName.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
                    }
                });
            });
        }*/
        if (userName.val() === '') {
            userName.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            userName.focus(function () {
                userName.css('box-shadow', '');
                userName.focusout(function () {
                    if (userName.val() === '') {
                        userName.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
                    }
                });
            });
        }
        if (password.val() === '') {
            password.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            password.focus(function () {
                password.css('box-shadow', '');
                password.focusout(function () {
                    if (password.val() === '') {
                        password.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
                    }
                });
            });
        }
    }
    else if(wrongAgeCheck()){
        wrongAgeHandler()
    }
    else {
        $.ajax({
            type: "POST",
            url: "/register",
            data: 'email=' + email.val() + '&password=' + password.val() + '&user_name=' + userName.val() + '&last_name=' + lastName.val() + '&year=' + year.val() + '&month=' + month.val() + '&day=' + day.val() + '&gender=' + gender.val(),
            statusCode: {
                200: function (data) {
                   cleanSignup();
                    $('#up_scroll').trigger('click');
                   //$('.success_signup').fadeIn('fast');					
                   // setTimeout(function(){$('.success_signup').fadeOut('fast');}, 10000);
					
					$('#popUpEmail').fadeIn('fast');					
					
					
                },
                403: function (data) {
                    //$('.email_occuped').fadeIn('fast');
                    $('#popUpTakenU').fadeIn('fast');					
					
					//setTimeout(function(){$('.email_occuped').fadeOut('fast');}, 2000);
                },
                502: function (data) {
					$('#popUpTakenU').fadeIn('fast');
                }
            }
        });
    }
});
$('.modal_close').on('click', function(event){
    $(event.target).parent().fadeOut('fast');
});
function cleanSignup(){
    email.val('');
    password.val('');
    userName.val('');
    lastName.val('');
}
function emptynessLoginCheck() {
    return loginEmail.val() === '' || loginPassword.val() === '';
}
/*function emptynessMobileLoginCheck() {
    return mobileLoginEmail.val() === '' || mobileLoginPassword.val() === '';
}*/
function wrongAgeHandler(){
    errorAgePopup.fadeIn('fast');
    setTimeout(function(){errorAgePopup.fadeOut('fast');}, 2000);
}
function wrongAgeCheck(){
    var date = new Date();
    return date.getYear()-parseInt(year.val())+1900<=13;
}
/*$('#btn-common_new').click(function () {
loginHandler(emptynessLoginCheck, loginEmail, loginPassword);
});*/
$('#btn-common_new').click(function () {
    loginHandler(emptynessLoginCheck, loginEmail, loginPassword);
    /*loginHandler(emptynessMobileLoginCheck, mobileLoginEmail, mobileLoginPassword);*/
});
function badRequest() {
    $('#cont_scroll').trigger('click');
    errorLoginPopup.fadeIn('fast');
    setTimeout(function(){errorLoginPopup.fadeOut('fast');}, 2000);
}
function badRequest2() {    
	$('#cont_scroll').trigger('click');
    $("#popUpNewU").fadeIn('fast');
    setTimeout(function(){errorLoginPopup.fadeOut('fast');}, 2000);
}
function nonConfirmed(){
    $('#cont_scroll').trigger('click');
    errorConfirmedPopup.fadeIn('fast');
    setTimeout(function(){errorConfirmedPopup.fadeOut('fast');}, 2000);
}
function loginHandler(check, email, password){
    if (check()) {
        badRequest2();
        if (loginEmail.val() === '') {
            loginEmail.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            loginEmail.focus(function () {
                loginEmail.css('box-shadow', '');
                loginEmail.focusout(function () {
                    if (loginEmail.val() === '') {
                        loginEmail.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
                    }
                });
            });
        }
        if (loginPassword.val() === '') {
            loginPassword.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
            loginPassword.focus(function () {
                loginPassword.css('box-shadow', '');
                loginPassword.focusout(function () {
                    if (loginPassword.val() === '') {
                        loginPassword.css('box-shadow', 'inset 0 0 5px rgba(255, 0, 0, 1)');
                    }
                });
            });
        }
    }
    else {
        $.ajax({
            type: "POST",
            url: "/login",
            data: 'email=' + email.val() + '&password=' + password.val() + '&remember=' +  $('#remember_login').prop('checked'),
            statusCode: {
                200: function (data) {
                    if (data === 'ok') {
                        if(window.location.href){
                            window.location.href = '/';
                        }
                        else{
                            window.location.assign('/');
                        }
                    }
                },
                403: function (data) {
                    badRequest2();
                },
                502: function (data) {
                    badRequest2();
                }
            }
        });
    }
}

$('.find_us_wish').mouseenter(function () {
    $(this).attr('src', 'public/images/wishpool_logo.png');
});
$('.find_us_wish').mouseleave(function () {
    $(this).attr('src', 'public/images/wishpool_logo2.png');
});

/*$('#facebook_login').click(function(){
    if(window.location.href){
        window.location.href = '/facebook';
    }
    else{
        window.location.assign('/facebook');
    }
});
$('#google_login').click(function(){
    if(window.location.href){
        window.location.href = '/google';
    }
    else{
        window.location.assign('/google');
    }
});
$('#twitter_login').click(function(){
    if(window.location.href){
        window.location.href = '/twitter';
    }
    else{
        window.location.assign('/twitter');
    }
});*/
/*$('#linkedin_login').click(function(){
    if(window.location.href){
        window.location.href = '/linkedin';
    }
    else{
        window.location.assign('/linkedin');
    }
});*/


var mapInfo = [] 
 canvas_stars = null;
 
// Youtube script
function toggleVideo(state) {
    // if state == 'hide', hide. Else: show video
    var div = document.getElementById("popupVid");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    div.style.display = state == 'hide' ? 'none' : 'block';

    var other_div = document.getElementById("headerID");
    other_div.style.display = state == 'hide' ? 'block' : 'none';


    func = state == 'hide' ? 'pauseVideo' : 'playVideo';
    if(state == 'hide'){$("#styleMapVideo, stars-canvas").css("display","block"); $("#popupVid").css("display","none")}
    else{$("#styleMapVideo, stars-canvas").css("display","none"); $("#popupVid").css("display","block")}
    iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
}



// placing a a functioning camera button on the header for posting events at user location begins here    
        $(document).ready(function () {
            $('#cameratop').find('a').on('click', function (e) {
                e.preventDefault();
                console.log('here');
                $('#cameratop-div').find('span').trigger('click');
            });
        });




    if(window.location.hash === '#user'){
        history.pushState("", document.title, window.location.pathname);
        $('#cont_scroll').trigger('click');
        $('.email_occuped').fadeIn('fast');
        setTimeout(function(){$('.email_occuped').fadeOut('fast');}, 2000);
    }


    $(document).ready(function() { 
        $('.age_info').click(function (e) {
            e.preventDefault();
            console.log("Entering");
            $("#popUpAgeInfo").show();
        });
        $('.gender_info').click(function (e) {
            e.preventDefault();
            $("#popUpGenderInfo").show();
        }); 
    });


    //refresh page on browser resize to avoid animation overflow
    

