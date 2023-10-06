// Initialize variables to store predictions
let prediction1 = "";
let prediction2 = "";

// Configure webcam settings
Webcam.set({
  width: 350,                  // Set width of the webcam view
  height: 300,                 // Set height of the webcam view
  imageFormat: 'png',          // Set image format to PNG
  pngQuality: 90               // Set image quality
});

// Get the HTML element with the ID 'camera' and assign it to the 'camera' constant
const camera = document.getElementById("camera");

// Attach the webcam to the 'camera' element
Webcam.attach(camera);

// Create an image classifier using a pre-trained model and specify a callback function when the model is loaded
const classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/X7hQ1jBwq/model.json', modelLoaded);

// Callback function to execute when the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

// Function to convert text to speech
function speak() {
  const synth = window.speechSynthesis;

  // Create speech data for predictions
  const speakData1 = "The first identification is " + prediction1;
  const speakData2 = "And the second identification is " + prediction2;

  // Combine speech data
  const utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);

  // Use the speech synthesis API to speak
  synth.speak(utterThis);
}

// Function to take a snapshot from the webcam
function takeSnapshot() {
  // Capture a snapshot and display it in the 'result' element
  Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
  });
}

// Log the version of ml5.js to the console
console.log('ml5 version:', ml5.version);

// Function to check the image for predictions
function check() {
  const img = document.getElementById('captured_image');

  // Use the classifier to classify the image and specify a callback function
  classifier.classify(img, gotResult);
}

// Callback function to handle the results of image classification
function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);

    // Display the first and second predictions on the HTML page
    document.getElementById("resultEmotionName").innerHTML = results[0].label;
    document.getElementById("resultEmotionName2").innerHTML = results[1].label;

    // Update prediction variables
    prediction1 = results[0].label;
    prediction2 = results[1].label;

    // Speak the predictions
    speak();

    // Display emojis based on predictions
    if (results[0].label == "happy") {
      document.getElementById("updateEmoji").innerHTML = "&#128522;"; // Smiley face emoji
    }
    if (results[0].label == "sad") {
      document.getElementById("updateEmoji").innerHTML = "&#128532;"; // Sad face emoji
    }
    if (results[0].label == "angry") {
      document.getElementById("updateEmoji").innerHTML = "&#128548;"; // Angry face emoji
    }

    if (results[1].label == "happy") {
      document.getElementById("updateEmoji2").innerHTML = "&#128522;"; // Smiley face emoji
    }
    if (results[1].label == "sad") {
      document.getElementById("updateEmoji2").innerHTML = "&#128532;"; // Sad face emoji
    }
    if (results[1].label == "angry") {
      document.getElementById("updateEmoji2").innerHTML = "&#128548;"; // Angry face emoji
    }
  }
}
