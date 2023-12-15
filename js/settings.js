function toggleWidgetBot() {
    const switchCheckbox = document.querySelector('.slider-checkbox');
    const currentState = switchCheckbox.checked;

    const storedState = localStorage.getItem('widgetbotEnabled') === 'true';

    if (storedState === null || currentState) {
        localStorage.setItem('widgetbotEnabled', currentState);
    }

    const widgetbotContainer = document.getElementById('widgetbot');
    widgetbotContainer.style.display = currentState ? 'block' : 'none';
}

const storedState = localStorage.getItem('widgetbotEnabled') === 'true';

document.querySelector('.slider-checkbox').checked = storedState;

toggleWidgetBot();

document.querySelector('.slider-round').addEventListener('click', toggleWidgetBot);

function schoology() {
    openPopup("Home | Schoology", "/images/settings/schoology.ico");
    toggleWidgetBot();
}

function ab() {
    openPopup("about:blank", "/images/settings/about-blank.png");
    toggleWidgetBot();
}
