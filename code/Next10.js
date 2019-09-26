var console = require('console');
var http = require('http');
var config = require('config');

module.exports.function = function next10 (pokemonResults,$vivContext) {
  var rand = Math.floor(Math.random()*10000000000000)
  var response = null;
  var offset = pokemonResults.offset+10;
  var url = config.get('remote.newPokemonUrl') 
          + '/pokemon/rank/'
          + pokemonResults.sortBy
          + '?sort='
          + pokemonResults.sort
          + '&offset='
          + offset
          + '&userId='+$vivContext.sessionId
          + '&rand=' + rand
  console.log(url);
  response = http.getUrl(url, { format: 'json'});
  console.log(response);
  return response;
}