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
	SetupCanvas();
	
	bgImages[1] = 'assets/custom/back0.png'
	bgImages[2] = 'assets/custom/back2.png'
	bgImages[3] = 'assets/custom/back3.png'
	bgImages[0] = 'assets/custom/back4.png'
	
	AddLogo();
	ChooseColour();
		
	Load();
	
	$('.customButton').click(function(e)
	{
		var id = $(this).data('id');
		ChooseBackground(id);
	});
}

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

function AddLogo()
{
	base_image = new Image();
	base_image.src = 'assets/custom/logo.png';
	base_image.onload = function()
	{
		content.drawImage(base_image, (canvas.width / 2) - 150, 380);
	}
}

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

function ClearLogo()
{
	count = 1; 
	color = "white";
	imageX = [];
	imageY = [];
	
	Redraw();
	Save();
}

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
	
	for(var i = 0; i < imageX.length; i++)
	{
		var img = new Image();
		img.src = "assets/drop1.png";
		
		content.drawImage(img,imageX[i]-1,imageY[i]);
	}
	
	base_image = new Image();
	base_image.src = 'assets/custom/logo.png';
	base_image.onload = function()
	{
		content.drawImage(base_image, (canvas.width / 2) - 150, 380);
	}
	
	Save(); 
}

function Save()
{
	if (typeof(localStorage) !== "undefined") 
	{
		localStorage.setItem("backgroundColour", color);
		localStorage.setItem("backgroundImg", count);
		localStorage.setItem("greatestX", JSON.stringify(imageX));
		localStorage.setItem("greatestY", JSON.stringify(imageY));
	}
}

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