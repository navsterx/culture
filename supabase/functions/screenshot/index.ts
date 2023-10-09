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
      .from("roles") // Replace with your actual table name
      .delete()
      .eq("company_id", company_id);

    if (deleteError) {
      console.error("Error deleting records:", deleteError);
    } else {
      console.log("Deleted records:", deleteResult);
    }

    await page.goto(url, { waitUntil: "networkidle2" });

    // Find the H2 elements
    const h2Elements = await page.$$("h2");

    // Search for the H2 element with the content "Engineering"
    let engineeringH2;
    for (const h2 of h2Elements) {
      const text = await h2.evaluate((node) => node.innerText);
      if (text.includes("Engineering")) {
        engineeringH2 = h2;
        break;
      }
    }

    if (engineeringH2) {
      // Get the parent section element using evaluateHandle
      const sectionHandle = await engineeringH2.evaluateHandle(
        (node) => node.closest("section"),
      );

      // Get the div elements containing job listings under the found section
      const jobDivs = await sectionHandle.$$(
        "div.opening",
      );

      if (jobDivs.length > 0) {
        const jobListings = [];
        for (const div of jobDivs) {
          const anchor = await div.$("a");
          const location = await div.$("span.location");
          if (anchor && location) {
            const href = await anchor.evaluate((node) =>
              node.getAttribute("href")
            );
            const jobListing = {
              url: new URL(href, baseUrl).href, // Concatenate with the base URL
              role: await anchor.evaluate((node) => node.textContent.trim()),
              location: await location.evaluate((node) =>
                node.textContent.trim()
              ),
              company_id: company_id,
            };

            jobListings.push(jobListing);
          }
        }

        // Insert the new job listings into your Supabase table
        const { data: insertResult, error: insertError } = await supabase
          .from("roles") // Replace with your actual table name
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
    } else {
      return new Response(
        JSON.stringify({
          error: "H2 element with content 'Engineering' not found",
        }),
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
