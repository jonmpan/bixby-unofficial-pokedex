var console = require('console');
var http = require('http');
var config = require('config');
var dashbot = require('./lib/dashbot.js');

module.exports.function = function fetchAttack(singleWord, $vivContext) {
  console.log($vivContext.userId)
  var rand = Math.floor(Math.random() * 10000000000000)
  var response = null;
  var stat = '';
  var sort = '';
  if(singleWord == "strongest"){
    stat = '/pokemon/rank/total';
    sort = 'sort=highest';
  }
  if(singleWord == "weakest"){
    stat = '/pokemon/rank/total';
    sort = 'sort=lowest';
  }
  if(singleWord == "toughest"){
    stat = '/pokemon/rank/defense';
    sort = 'sort=highest';
  }
  if(singleWord == "wimpiest"){
    stat = '/pokemon/rank/attack';
    sort = 'sort=lowest';
  }
  if(singleWord == "fastest"){
    stat = '/pokemon/rank/speed';
    sort = 'sort=highest';
  }
  if(singleWord == "slowest"){
    stat = '/pokemon/rank/speed';
    sort = 'sort=lowest';
  }
  if(singleWord == "smartest"){
    stat = '/pokemon/rank/specialattack';
    sort = 'sort=highest';
  }
  if(singleWord == "dumbest"){
    stat = '/pokemon/rank/specialattack';
    sort = 'sort=lowest';
  }
  if(singleWord == "cutest"){
    stat = '/pokemon/rank/popularity';
    sort = 'sort=highest';
  }
  if(singleWord == "ugliest"){
    stat = '/pokemon/rank/popularity';
    sort = 'sort=lowest';
  }
  if(singleWord == "tallest"){
    stat = '/pokemon/rank/height';
    sort = 'sort=highest';
  }
  if(singleWord == "shortest"){
    stat = '/pokemon/rank/height';
    sort = 'sort=lowest';
  }
  if(singleWord == "heaviest"){
    stat = '/pokemon/rank/weight';
    sort = 'sort=highest';
  }
  if(singleWord == "lightest"){
    stat = '/pokemon/rank/weight';
    sort = 'sort=lowest';
  }
  
  var url = config.get('remote.newPokemonUrl') 
  + stat
  + '?'
  + sort
  + '&rand=' + rand
  console.log(url)
  response = http.getUrl(url, {format: 'json'});
  dashbot.logIncoming(singleWord, "Single Word Fetch Stats", $vivContext);
  dashbot.logOutgoing("Here are the " + singleWord + " Pokemon.", "Single Word Fetch Stats", $vivContext)
  return response;
}
