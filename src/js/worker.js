//Initialize emotional information being held by the background script
var emotions = {};
var currentEmotion = "neutral";

// Function to create an offscreen document
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

// Listener for message from the popup
chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  switch (msg.type) {
    case "start":
      sendResponse({ message: "Start message received." });

      // Create offscreen document
      await createOffscreen();

      // Send message to the offscreen document to start empathizing based on the users webcam information
      await chrome.runtime.sendMessage({
        type: "empathize",
        offscreen: true,
      });

      return true;
      break;
    case "stop":
      sendResponse({ message: "Stop message received." });

      // IF the user presses "Off" before "On" Create offscreen document, and just dont allow webcam info to be read
      await createOffscreen();

      // Send message to stop empathizing with offscreen document/turn off the camera
      await chrome.runtime.sendMessage({
        type: "stopEmpathize",
        offscreen: true,
      });

      return true;
      break;
  //message is sent from the "offscreen" script, as it will send the average currentEmotion to the background on an interval
    case "currentEmotion":
      emotions = msg.emotion;
      // hoping to add a better way of picking an emotion for the content script to recieve
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
      //When the content script is asking for an emotion (this happens when a user is typing into the chatgpt input box), send the currentEmotion
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
//When the app ends, set the button state to stop and refresh the content.js webpage so we dont have a rogue content script.
chrome.runtime.onSuspend.addListener(() => {
  chrome.storage.session.set({ buttonState: "stop" });
  chrome.runtime.sendMessage({ type: "refresh" }, function (response) {});
});
