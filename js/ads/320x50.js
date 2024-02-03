document.addEventListener('DOMContentLoaded', function() {
    var atOptions = {
        'key': 'f31689761dc02e086d4fc684e3e3abcc',
        'format': 'iframe',
        'height': 50,
        'width': 320,
        'params': {}
    };

    var scriptElement = document.createElement('script');

    scriptElement.src = '//www.topcreativeformat.com/' + atOptions.key + '/invoke.js';

    scriptElement.type = 'text/javascript';

    scriptElement.async = true;

    document.body.appendChild(scriptElement);
});
