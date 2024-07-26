import puppeteer from "puppeteer";

export async function webScrape(url: string) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Extract text from a selector
  const extractText = async (selector: string) => {
    return await page.evaluate((sel) => {
      const element = document.querySelector(sel);

      function recurse(node: Element | null) {
        if (!node) return "";
        let text = "";
        if (node.nodeType === Node.TEXT_NODE) {
          text += node.nodeValue;
        } else if (node.childNodes.length) {
          node.childNodes.forEach((child) => {
            text += recurse(child as Element);
          });
        }
        return text;
      }

      return recurse(element);
    }, selector);
  };

  // Navigate the page to a URL.
  await page.goto(url);

  // Set screen size.
  await page.setViewport({ width: 1080, height: 1024 });

  const text = await extractText(".article-content");

  await browser.close();

  return text;
}
