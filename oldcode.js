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
