var console = require('console');
var http = require('http');
var config = require('config');
var dashbot = require('./lib/dashbot.js');

module.exports.function = function findRandomPokemon($vivContext) {
  var rand = Math.floor(Math.random() * 10000000000000)
  var response = http.getUrl(config.get('remote.newPokemonUrl') + '/pokemon/random/1?userId=' + $vivContext.userId + '&rand=' + rand + '', {
    format: 'json'
  });
  response.message = Math.floor(Math.random() * 10 + 1);
  dashbot.logIncoming("Show me a random Pokemon", "Find Random Pokemon", $vivContext);
  dashbot.logOutgoing("I randomly found this " + response.species + " for you.", "Find Random Pokemon", $vivContext)
  return response;
}
