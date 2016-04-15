// var groups = [];

// function Channel(displayName, game, logo, url) {
//   this.displayName = displayName;
//   this.game = game;
//   this.logo = logo;
//   this.url = url;
// }

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

arr.forEach(function(channel){

  $.ajax({
    method: "GET",
    url: "https://api.twitch.tv/kraken/streams/"+channel,
    dataType: "jsonp",
    success: function(data){
      $.ajax({
        method: "GET",
        url: "https://api.twitch.tv/kraken/channels/"+channel,
        dataType: "jsonp",
        success: function(data){
          groups.push(data);
        },
        error: function(){
          console.log("error in channel get");
        }
      })
    },
    error: function(){
      console.log("error in stream get");
    }
  }) //end ajax

}) //end forEach