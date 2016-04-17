var arr = ["riotgames","imaqtpie","freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
var groups = [];

function getAJAX(){
  arr.forEach(function(twitchName){
    var HTMLString = "";
    var link = 'https://www.twitch.tv/'+twitchName
    $.getJSON('https://api.twitch.tv/kraken/streams/'+twitchName+'?callback=?', function(data) {
      if(data.stream === null){
        HTMLstring = "<div class='col-md-3 notRunning'><a href="+link+" target='_blank'>"+twitchName + " is not running</a></div>";
        appendHTML(HTMLstring);
      } else {
        $.getJSON('https://api.twitch.tv/kraken/channels/'+twitchName+'?callback=?', function(data) {
          console.log(data);
          HTMLstring = "<div class='col-md-3 running'><div class='row'><div class='col-md-4'>";
          HTMLstring += "<img src='"+data.logo+"'>";
          HTMLstring += "<div class='col-md-7'>";
          HTMLstring += "<h1><a href="+link+" target='_blank'>"+twitchName+"</a></h1><p>"+data.game+"</p></div></div></div>";
          appendHTML(HTMLstring);
        });
      }
            
    });
  }); 
}

function appendHTML(HTMLstring) {
  $(".row").append(HTMLstring);
}

getAJAX();
