try {
  if (window.location.href.match(/https:\/\/chat\.openai\.com\/.*/)) {
    try {
      chrome.runtime.onMessage.addListener((msg) => {
        if (msg.type === "refresh") {
          window.location.reload();
        } else {
        }
      });

      const inputBox = document.getElementById("prompt-textarea");
      var currentEmotion = "neutral";
      var emotionInject = "";
      var button = document.querySelector('[data-testid="send-button"]');

      let intervalId;

      inputBox.addEventListener("focus", function () {
        intervalId = setInterval(function () {
          chrome.runtime.sendMessage(
            { type: "contentScriptAskingForEmotion" },
            function (response) {
              currentEmotion = response.message;
              createEmotionalInjection();
              button = document.querySelector('[data-testid="send-button"]');
            }
          );
        }, 500);
      });

      inputBox.addEventListener("blur", function () {
        clearInterval(intervalId);
      });

      inputBox.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          inputBox.autofocus = true;
          inputBox.value = inputBox.value + emotionInject;
        }
      });
    } catch (err) {}
  } else {
    pass;
  }

  function createEmotionalInjection() {
    switch (currentEmotion) {
      case "angry":
        emotionInject =
          "\n\n\n\n\n (try to respond empathetically as if I appeared angry/frustrated but make it subtle. It's as if you saw my emotion on my face but you don't want to overtly mention it- try to cool me down, but not too much- don't patronize me)";
        break;
      case "fearful":
        emotionInject =
          "\n\n\n\n\n (try to respond empathetically as if I appeared fearful/anxious but make it subtle. It's as if you saw my emotion on my face but you don't want to overtly mention it- try to soothe me, but not too much- don't patronize me)";
        break;
      case "disgusted":
        emotionInject =
          "\n\n\n\n\n (try to respond empathetically as if I appeared disgusted by something but make it subtle. It's as if you saw my emotion on my face but you don't want to overtly mention it- don't patronize me)";
        break;
      case "surprised":
        emotionInject =
          "\n\n\n\n\n (try to respond empathetically as if I appeared surprised by something but make it subtle. It's as if you saw my emotion on my face but you don't want to overtly mention it- don't patronize me)";
        break;
      case "neutral":
        emotionInject = "";
        break;
      case "happy":
        emotionInject =
          "\n\n\n\n\n (try to respond empathetically as if I appeared happy/excited but make it subtle. It's as if you saw my emotion on my face but you don't want to overtly mention it- try to amplify my happiness, but not too much- don't patronize me)";
        break;
      case "sad":
        emotionInject =
          "\n\n\n\n\n (try to respond empathetically as if I appeared sad/disappointed/exhausted but make it subtle. It's as if you saw my emotion on my face but you don't want to overtly mention it- try to cheer me up, but not too much- don't patronize me)";
        break;
      default:
        emotionInject = "";
        break;
    }
  }
} catch {
  pass;
}
