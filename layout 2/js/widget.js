function loadWidgets() {
	wikipedia = $("#wikipedia-iframe");
	priberam = $("#priberam-iframe");
	oxford = $("#oxford-iframe");
	yahoo = $("#yahoo-iframe");

	wikipedia.attr('src',"http://en.m.wikipedia.org/wiki/Main_Page");
	priberam.attr('src',"http://www.priberam.pt/DLPO/");
	oxford.attr('src',"http://www.oxforddictionaries.com/");
	yahoo.attr('src',"https://images.search.yahoo.com/");
};

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

