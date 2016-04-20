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
          HTMLstring = "<div class='col-md-8 notRunning'><div class='row'>";
          HTMLstring += "<div class='col-md-2'><img src='"+imgSource+"'></div>";
          HTMLstring += "<div class='col-md-4'><span class='twitchName'><a href="+link+" target='_blank'>"+twitchName+"</a></span></div>"
          HTMLstring += "<div class='col-md-4'><span class='game'>Offline</span></div>";
          HTMLstring += "</div></div></div>";
          appendHTML(HTMLstring);
        });
      } else if (data.status === 422) {
          HTMLstring = "<div class='col-md-8 undefined'><div class='row'>";
          HTMLstring += "<div class='col-md-2'><img src='../TwitchAPI/assets/img/redx.png'></div>";
          HTMLstring += "<div class='col-md-4'><span class='twitchName'><a href="+link+" target='_blank'>"+twitchName+"</a></span></div>"
          HTMLstring += "<div class='col-md-4'><span class='game'>Account Closed</span></div>";
          HTMLstring += "</div></div></div>";
          appendHTML(HTMLstring);
      } else {
        $.getJSON('https://api.twitch.tv/kraken/channels/'+twitchName+'?callback=?', function(data) {
          if (data.logo === null) {
            imgSource = "../TwitchAPI/assets/img/redx.png";
          } else {
            imgSource = data.logo;
          }
          HTMLstring = "<div class='col-md-8 running'><div class='row'>";
          HTMLstring += "<div class='col-md-2'><img src='"+imgSource+"'></div>";
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
