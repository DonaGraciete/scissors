$(function() {

	$("#priberam-iframe").hide();
	$("#oxford-iframe").hide();
	$("#yahoo-iframe").hide();

	$( "#wiki-b" ).click(function() {
	  $("#wikipedia-iframe").show();
	  $("#priberam-iframe").hide();
	  $("#oxford-iframe").hide();
	  $("#yahoo-iframe").hide();
	});

	$( "#pri-b" ).click(function() {
	  $("#wikipedia-iframe").hide();
	  $("#priberam-iframe").show();
	  $("#oxford-iframe").hide();
	  $("#yahoo-iframe").hide();
	});

	$( "#ox-b" ).click(function() {
	  $("#wikipedia-iframe").hide();
	  $("#priberam-iframe").hide();
	  $("#oxford-iframe").show();
	  $("#yahoo-iframe").hide();
	});

	$( "#yahoo-b" ).click(function() {
	  $("#wikipedia-iframe").hide();
	  $("#priberam-iframe").hide();
	  $("#oxford-iframe").hide();
	  $("#yahoo-iframe").show();
	});


});

