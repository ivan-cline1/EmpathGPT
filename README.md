# EmpathGPT

## Overview
EmpathGPT is a browser extension designed for emotion recognition in text-based interactions using the ChatGPT website. The purpose is to allow ChatGPT to "see" your current emotion while prompting it, allowing it to respond in a more empathetic way based on what the user may currently be feeling. 

## Features
- Utilizes the javascript face-api.js api to analyze a users face infer emotional context while they prompt ChatGPT on the openai website.
- The EmpathGPT extension then uses your percieved emotion to inject more text into your ChatGPT prompt so that ChatGPT responds accordingly and empathetically.

## Installation
1. Download the extension package.
2. Load it in your browser as an unpacked extension.



## Usage
- Enable camera permissions for the chrome extension\
![](readme_resources/media/enable_cam_video.gif)
- Click the extension icon to view the popup and turn EmpathGPT on.
- Navigate to `https://chat.openai.com`
- Type in whatever prompt you would like with a cheesy smile on your face (for testing purposes) and your webcam turned on, and then hit enter. You will see the prompt injection based on your emotion, and ChatGPT will respond to you accordingly.



## Version
- Current version: 0.1


## Works In Progress
- Coding something in the background worker script to allow the user to accept camera permissions from the extension on runtime (instead of having to go through their settings)
- Making the messaging sending/catching intervals more efficient and synchronized
- Modifying the injection texts to make ChatGPT respond even more empathetically.
- Eliminating unneccessary permissions in the manifest.json 
- Unit tests :P

## Future Additions
- Using a more "nuanced" emotion recognition model that can be personalized to the user's unique facial reflection of emotions. 
- Getting a design for the logo and publishing it to the Chrome Extension Store.
- 
-----!Contributions to EmpathGPT are encouraged!-----
