function Channel(displayName, game, logo, url) {
  this.displayName = displayName;
  this.game = game;
  this.logo = logo;
  this.url = url;
}

function getChannels(){
  var arr = ["voyboy","imaqtpie","freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
  var groups = [];
  arr.forEach(function(channel){
    $.getJSON('https://api.twitch.tv/kraken/channels/'+channel+'?callback=?', function(data) {
      var theChannel = new Channel(data['display_name'], data.game, data.logo, data.url);

      $.getJSON('https://api.twitch.tv/kraken/streams/'+channel+'?callback=?', function(data) {
        theChannel.status = data.stream;
      });
    groups.push(theChannel);    
    });
  }); //end forEach loop
  return groups;
}

function buildHTML(groups) {
  console.log(groups);
  groups.forEach(function(group){
    $(".row").append("<p>"+group.displayName+"</p>");
  });
}

buildHTML(getChannels()); //what