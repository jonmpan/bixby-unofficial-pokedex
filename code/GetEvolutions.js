var console = require('console');
var config = require('config');
var http = require('http');
var dashbot = require("./lib/dashbot.js");

module.exports.function = function GetEvolutions (pokemon,  $vivContext) {
  var rand = Math.floor(Math.random()*10000000000000)
  var response  =  http.getUrl(config.get('remote.newPokemonUrl') + '/pokemon/evolutions/'+pokemon.name+'?userId='+$vivContext.userId+'+&rand='+rand+'', { format: 'json'});
  var pokemonEvolutions = {evolutions:response,name:pokemon.name}
  pokemonEvolutions.speech = '';
  pokemonEvolutions.evolutions.forEach(o=>{
    pokemonEvolutions.speech += o.text+". ";
  })
  dashbot.logIncoming("Evolution for " + pokemon.species, "Evolutions", $vivContext);
  dashbot.logOutgoing("Here are the evolutions for " + pokemon.species, "Evolutions", $vivContext)
  return pokemonEvolutions;
}
