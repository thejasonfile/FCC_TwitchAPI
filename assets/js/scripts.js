var arr = ["OgamingSC2","comster404","cohhcarnage", "riotgames", "imaqtpie", "freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
var groups = [];

function getAJAX(){
  arr.forEach(function(twitchName){
    var HTMLstring = "";
    var imgSource = "";
    var link = 'https://www.twitch.tv/'+twitchName
    $.getJSON('https://api.twitch.tv/kraken/streams/'+twitchName+'?callback=?', function(data) {
      if(data.stream === null){
        $.getJSON('https://api.twitch.tv/kraken/channels/'+twitchName+'?callback=?', function(data) {
          if (data.logo === null) {
            imgSource = "../TwitchAPI/assets/img/redx.png";
          } else {
            imgSource = data.logo;
          }
          buildHTML('notRunning', imgSource, link, twitchName);
        });
      } else if (data.status === 422) {
          buildHTML('undefined', '../TwitchAPI/assets/img/redx.png', link, twitchName);
      } else {
        $.getJSON('https://api.twitch.tv/kraken/channels/'+twitchName+'?callback=?', function(data) {
          if (data.logo === null) {
            imgSource = "../TwitchAPI/assets/img/redx.png";
          } else {
            imgSource = data.logo;
          }
          buildHTML('running', imgSource, link, twitchName);
        });
      }     
    });
  }); 
}

function buildHTML(className, imgSource, link, twitchName) {
  HTMLstring = "<div class='col-md-8 "+className+"'><div class='row'>";
  HTMLstring += "<div class='col-md-2'><img src='"+imgSource+"'></div>";
  HTMLstring += "<div class='col-md-4'><span class='twitchName'><a href="+link+" target='_blank'>"+twitchName+"</a></span></div>"
  HTMLstring += "<div class='col-md-4'><span class='game'>Offline</span></div>";
  HTMLstring += "</div></div></div>";
  if(className === 'running'){
    prependHTML(HTMLstring);
  } else {
    appendHTML(HTMLstring);
  }
}

function appendHTML(HTMLstring) {
  $(".wrapper").append(HTMLstring);
}

function prependHTML(HTMLstring) {
  $(".wrapper").prepend(HTMLstring);
}

getAJAX();
