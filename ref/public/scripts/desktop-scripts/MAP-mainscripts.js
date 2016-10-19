var mapInfo = [] ; 
            $('.menu-mainNav').hover(
                function(){var $this = $(this); expand($this);},
                function(){var $this = $(this); collapse($this); }
            );
            function expand($elem){
                var angle = 0;
                var t = setInterval(function () {
                    if(angle == 1440){clearInterval(t); return; }
                    angle += 40;
                    $('.menu-link',$elem).stop().animate({rotate: '+=-10deg'}, 0);
                },10);
                $elem.stop().animate({width:'150px'}, 1000)
                .find('.menu-mainNav_content').fadeIn(400,function(){
                    $(this).find('p').stop(true,true).fadeIn(600);
                });
            }
            function collapse($elem){
                var angle = 1440;
                var t = setInterval(function () {
                    if(angle == 0){ clearInterval(t); return; }
                    angle -= 40;
                    $('.menu-link',$elem).stop().animate({rotate: '+=10deg'}, 0);
                },10);
                $elem.stop().animate({width:'52px'}, 1000)
                .find('.menu-mainNav_content').stop(true,true).fadeOut().find('p').stop(true,true).fadeOut();
            }
        //MAIN MENU nav buttons begin here


 
  //general header and footer style begind here MAIN MENU content
        var cameratop = new mlPushMenu(document.getElementById('mp-menu-nav2'), document.getElementById('cameratop'));
        var pushRight = 280;    
        //--FIND ICON: search menu----------------
        var findEvents = new mlPushMenu(document.getElementById('mp-menu-nav1'), document.getElementById('find-events-menu'));
        $('#find-events-menu').click(function () {            
            $('.mp-menu').css('z-index', 1); 
            $('.mp-menu').css('left', 0);           
            $('#mp-menu-nav1').css('z-index', 3).fadeIn(800);
            $('#mp-menu-nav1').css('left', pushRight);//300

        });
         //--NEXT ICON: post event menu----------------
        var postEvent = new mlPushMenu(document.getElementById('mp-menu-nav2'), document.getElementById('postNextEvent'));
        $('#postNextEvent').click(function () {            
            $('.mp-menu').css('z-index', 1);
            $('.mp-menu').css('left', 0);
            $('#mp-menu-nav2').css('z-index', 3).fadeIn(800);
            /*$('.mp-menu').css('left', 375);*/
            $('#mp-menu-nav2').css('left', pushRight);
        });
        //--PORTFOLIO ICON: search menu----------------
        var portfolio = new mlPushMenu(document.getElementById('mp-menu-nav3'), document.getElementById('our-portfolio'));
        $('#our-portfolio').click(function () {            
            $('.mp-menu').css('z-index', 1);
            $('.mp-menu').css('left', 0);            
            $('#mp-menu-nav3').css('z-index', 3).fadeIn(800);
            /*$('.mp-menu').css('left', 375);*/
            $('#mp-menu-nav3').css('left', pushRight);//300
        });
        

    
  //general header and footer style ends here


//header menu  starts here
    // placing a a functioning camera button on the header for posting events at user location begins here    
        $(document).ready(function () {
            $('#cameratop #cameratop-div').find('a').on('click', function (e) {
                e.preventDefault();
                console.log('here');
                $('#cameratop-div').find('span').trigger('click'); 
                //$('#cameratop-div').trigger('click'); 
            });
        });
    // placing a a functioning camera button on the header for posting events at user location ends here 

        $('.postIIevent_popup').click(function (e) { // this function places a popup whenever the header camera icon is clicked, top, left corresponds to alligning with marker pin 
            document.getElementById('enter-nextSearch').style.display = "block"; 
            $('.post2Event_popup').fadeIn('fast');
            setTimeout(function(){$('.post2Event_popup').fadeOut('fast');}, 1500);
            var popup_top= $('#map-canvas').css("height").slice(0,-2);
            var popup_left= $('#map-canvas').css("width").slice(0,-2);
            $('.post2Event_popup').css('top', popup_top/2-100 + 'px')
            $('.post2Event_popup').css('left', popup_left/3-(25000/popup_left) + 'px')
        });



        function FXN_find_events_menu() {
            $('.show_ourEvents_only').trigger('click'); 
            //document.getElementById('filter_eventsBY').style.visibility = "visible";            
            
            document.getElementById('find-mp-content').style.display = "block";   //display list when you click  find icon 
            document.getElementById('nextPost-mp-content').style.display = "none";
            document.getElementById('portfolio-mp-content').style.display = "none";
            document.getElementById('enter-nextSearch').style.display = "none";            
            $(".toggleContent").css("display", "none");
            $('.postTagging').removeClass("hide");
            $('.notTagging').addClass("hide");
            $('#filter_eventsBY').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1}, 3000);
            document.getElementById('filter_eventsBY').style.display = "block";
            
        }
        function FXN_hide_filter_eventsBY(){document.getElementById('filter_eventsBY').style.visibility = "hidden";}
        function FXN_show_filter_eventsBY(){document.getElementById('filter_eventsBY').style.visibility = "visible";}
        //SELECT EVENTS/WISJES begin here
            /*
            var imageUrl_1 = "public/images/sidebar-icon/icon-calendar-gray.png"
            var imageUrl_2 = "public/images/sidebar-icon/shooting-star-gray.png"
            function selectfxn_1() {
                var eventNwish = document.getElementById("select-event-wish-1").value;
                selectfxn(eventNwish)
            }
            function selectfxn_2() {
                var eventNwish = document.getElementById("select-event-wish-2").value;
                selectfxn(eventNwish)
            }


            function selectfxn(select) {
                switch (select) {
                    case '1':
                         $('.styled-select').css("background-image","url("+imageUrl_1+")");
                        break;
                    case '2':
                         $('.styled-select').css("background-image","url("+imageUrl_2+")");
                        break;
                    } 
                }
            */ 

        function FXN_post_events_menu(){       
            document.getElementById('find-mp-content').style.display = "none";
            document.getElementById('nextPost-mp-content').style.display = "block";
            document.getElementById('portfolio-mp-content').style.display = "none";
            document.getElementById('enter-nextSearch').style.display = "none"; 
            $(".toggleContent").css("display", "none");
            document.getElementById('filter_eventsBY').style.display = "block";
        }

        function FXN_post_events_menu2(){
            document.getElementById('enter-nextSearch').style.display = "block";
            document.getElementById('filter_eventsBY').style.visibility = "hidden";
        }

        function showSlider(){
        //this function clears the bug that the side menu  dont open fully at times 
            $(".postIIevent_popup").trigger("click"); //post a snapmap popup
            FXN_post_events_menu();
            postEvent.open=true;
            postEvent.level=1;
            $("#postNextEvent").click();
            //$("#mp-pusher").addClass('mp-pushed');
            $("#mp-menu-nav2 .mp-level[data-level=\"1\"]").addClass('mp-level-open');
            //$("#mp-pusher").css('transform','translate3d(270px, 0px, 0px)');


            //Make the background color of cameratop icon to be active  when  mapmarker icon is clicked
            /*$("#cameratop2").css("background-color", "#355427");
            $("#find-events-menu").css("background-color", "gray");
            $("#our-portfolio").css("background-color", "gray");*/
            $("#main-cn-button").css("background-color", "gray");
            testID[testID.length-1]="cameratop";
            
        }


        

        
       /*document.getElementById('filter_eventsBY').style.display = "none";*/
       

        
        
        

        //Begin OUR PORTFOLIO
        function FXN_ourPortfolio_menu() {
            $('.show_externalEvents_only').trigger('click'); 
            //document.getElementById('filter_eventsBY').style.visibility = "hidden";
            
            //document.getElementById('filter_eventsBY').style.visibility = "visible";
            //document.getElementById('filter_eventsBY').style.display = "block";
            document.getElementById('find-mp-content').style.display = "none";//mainlist 
            document.getElementById('nextPost-mp-content').style.display = "none";           
            document.getElementById('portfolio-mp-content').style.display = "block";
            document.getElementById('enter-nextSearch').style.display = "none"; 
            $(".toggleContent").css("display", "none");
            $('#filter_eventsBY').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1}, 3000);
            document.getElementById('filter_eventsBY').style.display = "block";
        }
        // Youtube script
            function toggleVideo(state) {
                // if state == 'hide', hide. Else: show video
                var div = document.getElementById("popupVid");
                var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
                div.style.display = state == 'hide' ? 'none' : 'block';

                var other_div = document.getElementById("headerID");
                other_div.style.display = state == 'hide' ? 'block' : 'none';
                func = state == 'hide' ? 'pauseVideo' : 'playVideo';
                iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
            }
            
        //OUR PORTFOLIO ends here



        //$(function () {
        $(document).ready(function () {
        //personalised footer menu begins here          
            var myspace1 = new mlPushMenu(document.getElementById('myspace-inner-1'), document.getElementById('myspace-inner-1-trigger'));
            var myspace2 = new mlPushMenu(document.getElementById('myspace-inner-2'), document.getElementById('myspace-inner-2-trigger'));
            var myspace3 = new mlPushMenu(document.getElementById('myspace-inner-3'), document.getElementById('myspace-inner-3-trigger'));
            var myspace4 = new mlPushMenu(document.getElementById('myspace-inner-4'), document.getElementById('myspace-inner-4-trigger'));
            var myspace5 = new mlPushMenu(document.getElementById('myspace-inner-5'), document.getElementById('myspace-inner-5-trigger'));
        
            $('#myspace-inner-1-trigger, #myspace-inner-2-trigger, #myspace-inner-3-trigger, #myspace-inner-4-trigger, #myspace-inner-5-trigger').click(function () {
                //document.getElementById('filter_eventsBY').style.display = "block";
                document.getElementById('filter_eventsBY').style.visibility = "hidden";
                $('.mp-menu').css('z-index', 1);
                $('.mp-menu').css('left', 0);
                
                var id = $(this).attr('id').slice(0, -8);
                $('#' + id).css('z-index', 3).fadeIn(800);
                $('#' + id).css('left', pushRight);//300
                document.getElementById('enter-nextSearch').style.display = "none"; 
            }); 
        });
//personalised footer menu  ends here
 


// ===== Scroll to Top ==== 
$(".mnavaa").scroll(function() {
  var scroll = $(".mnavaa").scrollTop();
  
  if ($(this).scrollTop() >= 1200) {$('.return-to-top').fadeIn()/*$('.search-bar').addClass('navbar-fixed-top')*/ } 
  else {$('.return-to-top').fadeOut() /*$('.search-bar').removeClass('navbar-fixed-top')*/}
});

$('.return-to-top').click(function(){$('.mnavaa').animate({ scrollTop : 0   /* Scroll to top of body*/ }, 500);});
$('#btn_gotoSearch').click(function(){
    $('#find-events-menu').trigger('click');
    $('.mnavaa').animate({ scrollTop : 300   /* Scroll to top of body*/ }, 500);
});
//==============scroll to top ends here====================


//tag event by category, dates, place etc
        $(document).ready(function () {
            $('.eventCategory-tags').on('click', function (e) {
                 e.preventDefault();
                 $('#find-events-menu').trigger('click');
                             
                //$('#default-sublevel').trigger('click');                
                $('#defaultLevel').trigger('click');
                $('.postTagging').addClass("hide");
                $('.notTagging').removeClass("hide")
                $(".mapComing_CheckboxControlBox-list").css("display","none") ;
                $(".trigger-open-menu").addClass("mp-level-open");// trigger menu
//                $(".trigger-hide-submenu").css("transform","translate3d(-340px, 0, 0)");//hide all submenus , very important
            });

 
        });





        function FXN_trigger_events_menu(){ 
            $("#filter_eventsBY").addClass("z-index3").removeClass("z-index0")
             document.getElementById('find-mp-content').style.display = "block";   //display list when you click  find icon  
            document.getElementById('nextPost-mp-content').style.display = "none";
            document.getElementById('portfolio-mp-content').style.display = "none";
            $('.postTagging').removeClass("hide");
            $('.notTagging').addClass("hide");
        }


    /* create events start here*/

    // start upload  to post event
       $(document).ready(function () {
            $('#uploadForm').submit(function () {
                $.ajax({
                    error: function (xhr) {status('Error: ' + xhr.status);},
                    success: function (response) {console.log(response);}
                });
                return false;
            });
            



            $('input[name="eposition"]').attr("readonly", true);
            $('#comments').keypress(function (event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                // if(keycode == '13'){
                alert('You pressed a "enter" key in textbox');
                // }
            });
        });
    //end upload to post event


        var ijk=1; var ijk1=1;
        function checkopen(){
            if(ijk==1){document.getElementById('upload_zone').style.display = 'block'; ijk=0;}
            else {document.getElementById('upload_zone').style.display = 'none'; ijk=1;}
        }
 

   $(function() {//works with jquery-UI to drag and re-order images
            $("#drop-zone").sortable({
                items:'.dz-preview',
                cursor: 'move',
                opacity: 0.5,
                containment: '#drop-zone',
                distance: 20,
                tolerance: 'pointer'
            });
        })





//use of custom toggle buttons famultibutton for  post event form begins here
    function FXN_postWith_MoreDetails(givenID, icon){
        $('#'+givenID).famultibutton({
            backgroundIcon: 'fa-circle-thin',
            icon: icon,
            onColor: '#568203',
            offColor: '#505050',
            onBackgroundColor: '#568203',
            classes: ['fa-x2'] 
        }); 
    }
    $(function(){$('div[onload], span[onload]').trigger('onload');});// part of function FXN_postWith_MoreDetails(givenID, icon)
//use of custom toggle buttons famultibutton for  post event form ends here


        //describe the event title
        $(".form_description_add").click(function(e) {
            e.preventDefault(); 
            $(".form_description").toggle();            
        })

        //which day is the event
        $(".form_date_add").click(function(e) {
            e.preventDefault();
            $(".form_date_1").toggleClass("full_width");
            $(".form_date_2").toggle();
            if ($(".form_date_1").attr("placeholder") === "When") {
                $(".form_date_1").attr("placeholder", "Start Date");
            } 
            else {$(".form_date_1").attr("placeholder", "When");}            
        })

        //what time is the event
        $(".form_time_add").click(function(e) {
            e.preventDefault();
            $(".form_time_1").toggleClass("full_width");
            $(".form_time_2").toggle();
            if ($(".form_time_1").attr("placeholder") === "Time") {
                $(".form_time_1").attr("placeholder", "Start Time");
            } 
            else {$(".form_time_1").attr("placeholder", "Time");}            
        })
        function FXN_dateNtime(){
            //document.getElementById('filter_eventsBY').style.display = "block";
            $('#filterBY_dateNtime').trigger('click');
        }

        //where is the event
        $(".form_place_add").click(function(e) {
            e.preventDefault();
            $(".form_street").toggleClass("full_width");
            $(".form_place").toggle();            
        })

        /*$(".form_description_add").click(function(e) {
            $(".form_description_add").toggle();
            e.preventDefault();
        })*/
        
        //tag the event eg appropriate for children, adults
        $(".tags_description_add").click(function(e) {
            e.preventDefault();
            $(".tags_description").toggle();            
        })

    

    function refreshMap() {location.reload();} 


        /* filters begin here*/
        $(".filter_eventsBY").height(window.innerHeight );
        $(window).resize(function() {
            $(".filter_eventsBY").height(window.innerHeight );
        }); 
 
       function adjust_menu_position(){
            $('#categories-lvl2a > li >div.ccccc > a').click(function(){
            console.info(this);
              $('#categories-lvl2a li').removeClass('selected-cat');//selected-cat
              $(this).closest( "li" ).addClass('selected-cat');//selected-cat
              //$('#mp-pusher').addClass('submenu-display');
              //$('#mp-pusher').css('transform','translate3d(270px, 0px, 0px)');
            });
        }
/*filters end here*/
// FILTER EVENTS begins here
            $(document).on('mouseover', "#filter_eventsBY", function() {
                $(".child-filter_eventsBY").css("background", "#383838").css("opacity","1");
            });
            $(document).on('mouseout', "#filter_eventsBY", function() {
                $(".child-filter_eventsBY").css("background", "gray").css("opacity","0.5");
            });

           

            var filterName="", findFilters={"btn_filters":{"btn_dateNTime":"filterBY_dateNtime", "btn_location2":"filterBY_location", "btn_sortby2":"filterBY_sort","btn_howfar2":"filterBY_howfar"}};
            $(document).ready(function () {
                $(document).on('click', 'div',  function (e) {
                    e.stopPropagation(); var currentID = this.id || "No ID!"; var $target;  $target = $(e.target); 
                    //create slidding window
                    if($target.closest('#btn_dateNTime').length || $target.closest('#btn_location2').length || $target.closest('#btn_sortby2').length || $target.closest('#btn_howfar2').length){//alert(1); 
                        filterName = findFilters.btn_filters[currentID];
                        $("#"+filterName).show( "clip", {direction: "horizontal" }, 1000 )
                    }
                    else{
                        if($('#filterBY_dateNtime, #filterBY_location, #filterBY_sort, #filterBY_howfar').is(':visible')){
                            if(!$target.closest('#filterBY_dateNtime').length && !$target.closest('#filterBY_location').length && !$target.closest('#filterBY_sort').length && !$target.closest('#filterBY_howfar').length || $target.closest('.filtersByNext').length){
                                $("#"+filterName).hide( "clip", { direction: "horizontal"  }, 1000 );
                            }
                        }
                    }
                })
            })

   
        //simple events SORT BY begins here
            $(document).ready(function() {
                // Default dropdown action to show/hide dropdown content
                  $('.js-dropp-action, .dropp-header__title').click(function(e) {
                    e.preventDefault();
                    $(this).toggleClass('js-open');
                    $(this).parent().next('.dropp-body').toggleClass('js-open');
                  });

                  // Using as fake input select dropdown
                  $('label').click(function() {
                    $(this).addClass('js-open').siblings().removeClass('js-open');
                    $('.dropp-body,.js-dropp-action, .dropp-header__title').removeClass('js-open');
                  });
                  // get the value of checked input radio and display as dropp title
                  $('input[name="dropp"]').change(function() {alert(value)
                    var value = $("input[name='dropp']:checked").val();
                    var values = $("input[name='dropp']:checked");
                    alert(values.toSource())
                    $('.js-value').text(value);
                  });

            });
        //simple events SORT BY ends here

        //advanced SORT BY  begin here
        cols = $("table").find("tr:first td").length-1;
            $('td').click(function(){
                var colIndex = $(this).parent().children().index($(this));
                var rowIndex = $(this).parent().parent().children().index($(this).parent());
                //alert('Row: ' + rowIndex + ', Column: ' + colIndex);
                for (i=0; i<=colIndex; i++){
                    //alert("tr"+rowIndex+"td"+i)
                    $("#tr"+rowIndex+"td"+i).css("background","#3B5323")
                }
                for (i=colIndex+1; i<=cols; i++){
                     $("#tr"+rowIndex+"td"+i).css("background","gray")
                }
            });
            $(function() {
                //use of jquery-UI tabs for sortby
                $("#tabs-sortby").tabs({collapsible: false});
            });
        //Advanced SORT BY ends here

         // filterBY_howfar begins here
            $(document).ready(function() {
                $('#trigger-pollSlider-button').click(function() {
                    $('.pollSlider').animate({"margin-left": '-=245'});
                    $('#pollSlider-button').animate({"margin-left": '+=35'});
                    $('#trigger-pollSlider-button').css({"display": 'none'});
                    $('#pollSlider-button').find('i').toggleClass('fa-times fa-arrow-circle-up')
                    $('.pollSlider').css({"background": '#3B5323'})
                })
                $('#pollSlider-button').click(function() { 
                    $(this).find('i').toggleClass('fa-times fa-arrow-circle-up')
                    if($(this).css("margin-left") == "0px"){
                        $('.pollSlider').animate({"margin-left": '-=245'});
                        $('#pollSlider-button').animate({"margin-left": '+=35'});
                        $('#trigger-pollSlider-button').css({"display": 'none'});
                        $('.pollSlider').css({"background": '#3B5323'})
                    } else {
                        $('.pollSlider').animate({"margin-left": '+=245'});
                        $('#pollSlider-button').animate({"margin-left": '-=35'});
                        $('#trigger-pollSlider-button').css({"display": 'block'});
                        $('.pollSlider').css({"background": '#F8F8FF'});
                        
                    }
                });
            });
            // filterBY_howfar ends here
        //FILTER EVENTS end here




