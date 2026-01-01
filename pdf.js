import { chromium } from "playwright";

const url = "http://localhost:5173";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle" });

await page.emulateMedia({ media: "print" });

await page.pdf({
  path: "my-cv.pdf",
  format: "A4",
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: "<div></div>", // required even if empty
  footerTemplate: `
    <div style="width:100%; 
      color:lightgrey!important; 
      font-style:italic; 
      font-size:12px;
      font-family: Arial Nova, Arial, sans-serif;
      padding: 0 60px 10px 0; 
      text-align:right;">
      Page <span class="pageNumber"></span> of <span class="totalPages"></span>
    </div>
  `,
  margin: { 
    top: "10mm", 
    right: "16mm", 
    bottom: "20mm", 
    left: "16mm" 
  },
});

await browser.close();