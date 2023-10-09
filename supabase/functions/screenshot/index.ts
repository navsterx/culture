import { serve } from "std/server";
import puppeteer from "puppeteer";

serve(async (req) => {
  try {
    // Visit browserless.io to get your free API token
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${
        Deno.env.get(
          "VITE_PUPPETEER_BROWSERLESS_IO_KEY",
        )
      }`,
    });
    const page = await browser.newPage();

    const url = new URL(req.url).searchParams.get("url") ||
      "https://jobs.lever.co/octoenergy/";

    await page.goto(url, { waitUntil: "networkidle2" });
    const screenshot = await page.screenshot();

    return new Response(screenshot, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
