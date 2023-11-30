function openPopup(title, iconUrl) {
    let inFrame;
    
    try {
        inFrame = window !== top;
    } catch (e) {
        inFrame = true;
    }

    if (!inFrame && !navigator.userAgent.includes("Firefox")) {
        const popup = window.open("about:blank", "_blank");

        if (!popup || popup.closed) {
        } else {
            const doc = popup.document;

            doc.title = title;

            const link = doc.createElement("link");
            link.rel = "icon";
            link.href = iconUrl;
            doc.head.appendChild(link);

            const iframe = doc.createElement("iframe");
            const style = iframe.style;
            iframe.src = location.href;
            style.position = "fixed";
            style.top = style.bottom = style.left = style.right = 0;
            style.border = style.outline = "none";
            style.width = style.height = "100%";

            doc.body.appendChild(iframe);

            location.replace("about:blank");
        }
    }
}

function schoology() {
    openPopup("Home | Schoology", "/images/settings/schoology.ico");
}

function ab() {
    openPopup("about:blank", "/images/settings/about-blank.png");
}

function panic() {
  var hotkey = document.getElementById('panic-hotkey').value;
  var link = document.getElementById('panic-link').value;

  if (hotkey && link) {
    localStorage.removeItem('panicHotkey');
    localStorage.removeItem('panicLink');

    localStorage.setItem('panicHotkey', hotkey);
    localStorage.setItem('panicLink', link);

    alert('Alright, Your Panic Link And Hotkey Has Been Saved!');
  } else {
    alert('Error 174, Both Link & Hotkey Required!');
  }
}

function handleHotkey(event) {
  var hotkey = localStorage.getItem('panicHotkey');
  var link = localStorage.getItem('panicLink');

  if (hotkey && link) {
    if (event.key === hotkey) {
      window.location.href = link;
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  handleHotkey({ key: '' });
});

document.addEventListener('keydown', handleHotkey);
