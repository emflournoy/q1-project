$(document).ready(function(){

$('[data-toggle="popover"]').popover();


//THINGS FOR OVERALL USE===================================
var planets = ["sun", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"]

var planetsData = {};

var imgCount = 0;

//take out spaces and replace with dashes for modalId
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


//ABOUT PLANET API CALL FUNCTION==================================
function planetGetData(planetsArr){
  var promises = [];
  for(let i=0; i<planetsArr.length; i++){
    promises.push($.getJSON(`https://g-solarsystem.herokuapp.com/json/page-json.cfm?URLPath=planets/${planetsArr[i]}`));
  }
  Promise.all(promises).then(function (results) {
    for (planet of results) {
      planetsData[planet.path[1]] = planet.sidebar.subnav;
    }
    modalIdCreator(planetsData);
    popButtons(planetsData);
    navPopups(planetsData);
    console.log($(planetsData));
  });
}
planetGetData(planets);




//CREATE MODAL ID WITHIN PLANETSDATA FUNCTION=======================
//this is called within the API function
function modalIdCreator(planetsData){
  for (var planet in planetsData){
    var planetArr = planetsData[planet];
    for (let i=0; i<planetArr.length; i++){
      var title = planetArr[i].url;
      var modId = title.replaceAll("\/", "")+'Modal';
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
      var url = planetArr[i].url;
      //this is eventually inserted in the popup nav bar function at the bottom.
      planetArr[i]['button'] = `<button type="button" class="btn btn-primary topicButton" data-url=${url} data-title=${buttonTitle} data-toggle="modal" data-target=${modalId}>${buttonTitle}</button>`;

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
      var button = planetArr[i]["button"];
      if (!button.includes('News') && !button.includes('Education')){
        buttonsStr += planetArr[i]['button'];
        if(i===planetArr.length-1){
          subNav(navId, buttonsStr);
        }
        //compensates for the fact that News is the last section in Jupiter...
        else if (i===planetArr.length-2 && (navId==="#jupiterNav" || navId==="#earthNav")) {
          subNav(navId, buttonsStr);
        }
      }
    }
  }
}


//FUNCTION TO MOVE TO NEXT GALLERY IMAGE=========================
$('#nextImg').click(function changeImage(data){
  imgCount += 1;
  $imgTitle.html(data.gallery[imgCount]['title']);
  $image.attr("src", `https://g-solarsystem.herokuapp.com/${data.gallery[imgCount]['imagebrowse']}`);
  $imgContent.html(data.gallery[imgCount]['content']);
  $($imgModal).modal('show');
})



//BUTTON ON CLICK MAKE API CALL & MODAL===========================
$('body').on('click',function(evt){
  let $target = $(evt.target);

//OPT 1: If you select a planet topic
  if ($target.hasClass('topicButton')){
    // Make AJAX Call
    var $url = $target.data('url');
      var $xhr = $.getJSON(`https://g-solarsystem.herokuapp.com/json/page-json.cfm?URLPath=${$url}`);
      $xhr.done(function(data){
        let $modalId = $target.data('target');

      //OPT A: If galleries, switch to galleries section
        let testId = data.title.includes('Galleries');
        if (testId){
          // Build Modal
            let $imgModal = $("#galleryModal").clone();
              $imgModal.removeAttr("id");
              $imgModal.attr("id", $modalId);
          // Put in content from api call
            let $title = $imgModal.find("h5");
              $title.html(data.title);
            let $imgTitle = $imgModal.find("h4");
              $imgTitle.html(data.gallery[imgCount]['title']);
            let $image = $imgModal.find("#planetImg");
              $image.attr("src", `https://g-solarsystem.herokuapp.com/${data.gallery[imgCount]['imagebrowse']}`);
            let $imgContent = $imgModal.find("p");
              $imgContent.html(data.gallery[imgCount]['content']);
          // Link next/prev button to same gallery
            let $nextButton = $imgModal.find('#nextImg');
              $nextButton.attr('data-url', `${$url}`);
            let $prevButton = $imgModal.find('#prevImg');
              $prevButton.attr('data-url', `${$url}`);
          // Append to body and show
            $('body').append($imgModal);
            $($imgModal).modal('show');
        }

      //OPT B: Otherwise make normal modal
        else {
          // Build Modal
            let $textModal = $("#blankModal").clone();
              $textModal.removeAttr("id");
              $textModal.attr("id", $modalId);
            // Put in content from api call
              let $title = $textModal.find("h5");
                $title.html(data.title);
              let $mbody = $textModal.find("p");
                $mbody.html(data.main.content);
            // Append to body and show
              $('body').append($textModal);
            // Take care of FAQ sections
              $("a[anchor]").each(function(){
                var $this = $(this);
                $this.attr({href: `#${$this.attr('anchor')}`})
              })
            // On close trigger modal remove
              let $closeButton = $textModal.find('#closeButton');
              $closeButton.click(function(event) {
                $mbody.remove();
              });
            // Unleash the knowledge
            $($textModal).modal('show');
          }
        })
      }

//OPT 2: If you click a nav button in the image gallery
  else if ($target.hasClass('imgNavButton')){
    if ($target.is("#nextImg")){
      imgCount += 1;
    } else if (imgCount===0){
      return;
    } else if ($target.is("#prevImg")) {
      imgCount -=1;
    }
    var $url = $target.data('url');
      var $xhr = $.getJSON(`https://g-solarsystem.herokuapp.com/json/page-json.cfm?URLPath=${$url}`);
      $xhr.done(function(data){
        let $modalId = $target.data('target');
        // Build Modal
          let $imgModal = $("#galleryModal").clone();
            $imgModal.removeAttr("id");
            $imgModal.attr("id", $modalId);
        // Put in content from api call
          let $title = $imgModal.find("h5");
            $title.html(data.title);
          let $imgTitle = $imgModal.find("h4");
          let $image = $imgModal.find("#planetImg");
          let $imgContent = $imgModal.find("p");
            $imgTitle.html(data.gallery[imgCount]['title']);
            $image.attr("src", `https://g-solarsystem.herokuapp.com/${data.gallery[imgCount]['imagebrowse']}`);
            $imgContent.html(data.gallery[imgCount]['content']);
        // Link next button to same gallery
          let $nextButton = $imgModal.find('#nextImg');
            $nextButton.attr('data-url', `${$url}`);
          let $prevButton = $imgModal.find('#prevImg');
            $prevButton.attr('data-url', `${$url}`);
        // Append to body and show
          $('body').append($imgModal);
          $($imgModal).modal('show');
      });
    }

//OPT 3: If you click any close button, reset the image count for galleries
  else if ($target.hasClass('closeBtn')){
    imgCount = 0;
  }

//OPT 4: If you just click a random part of the body, do nothing.
  else {
    return;
  }

  // END OF BUTTON ON CLICK MAKE API CALL & MODAL
});




//PLANET NAV BAR POPUPS FUNCTION=================================
function subNav(planetId, buttonsStr) {
  // initialize popover with dynamic content
  $(planetId).popover({
    placement: 'top',
    container: 'body',
    html: true,
    trigger: 'hover',
    content: `${buttonsStr}`
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
        // var $planet = event.target.attr('class');
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




//ADDING MUSIC=========================================================
var audio = document.createElement("audio");
var $body = $('body');
audio.src="starWars.mp3"
$body.append(audio);
audio.loop = true;
audio.play();
var isPlaying = true;
$("#audioToggle").click(function togglePlay() {
  if (isPlaying) {
    audio.pause()
    $('#audioToggle').attr("class", "glyphicon glyphicon-volume-off");
  } else {
    audio.play();
    $('#audioToggle').attr("class", "glyphicon glyphicon-volume-up");
  }
});
audio.onplaying = function() {
  isPlaying = true;
};
audio.onpause = function() {
  isPlaying = false;
};



//END
});
