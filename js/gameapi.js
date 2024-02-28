function replaceDomain(gamePath) {
    var gameIframe = document.getElementById("game-iframe");
    var newDomain = 'https://cocaine.pages.dev/';
    gameIframe.src = newDomain + gamePath;
}