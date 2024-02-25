function getMainSave() {
  var mainSave = {};
  var localStorageDontSave = ["supportalert"];

  var localStorageSave = Object.entries(localStorage).filter(function(entry) {
    return !localStorageDontSave.includes(entry[0]);
  });

  localStorageSave = btoa(JSON.stringify(localStorageSave));
  mainSave.localStorage = localStorageSave;

  var allCookies = "";
  var cookieArray = document.cookie.split("; ");
  for (var i = 0; i < cookieArray.length; i++) {
    allCookies += cookieArray[i] + "; ";
  }
  allCookies = btoa(allCookies);
  mainSave.cookies = allCookies;

  mainSave = btoa(JSON.stringify(mainSave));
  mainSave = CryptoJS.AES.encrypt(mainSave, "opiumsave").toString();

  return mainSave;
}

function downloadMainSave() {
  var data = new Blob([getMainSave()]);
  var dataURL = URL.createObjectURL(data);

  var fakeElement = document.createElement("a");
  fakeElement.href = dataURL;
  fakeElement.download = "data.opium";
  fakeElement.click();
  URL.revokeObjectURL(dataURL);
}

function getMainSaveFromUpload(data, key) {
  if (key) {
    data = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  } else {
    data = CryptoJS.AES.decrypt(data, "opiumsave").toString(CryptoJS.enc.Utf8);
  }

  var mainSave = JSON.parse(atob(data));
  var mainLocalStorageSave = JSON.parse(atob(mainSave.localStorage));
  var cookiesSave = atob(mainSave.cookies);

  for (let item of mainLocalStorageSave) {
    localStorage.setItem(item[0], item[1]);
  }

  document.cookie = cookiesSave;
}

function uploadMainSave(key) {
  var hiddenUpload = document.querySelector("#fileInput");
  hiddenUpload.click();

  hiddenUpload.addEventListener("change", function (e) {
    var files = e.target.files;
    var file = files[0];
    if (!file) {
      return;
    }

    var reader = new FileReader();

    reader.onload = function (e) {
      if (key) {
        getMainSaveFromUpload(e.target.result, key);
      } else {
        getMainSaveFromUpload(e.target.result);
      }
      alert("Upload Successful!");
    };

    reader.readAsText(file);
  });
}

$(document).ready(function() {
  $("#exportBtn").click(function() {
    downloadMainSave();
  });

  $("#importBtn").click(function() {
    uploadMainSave();
  });
});
