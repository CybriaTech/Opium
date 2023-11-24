function schoology() {
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

            const iframe = doc.createElement("iframe");
            const style = iframe.style;

            doc.title = "Home | Schoology";

            const link = doc.createElement("link");
            link.rel = "icon";
            link.href = "/images/settings/schoology.ico";
            doc.head.appendChild(link);

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

function ab() {
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

            const iframe = doc.createElement("iframe");
            const style = iframe.style;

            doc.title = "about:blank";

            const link = doc.createElement("link");
            link.rel = "icon";
            link.href = "/images/settings/about-blank.png";
            doc.head.appendChild(link);

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
