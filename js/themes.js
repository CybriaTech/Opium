let typedCharacters = '';
const correctSequence1 = 'lunaris';
const correctSequence2 = 'dragon';

document.addEventListener('keypress', function(event) {
    typedCharacters += event.key.toLowerCase();

    if (typedCharacters === correctSequence1) {
        typedCharacters = '';
        changeTheme();
    } else if (typedCharacters === correctSequence2) {
        typedCharacters = '';
        displayDragon();
    } else if (!correctSequence1.startsWith(typedCharacters) && !correctSequence2.startsWith(typedCharacters)) {
        typedCharacters = '';
    }
});

function changeTheme() {
    const games = document.querySelectorAll('.game');
    games.forEach(function(game) {
        game.style.backgroundColor = '#0055ff';
    });

    document.body.style.backgroundColor = '#151523';

    const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
    favicon.type = 'image/jpeg';
    favicon.rel = 'shortcut icon';
    favicon.href = '/images/logo/lunarisicon.jpeg';
    document.head.appendChild(favicon);

    const lunarisEvent = new Event('lunaris');
    document.dispatchEvent(lunarisEvent);
}

function displayDragon() {
    const videoContainer = document.createElement('div');
    videoContainer.style.position = 'fixed';
    videoContainer.style.top = '0';
    videoContainer.style.left = '0';
    videoContainer.style.width = '100%';
    videoContainer.style.height = '100%';
    videoContainer.style.overflow = 'hidden';
    videoContainer.style.zIndex = '9999999'; 

    const video = document.createElement('video');
    video.src = 'images/settings/dragon.mp4';
    video.type = 'video/mp4';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.setAttribute('loop', true);
    video.setAttribute('autoplay', true);
    video.volume = 1;

    video.classList.add('hidden-controls');

    // hopefully this doesn't get APi browser restricted
    video.addEventListener('click', function () {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });

    videoContainer.appendChild(video);
    document.body.appendChild(videoContainer);
}
