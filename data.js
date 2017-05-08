$(document).ready(function() {

  var planets = ["sun", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"]

  var planetsData = [
    {planet: "sun",
    buttonTitle: ["About"],
    apiCall: ['indepth'],
    modal: {modalId: ['#sunAboutModal'],
            modalTitle: ['All About the Sun']},
    },
    {planet: "mercury",
    buttonTitle: ["About"],
    apiCall: ['indepth'],
    modal: {modalId: ['#mercuryAboutModal'],
            modalTitle: ['All About Mercury']},
    },
    {planet: "venus",
    buttonTitle: ["About"],
    apiCall: ['indepth'],
    modal: {modalId: ['#venusAboutModal'],
            modalTitle: ['All About Venus']},
    },
    {planet: "earth",
    buttonTitle: ["About"],
    apiCall: ['indepth'],
    modal: {modalId: ['#earthAboutModal'],
            modalTitle: ['All About Earth']},
    },
    {planet: "mars",
    buttonTitle: ["About"],
    apiCall: ['indepth'],
    modal: {modalId: ['#marsAboutModal'],
            modalTitle: ['All About Mars']},
    },
    {planet: "jupiter",
    buttonTitle: ["About"],
    apiCall: ['indepth'],
    modal: {modalId: ['#jupiterAboutModal'],
            modalTitle: ['All About Jupiter']},
    },
    {planet: "saturn",
    buttonTitle: ["About", "Rings"],
    apiCall: ['indepth'],
    modal: {modalId: ['#saturnAboutModal', '#saturnRingsModal'],
            modalTitle: ['All About Saturn', 'Saturn\'s Rings']},
    },
    {planet: "uranus",
    buttonTitle: ["About"],
    apiCall: ['indepth'],
    modal: {modalId: ['#uranusAboutModal'],
            modalTitle: ['All About Uranus']},
    }
  ]




  //END
});
