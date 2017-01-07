const saveToClipboard = (str) => {
  // copy 用に textareaを作る
  const textArea = document.createElement("textarea");
  textArea.style.cssText = "position:absolute;left:-100%";

  document.body.appendChild(textArea);

  textArea.value = str;
  textArea.select();
  document.execCommand("copy");

  document.body.removeChild(textArea);
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    saveToClipboard(request.text);
  }
);

