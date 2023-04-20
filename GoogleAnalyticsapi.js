const axios = require("axios");
const fs = require("fs");

// Set up the Google API credentials and the analytics view ID
const keyFile = "./path/to/private/key.json";
const key = JSON.parse(fs.readFileSync(keyFile, "utf8"));
const trackingId = "UA-12345678-1"; // Replace with your own tracking ID

// Define a function to track user behavior
async function trackEvent(category, action, label, value, userId) {
  try {
    // Build the analytics event data
    const data = {
      v: "1",
      tid: trackingId,
      cid: userId,
      t: "event",
      ec: category,
      ea: action,
      el: label,
      ev: value,
      uid: userId,
    };

    // Send the analytics event data using the Measurement Protocol
    const response = await axios.post(
      "https://www.google-analytics.com/collect",
      null,
      { params: data }
    );

    console.log(`Event tracked successfully: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error(`Error tracking event: ${error}`);
  }
}
