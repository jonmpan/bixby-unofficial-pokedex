var console = require('console');
var config = require('config');
var http = require('http');
var dashbot = require('./lib/dashbot.js');

const buildUrl = (type) => {
  return '/images/types/' + type + '.png';
}

const buildMultiplierUrl = (multiplier) => {
  console.log(multiplier);
  if (multiplier === 0) {
    return '/images/multiplier/0.png';
  }
  else if (multiplier === .25) {
    return '/images/multiplier/25.png';
  }
  else if (multiplier === .5) {
    return '/images/multiplier/5.png';
  }
  else if (multiplier === 1) {
    return '/images/multiplier/1.png';
  }
  else if (multiplier === 2) {
    return '/images/multiplier/2.png';
  }
  else if (multiplier === 4) {
    return '/images/multiplier/4.png';
  }
}

module.exports.function = function GetEvolutions(pokemon, $vivContext) {
  var rand = Math.floor(Math.random() * 10000000000000)
  var typeChart = http.getUrl(config.get('remote.newPokemonUrl') + '/pokemon/types/' + pokemon.name + '?userId=' + $vivContext.userId + '+&rand=' + rand + '', { format: 'json' });
  typeChart.resistances.forEach(type => {
    type.type = buildUrl(type.type);
    type.multiplier = buildMultiplierUrl(type.multiplier);
  })
  typeChart.neutral.forEach(type => {
    type.type = buildUrl(type.type);
    type.multiplier = buildMultiplierUrl(type.multiplier);
  })
  typeChart.weaknesses.forEach(type => {
    type.type = buildUrl(type.type);
    type.multiplier = buildMultiplierUrl(type.multiplier);
  })
  console.log(typeChart)
  
  dashbot.logIncoming("Type Chart for " + pokemon.species, "Type Chart", $vivContext);
  dashbot.logOutgoing("Here is the type chart for " + pokemon.species, "Type Chart", $vivContext)
  
  return typeChart;
}
