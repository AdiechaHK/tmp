/*
 * requestAnimationFrame pollyfill
 */
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
		return window.setTimeout(callback, 1000 / 60);//=16frames per sec, above which is indistinuishable by human eye
	});
}



var direction=[1];//1= foward, 0=backwards
//var maxSize; // maximum ball size
var maxSize = 50;
var for_k;
var imageObj= new Image();// Create new img element
var imageJson;
var canvasWidth= document.body.clientWidth;
 		var canvasHeight=Math.max(100, 2*canvasWidth *270/1300); //document.body.clientHeight wont work   because the height and width are scalled differently + use of min()

/*!
 * Mantis.js / jQuery / Zepto.js plugin for Constellation
 * @version 1.2.2
 * @author Acauã Montiel <contato@acauamontiel.com.br>
 * @license http://acaua.mit-license.org/
 */
(function ($, window) {
	/**
	 * Makes a nice constellation on canvas
	 * @constructor Constellation


	 canvas = document.getElementById('myCanvas');
        ctx = canvas.getContext('2d');

        var canvasWidth=Math.min(document.body.clientWidth, 1920);
 		var canvasHeight=Math.max(100, 2*canvasWidth *270/1300); //document.body.clientHeight wont work   because the height and width are scalled differently + use of min()
		$("#myCanvas").css("height", 230);
        $("#myCanvas").css("width", canvasWidth);

	 */

	function Constellation (canvas, options) {
		
		//$("#stars-canvas").css("height", 280);
        //$("#stars-canvas").css("width", canvasWidth);
		var $canvas = $("#stars-canvas"),
			context = canvas.getContext('2d'),
			defaults = {
				star: {
					color: '#F7F3ED', //'rgba(255, 255, 255, .5)',
					width: 1
				},
				line: {
					color: 'rgba(255, 255, 255, .5)',
					width: 1.2
				},
				position: {
					x: 0, // This value will be overwritten at startup
					y: 0 // This value will be overwritten at startup
				},
				width: document.body.clientWidth, //window.innerWidth,
				height: document.body.clientHeight, //window.innerHeight,
				length: Math.round(0.0078*document.body.clientWidth + 2.5) ,//number of stars
				distance: 220,
				radius: 250,
				stars: []
			},
			config = $.extend(true, {}, defaults, options);//document.body.clientWidth

 
	 	function  preloadImages(){
	     	imageJson ={items:[            
	            {index:2, url:"http://maparise.com/public/images/activityIcons/beer.png"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/friends.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/grill.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/mothers.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/sports.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/watchTv.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/wedding.png"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/beer.png"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/friends.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/grill.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/mothers.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/sports.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/watchTv.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/wedding.png"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/beer.png"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/friends.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/grill.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/mothers.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/sports.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/watchTv.PNG"},
	            {index:2, url:"http://maparise.com/public/images/activityIcons/wedding.png"}
	            ]};
	            return imageJson
		} 


	    function getRandomCoordinates() {
	        
	        var w = canvas.width;
	        var h = canvas.height;        
	        var x = Math.floor(Math.random() * (w - (0.7*maxSize)) +0.7*maxSize);//Math.floor(Math.random() * (w - (maxSize / 2)));
	        var y = Math.floor(Math.random() * (h - (0.7*maxSize)) +0.7*maxSize);        
	        return [x, y];
	    }

		function Star() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			//this.radius = Math.random() * config.star.width;
			var r = Math.floor(Math.random() * (maxSize-1)); //20*Math.random()*Math.random();//Math.floor(maxSize * Math.random());   
	        this.radius=r*r/maxSize;//for wide range of stating sizes
		}
		

		Star.prototype = {
			create: function(){
				context.beginPath();
				context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);//drawCircles
				context.fill();
				resize=this.radius/(2*maxSize);

	        	/*this code runs once*/
	        	imageObj[for_k].src = imageJson.items[for_k].url;// Set source path
	        	
	        	var rw =imageObj[for_k].width*resize, rh=imageObj[for_k].height*resize, xx=this.x-rw/2, yy=this.y-rh/2; //xx and yy corrected for left cenering
				context.drawImage(imageObj[for_k],xx,yy, rw, rh);
			},

			animate: function(){
				var i;
				for (i = 0; i < config.length; i++) {
					var star = config.stars[i];	
					if (star.radius > maxSize || direction[i]==0) {
						direction[i]=0; //reverse =shrinking
						star.radius -=1;
						if (star.radius <1.2){
							direction[i] =1; //move foward = grow
							star.x = Math.random() * canvas.width;
			            	star.y = Math.random() * canvas.height;
			            }
					} 
					else{
						if(star.radius>maxSize-1){star.radius +=0.01;}//easing out	
						else{star.radius +=0.4;}
					}
				}
			},

			line: function(){
				var length = config.length,iStar,jStar,i,j;
				for (i = 0; i < length; i++) {
					for (j = 0; j < length; j++) {
						iStar = config.stars[i];
						jStar = config.stars[j];
						if (
							(iStar.x - jStar.x) < config.distance &&
							(iStar.y - jStar.y) < config.distance &&
							(iStar.x - jStar.x) > - config.distance &&
							(iStar.y - jStar.y) > - config.distance
						) {
							if (
								(iStar.x - config.position.x) < config.radius &&
								(iStar.y - config.position.y) < config.radius &&
								(iStar.x - config.position.x) > - config.radius &&
								(iStar.y - config.position.y) > - config.radius
							) {
								context.beginPath();
								context.moveTo(iStar.x, iStar.y);
								context.lineTo(jStar.x, jStar.y);
								context.stroke();
								context.closePath();
							}
						}
					}
				}
			}
		};

		this.createStars = function () {
			var length = config.length,star,i;
			context.clearRect(0, 0, canvas.width, canvas.height);
			for (i = 0; i < length; i++) {
				config.stars.push(new Star());
				star = config.stars[i];
				for_k=i;
				star.create();
			}

			star.line();
			star.animate();
		};

		this.setCanvas = function () {
			var canvas_H=$("#map-canvas").css("height").slice(0,-2);
			//yss=$("#map-canvas").css("width")
			//alert(ys+"ggg"+yss)
			//alert(config.width+ "jjj"+config.height)
			canvas.width = config.width;
			canvas.height =  canvas_H;//config.height;ys.slice(0,-2)+20;
			$(window).resize(function(){
			    canvas.width = document.body.clientWidth;
			});
		};

		this.setContext = function () {
			canvasColors()
			$(window).resize(function(){canvasColors()});
			
			function canvasColors(){
				context.fillStyle = config.star.color;
				context.strokeStyle = config.line.color;
				context.lineWidth = config.line.width;				
			}
		};

		this.setInitialParameters = function () {
			if (!options || !options.hasOwnProperty('position')) {
				config.position = {
					x: canvas.width * 0.5,
					y: canvas.height * 0.5
				};
			}

			var length = config.length;
			imageJson=preloadImages();
			
	        for (i = 0; i < length; i++){direction[i]=1; 
	        	//alert("ddd"+dataN.items[i].url)
	        	direction[i]=1;//grow circles
	        	imageObj[i]= new Image();// Create new img element 1 for each circles/images
	        	//imageObj[i].src = dataN.items[i].url;
	        } 
		};

		this.loop = function (callback) {
			callback();
			window.requestAnimationFrame(function () {
				this.loop(callback);
			}.bind(this));
		};

		this.bind = function () {
			$canvas.on('mousemove', function(e){
				config.position.x = e.pageX - $canvas.offset().left;
				config.position.y = e.pageY - $canvas.offset().top;
			});
		};

		this.init = function () {
			this.setCanvas();
			this.setContext();
			this.setInitialParameters();
			this.loop(this.createStars);
			this.bind();
		};
	}

	$.fn.constellation = function (options) {
		return this.each(function () {
			var c = new Constellation(this, options);
			c.init();
		});
	};
})($, window);

// Init plugin


$('canvas').constellation({
	star: {width: 3},
	line: {color: 'rgba(255, 0, 0, .5)'},
	radius: 250
});