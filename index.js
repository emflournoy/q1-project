$(document).ready(function(){

$('[data-toggle="popover"]').popover();

//API STUFF===================================

// var $planet =
var $xhr = $.getJSON('https://g-solarsystem.herokuapp.com/json/page-json.cfm?URLPath=planets/mercury/indepth');

$xhr.done(function(data){
  console.log(data);
  });

console.log($('#testdiv'))

subNav('.sun');
subNav('.mercury');
subNav('.venus');
subNav('.earth');
subNav('.mars');
subNav('.jupiter');
subNav('.saturn');
subNav('.uranus');
subNav('.neptune');


//PLANET NAV BAR POPUPS===================================
function subNav(planetClass) {
  // initialize popover with dynamic content
  $(planetClass).popover({
    placement: 'top',
    container: 'body',
    html: true,
    trigger: 'hover',
    content: '<p>Select a topic to find out more!</p><button type="button" class="btn btn-default popover-dismiss">About</button>'
  });
  // prevent popover from being hidden on mouseout.
  // only dismiss when explicity clicked (e.g. has .hide-popover)
  $(planetClass).on('hide.bs.popover', function(evt) {
    if(!$(evt.target).hasClass('hide-popover')) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.cancelBubble = true;
    }
  });
  // reset helper class when dismissed
  $(planetClass).on('hidden.bs.popover', function(evt) {
    $(this).removeClass('hide-popover');
  });
  $('body').on('click', '.popover-dismiss', function() {
    // add helper class to force dismissal
    $(planetClass).addClass('hide-popover');
    // call method to hide popover
    $(planetClass).popover('hide');
  });

      $(planetClass).data('overButton', false);
      $(planetClass).data('overPopover', false);
      $.fn.closePopover = function(){
        var $this = $(this);

        if(!$this.data('overPopover') && !$this.data('overButton')){
          $this.addClass('hide-popover');
          $this.popover('hide');
        }
      }

      //set flags when mouse enters the button or the popover.
      //When the mouse leaves unset immediately, wait a second (to allow the mouse to enter again or enter the other) and then test to see if the mouse is no longer over either. If not, close popover.
      $(planetClass).on('mouseenter', function(evt){
        $(this).data('overButton', true);
      });
      $(planetClass).on('mouseleave', function(evt){
        var $btn = $(this);
        $btn.data('overButton', false);

        setTimeout(function() {$btn.closePopover();}, 200);

      });
      $(planetClass).on('shown.bs.popover', function () {
        var $btn = $(this);
        $('.popover-content').on('mouseenter', function (evt){
          $btn.data('overPopover', true);
        });
        $('.popover-content').on('mouseleave', function (evt){
          $btn.data('overPopover', false);

          setTimeout(function() {$btn.closePopover();}, 200);
        });
      });
    };















//END
});
