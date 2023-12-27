document.write(`
  <header>
    <a class="title" href="/">
      <img src="/images/logo/opium-clear.png" width="128" height="128">
      <h2>Opium</h2>
    </a>
    <nav>
      <a href="/games.html">Games</a>
      <a href="/proxies">Proxy</a> 
      <a href="/bookmarklets.html">Bookmarklets</a> 
      <a href="/emulators.html">Emulators</a> 
      <a href="https://github.com/CybriaTech/Opium"><i class="fab fa-github"></i></a>
      <a href="/widgetbot.html"><i class="fab fa-discord" style="color: #7289DA;"></i></a>
      <a href="/settings.html"><i class="fas fa-cog"></i></a>
    </nav>
  </header>
`);

let userInput = '';
const secretCode = 'OPIUM';

function checkSecretCode() {
  if (userInput === secretCode) {
    window.location.href = "/images/nut.mp4/"; // 
  } else {
    userInput = '';
  }
}

document.addEventListener('keydown', (event) => {
  userInput += event.key.toUpperCase();
  userInput = userInput.slice(-secretCode.length);
  
  checkSecretCode();
});
