var arr = ["comster404","cohhcarnage", "riotgames", "imaqtpie", "freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
var groups = [];

function getAJAX(){
  arr.forEach(function(twitchName){
    var HTMLstring = "";
    var link = 'https://www.twitch.tv/'+twitchName
    $.getJSON('https://api.twitch.tv/kraken/streams/'+twitchName+'?callback=?', function(data) {
      if(data.stream === null){
        $.getJSON('https://api.twitch.tv/kraken/channels/'+twitchName+'?callback=?', function(data) {
          console.log(data);
          HTMLstring = "<div class='col-md-8 notRunning'><div class='row'>";
          HTMLstring += "<div class='col-md-2'><img src='"+data.logo+"'></div>";
          HTMLstring += "<div class='col-md-4'><span class='twitchName'><a href="+link+" target='_blank'>"+twitchName+"</a></span></div>"
          HTMLstring += "<div class='col-md-4'><span class='game'>"+data.game+"</span></div>";
          HTMLstring += "</div></div></div>";
          appendHTML(HTMLstring);
        });
      } else {
        $.getJSON('https://api.twitch.tv/kraken/channels/'+twitchName+'?callback=?', function(data) {
          console.log(data);
          HTMLstring = "<div class='col-md-8 running'><div class='row'>";
          HTMLstring += "<div class='col-md-2'><img src='"+data.logo+"'></div>";
          HTMLstring += "<div class='col-md-4'><span class='twitchName'><a href="+link+" target='_blank'>"+twitchName+"</a></span></div>"
          HTMLstring += "<div class='col-md-4'><span class='game'>"+data.game+"</span></div>";
          HTMLstring += "</div></div></div>";
          prependHTML(HTMLstring);
        });
      }     
    });
  }); 
}

function appendHTML(HTMLstring) {
  $(".wrapper").append(HTMLstring);
}

function prependHTML(HTMLstring) {
  $(".wrapper").prepend(HTMLstring);
}

getAJAX();
