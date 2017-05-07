$(document).ready(function(){

$('[data-toggle="popover"]').popover();

//API STUFF=====================================================

// var $planet =
var $xhr = $.getJSON('https://g-solarsystem.herokuapp.com/json/page-json.cfm?URLPath=planets/mercury/indepth');

$xhr.done(function(data){
  console.log(data);
  $('#mercuryAboutBody').html(`${data.main.content}`);
  });



//PLANET ARRAY FOR OVERALL USE===================================
var planets = ["sun", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"]


//INVOKING INFO MODALS FUNCTION===================================
function topicModals(planetArr, topic){
  for(let i=0; i<planetArr.length; i++){
    let modal = planetArr[i] + topic + "Modal";
    let body = planetArr[i] + topic + "Body";
    createModal(modal, body);
  }
}
topicModals(planets, "About");



//INVOKING NAV BAR POPUPS FOR PLANETS FUNCTION====================
function navPopups(planetArr, topic){
  for (let i=0; i<planetArr.length; i++){
    let navId = `#${planetArr[i]}Nav`
    let modal = `#${planetArr[i]}${topic}Modal`;
    console.log(modal);
    subNav(navId, modal);
  }
}
navPopups(planets, "About");



//CREATE INFO MODALS FUNCTION===================================

function createModal(planetTopicModal, planetTopicBody){
  let $modal = $("#blankModal").clone();
  $modal.removeAttr("id");
  $modal.attr("id", planetTopicModal);
  let $mbody = $modal.find("p");
  $mbody.attr("id", planetTopicBody);
  $('body').append($modal);
}


//PLANET NAV BAR POPUPS FUNCTION=================================
function subNav(planetId, planetTopicModal) {
  // initialize popover with dynamic content
  $(planetId).popover({
    placement: 'top',
    container: 'body',
    html: true,
    trigger: 'hover',
    content: `<p>Select a topic to find out more!</p><button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target=${planetTopicModal}>About</button>`

    // '<p>Select a topic to find out more!</p><button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target="#mercuryAboutModal">About</button>'
  });
  // prevent popover from being hidden on mouseout.
  // only dismiss when explicity clicked (e.g. has .hide-popover)
  $(planetId).on('hide.bs.popover', function(evt) {
    if(!$(evt.target).hasClass('hide-popover')) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.cancelBubble = true;
    }
  });
  // reset helper class when dismissed
  $(planetId).on('hidden.bs.popover', function(evt) {
    $(this).removeClass('hide-popover');
  });

  // button in popover closing popover original text
  // $('body').on('click', '.popover-about', function() {
  //   // add helper class to force dismissal
  //   $(planetId).addClass('hide-popover');
  //   // call method to hide popover
  //   $(planetId).popover('hide');
  // });

      $(planetId).data('overButton', false);
      $(planetId).data('overPopover', false);
      $.fn.closePopover = function(){
        var $this = $(this);

        if(!$this.data('overPopover') && !$this.data('overButton')){
          $this.addClass('hide-popover');
          $this.popover('hide');
        }
      }

      //set flags when mouse enters the button or the popover.
      //When the mouse leaves unset immediately, wait a second (to allow the mouse to enter again or enter the other) and then test to see if the mouse is no longer over either. If not, close popover.
      $(planetId).on('mouseenter', function(evt){
        $(this).data('overButton', true);
      });
      $(planetId).on('mouseleave', function(evt){
        var $btn = $(this);
        $btn.data('overButton', false);

        setTimeout(function() {$btn.closePopover();}, 200);

      });
      $(planetId).on('shown.bs.popover', function () {
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

//END PLANET NAV BAR POPUPS FUNCTION===================================













//END
});
