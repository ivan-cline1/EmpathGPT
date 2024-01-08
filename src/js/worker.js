// Function to create an offscreen document
var emotions = {};
var currentEmotion = "neutral";

async function createOffscreen() {
  // Check if offscreen document already exists
  if (await chrome.offscreen.hasDocument()) return;

  // Create offscreen document with specified URL, reasons, and justification
  await chrome.offscreen.createDocument({
    url: "/src/html/offscreen.html",
    reasons: ["USER_MEDIA"], // Specify the reasons for creating the offscreen document
    justification: "testing", // Justification for creating the offscreen document
  });
}

// Listener for runtime messages
chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  switch (msg.type) {
    case "start":
      sendResponse({ message: "Start message received." });

      // Create offscreen document
      await createOffscreen();

      // Send message to start empathizing with offscreen document
      await chrome.runtime.sendMessage({
        type: "empathize",
        offscreen: true,
      });

      return true;
      break;
    case "stop":
      sendResponse({ message: "Stop message received." });

      // Create offscreen document
      await createOffscreen();

      // Send message to stop empathizing with offscreen document
      await chrome.runtime.sendMessage({
        type: "stopEmpathize",
        offscreen: true,
      });

      return true;
      break;

    case "currentEmotion":
      emotions = msg.emotion;

      let maxKey = null;
      let secondMaxKey = null;
      let maxValue = 0;

      for (const key in emotions) {
        if (emotions[key] > maxValue) {
          secondMaxKey = maxKey;
          maxKey = key;
          maxValue = emotions[key];
        }
      }

      currentEmotion = maxKey;

      sendResponse({ message: "getEmotion message received." });

      break;
    case "contentScriptAskingForEmotion":
      sendResponse({ message: currentEmotion });
      break;
    case "getResponse":
      sendResponse({
        message: "This is the response from the background script.",
      });
      break;
  }
});

chrome.runtime.onSuspend.addListener(() => {
  chrome.storage.session.set({ buttonState: "stop" });
  chrome.runtime.sendMessage({ type: "refresh" }, function (response) {});
});
