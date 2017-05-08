$(document).ready(function(){

$('[data-toggle="popover"]').popover();


//THINGS FOR OVERALL USE===================================
var planets = ["sun", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"]

var planetsData = {};

//take out spaces and replace with dashes for modalId
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


//ABOUT PLANET API CALL FUNCTION==================================
function planetGetData(planetsArr){
  for(let i=0; i<planetsArr.length; i++){
    var $xhr = $.getJSON(`https://g-solarsystem.herokuapp.com/json/page-json.cfm?URLPath=planets/${planetsArr[i]}`);
    $xhr.done(function(data){
      planetsData[planetsArr[i]] = data.sidebar.subnav;
      if (i===planetsArr.length-1){
        //creating modalId
        modalIdCreator(planetsData);
        popButtons(planetsData);
        navPopups(planetsData);
        console.log(planetsData);
      }
      });
  }
}
planetGetData(planets);


//based off EMF object
// function topicGetData(arr){
//   for(let i=0; i<arr.length; i++){
//     let planet = arr[i]['planet'];
//     let calls = arr[i]['apiCall'];
//     let title = arr[i]['buttonTitle'];
//     for(let c=0; c<calls.length; c++){
//       let apiCall = arr[i];
//       let topic = title[c];
//       var $xhr = $.getJSON(`https://g-solarsystem.herokuapp.com/json/page-json.cfm?URLPath=planets/${planet}/${apiCall}`);
//       $xhr.done(function(data){
//         $(`#${planet}${topic}Body`).html(`${data.main.content}`);
//       });
//     }
//   }
// }
// topicGetData(planetsData);


//original function
// function topicGetData(planetArr,nasaTopic, topicModal){
//   for(let i=0; i<planetArr.length; i++){
//     var $xhr = $.getJSON(`https://g-solarsystem.herokuapp.com/json/page-json.cfm?URLPath=planets/${planetArr[i]}/${nasaTopic}`);
//     $xhr.done(function(data){
//       $(`#${planetArr[i]}${topicModal}Body`).html(`${data.main.content}`);
//       });
//   }
// }
// topicGetData(planets, 'indepth', 'About');
// topicGetData(['saturn'], 'rings', 'Rings');




//CREATE MODAL ID WITHIN PLANETSDATA FUNCTION=======================
//this is called within the API function
function modalIdCreator(planetsData){
  for (var planet in planetsData){
    var planetArr = planetsData[planet];
    for (let i=0; i<planetArr.length; i++){
      var title = planetArr[i].title;
      var modId = title.replaceAll("\ ", "\-");
      planetArr[i]['modalId'] = modId;
    }
  }
}




//CREATE BUTTONS WITHIN PLANETSDATA FUNCTION=======================
//this is called within the API function
function popButtons(planetsData){
  for (var planet in planetsData){
    var planetArr = planetsData[planet];
    for (let i=0; i<planetArr.length; i++){
      var buttonTitle = planetArr[i].title;
      var modalId = planetArr[i].modalId;
      planetArr[i]['button'] = `<button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target=${modalId}>${buttonTitle}</button>`;
    }
  }
}



//INVOKING NAV BAR POPUPS FOR PLANETS FUNCTION====================
//this is called within the API function
function navPopups(planetsData){
  for (var planet in planetsData){
    let navId = `#${planet}Nav`;
    var buttonsStr = '';
    var planetArr = planetsData[planet];
    for (let i=0; i<planetArr.length; i++){
      buttonsStr += planetArr[i]['button'];
      if(i===planetArr.length-1){
        subNav(navId, buttonsStr);
      }
    }
  }
}




//ORIGINAL
// function navPopups(planetArr, topic, ){
//   for (let i=0; i<planetArr.length; i++){
//     let navId = `#${planetArr[i]}Nav`
//     let modal = `#${planetArr[i]}${topic}Modal`;
//     subNav(navId, modal, topic);
//   }
// }
// navPopups(planets, "About");
// navPopups(['saturn'], "Rings");


>>!!!!!!!!!<<
//INVOKING INFO MODALS FUNCTION===================================
//need to make a click function for each button on every popup.
//write as click function for the entire body of the window then use target?
$(BUTTON).click(function createModal(planetsData){
  let $modal = $("#blankModal").clone();
  $modal.removeAttr("id");
  $modal.attr("id", planetTopicModal);
  let $mbody = $modal.find("p");
  $mbody.attr("id", planetTopicBody);
  let $title = $modal.find("h5");
  $title.html(planetTopicTitle);
  $('body').append($modal);
})



//version two
// function topicModals(arr){
//   for(let i=0; i<arr.length; i++){
//     let modalId = arr[i][modal][modalId];
//     let body = arr[i] + topic + "Body";
//     let titleId = planetArr[i] + topic + "Title";
//     if(i===0){
//       let title = "All About the Sun!"
//       createModal(modal, body, titleId, title);
//     }
//     let title = "All About " + planetArr[i].capitalize() + "!"
//     createModal(modal, body, titleId, title);
//   }
// }
// topicModals(planetsData);


//ORIGINAL
// function topicModals(planetArr, topic){
//   for(let i=0; i<planetArr.length; i++){
//     let modal = planetArr[i] + topic + "Modal";
//     let body = planetArr[i] + topic + "Body";
//     let titleId = planetArr[i] + topic + "Title";
//     if(i===0){
//       let title = "All About the Sun!"
//       createModal(modal, body, titleId, title);
//     }
//     let title = "All About " + planetArr[i].capitalize() + "!"
//     createModal(modal, body, titleId, title);
//   }
// }
// topicModals(planets, "About");
// topicModals(['saturn'], "Rings");


//CREATE INFO MODALS FUNCTION===================================

function XcreateModal(planetsData){
  let $modal = $("#blankModal").clone();
  $modal.removeAttr("id");
  $modal.attr("id", planetTopicModal);
  let $mbody = $modal.find("p");
  $mbody.attr("id", planetTopicBody);
  let $title = $modal.find("h5");
  $title.html(planetTopicTitle);
  $('body').append($modal);
}


//PLANET NAV BAR POPUPS FUNCTION=================================
function subNav(planetId, buttonsStr) {
  // initialize popover with dynamic content
  $(planetId).popover({
    placement: 'top',
    container: 'body',
    html: true,
    trigger: 'hover',
    content: `<p>Select a topic to find out more!</p>${buttonsStr}`

    // `<p>Select a topic to find out more!</p><button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target=${planetTopicModal}>${topicButton}</button>`


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
