import { serve } from "std/server";
import puppeteer from "puppeteer";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("VITE_SUPABASE_URL"),
  Deno.env.get("VITE_SUPABASE_ANON_KEY"),
);

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

    const baseUrl = "https://boards.greenhouse.io/monzo"; // Base URL

    const url = new URL(req.url).searchParams.get("url") || baseUrl;
    const company_id = new URL(req.url).searchParams.get("company_id") || 0;

    // Delete existing records with the same company_id
    const { data: deleteResult, error: deleteError } = await supabase
      .from("jobs") // Replace with your actual table name
      .delete()
      .eq("company_id", company_id);

    if (deleteError) {
      console.error("Error deleting records:", deleteError);
    } else {
      console.log("Deleted records:", deleteResult);
    }

    await page.goto(url, { waitUntil: "networkidle2" });

    // Find all job listings containing "Engineer" or "Developer" in their titles
    const jobElements = await page.$$(
      'div.opening a[href^="/monzo/jobs/"]', // Selector for job listings
    );

    if (jobElements.length > 0) {
      const jobListings = [];
      for (const element of jobElements) {
        const href = await element.evaluate((node) =>
          node.getAttribute("href")
        );

        // Check if the parent div contains a span with class "location"
        const parentDiv = await element.evaluateHandle((node) =>
          node.closest("div.opening")
        );

        let location = "";

        if (parentDiv) {
          const locationElement = await parentDiv.$("span.location");
          if (locationElement) {
            location = await locationElement.evaluate((node) =>
              node.textContent.trim()
            );
          }
        }

        const role = await element.evaluate((node) => node.textContent.trim());

        if (role.includes("Engineer") || role.includes("Developer")) {
          const jobListing = {
            url: new URL(href, baseUrl).href, // Concatenate with the base URL
            role: role,
            location: location,
            company_id: company_id,
          };

          jobListings.push(jobListing);
        }
      }

      // Insert the new job listings into your Supabase table
      const { data: insertResult, error: insertError } = await supabase
        .from("jobs") // Replace with your actual table name
        .insert(jobListings);

      if (insertError) {
        console.error("Error inserting job listings:", insertError);
      } else {
        console.log("Job listings inserted successfully:", insertResult);
      }

      return new Response(JSON.stringify(jobListings), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({ error: "No job listings found" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        },
      );
    }
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
