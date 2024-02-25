function sortGamesAlphabetically() {
    const gamesContainer = document.getElementById('games');
    const gameElements = Array.from(gamesContainer.querySelectorAll('.game'));

    gameElements.sort((a, b) => {
        const titleA = a.querySelector('.game-title').textContent.toLowerCase();
        const titleB = b.querySelector('.game-title').textContent.toLowerCase();
        return titleA.localeCompare(titleB);
    });

    gamesContainer.innerHTML = ''; 

    gameElements.forEach(game => {
        gamesContainer.appendChild(game);
    });
}

window.addEventListener('DOMContentLoaded', sortGamesAlphabetically);
