function getMainSave() {
  var mainSave = {};

  var localStorageDontSave = ["supportalert"];

  localStorageSave = Object.entries(localStorage);

  for (let entry in localStorageSave) {
    if (localStorageDontSave.includes(localStorageSave[entry][0])) {
      localStorageSave.splice(entry, 1);
    }
  }

  localStorageSave = btoa(JSON.stringify(localStorageSave));

  mainSave.localStorage = localStorageSave;

  cookiesSave = document.cookie;
  cookiesSave = btoa(cookiesSave);
  mainSave.cookies = cookiesSave;

  mainSave = btoa(JSON.stringify(mainSave));

  mainSave = CryptoJS.AES.encrypt(mainSave, "egamepass").toString();

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
  if(key) {
    data = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  } else {
    data = CryptoJS.AES.decrypt(data, "egamepass").toString(CryptoJS.enc.Utf8);
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
  var hiddenUpload = document.querySelector(".hiddenUpload");
  hiddenUpload.click();

  hiddenUpload.addEventListener("change", function (e) {
    var files = e.target.files;
    var file = files[0];
    if (!file) {
      return;
    }

    var reader = new FileReader();

    reader.onload = function (e) {
      if(key) {
        getMainSaveFromUpload(e.target.result, key);
      } else {
        getMainSaveFromUpload(e.target.result);
      }
      $("#upload").text("Upload Successful!")
      setTimeout(function() {
        $("#upload").text("Upload Save")
      }, 3000)
    };

    reader.readAsText(file);
  });
}
