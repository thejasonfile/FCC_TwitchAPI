// var groups = [];

function Channel(displayName, game, logo, url) {
  this.displayName = displayName;
  this.game = game;
  this.logo = logo;
  this.url = url;
}

// function getChannels(){
//   var arr = ["voyboy","imaqtpie","freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
//   arr.forEach(function(channel){
//     $.getJSON('https://api.twitch.tv/kraken/channels/'+channel+'?callback=?', function(data) {
//       console.log('getting data');
//       var theChannel = new Channel(data['display_name'], data.game, data.logo, data.url);
//       groups.push(theChannel);
//       //$(".row").append("<p>"+data['display_name']+"</p>");
//     }); //end getJSON 
//   }); //end forEach loop
//   buildHTML();
// }

// function buildHTML(){
//   console.log('groups: ' + groups);
// }

// getChannels();

var arr = ["voyboy","imaqtpie","freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
var groups = [];

function getAJAX(){
  arr.forEach(function(twitchName){
    $.ajax({
      method: "GET",
      url: "https://api.twitch.tv/kraken/channels/"+twitchName,
      dataType: "jsonp",
      async: false,
      success: ajaxSucces,
      error: function(){
        console.log("error in AJAX get");
      }
    }) //end ajax
  }) //end forEach
}

function ajaxSucces(data) {
  var channelInfo = new Channel(data['display_name'], data.game, data.logo, data.url);
  groups.push(channelInfo);
}

// function appendHTML() {
//   groups.forEach(function(channel){
//     console.log('appending: '+channel.displayName);
//     $(".row").append("<div>"+channel.displayName+"</div>");
//   });
// }

getAJAX();
