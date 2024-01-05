document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video");
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
      case "empathize":
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]).then(startVideo);
        console.log("promises made");
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
      console.log("stream made");

      console.log("averages Set");
      var counter = 0;
      
      setInterval(async () => {
        try {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();
          var currentEmotions = detections[0].expressions;
          Object.keys(runningAverages).forEach((key) => {
            runningAverages[key] = calculateRunningAverage(
              currentEmotions[key],
              runningAverages[key],
              counter
            );
          });

          counter = counter + 1;

          if (counter >= 25) {
            chrome.runtime.sendMessage({type:"currentEmotion", emotion: runningAverages})
            counter = 0;
            console.log(runningAverages);
            Object.keys(runningAverages).forEach((key) => {
              runningAverages[key] = currentEmotions[key];
            });
          }
        } catch (err) {
          console.log(err);
        }
      }, 100);
    } catch (err) {
      console.error(err);
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

  function calculateRunningAverage(currentValue, previousAverage, count) {
    return (previousAverage * count + currentValue) / (count + 1);
  }

  function stopVideo() {
    // You might want to stop the video stream when the switch is turned off
    const stream = video.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    video.srcObject = null;
  }
});
