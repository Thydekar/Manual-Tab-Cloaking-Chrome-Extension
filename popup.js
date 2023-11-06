document.addEventListener("DOMContentLoaded", function () {
  var changeButton = document.getElementById("changeButton");

  changeButton.addEventListener("click", function () {
    var tabNameInput = document.getElementById("tabNameInput").value;
    var faviconUrlInput = document.getElementById("faviconUrlInput").value;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tabId = tabs[0].id;

      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: changeTabTitle,
        args: [tabNameInput]
      });

      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: changeFavicon,
        args: [faviconUrlInput]
      });
    });
  });
});

function changeTabTitle(tabNameInput) {
  document.title = tabNameInput;
}

function changeFavicon(faviconUrlInput) {
  var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = faviconUrlInput;
  document.getElementsByTagName('head')[0].appendChild(link);
}
