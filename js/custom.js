var slide = 0;

window.onload = function()
{
	Dropdown();
	ShowImages();
	
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