$(function() {

	$("#priberam-iframe").hide();
	$("#oxford-iframe").hide();

	$( "#wiki-b" ).click(function() {
	  $("#wikipedia-iframe").show();
	  $("#priberam-iframe").hide();
	  $("#oxford-iframe").hide();
	});

	$( "#pri-b" ).click(function() {
	  $("#wikipedia-iframe").hide();
	  $("#priberam-iframe").show();
	  $("#oxford-iframe").hide();
	});

	$( "#ox-b" ).click(function() {
	  $("#wikipedia-iframe").hide();
	  $("#priberam-iframe").hide();
	  $("#oxford-iframe").show();
	});

});

