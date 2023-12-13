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
