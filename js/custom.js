//Homepage slideshow
var slide = 0;

//Customiser
var content; 
var mouseDown; 
var lastX;
var lastY;
var hasDrawn = false; 
var colorWell;
var color = "white"; 

var count = 1;
var bgImages = new Array(); 


//Parallel arrays used to store the user dropped images positions

var imageX = [];

var imageY = [];

window.onload = function()
{
	Dropdown();
}

//HOME PAGE SLIDE SHOW
function ShowImages()
{
	Dropdown();
	var imgs = document.getElementsByClassName("images");
	
	slide += 1;
	
	if(slide > imgs.length)
		slide = 1; 
	
	for(var i = 0; i < imgs.length; i++)
	{
		imgs[i].style.display = "none";
	}
	imgs[slide-1].style.display = "inline";
	setTimeout(ShowImages, 5000);
}

//DROPDOWN MENU
function Dropdown()
{
	var navClick = document.getElementById("navClick");
	var nav = document.getElementById("topNav");
	
	navClick.addEventListener("click", (
	function(e)
	{
		console.log("click");
		if (nav.className === "TopNav") 
			nav.className += " responsive";
		 else 
			nav.className = "TopNav";
	}));
}

//GEOLOCATION
function GetLocation() 
{
	Dropdown();
	//uses the google API to get user position 
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(MyMap);
}

//used for geo location 
function MyMap(position) 
{
	//Saves variables for for longitute and latitude
	var lat =  position.coords.latitude;
	var longi = position.coords.longitude;
	var myCenter = new google.maps.LatLng(lat, longi);				//Works out center of the user displayed map
	var mapCanvas = document.getElementById("googleMap");
	var mapOptions = {center: myCenter, zoom: 5};					//Sets the center and the zoom level of the map
	var map = new google.maps.Map(mapCanvas, mapOptions);			//Displays the map
	var marker = new google.maps.Marker({position:myCenter});		//Displays the marker
	marker.setMap(map);
	
	//Adds markers for nearby arenas 
	var markerO2 = new google.maps.Marker
	(
		{
			position: new google.maps.LatLng(51.508742,-0.120850),
			icon: "assets/marker.png"
		}
	);
	markerO2.setMap(map);
	
	var markerNottingham = new google.maps.Marker
	(
		{
			position: new google.maps.LatLng(52.956484,-1.159763),
			icon: "assets/marker.png"
		}
	);
	markerNottingham.setMap(map);
	
	var markerSheffield  = new google.maps.Marker
	(
		{
			position: new google.maps.LatLng(53.382183,-1.470961),
			icon: "assets/marker.png"
		}
	);
	markerSheffield.setMap(map);
	
	var markerLeeds  = new google.maps.Marker
	(
		{
			position: new google.maps.LatLng(53.792132, -1.551530),
			icon: "assets/marker.png"
		}
	);
	markerLeeds.setMap(map);
	
	var markerBirmingham  = new google.maps.Marker
	(
		{
			position: new google.maps.LatLng(52.485153, -1.892128),
			icon: "assets/marker.png"
		}
	);
	markerBirmingham.setMap(map);
}

//Customiser
function InitaliseCustomiser()
{
	//Makes sure to give localStorage a value for the first time a user loads the page to prevent errors with the customiser 
	if(localStorage.getItem("backgroundColour") === null)
		localStorage.setItem("backgroundColour", "white");
	if(localStorage.getItem("backgroundImg")  === null)
		localStorage.setItem("backgroundImg", 1);
	if(localStorage.getItem("greatestX") === null)
		localStorage.setItem("greatestX", JSON.stringify(imageX));
	if(localStorage.getItem("greatestY") === null)
		localStorage.setItem("greatestY", JSON.stringify(imageY));
	
	Dropdown();
	SetupCanvas();
	
	//Adds images to array ready for use in background
	bgImages[1] = 'assets/custom/back0.png'
	bgImages[2] = 'assets/custom/back2.png'
	bgImages[3] = 'assets/custom/back3.png'
	bgImages[0] = 'assets/custom/back4.png'
	
	AddLogo();
	ChooseColour();
		
	Load();
	
	//Event listener to change the background on click
	$('.customButton').click(function(e)
	{
		var id = $(this).data('id');
		ChooseBackground(id);
	});
}

//Sets up size for the canvas
function SetupCanvas()
{
	var canvas = document.getElementById("canvas");
	content = canvas.getContext('2d')
	
	canvas.width = 500;
	canvas.height = 500;
	
	DropImages();
}

function DropImages()
{
	//Gets canvas and offset ready for placement of image
	var $canvas=$("#canvas");
	var canvasOffset=$canvas.offset();
	
	var offsetX=canvasOffset.left;
	var offsetY=canvasOffset.top;

	//Creates image to be placed
	var image1=new Image();
	image1.src = "assets/drop1.png";

	//Gets the ids for the canvas and the logo image to drop
	var $logoDrag=$("#logoDrag");
	var $canvas=$("#canvas");

	//Makes logo image draggable ready to be dropped
	$logoDrag.draggable
	(
		{
			helper:'clone',
		}
	);
	
	$logoDrag.data("image",image1); // key-value pair

	//Makes canvas ready to be dropped onto 
	$canvas.droppable
	(
		{
			drop:dragDrop,
		}
	);
	
	//Draws picture to canvas and adds the x and y positions to arrays ready to be saved to local storage
	function dragDrop(e,ui)
	{
		var element=ui.draggable;
		var data=element.data("url");
		var x=parseInt(ui.offset.left-offsetX);
		var y=parseInt(ui.offset.top-offsetY);
		imageX.push(x);
		imageY.push(y);
		Redraw();
	}
}

//Draws logo onto the canvas
function AddLogo()
{
	base_image = new Image();
	base_image.src = 'assets/custom/logo.png';
	base_image.onload = function()
	{
		content.drawImage(base_image, (canvas.width / 2) - 150, 380);
	}
}
//sets the index value to be later used in displaying the background image in canvas
function ChooseBackground(num)
{
	if(num != 2)
	{
		if(num === 0)
		{
			count--; 
		}
		else if(num === 1)
		{
			count++;
		}
		
		if(count > bgImages.length - 1)
			count = 0; 
		
		if(count < 0)
			count = bgImages.length - 1;
	}
	
	Redraw(); 

}

//Calls event listens to check for colour changes
function ChooseColour()
{
	colour = document.querySelector("#myColor");

	colour.addEventListener("input", UpdateFirst, false);
	colour.addEventListener("change", UpdateAll, false);
}

function UpdateFirst(event)
{
	color = event.target.value;
	Redraw();
}

function UpdateAll(event)
{
	color = event.target.value;
	Redraw();
}

//Clears out the canvas of all content
function ClearLogo()
{
	count = 1; 
	color = "white";
	imageX = [];
	imageY = [];
	
	Redraw();
	Save();
}

//Used to draw all content to the canvas
function Redraw()
{
	//background colour
	content.clearRect(0, 0, canvas.width, canvas.height);
	content.beginPath();
	content.rect(0, 0, 500, 500);
	content.fillStyle = localStorage.getItem("backgroundColour");
	content.fill();
	
	//background image
	if(count != 1)
	{
		bgImage = new Image();
		bgImage.src = bgImages[count];
		bgImage.onload = function()
		{
			content.drawImage(bgImage, 0, 0);
		}	
	}
	
	//Draws out all of the user placed greatest hits images
	for(var i = 0; i < imageX.length; i++)
	{
		var img = new Image();
		img.src = "assets/drop1.png";
		
		content.drawImage(img,imageX[i]-1,imageY[i]);
	}
	
	//Draws out the queen logo
	base_image = new Image();
	base_image.src = 'assets/custom/logo.png';
	base_image.onload = function()
	{
		content.drawImage(base_image, (canvas.width / 2) - 150, 380);
	}
	
	Save(); 
}

//Saves elements in local storage for the background colour, background image, x and y positions of user placed images. 
function Save()
{
	localStorage.setItem("backgroundColour", color);
	localStorage.setItem("backgroundImg", count);
	
	localStorage.setItem("greatestX", JSON.stringify(imageX));
	localStorage.setItem("greatestY", JSON.stringify(imageY));
	
}

//Loads in and redraws all of the data when page is reloaded
var jsonDataX
var jsonDataY
function Load()
{	
	colour.value = localStorage.getItem("backgroundColour");
	color = localStorage.getItem("backgroundColour");
	content.clearRect(0, 0, canvas.width, canvas.height);
	content.beginPath();
	content.rect(0, 0, 500, 500);
	content.fillStyle = localStorage.getItem("backgroundColour");
	content.fill();
	count = localStorage.getItem("backgroundImg");
	
	if(count != 1)
	{
		bgImage = new Image();
		bgImage.src = bgImages[localStorage.getItem("backgroundImg")];
		bgImage.onload = function()
		{
			content.drawImage(bgImage, 0, 0);
		}	
	}
	
	jsonDataX = JSON.parse(localStorage.getItem("greatestX"));
	jsonDataY = JSON.parse(localStorage.getItem("greatestY"));
	
	imageX = jsonDataX;
	imageY = jsonDataY;
	for(var i = 0; i < jsonDataX.length; i++)
	{
		var img = new Image();
		img.src = "assets/drop1.png";
		
		content.drawImage(img,jsonDataX[i]-1,jsonDataY[i]);
	}
}

//MODALBOX
var modal;

function loadBox(modalSelect)
{
	modal = document.getElementById(modalSelect);

	// When the user clicks the button, open the modal 
	modal.style.display = "block";
}

function closeBox(modalSelect)
{
	window.location = "discography.html";
}
