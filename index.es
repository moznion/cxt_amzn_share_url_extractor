import jquery from "jquery";
import 'babel-polyfill';

const wait = (msec) => {
  return new Promise((done) => setTimeout(() => done(msec), msec));
};

const scrape = async () => {
  await wait(200);

  const url = jquery('#formInThePopUp > div.a-row > div > a').text();
  if (url !== undefined && url !== "") {
    return url;
  }
  return undefined;
}

const scrapingGenerator = function* () {
  let i;
  for (i = 0; i < 20; i++) {
    yield scrape();
  }
}

const extract = () => {
  const p = scrapingGenerator().next();
  if (p.done === true) {
    alert('Failed to scrape amzn URL');
    return;
  }

  p.value.then((url) => {
    if (url === undefined) {
      return extract();
    }

    chrome.runtime.sendMessage({
      text: url
    });
  }, (fail) => {
    return extract();
  });
}

jquery('#swfText').click(() => {
  extract();
});

