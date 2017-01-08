import "babel-polyfill";
import jquery from "jquery";

const urlSelector = "#formInThePopUp > div.a-row > div > a";

const wait = (msec) => {
  return new Promise((done) => {
    window.setTimeout(() => {
      done(msec);
    }, msec);
  });
};

const scrape = async () => {
  await wait(250);

  const url = jquery(urlSelector).text();
  if (url !== undefined && url !== "") {
    return url;
  }
  return undefined;
};

const scrapingGenerator = function *() {
  let i;
  for (i = 0; i < 20; i++) {
    yield scrape();
  }
};

const extract = () => {
  const p = scrapingGenerator().next();
  if (p.done === true) {
    window.alert("Failed to scrape amzn URL");
    return;
  }

  p.value.then((url) => {
    if (url === undefined) {
      return extract();
    }

    chrome.runtime.sendMessage({
      text: url
    });

    jquery(urlSelector).append(" <font color='green'>Copied!</font>");
  }, () => {
    // Failed
    return extract();
  });
};

jquery("#swfText").click(() => {
  extract();
});

