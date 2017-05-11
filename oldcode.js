

//OLD CSS FOR MODAL RESIZING WIDTH==============================
//width works and is centered, but has issues with exit strangely off to the left instead of going straight up

/*body .modal-dialog {
    max-width: 80%;
    width: auto !important;
    display: inline-block;
}

.modal.in{
     text-align: center;
}*/

/*#blankBody {
  color: #2797b3;
  margin: 15px;
}*/




//INVOKING NAV BAR POPUPS FOR PLANETS FUNCTION====================
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




//INVOKING INFO MODALS FUNCTION===================================
//need to make a click function for each button on every popup.
//write as click function for the entire body of the window then use target?

// first attempt reformat
// console.log($('.btn'));
// $('.btn').click(function createModal(event){
//   console.log('success')
//   let $modal = $("#blankModal").clone();
//   // let $planet = event.target.attr('class');
//   $modal.removeAttr("id");
//   $modal.attr("id", event.target);
//   let $mbody = $modal.find("p");
//   $mbody.attr("id", planetTopicBody);
//   let $title = $modal.find("h5");
//   $title.html(planetTopicTitle);
//   $('body').append($modal);
// })


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
//original
// function createModal(planetsData){
//   let $modal = $("#blankModal").clone();
//   $modal.removeAttr("id");
//   $modal.attr("id", planetTopicModal);
//   let $mbody = $modal.find("p");
//   $mbody.attr("id", planetTopicBody);
//   let $title = $modal.find("h5");
//   $title.html(planetTopicTitle);
//   $('body').append($modal);
// }


//ABOUT PLANET API CALL FUNCTION==================================
//original call
// $xhr.done(function(data){
//   planetsData[planetsArr[i]] = data.sidebar.subnav;
//   if (i===planetsArr.length-1){
//     //creating modalId
    // modalIdCreator(planetsData);
    // popButtons(planetsData);
    // navPopups(planetsData);
//     console.log(planetsData);
//   }
//   });


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






//PLANET NAV BAR POPUPS FUNCTION=================================
    // `<p>Select a topic to find out more!</p><button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target=${planetTopicModal}>${topicButton}</button>`



//CREATE IMAGE GALLERY MODAL FUNCTION============================
// function createImageModal($target, data){
//   // let $target = $(evt.target);
//   let $modalId = $target.data('target');
//   // Build Modal
//     let $imgModal = $("#galleryModal").clone();
//       $imgModal.removeAttr("id");
//       $imgModal.attr("id", $modalId);
//   // Put in content from api call
//     let $title = $imgModal.find("h5");
//       $title.html(data.title);
//     let $imgTitle = $imgModal.find("h4");
//     let $image = $imgModal.find("#planetImg");
//     let $imgContent = $imgModal.find("p");
//       $imgTitle.html(data.gallery[imgCount]['title']);
//       $image.attr("src", `https://g-solarsystem.herokuapp.com/${data.gallery[imgCount]['imagebrowse']}`);
//       $imgContent.html(data.gallery[imgCount]['content']);
//   // Link next button to same gallery
//     let $nextButton = $imgModal.find('#nextImg');
//       $nextButton.attr('data-url', `${$url}`);
//   // Append to body and show
//     $('body').append($imgModal);
//     $($imgModal).modal('show');
// }





//FUNCTION TO GO TO NEXT IMAGE============================
//   $('#nextImg').click(function changeImage(data){
//     imgCount += 1;
//     $imgTitle.html(data.gallery[imgCount]['title']);
//     $image.attr("src", `https://g-solarsystem.herokuapp.com/${data.gallery[imgCount]['imagebrowse']}`);
//     $imgContent.html(data.gallery[imgCount]['content']);
//     console.log(data.gallery[imgCount]['title']);
//     $($imgModal).modal('show');
//   })


// $('#nextImg').click(function changeImage(data){
//   let $imgTitle = $imgModal.find("h4");
//   let $image = $imgModal.find("#planetImg");
//   let $imgContent = $imgModal.find("p");
//   let imgCount = 0;
//     $imgTitle.html(data.gallery[imgCount]['title']);
//     $image.attr("src", `https://g-solarsystem.herokuapp.com/${data.gallery[imgCount]['imagebrowse']}`);
//     $imgContent.html(data.gallery[imgCount]['content']);
// })



//working original for all
// $('body').on('click',function (evt) {
//   let $target = $(evt.target);
//   if ($target.hasClass('topicButton')) {
//     var $url = $target.data('url');
//   // Make AJAX Call
//     var $xhr = $.getJSON(`https://g-solarsystem.herokuapp.com/json/page-json.cfm?URLPath=${$url}`);
//     $xhr.done(function(data){
//       // Build Modal
//         let $modal = $("#blankModal").clone();
//         $modal.removeAttr("id");
//         let $modalId = $target.data('target');
//         $modal.attr("id", $modalId);
//       // Put in content from api call
//         let $mbody = $modal.find("p");
//       // If galleries, switch to galleries section
//         let testId = data.title.includes('Galleries');
//         if (testId){
//           $mbody.html(data.gallery[0]['title'] + "<br>" + `<img src=https://g-solarsystem.herokuapp.com/${data.gallery[0].image} />`);
//         }else{
//       // Otherwise make normal modal
//         $mbody.html(data.main.content);
//         }
//       // Make title for modal
//         let $title = $modal.find("h5");
//         $title.html(data.title);
//         $('body').append($modal);
//         $($modal).modal('show');
//       })
//     }
// });
