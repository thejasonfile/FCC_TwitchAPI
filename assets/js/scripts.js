var groups = [];

function Channel(displayName, game, logo, url) {
  this.displayName = displayName;
  this.game = game;
  this.logo = logo;
  this.url = url;
}

function getChannels(){
  var arr = ["voyboy","imaqtpie","freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
  arr.forEach(function(channel){
    $.getJSON('https://api.twitch.tv/kraken/channels/'+channel+'?callback=?', function(data) {
      var theChannel = new Channel(data['display_name'], data.game, data.logo, data.url);
 
      $.getJSON('https://api.twitch.tv/kraken/streams/'+channel+'?callback=?', function(data) {
        theChannel.status = data.stream;
        groups.push(theChannel);
      }); //end second getJSON   
    }); //end first getJSON 
  }); //end forEach loop
}

function buildHTML() {
  console.log(groups);
  groups.forEach(function(group){
    $(".row").append("<p>"+group.displayName+"</p>");
  });
}

getChannels();
window.setTimeout(buildHTML, 500);
