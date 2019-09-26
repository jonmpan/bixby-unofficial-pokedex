var console = require('console');
var http = require('http');
var config = require('config');
var dashbot = require("./lib/dashbot.js");

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

module.exports.function = function findPokemon(pokemonName, $vivContext) {
  var rand = Math.floor(Math.random() * 10000000000000)
  var noSpaces = pokemonName.replace(/ /g, "-");
  var response = http.getUrl(config.get('remote.newPokemonUrl') + '/pokemon/one/' + noSpaces + '?userId=' + $vivContext.userId + '+&rand=' + rand + '', { format: 'json' });
  response.message = Math.floor(Math.random() * 7 + 1);
  response.pokedexEntry = " " + response.pokedexEntry + " ";
  var regexp0 = new RegExp(" the " + response.species, "gi");
  var regexp1 = new RegExp(response.species, "gi");
  var regexp2 = new RegExp(" the Pokémon", "gi");
  var regexp3 = new RegExp(" it ", "gi");
  var regexp4 = new RegExp(" it's ", "gi");
  var regexp5 = new RegExp(" its ", "gi");

  response.pokedexEntry = response.pokedexEntry
    .replace(regexp0, toTitleCase(pokemonName))
    .replace(regexp1, toTitleCase(pokemonName))
    .replace(regexp2, " " + toTitleCase(pokemonName))
    .replace(/Pokémon/gi, toTitleCase(pokemonName))
    .replace(regexp3, " " + toTitleCase(pokemonName) + " ")
    .replace(regexp4, " " + toTitleCase(pokemonName) + " is")
    // .replace(regexp5, " " + toTitleCase(pokemonName) + "'s ")
    .trim()

  dashbot.logIncoming(pokemonName, "Which Pokemon", $vivContext);
  dashbot.logOutgoing(pokemonName + " resembles " + response.species + ".", "Which Pokemon", $vivContext)
  return response;
}