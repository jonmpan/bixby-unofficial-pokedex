var console = require('console');
var http = require('http');
var config = require('config');
var dashbot = require("./lib/dashbot.js");

module.exports.function = function fetchAttack(pref, stat, $vivContext) {
  console.log($vivContext.userId)
  var rand = Math.floor(Math.random() * 10000000000000)
  var response = null;
  var stat = '/pokemon/rank/' + stat.toLowerCase().replace('-', '');
  var sort = 'sort=' + pref.toLowerCase();
  var url = config.get('remote.newPokemonUrl') 
          + stat
          + '?'
          + sort
          + '&rand=' + rand
  console.log(url)
  response = http.getUrl(url, {format: 'json'});

  dashbot.logIncoming(pref + " " + stat, "Fetch Stats", $vivContext);
  dashbot.logOutgoing("Here are the " + pref + " " + stat + " Pokemon.", "Fetch Stats", $vivContext)

  return response;
}
