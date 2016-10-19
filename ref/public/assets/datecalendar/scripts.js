//open and close menu when the button is clicked
var open = false;

//Circular navigation
$(function(){
	var button1 = document.getElementById('cn-button1'),
    wrapper1 = document.getElementById('cn-wrapper1');

    //open and close menu when the button is clicked
	var open1 = false;
	button1.addEventListener('click', handler1, false);

	function handler1(){
	  if(!open1){
	    this.innerHTML = "<i class='fa fa-compress' ></i>";
	    classie.add(wrapper1, 'opened-nav');
	    $('#tab1 #cn-container').animate({height: '140px'}, 300);
	    $('#tab1 #cn-lower-desc').css('width', $('#cn-wrapper1').width() ).fadeIn();
	  }
	  else{
	    this.innerHTML = "<i class='icon-time' ></i>";
		classie.remove(wrapper1, 'opened-nav');
		$('#tab1 #cn-container').animate({height: '35px'}, 300);
		$('#tab1 #cn-lower-desc').fadeOut();
	  }
	  open1 = !open1;
	}
	
	var button2 = document.getElementById('cn-button2'),
    wrapper2 = document.getElementById('cn-wrapper2');

	//open and close menu when the button is clicked
	var open2 = false;
	button2.addEventListener('click', handler2, false);

	function handler2(){
	  if(!open2){
	    this.innerHTML = "<i class='fa fa-compress' ></i>";
	    classie.add(wrapper2, 'opened-nav');
	    $('#tab2 #cn-container').animate({height: '140px'}, 300);
	    $('#tab2 #cn-lower-desc').css('width', $('#cn-wrapper2').width() ).fadeIn();
	  }
	  else{
	    this.innerHTML = "<i class='icon-time' ></i>";
		classie.remove(wrapper2, 'opened-nav');
		$('#tab2 #cn-container').animate({height: '35px'}, 300);
		$('#tab2 #cn-lower-desc').fadeOut();
	  }
	  open2 = !open2;
	}

	var button3 = document.getElementById('cn-button3'),
    wrapper3 = document.getElementById('cn-wrapper3');

	//open and close menu when the button is clicked
	var open3 = false;
	button3.addEventListener('click', handler3, false);

	function handler3(){
	  if(!open3){
	    this.innerHTML = "<i class='fa fa-compress' ></i>";
	    classie.add(wrapper3, 'opened-nav');
	    $('#tab3 #cn-container').animate({height: '140px'}, 300);
	    $('#tab3 #cn-lower-desc').css('width', $('#cn-wrapper3').width() ).fadeIn();
	  }
	  else{
	    this.innerHTML = "<i class='icon-time' ></i>";
		classie.remove(wrapper3, 'opened-nav');
		$('#tab3 #cn-container').animate({height: '35px'}, 300);
		$('#tab3 #cn-lower-desc').fadeOut();
	  }
	  open3 = !open3;
	}

	var button_longer = document.getElementById('cn-button-longer');
    wrapper_longer = document.getElementById('cn-wrapper-longer');

	//open and close menu when the button is clicked
	var open_longer = false;
	button_longer.addEventListener('click', handler_longer, false);

	function handler_longer(){
	  if(!open3_longer){
	    this.innerHTML = "<i class='fa fa-compress' ></i>";
	    classie.add(wrapper_longer, 'opened-nav');
	    $('#tab3-longer #cn-container').animate({height: '140px'}, 300);
	    $('#tab3-longer #cn-lower-desc').css('width', $('#cn-wrapper-longer').width() ).fadeIn();
	  }
	  else{
	    this.innerHTML = "<i class='icon-time' ></i>";
		classie.remove(wrapper_longer, 'opened-nav');
		$('#tab-longer #cn-container').animate({height: '35px'}, 300);
		$('#tab-longer #cn-lower-desc').fadeOut();
	  }
	  open_longer = !open_longer;
	}
});

$( window ).resize(function() {
	$('.cn-lower-container #cn-lower-desc').each(function(){
		$(this).css('width', $('#cn-wrapper-longer').width());
	});
});

$(function(){
	$('div.tabs').each(function(){
			// For each set of tabs, we want to keep track of
			// which tab is active and it's associated content
			var $active, $content, $links = $(this).find('a');

			// If the location.hash matches one of the links, use that as the active tab.
			// If no match is found, use the first link as the initial active tab.
			$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
			$active.addClass('active');

			$content = $($active[0].hash);

			// Hide the remaining content
			$links.not($active).each(function () {
			$(this.hash).hide();
		});

		// Bind the click event handler
		$(this).on('click', 'a', function(e){
			// Make the old tab inactive.
			$active.removeClass('active');
			$content.hide();

			// Update the variables with the new link and content
			$active = $(this);
			$content = $(this.hash);

			// Make the tab active.
			$active.addClass('active');
			$content.show();

			// Prevent the anchor's default click action
			e.preventDefault();

			open = false;
		});
	});
});

