// Listener for start button
document.getElementById("startButton").addEventListener("click", function () {  
    chrome.runtime.sendMessage({ type: "start" }, function (response) {
        // Handle response if needed
        chrome.storage.session.set({"buttonState":"start"}); // Remember the state as "start"
        document.getElementById("statusText").innerHTML = "EmpathGPT is currently <span style='color:green'>on</span>";
        console.log("Start button response:", response);
    });
    
});

// Listener for stop button
document.getElementById("stopButton").addEventListener("click", function () {
    chrome.runtime.sendMessage({ type: "stop" }, function (response) {
        // Handle response if needed
        chrome.storage.session.set({"buttonState":"stop"}); // Remember the state as "stop"
        document.getElementById("statusText").innerHTML = "EmpathGPT is currently <span style='color:red'>off</span>";
        console.log("Stop button response:", response);
    });
    
});

// Reload the highlight based on the stored button state

window.addEventListener("DOMContentLoaded", function () {
    chrome.storage.session.get("buttonState").then(function(result) {
        var buttonState = result.buttonState;
        console.log("buttonState:", buttonState);

        if (buttonState === "start") {
            document.getElementById("startButton").classList.add("active");
            document.getElementById("statusText").innerHTML = "EmpathGPT is currently <span style='color:green'>on</span>";
        } else if (buttonState === "stop") {
            document.getElementById("stopButton").classList.add("active");
            document.getElementById("statusText").innerHTML = "EmpathGPT is currently <span style='color:red'>off</span>";
        }
    });
});


