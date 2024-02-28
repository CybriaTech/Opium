function replaceDomain(gamePath) {
    var gameIframe = document.getElementById("game-iframe");
    var newDomain = 'https://coca.pages.dev/';
    gameIframe.src = newDomain + gamePath;
}