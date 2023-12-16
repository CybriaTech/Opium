document.addEventListener("DOMContentLoaded", function () {
    var isWidgetbotActive = localStorage.getItem("widgetbotActive");
    var isWidgetbotOn = isWidgetbotActive === null ? true : JSON.parse(isWidgetbotActive);
    document.querySelector(".slider-checkbox").checked = isWidgetbotOn;
    toggleWidgetbot(isWidgetbotOn);
    document.querySelector(".slider-checkbox").addEventListener("change", function () {
        isWidgetbotOn = this.checked;
        toggleWidgetbot(isWidgetbotOn);
        localStorage.setItem("widgetbotActive", JSON.stringify(isWidgetbotOn));
    });
});

function toggleWidgetbot(isActive) {
    var widgetbotContainer = document.getElementById("widgetbot");

    if (isActive) {
        widgetbotContainer.style.display = "block";
        appendWidgetbotScript();
    } else {
        widgetbotContainer.style.display = "none";
        removeWidgetbotScript();
    }
}

function appendWidgetbotScript() {
    var existingScript = document.getElementById("widgetbot-script");

    if (!existingScript) {
        var script = document.createElement("script");
        script.id = "widgetbot-script";
        script.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3';
        script.async = true;
        script.defer = true;

        document.getElementById("widgetbot").appendChild(script);

        script.innerHTML = `
            new Crate({
                server: '1154632402942050394', // CybriaTech
                channel: '1154632891310030878' // #guest-general
            });
        `;
    }
}

function removeWidgetbotScript() {
    var existingScript = document.getElementById("widgetbot-script");

    if (existingScript) {
        existingScript.remove();
    }
}
