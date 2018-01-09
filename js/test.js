$(document).ready(function()
{
	if(localStorage && localStorage.getItem('background'))
	{
		var c = localStorage.getItem('background');		
		$('body').css("background-color", c);
		
	}
	
	$('#colour').change(function()
	{
		console.log($('#colour').val());
		localStorage.setItem('background',  $('#colour').val());
		$('body').css("background-color", $('#colour').val());
	}); 
	
});