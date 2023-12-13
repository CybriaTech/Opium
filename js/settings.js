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

document.addEventListener("DOMContentLoaded", function () {
    const colorCanvas = document.getElementById('color-canvas');
    const hexText = document.querySelector('.hex');
    const ctx = colorCanvas.getContext('2d');
    const imageData = ctx.createImageData(colorCanvas.width, colorCanvas.height);
    let currentColor = [255, 0, 0];

    function updateHexColor(x, y) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        currentColor = [pixel[0], pixel[1], pixel[2]];
        const hex = rgbToHex(currentColor[0], currentColor[1], currentColor[2]);
        hexText.textContent = `#${hex}`;
        hexText.style.color = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
    }

    function rgbToHex(r, g, b) {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function drawColorCanvas() {
        for (let y = 0; y < colorCanvas.height; y++) {
            for (let x = 0; x < colorCanvas.width; x++) {
                const index = (y * colorCanvas.width + x) * 4;
                imageData.data[index] = Math.floor((x / colorCanvas.width) * 255);
                imageData.data[index + 1] = Math.floor((y / colorCanvas.height) * 255);
                imageData.data[index + 2] = currentColor[2];
                imageData.data[index + 3] = 255;
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    colorCanvas.addEventListener('mousemove', function (e) {
        const rect = colorCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        updateHexColor(x, y);
    });

    colorCanvas.addEventListener('click', function (e) {
        const rect = colorCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        updateHexColor(x, y);
    });

    drawColorCanvas();

    // Additional modification for two divs (color-canvas and canvas)
    const canvasContainer = document.getElementById('canvas-container');
    const canvas = document.createElement('canvas');
    canvas.width = colorCanvas.width;
    canvas.height = colorCanvas.height;
    canvasContainer.appendChild(canvas);

    const canvasCtx = canvas.getContext('2d');
    canvasCtx.drawImage(colorCanvas, 0, 0);

    colorCanvas.style.display = 'none';
});
