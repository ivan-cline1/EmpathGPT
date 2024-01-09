document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video");
  //running average of emotions
  var runningAverages = {
    angry: 0,
    fearful: 0,
    disgusted: 0,
    surprised: 0,
    neutral: 0,
    happy: 0,
    sad: 0,
  };

  chrome.runtime.onMessage.addListener((msg) => {
    if (!msg.offscreen) {
      return;
    }
    switch (msg.type) {
      // When the switch is turned on, start the video stream and begin empathizing
      case "empathize":
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(
            "/emotion_recognition/models"
          ),

          faceapi.nets.faceExpressionNet.loadFromUri(
            "/emotion_recognition/models"
          ),
        ]).then(startVideo);
        break;
      case "stopEmpathize":
        stopVideo();
        break;
    }
  });

  async function startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      video.srcObject = stream;
      var counter = 0;

      setInterval(async () => {
        try {
          //use api to detect emotions for each frame
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();
          var currentEmotions = detections[0].expressions;
          //calcualte running average for each emotion
          Object.keys(runningAverages).forEach((key) => {
            runningAverages[key] = calculateRunningAverage(
              currentEmotions[key],
              runningAverages[key],
              counter
            );
          });

          counter = counter + 1;
          //send the background script the average emotions over 2.5 seconds
          if (counter >= 25) {
            chrome.runtime.sendMessage({
              type: "currentEmotion",
              emotion: runningAverages,
            });
            counter = 0;

            Object.keys(runningAverages).forEach((key) => {
              runningAverages[key] = currentEmotions[key];
            });
          }
        } catch (err) {}
      }, 100);
    } catch (err) {
      if (err.name === "NotAllowedError") {
        // User explicitly denied permission or dismissed the prompt
        alert(
          "Permission to access the camera was denied. Please check your settings."
        );
      } else {
        // Other errors
        alert("Failed to access the camera. Please check your settings.");
      }
    }
  }
//running average function
  function calculateRunningAverage(currentValue, previousAverage, count) {
    return (previousAverage * count + currentValue) / (count + 1);
  }

  function stopVideo() {
    // stop the video stream when the switch is turned off
    const stream = video.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    video.srcObject = null;
  }
});
