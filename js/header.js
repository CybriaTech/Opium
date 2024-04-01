document.write(`
  <header>
    <a class="title" href="/">
      <img src="/images/logo/opium-clear.png" width="128" height="128">
      <h2>Cocainium</h2>
    </a>
    <nav>
      <a href="/games.html"><i class="fas fa-gamepad"></i></a>
      <a href="/proxies"><i class="fas fa-lock"></i></a> 
      <a href="/bookmarklets.html"><i class="fas fa-code"></i></a> 
      <a href="/emulators.html"><i class="fas fa-server"></i></a> 
      <a href="/mirror.html"><i class="fas fa-link"></i></a> 
      <a href="https://github.com/CybriaTech/Opium"><i class="fab fa-github"></i></a>
      <a href="/widgetbot.html"><i class="fab fa-discord" style="color: #7289DA;"></i></a>
      <a href="/settings.html"><i class="fas fa-cog"></i></a>
    </nav>
  </header>
`);

// lunaris flashback LOL (its an easter egg) >:)
document.addEventListener('lunaris', function() {
  const h2Element = document.querySelector('header .title h2');
  if (h2Element) {
    h2Element.textContent = 'Lunaris';
  }

  const imgElement = document.querySelector('header .title img');
  if (imgElement) {
    imgElement.src = '/images/logo/lunarisicon.jpeg';
  }

  const headerElement = document.querySelector('header');
  if (headerElement) {
    headerElement.style.backgroundColor = '#2E1FB7';
  }
  
  document.title = 'Game Vault - Lunaris';
});
