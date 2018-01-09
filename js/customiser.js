var content; 
var mouseDown; 
var lastX;
var lastY;
var hasDrawn = false; 
var colorWell;
var color; 

var imageName = [];
var imageX = [];
var imageY = [];

window.onload = function()
{
	//ChooseBackground(1);

	SetupCanvas();
	AddLogo();
	ChooseColour();
}

function SetupCanvas()
{
	var canvas = document.getElementById("canvas");
	content = canvas.getContext('2d')
	
	canvas.width = 500;
	canvas.height = 500;
	
	//CHANGE//CHANGE//CHANGE//CHANGE
	var $canvas=$("#canvas");
	var canvasOffset=$canvas.offset();
	
	var offsetX=canvasOffset.left;
	var offsetY=canvasOffset.top;

	var image1=new Image();
	image1.src = "assets/drop1.png";

	var $house=$("#house");
	var $canvas=$("#canvas");

	$house.draggable({
		helper:'clone',
	});
	// set the data payload
	$house.data("image",image1); // key-value pair

	$canvas.droppable({
		drop:dragDrop,
	});
	
	function dragDrop(e,ui){
		var element=ui.draggable;
		var data=element.data("url");
		var x=parseInt(ui.offset.left-offsetX);
		var y=parseInt(ui.offset.top-offsetY);
		imageName.push("assets/drop1.png");
		imageX.push(x);
		imageY.push(y);
		content.drawImage(element.data("image"),x-1,y);
		AddLogo();
	}
}
	//CHANGE//CHANGE//CHANGE//CHANGE


function AddLogo()
{
	base_image = new Image();
	base_image.src = 'assets/custom/logo.png';
	base_image.onload = function()
	{
		content.drawImage(base_image, (canvas.width / 2) - 150, 380);
	}
}

var count = 1; 

function ChooseBackground(num)
{
	var bgImages = new Array();
	bgImages[1] = 'assets/custom/back0.png'
	bgImages[0] = 'assets/custom/back1.png'
	bgImages[2] = 'assets/custom/back2.png'
	bgImages[3] = 'assets/custom/back3.png'
	bgImages[4] = 'assets/custom/back4.png'
	
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
	
	if(count != 1)
	{
		bgImage = new Image();
		bgImage.src = bgImages[count];
		bgImage.onload = function()
		{
			content.drawImage(bgImage, 0, 0);
		}
		
		for(var i = 0; i < imageName.length; i++)
		{
			img = new Image();
			img.src = "assets/drop1.png";
			
				content.drawImage(img,imageX[i]-1,imageY[i]);
			img.onload = function()
			{
				content.drawImage(img,imageX[i]-1,imageY[i]);
			}
		}
		AddLogo();
	}
	else if(count == 1)
	{
		content.clearRect(0, 0, canvas.width, canvas.height);
		content.beginPath();
		content.rect(0, 0, 500, 500);
		content.fillStyle = color;
		content.fill();
		for(var i = 0; i < imageName.length; i++)
		{
			img = new Image();
			img.src = "assets/drop1.png";
			
			content.drawImage(img,imageX[i]-1,imageY[i]);
			img.onload = function()
			{
				content.drawImage(img,imageX[i]-1,imageY[i]);
			}
		}
		AddLogo();
	}

}

function ChooseColour()
{
	colorWell = document.querySelector("#myColor");

	colorWell.value = "white";
	colorWell.addEventListener("input", updateFirst, false);
	colorWell.addEventListener("change", updateAll, false);
}

function updateFirst(event)
{
	content.beginPath();
	content.rect(0, 0, 500, 500);
	color = event.target.value;
	content.fillStyle = color;
	content.fill();
	AddLogo();
}

function updateAll(event)
{
	content.beginPath();
	content.rect(0, 0, 500, 500);
	color = event.target.value;
	content.fillStyle = color;
	content.fill();
	ChooseBackground(2);
	AddLogo();
}
