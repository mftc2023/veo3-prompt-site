const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function scrape() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("https://veo3-prompt.com/", { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    const items = document.querySelectorAll(".prompt-card");
    const prompts = [];

    items.forEach((el, idx) => {
      const title = el.querySelector("h2")?.innerText || "";
      const summaryZh = el.querySelector(".summary")?.innerText || "";
      const promptEn = el.querySelector("pre")?.innerText || "";
      const tips = Array.from(el.querySelectorAll("li")).map((li) => li.innerText);

      prompts.push({
        id: idx + 1,
        title,
        summaryZh,
        promptEn,
        tips,
      });
    });

    return prompts;
  });

  const outPath = path.join(__dirname, "../data/veo3_prompts.json");
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf-8");

  console.log(`[✓] 已更新 prompt 数据，共 ${data.length} 条`);

  await browser.close();
}

scrape().catch((err) => {
  console.error("抓取失败:", err);
  process.exit(1);
});
