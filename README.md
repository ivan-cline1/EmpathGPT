# EmpathGPT

## Overview
EmpathGPT is a browser extension designed for emotion recognition in one's face during text-based interactions with the ChatGPT website. The purpose is to allow ChatGPT to "see" your current emotion while prompting it to respond more empathetically based on the user's feelings. This extension can be forked and used to enhance the new GPT store products on the OpenAI website in whatever way you want! 

## Features
- Utilizes the javascript face-api.js API to analyze users' faces and infer emotional context while they prompt ChatGPT on the open website.

- The EmpathGPT extension then uses your perceived emotion to inject more text into your ChatGPT prompt so that ChatGPT responds accordingly and empathetically.


  **The javascript face-api.js project can be found here: https://github.com/justadudewhohacks/face-api.js

  The license it uses is: MIT License Copyright (c) 2018 Vincent Mühler, full license description can be found in the above link and can be found in the emotion_recognition/LicenseAgreementForCodeInThisFolder.txt **

## Installation
1. Download the extension package.
2. Load it in your browser as an unpacked extension.



## Usage
- Enable camera permissions for the Chrome extension\
![](readme_resources/media/enable_cam_video.gif)
- Click the extension icon to view the popup and turn EmpathGPT on.
- Navigate to `https://chat.openai.com`, or refresh the page if  you are already there (the content script must be loaded)
- Type in whatever prompt you would like with a cheesy smile on your face (for testing purposes), and your webcam turned on and then hit enter. You will see the prompt injection based on your emotions, and ChatGPT will respond to you accordingly.



## Version
- Current version: 0.1


## Works In Progress
- Publishing! A logo is still needed. 
- Coding something in the background worker script to allow the user to accept camera permissions from the extension on runtime (instead of having to go through their settings)
- Making the messaging sending/catching intervals more efficient and synchronized
- Modifying the injection texts to make ChatGPT respond even more empathetically. Optimizing them to be as effective as possible and as short as possible is the focus.
- Unit tests :P

## Future Additions
- Using a more "nuanced" emotion recognition model that can be personalized to the user's unique facial reflection of emotions (personally tuned eigenfaces?). 
- Getting a design for the logo and publishing it to the Chrome Extension Store.
  


