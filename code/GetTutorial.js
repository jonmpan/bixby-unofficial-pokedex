var dashbot = require('./lib/dashbot.js');

module.exports.function = function getTutorial(bixbydex, $vivContext) {
  const tutorial = {
    tutorial1: "\"Show me a Pikachu\"",
    // tutorial1Value: "pikachu",
    tutorial2: "\"Show me a random Pokemon\"",
    tutorial3: "\"Show me the most popular Pokemon\"",
    // tutorial3Value: "cutest",
    tutorial4: "\"Pokemon with the highest total stats\"",
    // tutorial4: "\"Show me the Pokemon with the highest total stats\"",

    // tutorial4Value: "strongest",
    tutorial5: "\"Show me the lightest Pokemon\"",
    // tutorial5Value: "lightest",
  }
  dashbot.logIncoming("Help", "Tutorial", $vivContext);
  dashbot.logOutgoing("Here is the help screen", "Tutorial", $vivContext)
  return tutorial;
}