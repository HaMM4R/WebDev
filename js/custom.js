var content; 
var mouseDown; 
var lastX;
var lastY;
var hasDrawn = false; 
var slide = 0;

window.onload = function()
{
	Dropdown();
	ShowImages();
	SetupCanvas();
}

function Scrolling()
{
	var left = document.getElementById("left");
	var right = document.getElementById("right");
	
	left.addEventListener("click", (
	function(e)
	{
		ShowImages(-1)
	}));
	
	right.addEventListener("click", (
	function(e)
	{
		ShowImages(1);
	}));
}

function ShowImages()
{
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

function Dropdown()
{
	var navClick = document.getElementById("navClick");
	var nav = document.getElementById("topNav");

	navClick.addEventListener("click", (
	function(e)
	{
	
		if (nav.className === "TopNav") 
			nav.className += " responsive";
		 else 
			nav.className = "TopNav";
	}));
}

function SetupCanvas()
{
	var canvas = document.getElementById("canvas");
	content = canvas.getContext('2d')
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	canvas.addEventListener("mousedown", (
	function(e)
	{
		mouseDown = true;
		
	}));
	
	canvas.addEventListener("mouseup", (
	function(e)
	{
		mouseDown = false;
		hasDrawn = false;
		
	}));
	
	canvas.addEventListener("mouseleave", (
	function(e)
	{
		mouseDown = false;
		hasDrawn = false;
		
	}));
	
	canvas.addEventListener("mousemove", (
	function(e)
	{
		if(mouseDown)
		{
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;
			
			Draw(x, y);
		}
	}));
}

function Draw(x, y)
{
	if(!hasDrawn)
	{
		lastX = x;
		lastY = y;
		hasDrawn = true;
	}
	
	content.beginPath();
	content.moveTo(lastX, lastY);
	content.lineTo(x,y);
	content.stroke();
	
	lastX = x;
	lastY = y;
	
	console.log(x,y);
}