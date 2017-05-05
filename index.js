$(document).ready(function(){

$('[data-toggle="popover"]').popover();

//API STUFF===================================

// var $planet =
var $xhr = $.getJSON('https://g-solarsystem.herokuapp.com/json/page-json.cfm?URLPath=planets/mercury/indepth');

$xhr.done(function(data){
  console.log(data);
  });




//END
});
