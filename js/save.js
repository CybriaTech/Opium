$(document).ready(function() {
  var allCookies = "";
  var cookiesArray = document.cookie.split("; ");
  for (var i = 0; i < cookiesArray.length; i++) {
    allCookies += cookiesArray[i] + "; ";
  }

  var encryptedCookies = CryptoJS.AES.encrypt(allCookies, "opiumsave").toString();
  var blob = new Blob([encryptedCookies], { type: 'text/plain' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.opium';
  a.click();

  $("#importBtn").click(function() {
    $("#fileInput").click();
  });

  $("#fileInput").change(function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      var encryptedCookies = e.target.result;
      var decryptedCookies = CryptoJS.AES.decrypt(encryptedCookies, "opiumsave").toString(CryptoJS.enc.Utf8);
      document.cookie = decryptedCookies;
      alert("Cookies imported successfully!");
    };

    reader.readAsText(file);
  });
});
